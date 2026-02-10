// K-POP Position Test - Main Application
let currentQ = 0;
let allScores = [];
let resultData = null;
let resultIndex = -1;

const introScreen = document.getElementById('intro-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const adOverlay = document.getElementById('ad-overlay');

// Initialize i18n
(async function initI18n() {
    await i18n.loadTranslations(i18n.getCurrentLanguage());
    i18n.updateUI();
    const langToggle = document.getElementById('lang-toggle');
    const langMenu = document.getElementById('lang-menu');
    const langOptions = document.querySelectorAll('.lang-option');
    document.querySelector(`[data-lang="${i18n.getCurrentLanguage()}"]`)?.classList.add('active');
    langToggle?.addEventListener('click', () => langMenu.classList.toggle('hidden'));
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) langMenu?.classList.add('hidden');
    });
    langOptions.forEach(opt => {
        opt.addEventListener('click', async () => {
            await i18n.setLanguage(opt.getAttribute('data-lang'));
            langOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            langMenu.classList.add('hidden');
        });
    });

    // Hide app loader
    const loader = document.getElementById('app-loader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => loader.remove(), 300);
    }
})();

function show(screen) {
    [introScreen, questionScreen, loadingScreen, resultScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
}

// Test count
function getTestCount() {
    return parseInt(localStorage.getItem('kpop_pos_test_count') || '0');
}
function incrementTestCount() {
    const c = getTestCount() + 1;
    localStorage.setItem('kpop_pos_test_count', c.toString());
    updateTestCount();
}
function updateTestCount() {
    const el = document.getElementById('test-count');
    const c = getTestCount();
    if (c > 0) {
        el.innerHTML = `<span class="count">${c.toLocaleString()}</span>${i18n?.t('premium.participantsCount') || 'have already participated!'} 🎤`;
    }
}
updateTestCount();

// Start
document.getElementById('btn-start').addEventListener('click', () => {
    currentQ = 0;
    allScores = [];
    show(questionScreen);
    showQuestion();
    if (typeof gtag === 'function') gtag('event', 'test_start', { event_category: 'kpop_position' });
});

function showQuestion() {
    const q = QUESTIONS[currentQ];
    const progress = ((currentQ + 1) / QUESTIONS.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${currentQ + 1} / ${QUESTIONS.length}`;
    document.getElementById('q-text').textContent = q.text;

    const optionsEl = document.getElementById('q-options');
    optionsEl.innerHTML = '';

    // Shuffle options
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    shuffled.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `<span class="opt-emoji">${opt.emoji}</span><span class="opt-text">${opt.text}</span>`;
        btn.addEventListener('click', () => selectOption(btn, opt.scores));
        optionsEl.appendChild(btn);
    });

    const card = document.querySelector('.question-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.animation = 'slideIn 0.4s ease';
}

function selectOption(btn, scores) {
    document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
    btn.classList.add('selected');
    allScores.push(scores);

    setTimeout(() => {
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

    const messages = [
        i18n?.t('premium.loadingMessages.msg1') || 'Analyzing position data...',
        i18n?.t('premium.loadingMessages.msg2') || 'Matching idol DNA...',
        i18n?.t('premium.loadingMessages.msg3') || 'Calculating stage compatibility...',
        i18n?.t('premium.loadingMessages.msg4') || 'Confirming your K-POP position...',
        i18n?.t('premium.loadingMessages.msg5') || 'Finding representative idols...'
    ];

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
        const msgIdx = Math.min(Math.floor(progress / 20), messages.length - 1);
        text.textContent = messages[msgIdx];
    }, 400);
}

function showResult() {
    // Calculate total scores for each position
    const totals = [0, 0, 0, 0, 0, 0, 0];
    allScores.forEach(s => {
        s.forEach((val, i) => { totals[i] += val; });
    });

    // Find dominant position
    let maxScore = 0;
    resultIndex = 0;
    totals.forEach((s, i) => {
        if (s > maxScore) { maxScore = s; resultIndex = i; }
    });

    resultData = RESULTS[resultIndex];
    show(resultScreen);

    // Update result color
    document.documentElement.style.setProperty('--result-color', resultData.color);

    // Result display
    document.getElementById('result-emoji').textContent = resultData.emoji;
    document.getElementById('result-title').textContent = resultData.title;
    document.getElementById('result-en').textContent = resultData.titleEn;
    document.getElementById('result-subtitle').textContent = resultData.subtitle;
    document.getElementById('result-desc').textContent = resultData.desc;

    // Traits
    const traitsEl = document.getElementById('result-traits');
    traitsEl.innerHTML = resultData.traits.map(t => `<li>${t}</li>`).join('');

    // Idol list
    const idolsEl = document.getElementById('result-idols');
    idolsEl.innerHTML = resultData.idols.map(idol =>
        `<div class="idol-chip">
            <span class="idol-name">${idol.name}</span>
            <span class="idol-group">${idol.group}</span>
        </div>`
    ).join('');

    // Real life
    document.getElementById('result-reallife').textContent = resultData.realLife;

    // Best match
    document.getElementById('best-match-emoji').textContent = resultData.bestMatchEmoji;
    document.getElementById('best-match-name').textContent = resultData.bestMatch;
    document.getElementById('best-match-reason').textContent = resultData.bestMatchReason;

    // Tip
    document.getElementById('result-tip').textContent = resultData.tip;

    // Spectrum bars
    renderSpectrumBars(totals);

    // Group matching
    renderGroupMatch();

    incrementTestCount();
    if (typeof gtag === 'function') gtag('event', 'test_complete', { event_category: 'kpop_position', event_label: resultData.title });
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
        bar.innerHTML = `
            <div class="bar-label">${RESULTS[i].emoji}</div>
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

function renderGroupMatch() {
    const container = document.getElementById('group-match');
    container.innerHTML = '';

    // Find matching members from each group
    const myPosition = POS_LABELS[resultIndex];
    KPOP_GROUPS.forEach(group => {
        const match = group.members.find(m => m.position === myPosition);
        if (match) {
            const chip = document.createElement('div');
            chip.className = 'group-chip';
            chip.innerHTML = `
                <span class="group-name">${group.name}</span>
                <span class="group-member">${match.name} ${match.emoji}</span>
            `;
            container.appendChild(chip);
        }
    });
}

// Premium
document.getElementById('btn-premium').addEventListener('click', () => {
    adOverlay.classList.add('active');
    let countdown = 5;
    const countEl = document.getElementById('ad-countdown');
    const closeBtn = document.getElementById('ad-close');
    countEl.textContent = countdown;
    closeBtn.style.display = 'none';

    const timer = setInterval(() => {
        countdown--;
        countEl.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(timer);
            closeBtn.style.display = 'block';
        }
    }, 1000);

    if (typeof gtag === 'function') gtag('event', 'premium_click', { event_category: 'kpop_position' });
});

document.getElementById('ad-close').addEventListener('click', () => {
    adOverlay.classList.remove('active');
    displayPremiumContent();
});

function displayPremiumContent() {
    const premiumCard = document.getElementById('premium-content');
    premiumCard.style.display = 'block';

    const advice = PREMIUM_ADVICE[resultIndex];

    // Compatibility chart
    let compatHTML = `<div class="detail-section"><h3>${i18n?.t('premium.compatibilityChart') || '💞 Position Compatibility Chart'}</h3><div class="compat-grid">`;
    const myCompat = COMPATIBILITY[resultIndex];
    const sortedCompat = POS_LABELS.map((label, i) => ({ label, score: myCompat[i], result: RESULTS[i] }))
        .sort((a, b) => b.score - a.score);

    sortedCompat.forEach(c => {
        const level = c.score >= 90 ? (i18n?.t('premium.perfectMatch') || 'Perfect Match') :
                      c.score >= 75 ? (i18n?.t('premium.good') || 'Good') :
                      c.score >= 60 ? (i18n?.t('premium.normal') || 'Normal') :
                      (i18n?.t('premium.needsEffort') || 'Needs Effort');
        const levelClass = c.score >= 90 ? 'perfect' : c.score >= 75 ? 'good' : c.score >= 60 ? 'normal' : 'low';
        compatHTML += `<div class="compat-item ${levelClass}">
            <span class="compat-emoji">${c.result.emoji}</span>
            <span class="compat-label">${c.label}</span>
            <div class="compat-bar-bg"><div class="compat-bar" style="width:${c.score}%;background:${c.result.color}"></div></div>
            <span class="compat-score">${c.score}%</span>
            <span class="compat-level">${level}</span>
        </div>`;
    });
    compatHTML += '</div></div>';

    // Training tips
    let tipsHTML = `<div class="detail-section"><h3>${i18n?.t('premium.trainingTips') || '🎯 Training Tips'}</h3><ul>`;
    advice.trainingTips.forEach(t => { tipsHTML += `<li>${t}</li>`; });
    tipsHTML += '</ul></div>';

    // Career paths
    let careerHTML = `<div class="detail-section"><h3>${i18n?.t('premium.careerPaths') || '💼 Recommended Careers'}</h3><div class="career-chips">`;
    advice.careerPaths.forEach(c => { careerHTML += `<span class="career-chip">${c}</span>`; });
    careerHTML += '</div></div>';

    // Weekly routine
    let routineHTML = `<div class="detail-section"><h3>${i18n?.t('premium.weeklyRoutine') || '📅 Weekly Training Routine'}</h3><ul>`;
    advice.weeklyRoutine.forEach(r => { routineHTML += `<li>${r}</li>`; });
    routineHTML += '</ul></div>';

    // Idol advice
    let idolAdviceHTML = `<div class="detail-section"><h3>${resultData.emoji} ${i18n?.t('premium.idolAdvicePrefix') || "Senior Idol's Advice"}</h3><p class="idol-advice">"${advice.idolAdvice}"</p></div>`;

    premiumCard.innerHTML = compatHTML + tipsHTML + careerHTML + routineHTML + idolAdviceHTML;
    premiumCard.scrollIntoView({ behavior: 'smooth' });

    if (typeof gtag === 'function') gtag('event', 'premium_view', { event_category: 'kpop_position' });
}

// Share - 향상된 버전
function getShareText() {
    const fullTextTemplate = i18n.t('premium.shareText') || `🎤 My K-POP Position: {emoji} {title}\n{subtitle}\n\nRepresentative Idols: {idols}\n\nWhat's your position? 👇\nhttps://dopabrain.com/kpop-position/\n\n#KPOPPosition #IdolTest #KPOPTest`;
    const fullText = fullTextTemplate
        .replace('{emoji}', resultData.emoji)
        .replace('{title}', resultData.title)
        .replace('{subtitle}', resultData.subtitle)
        .replace('{idols}', resultData.idols.slice(0, 3).map(i => i.name).join(', '));
    return {
        title: i18n.t('share.inviteText').replace('{type}', resultData.title).replace('{emoji}', resultData.emoji),
        shortText: `🎤 ${resultData.title} ${resultData.emoji}`,
        fullText: fullText,
        url: 'https://dopabrain.com/kpop-position/'
    };
}

function shareResult() {
    const shareModal = document.getElementById('share-modal');
    shareModal.classList.remove('hidden');
    if (typeof gtag === 'function') gtag('event', 'share_modal_open', { event_category: 'kpop_position' });
}

// 공유 버튼 이벤트 (resultData가 null일 수 있으므로 클릭 시점에 getShareText 호출)
function setupShareButtons() {
    const shareModal = document.getElementById('share-modal');
    const shareClose = document.getElementById('share-close');

    // 모달 닫기
    shareClose?.addEventListener('click', () => {
        shareModal?.classList.add('hidden');
    });
    shareModal?.addEventListener('click', (e) => {
        if (e.target === shareModal) shareModal.classList.add('hidden');
    });

    // 트위터 공유
    document.getElementById('share-twitter')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        const text = encodeURIComponent(shareData.title);
        const url = `https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareData.url)}`;
        window.open(url, '_blank', 'width=550,height=420');
        if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position', method: 'twitter' });
    });

    // 페이스북 공유
    document.getElementById('share-facebook')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
        window.open(url, '_blank', 'width=550,height=420');
        if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position', method: 'facebook' });
    });

    // 카카오톡 공유 (URL만 공유)
    document.getElementById('share-kakaotalk')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        navigator.clipboard.writeText(shareData.url).then(() => {
            alert(i18n.t('share.copied'));
        }).catch(() => {});
        if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position', method: 'kakaotalk' });
    });

    // 링크 복사
    document.getElementById('share-copy')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        navigator.clipboard.writeText(`${shareData.title}\n${shareData.url}`).then(() => {
            alert(i18n.t('share.copied'));
        }).catch(() => {});
        if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position', method: 'copy' });
    });

    // 네이티브 공유
    document.getElementById('share-native')?.addEventListener('click', () => {
        if (!resultData) return;
        const shareData = getShareText();
        if (navigator.share) {
            navigator.share({
                title: shareData.title,
                text: shareData.fullText,
                url: shareData.url
            }).then(() => {
                if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position', method: 'native' });
            }).catch(() => {});
        } else {
            alert(i18n.t('share.copied'));
        }
    });
}

document.getElementById('btn-share').addEventListener('click', shareResult);

// Save image
document.getElementById('btn-save-image').addEventListener('click', generateShareImage);
function generateShareImage() {
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
    ctx.fillText(i18n?.t('premium.myPosition') || 'My K-POP Position is', w / 2, 120);

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

    // Position subtitle
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '400 30px -apple-system, sans-serif';
    ctx.fillText(resultData.subtitle, w / 2, 540);

    // Idol references (top 3)
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '400 26px -apple-system, sans-serif';
    const topIdols = resultData.idols.slice(0, 3).map(i => i.name).join(' · ');
    ctx.fillText((i18n?.t('premium.topIdolLabel') || 'Representative Idols: ') + topIdols, w / 2, 610);

    // Best match
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = 'bold 28px -apple-system, sans-serif';
    ctx.fillText(`${i18n?.t('premium.bestMatchLabel') || '💕 Perfect Match: '} ${resultData.bestMatchEmoji} ${resultData.bestMatch}`, w / 2, 680);

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
    ctx.fillText(i18n?.t('premium.whatPosition') || "What's your position? 👇", w / 2, 810);
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '400 24px -apple-system, sans-serif';
    ctx.fillText(i18n?.t('premium.shareTitle') || 'K-POP Position Test', w / 2, 860);

    // Hashtags
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText(i18n?.t('premium.hashtags') || '#KPOPPosition #Idol #KPOPTest', w / 2, 920);

    // Branding (DopaBrain)
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText(i18n?.t('premium.brandName') || '🎤 DopaBrain', w / 2, 1020);

    // Download
    const link = document.createElement('a');
    link.download = `KPOP_${resultData.title}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (typeof gtag === 'function') gtag('event', 'save_image', { event_category: 'kpop_position' });
}

// Retry
document.getElementById('btn-retry').addEventListener('click', () => {
    const premiumContent = document.getElementById('premium-content');
    premiumContent.style.display = 'none';
    premiumContent.innerHTML = '';
    show(introScreen);
    updateTestCount();
});

// 공유 버튼 초기화
setupShareButtons();

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
