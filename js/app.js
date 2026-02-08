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
    if (c > 0) el.textContent = `${c.toLocaleString()}명이 참여했어요!`;
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
    const progress = ((currentQ) / QUESTIONS.length) * 100;
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
        '포지션 데이터를 분석 중...',
        '아이돌 DNA를 매칭 중...',
        '무대 적합도를 계산 중...',
        '당신의 K-POP 포지션 확정 중...',
        '대표 아이돌을 찾는 중...'
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
    let compatHTML = '<div class="detail-section"><h3>💞 포지션 궁합표</h3><div class="compat-grid">';
    const myCompat = COMPATIBILITY[resultIndex];
    const sortedCompat = POS_LABELS.map((label, i) => ({ label, score: myCompat[i], result: RESULTS[i] }))
        .sort((a, b) => b.score - a.score);

    sortedCompat.forEach(c => {
        const level = c.score >= 90 ? '천생연분' : c.score >= 75 ? '좋음' : c.score >= 60 ? '보통' : '노력필요';
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
    let tipsHTML = '<div class="detail-section"><h3>🎯 트레이닝 팁</h3><ul>';
    advice.trainingTips.forEach(t => { tipsHTML += `<li>${t}</li>`; });
    tipsHTML += '</ul></div>';

    // Career paths
    let careerHTML = '<div class="detail-section"><h3>💼 추천 직업/분야</h3><div class="career-chips">';
    advice.careerPaths.forEach(c => { careerHTML += `<span class="career-chip">${c}</span>`; });
    careerHTML += '</div></div>';

    // Weekly routine
    let routineHTML = '<div class="detail-section"><h3>📅 주간 트레이닝 루틴</h3><ul>';
    advice.weeklyRoutine.forEach(r => { routineHTML += `<li>${r}</li>`; });
    routineHTML += '</ul></div>';

    // Idol advice
    let idolAdviceHTML = `<div class="detail-section"><h3>${resultData.emoji} 선배 아이돌의 조언</h3><p class="idol-advice">"${advice.idolAdvice}"</p></div>`;

    premiumCard.innerHTML = compatHTML + tipsHTML + careerHTML + routineHTML + idolAdviceHTML;
    premiumCard.scrollIntoView({ behavior: 'smooth' });

    if (typeof gtag === 'function') gtag('event', 'premium_view', { event_category: 'kpop_position' });
}

// Share
document.getElementById('btn-share').addEventListener('click', shareResult);
function shareResult() {
    const text = `🎤 나의 K-POP 포지션: ${resultData.emoji} ${resultData.title}\n${resultData.subtitle}\n\n대표 아이돌: ${resultData.idols.slice(0, 3).map(i => i.name).join(', ')}\n\n너는 어떤 포지션? 👇\nhttps://swp1234.github.io/kpop-position/\n\n#KPOP포지션 #아이돌테스트 #KPOPPosition`;
    if (navigator.share) {
        navigator.share({ title: 'K-POP 포지션 테스트', text, url: 'https://swp1234.github.io/kpop-position/' }).catch(() => {});
    } else {
        navigator.clipboard.writeText(text).then(() => alert('결과가 복사되었습니다!')).catch(() => {});
    }
    if (typeof gtag === 'function') gtag('event', 'share', { event_category: 'kpop_position' });
}

// Save image
document.getElementById('btn-save-image').addEventListener('click', generateShareImage);
function generateShareImage() {
    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');
    const w = 1080, h = 1080;

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, resultData.colorEnd);
    grad.addColorStop(1, resultData.color);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Decorative stars
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const size = 2 + Math.random() * 4;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
    }

    // Spotlight effect
    ctx.globalAlpha = 0.06;
    const spotGrad = ctx.createRadialGradient(w/2, 300, 0, w/2, 300, 400);
    spotGrad.addColorStop(0, '#fff');
    spotGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = spotGrad;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    // Top label
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '600 32px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('나의 K-POP 포지션은', w / 2, 140);

    // Emoji
    ctx.font = '120px sans-serif';
    ctx.fillText(resultData.emoji, w / 2, 310);

    // Title
    ctx.fillStyle = '#fff';
    ctx.font = '900 72px -apple-system, sans-serif';
    ctx.fillText(resultData.title, w / 2, 430);

    // English title
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '400 30px -apple-system, sans-serif';
    ctx.fillText(resultData.titleEn, w / 2, 480);

    // Subtitle
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = '400 28px -apple-system, sans-serif';
    ctx.fillText(resultData.subtitle, w / 2, 560);

    // Idol names
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = '400 26px -apple-system, sans-serif';
    const idolNames = resultData.idols.slice(0, 4).map(i => `${i.name}(${i.group})`).join(' / ');
    ctx.fillText(idolNames, w / 2, 640);

    // Best match
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '400 26px -apple-system, sans-serif';
    ctx.fillText(`Best Match: ${resultData.bestMatchEmoji} ${resultData.bestMatch}`, w / 2, 720);

    // Divider line
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w * 0.2, 780);
    ctx.lineTo(w * 0.8, 780);
    ctx.stroke();

    // CTA
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '400 26px -apple-system, sans-serif';
    ctx.fillText('너는 어떤 포지션? 👉 K-POP 포지션 테스트', w / 2, 850);

    // Hashtags
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText('#KPOP포지션 #아이돌테스트 #KPOPPosition', w / 2, 910);

    // Branding
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = '400 22px -apple-system, sans-serif';
    ctx.fillText('FireTools', w / 2, 1020);

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

// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
}
