const STATIC_EN_FALLBACK = {
    app: {
        title: 'K-POP Role Quiz - Playful 12-Question Test | DopaBrain',
        description: 'Take a playful 12-question K-POP role quiz and compare your answer scores across seven role labels. For entertainment only; not an official role, personality test, or talent assessment.',
        ogDescription: 'A just-for-fun K-POP role result based on your 12 answers. Role labels vary and this is not an official or talent assessment.',
        skipLink: 'Skip to main content',
        loading: 'Loading…',
        changeLanguage: 'Change language',
        languageMenu: 'Language',
        switchToLight: 'Switch to light theme',
        switchToDark: 'Switch to dark theme'
    },
    boundary: {
        intro: 'Playful entertainment quiz · not an official role, personality test, or talent assessment.',
        result: 'This result describes only the answer pattern in this attempt. It is not an official K-POP role or a personality or talent assessment.',
        spectrum: 'These bars compare only your 12 answers. They are relative scores, not population percentiles.',
        tieRule: "If labels tie, a deterministic hash of this attempt's answer sequence chooses among only the tied labels. The same answers produce the same result, and the first label is not automatically favored."
    },
    intro: {
        title: 'K-POP Role Quiz',
        subtitle: 'Which K-POP-inspired role label will your answers score highest?',
        meta1: '12 Questions',
        meta2: 'About 2 min',
        meta3: '7 Role Labels',
        startBtn: 'Start the Quiz',
        previewLabel: 'Q1.',
        previewQuestion: 'When you go to karaoke with friends, what do you do?',
        microCopy: 'About 2 min · Instant shareable result'
    },
    loading: { text: 'Comparing your answer scores…' },
    result: {
        playfulHeading: '🎤 Playful result',
        spectrumHeading: '📊 Answer score spectrum',
        subtitle: 'Playful answer-pattern match',
        descriptionTemplate: 'Your choices gave the highest total to the “{type}” label in this quiz.',
        roleLabel: 'K-POP-inspired score label',
        shareBtn: '📤 Share Result',
        saveImageBtn: '📸 Save Image',
        retryBtn: '🔄 Try Again',
        relatedTests: '🧪 Try These Tests Too'
    },
    relatedTests: {
        animalPersonality: 'Animal Personality',
        colorPersonality: 'Color Personality',
        mbtiLove: 'MBTI Love Match',
        rizzScore: 'Rizz Score Test'
    },
    share: {
        title: 'Share Your Playful Result',
        subtitle: 'Invite a friend to compare answer-score patterns 🎤',
        nativeShare: '📤 Share from this device',
        shareClose: 'Close share dialog',
        twitter: '𝕏 / Twitter',
        facebook: 'Facebook',
        copyForKakao: 'Copy for KakaoTalk',
        copyLink: 'Copy Link',
        copied: 'Copied to clipboard! 🎤',
        copyUnavailable: 'Clipboard access is unavailable. No link was copied.',
        shareUnavailable: 'Sharing did not complete or is unavailable. Nothing was shared.',
        compareWith: '🤝 Compare this just-for-fun result with a friend',
        inviteText: 'My playful K-POP role label is {type}! {emoji} Try the quiz too 👇',
        or: 'or'
    },
    engage: {
        result1: 'Main Vocal — vocal-role score',
        result2: 'Main Dancer — dance-role score',
        result3: 'Visual — styling-role score',
        result4: 'All-Rounder — versatility score'
    },
    about: {
        toggle: 'About the K-POP Role Quiz',
        heading1: 'How this playful quiz works',
        text1: 'Each of the 12 answers adds points to seven K-POP-inspired role labels. The result shows the label with the highest total and a relative score spectrum for this attempt.',
        tieRule: "If labels tie, a deterministic hash of this attempt's answer sequence chooses among only the tied labels. Repeating the same answers gives the same result, and the first label is not automatically favored.",
        heading2: 'What this result does not mean',
        text2: 'Role labels vary across groups and eras. This game does not test singing, dancing, appearance, age, personality, or professional potential. Results are not official member positions and DopaBrain is not affiliated with any artist or agency.'
    },
    accessibility: {
        questionAnnouncement: 'Question {current} of {total}: {question}',
        resultAnnouncement: 'Result: {type}. {detail}'
    },
    canvas: {
        topLabel: 'MY PLAYFUL K-POP ROLE LABEL',
        boundary1: "Based only on this attempt's 12 answer scores",
        boundary2: 'Not an official role, personality test, or talent assessment',
        cta: 'Try the playful role quiz 👇',
        hashtags: '#KPOPRoleQuiz #JustForFun'
    },
    game: { back: 'DopaBrain Home' }
};

class I18n {
    constructor() {
        this.translations = { en: STATIC_EN_FALLBACK };
        this.networkLoaded = new Set();
        this.supportedLanguages = ['ko', 'en', 'zh', 'hi', 'ru', 'ja', 'es', 'pt', 'id', 'tr', 'de', 'fr'];
        this.languageRequestId = 0;
        this.currentLang = this.detectLanguage();
    }

    detectLanguage() {
        const requestedLang = new URLSearchParams(window.location.search).get('lang');
        if (this.supportedLanguages.includes(requestedLang)) return requestedLang;
        if (requestedLang !== null) this.replaceLanguageQuery('en');
        return 'en';
    }

    replaceLanguageQuery(lang) {
        const url = new URL(window.location.href);
        if (lang === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', lang);
        window.history.replaceState(
            window.history.state,
            '',
            `${url.pathname}${url.search}${url.hash}`
        );
    }

    async loadTranslations(lang) {
        if (!this.supportedLanguages.includes(lang)) return false;
        if (this.networkLoaded.has(lang)) return true;
        try {
            const response = await fetch(`js/locales/${lang}.json`);
            if (!response.ok) throw new Error(`Locale request failed with ${response.status}`);
            const translations = await response.json();
            if (!translations || typeof translations !== 'object') throw new Error('Locale payload is invalid');
            this.translations[lang] = translations;
            this.networkLoaded.add(lang);
            return true;
        } catch (error) {
            return lang === 'en';
        }
    }

    async initialize() {
        return this.setLanguage(this.currentLang, false);
    }

    t(key) {
        const read = source => key.split('.').reduce((value, part) => value?.[part], source);
        const translated = read(this.translations[this.currentLang]);
        if (translated !== undefined && translated !== null) return translated;
        const fallback = read(STATIC_EN_FALLBACK);
        return fallback !== undefined && fallback !== null ? fallback : key;
    }

    async setLanguage(lang, updateQuery = true) {
        if (!this.supportedLanguages.includes(lang)) return false;
        const requestId = ++this.languageRequestId;
        const requestedLang = lang;
        let resolvedLang = requestedLang;
        const requestedLoaded = await this.loadTranslations(requestedLang);
        if (!requestedLoaded) {
            resolvedLang = 'en';
            await this.loadTranslations('en');
        }
        if (requestId !== this.languageRequestId) return false;

        this.currentLang = resolvedLang;
        if (updateQuery || resolvedLang !== requestedLang) this.replaceLanguageQuery(resolvedLang);
        this.updateUI();
        window.dispatchEvent(new CustomEvent('dopabrain:languagechange', {
            detail: {
                lang: resolvedLang,
                requestedLang,
                fallback: resolvedLang !== requestedLang
            }
        }));
        return resolvedLang === requestedLang;
    }

    updateUI() {
        document.documentElement.lang = this.currentLang;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            element.textContent = this.t(element.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            element.placeholder = this.t(element.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
            element.setAttribute('aria-label', this.t(element.getAttribute('data-i18n-aria-label')));
        });
        document.title = this.t('app.title');
        this.updatePageMetadata();
        this.updateLanguageControls();
        this.updateLocalizedLinks();
    }

    updatePageMetadata() {
        const canonicalUrl = 'https://dopabrain.com/kpop-position/';
        const setContent = (selector, value) => {
            const element = document.querySelector(selector);
            if (element) element.setAttribute('content', value);
        };
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.href = canonicalUrl;
        setContent('meta[name="description"]', this.t('app.description'));
        setContent('meta[property="og:title"]', this.t('app.title'));
        setContent('meta[property="og:description"]', this.t('app.ogDescription'));
        setContent('meta[property="og:url"]', canonicalUrl);
        setContent('meta[property="og:locale"]', this.currentLang === 'ko' ? 'ko_KR' : 'en_US');
        setContent('meta[name="twitter:title"]', this.t('app.title'));
        setContent('meta[name="twitter:description"]', this.t('app.ogDescription'));
        this.updateStructuredData(canonicalUrl);
    }

    updateStructuredData(canonicalUrl) {
        const updateJson = (id, mutate) => {
            const element = document.getElementById(id);
            if (!element) return;
            try {
                const value = JSON.parse(element.textContent);
                mutate(value);
                element.textContent = JSON.stringify(value);
            } catch (error) {
                console.warn(`Could not update ${id}:`, error);
            }
        };
        updateJson('app-schema', schema => {
            schema.name = this.t('intro.title');
            schema.description = this.t('app.description');
            schema.url = canonicalUrl;
            schema.inLanguage = this.currentLang;
        });
        updateJson('breadcrumb-schema', schema => {
            const items = schema.itemListElement;
            if (!Array.isArray(items) || !items.length) return;
            const current = items[items.length - 1];
            current.name = this.t('intro.title');
            current.item = canonicalUrl;
        });
    }

    updateLanguageControls() {
        document.querySelectorAll('.lang-option').forEach(option => {
            const active = option.getAttribute('data-lang') === this.currentLang;
            option.classList.toggle('active', active);
            option.setAttribute('aria-checked', String(active));
        });
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const labelKey = isLight ? 'app.switchToDark' : 'app.switchToLight';
            themeToggle.setAttribute('data-i18n-aria-label', labelKey);
            themeToggle.setAttribute('aria-label', this.t(labelKey));
        }
    }

    updateLocalizedLinks() {
        document.querySelectorAll('[data-preserve-lang]').forEach(link => {
            const url = new URL(link.getAttribute('href'), window.location.href);
            if (this.currentLang === 'en') url.searchParams.delete('lang');
            else url.searchParams.set('lang', this.currentLang);
            link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
        });
    }

    getCurrentLanguage() {
        return this.currentLang;
    }

    getLanguageName(lang) {
        const names = {
            ko: '한국어', en: 'English', zh: '中文', ja: '日本語',
            es: 'Español', pt: 'Português', id: 'Bahasa Indonesia',
            tr: 'Türkçe', de: 'Deutsch', fr: 'Français', hi: 'हिन्दी', ru: 'Русский'
        };
        return names[lang] || lang;
    }
}

const i18n = new I18n();
