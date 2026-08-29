const CACHE_NAME = 'kpop-position-v5';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/data.js',
    './js/app.js',
    './js/i18n.js',
    './js/locales/en.json',
    './js/locales/ko.json',
    './manifest.json',
    './icon-192.svg',
    './icon-512.svg'
];
const STATIC_PATHS = new Set(
    ASSETS.map(asset => new URL(asset, self.registration.scope).pathname)
);

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(ASSETS);
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        const keys = await caches.keys();
        await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
        await self.clients.claim();
    })());
});

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    if (
        request.method !== 'GET' ||
        url.origin !== self.location.origin ||
        !STATIC_PATHS.has(url.pathname)
    ) return;

    const networkResponse = fetch(request);
    event.waitUntil(networkResponse.then(async response => {
        if (!response.ok) return;
        const responseCopy = response.clone();
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, responseCopy);
    }).catch(() => undefined));

    event.respondWith(networkResponse.catch(async error => {
            const cached = await caches.match(request, { ignoreSearch: true });
            if (cached) return cached;
            throw error;
    }));
});
