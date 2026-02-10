const CACHE_NAME = 'kpop-position-v2';
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './js/data.js',
    './js/app.js',
    './manifest.json',
    './icon-192.svg',
    './icon-512.svg'
];

self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        fetch(e.request).then(r => {
            const c = r.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(e.request, c));
            return r;
        }).catch(() => caches.match(e.request))
    );
});
