// K-POP Position Test - Main Application
let currentQ = 0;
let allScores = [];
let resultData = null;
let resultIndex = -1;
let resultTotals = [];
let answerAdvanceTimer = null;
let answerPending = false;
let nextStartMode = 'manual';
let currentEntryMode = 'manual';

const introScreen = document.getElementById('intro-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const entryParams = new URLSearchParams(window.location.search);
const autoStartRequested = ['1', 'true', 'yes'].includes((entryParams.get('start') || '').toLowerCase());
const entrySurface = entryParams.get('surface') || entryParams.get('utm_content') || '';
let hasStarted = false;

function trackEvent(name, params = {}) {
    if (typeof gtag !== 'function') return;
    gtag('event', name, Object.assign({
        event_category: 'kpop_position',
        entry_mode: currentEntryMode,
        cta_surface: entrySurface || undefined
    }, params));
}

function announceStatus(message) {
    const status = document.getElementById('quiz-status');
    if (!status || !message) return;
    status.textContent = '';
    requestAnimationFrame(() => {
        status.textContent = message;
    });
}

// Theme toggle
(function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeButton();
        themeToggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeButton();
        });
    }
})();

function updateThemeButton() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const labelKey = isLight ? 'app.switchToDark' : 'app.switchToLight';
    const translatedLabel = typeof i18n !== 'undefined' ? i18n.t(labelKey) : labelKey;
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    themeToggle.setAttribute('data-i18n-aria-label', labelKey);
    if (translatedLabel !== labelKey) themeToggle.setAttribute('aria-label', translatedLabel);
}

// Initialize i18n
(async function initI18n() {
    try {
        await i18n.initialize();
        applyQuizLanguage(i18n.getCurrentLanguage());
        updateThemeButton();
        const langToggle = document.getElementById('lang-toggle');
        const langMenu = document.getElementById('lang-menu');
        const langOptions = document.querySelectorAll('.lang-option');
        const setLanguageMenuOpen = (open) => {
            langMenu?.classList.toggle('hidden', !open);
            langToggle?.setAttribute('aria-expanded', String(open));
        };
        langToggle?.addEventListener('click', () => {
            const willOpen = langMenu?.classList.contains('hidden');
            setLanguageMenuOpen(Boolean(willOpen));
            if (willOpen) document.querySelector('.lang-option.active')?.focus();
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) setLanguageMenuOpen(false);
        });
        langMenu?.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setLanguageMenuOpen(false);
                langToggle?.focus();
            }
        });
        langOptions.forEach(opt => {
            opt.addEventListener('click', async () => {
                await i18n.setLanguage(opt.getAttribute('data-lang'));
                setLanguageMenuOpen(false);
                langToggle?.focus();
            });
        });
    } catch (e) {
        console.warn('i18n init failed:', e);
    } finally {
        const loader = document.getElementById('app-loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 300);
        }
        if (autoStartRequested) {
            setTimeout(() => startTest('auto_start'), 350);
        }
    }
})();

window.addEventListener('dopabrain:languagechange', event => {
    applyQuizLanguage(event.detail?.lang || 'en');
    updateThemeButton();
    if (questionScreen.classList.contains('active') && !answerPending) {
        showQuestion({ focusQuestion: false });
    }
    if (loadingScreen.classList.contains('active')) {
        document.getElementById('loading-text').textContent = i18n.t('loading.text');
    }
    if (resultScreen.classList.contains('active') && resultIndex >= 0) {
        resultData = RESULTS[resultIndex];
        renderResultContent(resultTotals, { focusResult: false });
    }
});

function show(screen) {
    [introScreen, questionScreen, loadingScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Start
document.getElementById('btn-start').addEventListener('click', () => startTest(nextStartMode));

function startTest(source = 'manual') {
    if (hasStarted) return;
    if (answerAdvanceTimer !== null) clearTimeout(answerAdvanceTimer);
    answerAdvanceTimer = null;
    answerPending = false;
    hasStarted = true;
    currentEntryMode = ['auto_start', 'retry'].includes(source) ? source : 'manual';
    nextStartMode = 'manual';
    currentQ = 0;
    allScores = [];
    resultData = null;
    resultIndex = -1;
    resultTotals = [];
    show(questionScreen);
    showQuestion();
    if (source === 'auto_start') {
        trackEvent('kpop_position_auto_start', { event_label: entrySurface || 'direct_auto_start' });
    }
    trackEvent('test_start', { event_label: source });
    trackEvent('engagement', { event_label: 'first_interaction' });
}

function showQuestion({ focusQuestion = true } = {}) {
    if (!QUESTIONS || !QUESTIONS[currentQ]) return;
    const q = QUESTIONS[currentQ];
    const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${currentQ + 1} / ${QUESTIONS.length}`;
    const questionText = document.getElementById('q-text');
    questionText.textContent = q.text;

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';

    // Shuffle options
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    shuffled.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span class="opt-text">${opt.text}</span>`;
        btn.addEventListener('click', () => selectOption(btn, opt.scores));
        optionsEl.appendChild(btn);
    });

    const card = document.querySelector('.question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'slideIn 0.4s ease';

    const announcement = i18n.t('accessibility.questionAnnouncement')
        .replace('{current}', String(currentQ + 1))
        .replace('{total}', String(QUESTIONS.length))
        .replace('{question}', q.text);
    announceStatus(announcement);
    if (focusQuestion) requestAnimationFrame(() => questionText.focus());
}

function selectOption(btn, scores) {
    if (answerPending) return;
    answerPending = true;
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    btn.classList.add('selected');
    allScores.push(scores);

    answerAdvanceTimer = window.setTimeout(() => {
        answerAdvanceTimer = null;
        answerPending = false;
        currentQ++;
        if (currentQ < QUESTIONS.length) {
            showQuestion();
        } else {
            showLoading();
        }
    }, 400);
}

function showLoading() {
    show(loadingScreen);
    const bar = document.getElementById('loading-fill');
    const text = document.getElementById('loading-text');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
            progress = 100;
            bar.style.width = '100%';
            clearInterval(interval);
            setTimeout(() => showResult(), 500);
        } else {
            bar.style.width = progress + '%';
        }
        text.textContent = i18n?.t('loading.text') || 'Comparing your answer scores...';
    }, 400);
}

function selectResultIndex(totals) {
    const maxScore = Math.max(...totals);
    const tiedIndices = totals
        .map((score, index) => ({ score, index }))
        .filter(item => item.score === maxScore)
        .map(item => item.index);
    if (tiedIndices.length === 1) return { index: tiedIndices[0], tiedCount: 1 };

    const signature = allScores.map(scores => scores.join(',')).join('|');
    let hash = 2166136261;
    for (let index = 0; index < signature.length; index++) {
        hash ^= signature.charCodeAt(index);
        hash = Math.imul(hash, 16777619) >>> 0;
    }
    return {
        index: tiedIndices[hash % tiedIndices.length],
        tiedCount: tiedIndices.length
    };
}

function showResult() {
    // Calculate total scores for each position
    const totals = [0, 0, 0, 0, 0, 0, 0];
    allScores.forEach(s => {
        s.forEach((val, i) => { totals[i] += val; });
    });

    // Choose the highest score. A deterministic answer hash resolves only exact ties.
    const selection = selectResultIndex(totals);
    resultIndex = selection.index;

    if (!RESULTS || !RESULTS[resultIndex]) return;
    resultData = RESULTS[resultIndex];
    resultTotals = totals;
    show(resultScreen);
    trackEvent('result_view', {
        event_label: resultData.titleEn,
        result_type: resultData.titleEn || resultData.title
    });
    trackEvent('kpop_position_result_view', {
        result_type: resultData.titleEn || resultData.title,
        tied_labels: selection.tiedCount
    });

    renderResultContent(totals);
    trackEvent('test_complete', { event_label: resultData.titleEn });
}

function renderResultContent(totals, { focusResult = true } = {}) {
    if (!resultData) return;

    // Update result color
    document.documentElement.style.setProperty('--result-color', resultData.color);

    // Result display
    document.getElementById('result-emoji').textContent = resultData.emoji;
    const resultTitle = document.getElementById('result-title');
    resultTitle.textContent = resultData.title;
    document.getElementById('result-en').textContent = i18n.getCurrentLanguage() === 'ko'
        ? resultData.titleEn
        : i18n.t('result.roleLabel');
    document.getElementById('result-subtitle').textContent = i18n.t('result.subtitle');
    document.getElementById('result-desc').textContent = i18n.t('result.descriptionTemplate')
        .replace('{type}', resultData.title);

    // Spectrum bars
    renderSpectrumBars(totals);

    const announcement = i18n.t('accessibility.resultAnnouncement')
        .replace('{type}', resultData.title)
        .replace('{detail}', i18n.t('boundary.result'));
    announceStatus(announcement);
    if (focusResult) requestAnimationFrame(() => resultTitle.focus());
}

function renderSpectrumBars(totals) {
    const container = document.getElementById('spectrum-bars');
    container.innerHTML = '';
    const maxTotal = Math.max(...totals);

    POS_LABELS.forEach((label, i) => {
        const pct = maxTotal > 0 ? Math.round((totals[i] / maxTotal) * 100) : 0;
        const isActive = i === resultIndex;
        const bar = document.createElement('div');
        bar.className = 'spectrum-bar' + (isActive ? ' active' : '');
        bar.setAttribute('role', 'img');
        bar.setAttribute('aria-label', `${label}: ${pct}%`);
        bar.innerHTML = `
            <div class="bar-label" title="${label}" aria-hidden="true">${RESULTS[i].emoji}</div>
            <div class="bar-track">
                <div class="bar-fill" style="height:${pct}%;background:${RESULTS[i].color};transition-delay:${i * 0.1}s"></div>
            </div>
            <div class="bar-pct">${pct}%</div>
        `;
        container.appendChild(bar);
    });

    setTimeout(() => {
        container.querySelectorAll('.bar-fill').forEach(f => f.classList.add('animated'));
    }, 100);
}

// Share - 향상된 버전
function getShareText() {
    if (!resultData) return { title: '', text: '', url: '' };
    const inviteTemplate = i18n.t('share.inviteText');
    const title = inviteTemplate && inviteTemplate !== 'share.inviteText'
        ? inviteTemplate.replace('{type}', resultData.title).replace('{emoji}', resultData.emoji)
        : `My playful K-POP role label is ${resultData.titleEn} ${resultData.emoji}`;
    const currentLang = typeof i18n !== 'undefined' ? i18n.getCurrentLanguage() : 'en';
    const shareUrl = `https://dopabrain.com/kpop-position/${currentLang !== 'en' ? '?lang=' + currentLang : ''}`;
    const fullText = `${title}\n${i18n.t('boundary.result')}\n\n${shareUrl}`;
    return {
        title,
        shortText: `🎤 ${resultData.title} ${resultData.emoji}`,
        fullText,
        url: shareUrl
    };
}

let shareReturnFocus = null;

function shareResult() {
    const shareModal = document.getElementById('share-modal');
    setShareFeedback('');
    shareReturnFocus = document.activeElement;
    shareModal.classList.remove('hidden');
    shareModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => document.getElementById('share-close')?.focus());
    trackEvent('share_modal_open');
}

function closeShareModal() {
    const shareModal = document.getElementById('share-modal');
    if (!shareModal || shareModal.classList.contains('hidden')) return;
    shareModal.classList.add('hidden');
    shareModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (shareReturnFocus instanceof HTMLElement && shareReturnFocus.isConnected) {
        shareReturnFocus.focus();
    }
    shareReturnFocus = null;
}

function setShareFeedback(messageOrKey) {
    const feedback = document.getElementById('share-feedback');
    if (!feedback) return;
    if (!messageOrKey) {
        feedback.textContent = '';
        return;
    }
    const translated = i18n.t(messageOrKey);
    feedback.textContent = translated === messageOrKey ? messageOrKey : translated;
}

function openShareIntent(url, method) {
    const popup = window.open('', '_blank', 'width=550,height=420');
    if (!popup) {
        setShareFeedback('share.shareUnavailable');
        return false;
    }
    try {
        popup.opener = null;
        popup.location.href = url;
    } catch (error) {
        popup.close?.();
        setShareFeedback('share.shareUnavailable');
        return false;
    }
    setShareFeedback('');
    trackEvent('share', { method });
    return true;
}

async function copyShareText(text, shareSource, shareTarget) {
    if (!navigator.clipboard || typeof navigator.clipboard.writeText !== 'function') {
        setShareFeedback('share.copyUnavailable');
        return false;
    }
    try {
        await navigator.clipboard.writeText(text);
        setShareFeedback('share.copied');
        trackEvent('share', {
            method: 'copy_link',
            share_source: shareSource,
            share_target: shareTarget
        });
        return true;
    } catch (error) {
        setShareFeedback('share.copyUnavailable');
        return false;
    }
}

// 공유 버튼 이벤트 (resultData가 null일 수 있으므로 클릭 시점에 getShareText 호출)
function setupShareButtons() {
    const shareModal = document.getElementById('share-modal');
    const shareClose = document.getElementById('share-close');

    // 모달 닫기
    shareClose?.addEventListener('click', closeShareModal);
    shareModal?.addEventListener('click', (e) => {
        if (e.target === shareModal) closeShareModal();
    });
    shareModal?.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            event.preventDefault();
            closeShareModal();
            return;
        }
        if (event.key !== 'Tab') return;
        const focusable = [...shareModal.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )].filter(element => element.getAttribute('aria-hidden') !== 'true');
        if (!focusable.length) {
            event.preventDefault();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    // 트위터 공유
    document.getElementById('share-twitter')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        const text = encodeURIComponent(shareData.title);
        const url = `https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareData.url)}`;
        openShareIntent(url, 'twitter');
    });

    // 페이스북 공유
    document.getElementById('share-facebook')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        openShareIntent(url, 'facebook');
    });

    // 카카오톡 공유 (URL만 공유)
    document.getElementById('share-kakaotalk')?.addEventListener('click', async () => {
        if (!resultData) return;
        const shareData = getShareText();
        await copyShareText(shareData.url, 'kakao_button', 'kakaotalk');
    });

    // 링크 복사
    document.getElementById('share-copy')?.addEventListener('click', async () => {
        if (!resultData) return;
        const shareData = getShareText();
        await copyShareText(
            `${shareData.title}\n${shareData.url}`,
            'copy_button',
            'clipboard'
        );
    });

    // 네이티브 공유
    document.getElementById('share-native')?.addEventListener('click', async () => {
        if (!resultData) return;
        const shareData = getShareText();
        if (typeof navigator.share !== 'function') {
            setShareFeedback('share.shareUnavailable');
            return;
        }
        try {
            await navigator.share({
                title: shareData.title,
                text: shareData.fullText,
                url: shareData.url
            });
            setShareFeedback('');
            trackEvent('share', { method: 'native' });
        } catch (error) {
            setShareFeedback('share.shareUnavailable');
        }
    });
}

document.getElementById('btn-share').addEventListener('click', shareResult);

// Save image
document.getElementById('btn-save-image').addEventListener('click', generateShareImage);
function generateShareImage() {
    if (!resultData) return;
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');
    const w = 1080, h = 1080;

    canvas.width = w;
    canvas.height = h;

    // Background gradient (K-POP style - vibrant)
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, resultData.colorEnd || resultData.color);
    grad.addColorStop(1, resultData.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative stars (twinkling effect)
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 40; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 1 + Math.random() * 5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    // Spotlight effect (stage light)
    ctx.globalAlpha = 0.08;
    const spotGrad = ctx.createRadialGradient(w/2, 200, 0, w/2, 200, 500);
    spotGrad.addColorStop(0, '#fff');
    spotGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    // Top label
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '600 36px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(i18n.t('canvas.topLabel'), w / 2, 120);

    // Emoji (stage presence)
    ctx.font = '130px sans-serif';
    ctx.fillText(resultData.emoji, w / 2, 300);

    // Title (position name - bold)
    ctx.fillStyle = '#fff';
    ctx.font = '900 80px -apple-system, sans-serif';
    ctx.fillText(resultData.title, w / 2, 420);

    // English title (subtitle)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '400 32px -apple-system, sans-serif';
    ctx.fillText(resultData.titleEn, w / 2, 480);

    // Result boundary
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '400 26px -apple-system, sans-serif';
    ctx.fillText(i18n.t('canvas.boundary1'), w / 2, 560);
    ctx.fillText(i18n.t('canvas.boundary2'), w / 2, 610);

    // Divider line (stage lights)
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, 730);
    ctx.lineTo(w * 0.9, 730);
    ctx.stroke();

    // CTA (call to action)
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '400 28px -apple-system, sans-serif';
    ctx.fillText(i18n.t('canvas.cta'), w / 2, 810);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '400 24px -apple-system, sans-serif';
    ctx.fillText('dopabrain.com/kpop-position/', w / 2, 860);

    // Hashtags
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText(i18n.t('canvas.hashtags'), w / 2, 920);

    // Branding (DopaBrain)
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText('🎤 DopaBrain', w / 2, 1020);

    // Download
    const link = document.createElement('a');
    link.download = `KPOP_${resultData.title}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    trackEvent('save_image');
}

// Retry
document.getElementById('btn-retry').addEventListener('click', () => {
    const previousResult = resultData?.titleEn || undefined;
    closeShareModal();
    if (answerAdvanceTimer !== null) clearTimeout(answerAdvanceTimer);
    answerAdvanceTimer = null;
    answerPending = false;
    hasStarted = false;
    currentQ = 0;
    allScores = [];
    resultData = null;
    resultIndex = -1;
    resultTotals = [];
    currentEntryMode = 'retry';
    nextStartMode = 'retry';
    show(introScreen);
    trackEvent('test_retry', { previous_result: previousResult });
    document.getElementById('btn-start')?.focus();
});

// 공유 버튼 초기화
setupShareButtons();

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
