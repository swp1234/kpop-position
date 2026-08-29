// K-POP Role Quiz data
// Seven playful score labels: vocal, leader, rapper, dancer, visual, maknae, all-rounder.

const QUIZ_DATA = {
    ko: {
        labels: ['메인보컬', '리더', '메인래퍼', '메인댄서', '비주얼', '막내', '올라운더'],
        questions: [
    {
        text: "친구들과 노래방에 갔을 때 나는?",
        options: [
            { text: "마이크를 잡고 고음 파트를 완벽하게 소화한다", emoji: "🎤", scores: [4,0,0,0,1,0,1] },
            { text: "노래 순서를 정하고 분위기를 이끈다", emoji: "👑", scores: [0,4,0,0,0,1,1] },
            { text: "랩 파트를 찾아서 멋지게 뱉는다", emoji: "🎧", scores: [0,0,4,0,1,0,1] },
            { text: "안무를 넣어가며 신나게 춤추며 즐긴다", emoji: "💃", scores: [0,0,0,4,0,1,1] }
        ]
    },
    {
        text: "팀 프로젝트에서 나의 역할은?",
        options: [
            { text: "최종 발표를 자청하고 완벽하게 해낸다", emoji: "🎤", scores: [4,1,0,0,1,0,0] },
            { text: "팀원들을 조율하고 방향을 제시한다", emoji: "👑", scores: [0,4,0,0,0,0,1] },
            { text: "발표 자료를 예쁘고 센스있게 만든다", emoji: "✨", scores: [0,0,0,0,4,0,1] },
            { text: "어떤 파트든 맡아서 잘 해낸다", emoji: "🌟", scores: [1,1,0,0,0,0,4] }
        ]
    },
    {
        text: "SNS에서 나는 어떤 타입?",
        options: [
            { text: "셀카와 OOTD를 자주 올린다", emoji: "✨", scores: [0,0,0,0,4,1,0] },
            { text: "힙한 음악과 감성적인 글을 공유한다", emoji: "🎧", scores: [1,0,4,0,0,0,1] },
            { text: "귀여운 일상과 먹방을 올린다", emoji: "🐣", scores: [0,0,0,0,1,4,0] },
            { text: "팔로워들과 적극적으로 소통한다", emoji: "👑", scores: [0,4,0,0,1,0,1] }
        ]
    },
    {
        text: "공연을 볼 때 가장 눈이 가는 멤버는?",
        options: [
            { text: "감동적인 라이브를 보여주는 보컬", emoji: "🎤", scores: [4,0,0,0,0,0,1] },
            { text: "칼군무 중심에서 춤추는 메인댄서", emoji: "💃", scores: [0,0,0,4,1,0,1] },
            { text: "노래도 춤도 다 잘하는 만능 멤버", emoji: "🌟", scores: [1,0,0,1,0,0,4] },
            { text: "카메라에 잡힐 때마다 빛나는 비주얼", emoji: "✨", scores: [0,0,0,0,4,1,0] }
        ]
    },
    {
        text: "어려운 상황에 처했을 때 나는?",
        options: [
            { text: "상황을 정리하고 해결책을 제시한다", emoji: "👑", scores: [0,4,0,0,0,0,1] },
            { text: "솔직하게 내 생각을 직설적으로 말한다", emoji: "🎧", scores: [0,0,4,0,1,0,1] },
            { text: "주변 사람들에게 도움을 요청한다", emoji: "🐣", scores: [0,0,0,0,0,4,0] },
            { text: "유연하게 대처하며 필요한 역할을 맡는다", emoji: "🌟", scores: [0,1,0,0,0,0,4] }
        ]
    },
    {
        text: "사진을 찍을 때 나는?",
        options: [
            { text: "각도와 포즈를 완벽하게 연구한다", emoji: "✨", scores: [0,0,0,0,4,0,1] },
            { text: "V포즈 하면서 귀엽게 찍는다", emoji: "🐣", scores: [0,0,0,0,1,4,0] },
            { text: "역동적이고 멋진 포즈를 취한다", emoji: "💃", scores: [0,0,0,4,1,0,1] },
            { text: "진지한 표정으로 아티스트처럼 찍는다", emoji: "🎤", scores: [4,0,1,0,0,0,0] }
        ]
    },
    {
        text: "좋아하는 음악 장르는?",
        options: [
            { text: "감성적인 발라드나 R&B", emoji: "🎤", scores: [4,0,0,0,0,0,1] },
            { text: "비트가 강한 힙합이나 랩", emoji: "🎧", scores: [0,0,4,0,0,0,1] },
            { text: "몸이 절로 움직이는 EDM이나 댄스팝", emoji: "💃", scores: [0,0,0,4,0,1,0] },
            { text: "장르 불문 다 좋아한다", emoji: "🌟", scores: [1,1,1,1,0,0,4] }
        ]
    },
    {
        text: "친구들 사이에서 나의 별명은?",
        options: [
            { text: "반장, 대장, 든든한 사람", emoji: "👑", scores: [0,4,0,0,0,0,1] },
            { text: "예쁜/잘생긴 애, 패셔니스타", emoji: "✨", scores: [0,0,0,0,4,0,1] },
            { text: "귀요미, 막내, 아기", emoji: "🐣", scores: [0,0,0,0,0,4,0] },
            { text: "힙한 애, 쿨한 애, 개성 있는 애", emoji: "🎧", scores: [0,0,4,0,1,0,1] }
        ]
    },
    {
        text: "나의 자신 있는 능력은?",
        options: [
            { text: "감정 표현과 프레젠테이션", emoji: "🎤", scores: [4,1,0,0,0,0,0] },
            { text: "체력과 뛰어난 운동 신경", emoji: "💃", scores: [0,0,0,4,0,0,1] },
            { text: "사람들을 설득하고 이끄는 힘", emoji: "👑", scores: [0,4,0,0,0,0,1] },
            { text: "뭐든 빠르게 배우고 적응하는 능력", emoji: "🌟", scores: [0,0,0,0,0,0,4] }
        ]
    },
    {
        text: "스트레스 받을 때 나는?",
        options: [
            { text: "좋아하는 사람한테 기대고 위로받는다", emoji: "🐣", scores: [0,0,0,0,0,4,0] },
            { text: "노래를 부르며 감정을 풀어낸다", emoji: "🎤", scores: [4,0,0,0,0,0,1] },
            { text: "글이나 일기를 쓰며 생각을 정리한다", emoji: "🎧", scores: [0,0,4,0,0,0,1] },
            { text: "운동이나 춤을 추며 에너지를 발산한다", emoji: "💃", scores: [0,0,0,4,0,0,1] }
        ]
    },
    {
        text: "나의 패션 스타일은?",
        options: [
            { text: "트렌디하고 완벽한 코디", emoji: "✨", scores: [0,0,0,0,4,0,1] },
            { text: "스트릿/힙합 감성", emoji: "🎧", scores: [0,0,4,0,1,0,0] },
            { text: "귀엽고 밝은 캐주얼", emoji: "🐣", scores: [0,0,0,0,0,4,0] },
            { text: "TPO에 맞게 다양하게 소화", emoji: "🌟", scores: [0,1,0,0,1,0,4] }
        ]
    },
    {
        text: "10년 후 나의 모습은?",
        options: [
            { text: "팀이나 조직을 이끄는 리더", emoji: "👑", scores: [0,4,0,0,0,0,1] },
            { text: "자기 분야에서 최고의 전문가", emoji: "🎤", scores: [4,0,1,0,0,0,0] },
            { text: "자유롭게 세계를 누비는 아티스트", emoji: "💃", scores: [0,0,0,4,1,0,1] },
            { text: "다양한 분야에서 활약하는 멀티 플레이어", emoji: "🌟", scores: [0,0,0,0,0,0,4] }
        ]
    }
        ],
        results: [
            { emoji: '🎤', title: '메인 보컬', titleEn: 'Main Vocal', color: '#e74c3c', colorEnd: '#c0392b' },
            { emoji: '👑', title: '리더', titleEn: 'Leader', color: '#f39c12', colorEnd: '#e67e22' },
            { emoji: '🎧', title: '메인 래퍼', titleEn: 'Main Rapper', color: '#2c3e50', colorEnd: '#1a252f' },
            { emoji: '💃', title: '메인 댄서', titleEn: 'Main Dancer', color: '#8e44ad', colorEnd: '#6c3483' },
            { emoji: '✨', title: '비주얼', titleEn: 'Visual', color: '#e84393', colorEnd: '#c23177' },
            { emoji: '🐣', title: '막내', titleEn: 'Maknae', color: '#00b894', colorEnd: '#009d7e' },
            { emoji: '🌟', title: '올라운더', titleEn: 'All-Rounder', color: '#0984e3', colorEnd: '#0767b0' }
        ]
    },
    en: {
        labels: ['Main Vocal', 'Leader', 'Main Rapper', 'Main Dancer', 'Visual', 'Maknae', 'All-Rounder'],
        questions: [
            {
                text: 'When you go to karaoke with friends, what do you do?',
                options: [
                    { text: 'Take the mic and confidently handle the big high-note section', emoji: '🎤', scores: [4,0,0,0,1,0,1] },
                    { text: 'Pick the song order and keep the room energized', emoji: '👑', scores: [0,4,0,0,0,1,1] },
                    { text: 'Look for a rap verse and deliver it with style', emoji: '🎧', scores: [0,0,4,0,1,0,1] },
                    { text: 'Add some choreography and dance along for fun', emoji: '💃', scores: [0,0,0,4,0,1,1] }
                ]
            },
            {
                text: 'What role do you take in a team project?',
                options: [
                    { text: 'Volunteer for the final presentation and rehearse it thoroughly', emoji: '🎤', scores: [4,1,0,0,1,0,0] },
                    { text: 'Coordinate the team and keep everyone moving in one direction', emoji: '👑', scores: [0,4,0,0,0,0,1] },
                    { text: 'Design clear slides with polished visual details', emoji: '✨', scores: [0,0,0,0,4,0,1] },
                    { text: 'Take on whatever needs doing and adapt quickly', emoji: '🌟', scores: [1,1,0,0,0,0,4] }
                ]
            },
            {
                text: 'What are you like on social media?',
                options: [
                    { text: 'I often post selfies and outfit-of-the-day photos', emoji: '✨', scores: [0,0,0,0,4,1,0] },
                    { text: 'I share favorite tracks and thoughtful captions', emoji: '🎧', scores: [1,0,4,0,0,0,1] },
                    { text: 'I post cute everyday moments and food clips', emoji: '🐣', scores: [0,0,0,0,1,4,0] },
                    { text: 'I reply actively and keep conversations going', emoji: '👑', scores: [0,4,0,0,1,0,1] }
                ]
            },
            {
                text: 'Which member catches your attention most during a performance?',
                options: [
                    { text: 'The vocalist whose live performance carries the emotion', emoji: '🎤', scores: [4,0,0,0,0,0,1] },
                    { text: 'The dancer anchoring sharp, synchronized choreography', emoji: '💃', scores: [0,0,0,4,1,0,1] },
                    { text: 'The versatile member who moves comfortably between parts', emoji: '🌟', scores: [1,0,0,1,0,0,4] },
                    { text: 'The member with memorable styling and camera presence', emoji: '✨', scores: [0,0,0,0,4,1,0] }
                ]
            },
            {
                text: 'How do you respond to a difficult situation?',
                options: [
                    { text: 'Organize the facts and suggest a practical next step', emoji: '👑', scores: [0,4,0,0,0,0,1] },
                    { text: 'Say what I think directly and clearly', emoji: '🎧', scores: [0,0,4,0,1,0,1] },
                    { text: 'Ask people I trust for help', emoji: '🐣', scores: [0,0,0,0,0,4,0] },
                    { text: 'Stay flexible and fill whichever role is needed', emoji: '🌟', scores: [0,1,0,0,0,0,4] }
                ]
            },
            {
                text: 'What do you do when someone takes your photo?',
                options: [
                    { text: 'Test angles and poses until the composition feels right', emoji: '✨', scores: [0,0,0,0,4,0,1] },
                    { text: 'Flash a cheerful V sign', emoji: '🐣', scores: [0,0,0,0,1,4,0] },
                    { text: 'Strike a dynamic pose with plenty of movement', emoji: '💃', scores: [0,0,0,4,1,0,1] },
                    { text: 'Go for a serious, creative portrait', emoji: '🎤', scores: [4,0,1,0,0,0,0] }
                ]
            },
            {
                text: 'Which kind of music do you enjoy most?',
                options: [
                    { text: 'Emotional ballads or R&B', emoji: '🎤', scores: [4,0,0,0,0,0,1] },
                    { text: 'Beat-driven hip-hop or rap', emoji: '🎧', scores: [0,0,4,0,0,0,1] },
                    { text: 'EDM or dance-pop that makes me want to move', emoji: '💃', scores: [0,0,0,4,0,1,0] },
                    { text: 'A little of everything—I do not stick to one genre', emoji: '🌟', scores: [1,1,1,1,0,0,4] }
                ]
            },
            {
                text: 'Which nickname would your friends be most likely to give you?',
                options: [
                    { text: 'The coordinator, captain, or person everyone relies on', emoji: '👑', scores: [0,4,0,0,0,0,1] },
                    { text: 'The best-dressed friend or style expert', emoji: '✨', scores: [0,0,0,0,4,0,1] },
                    { text: 'The cheerful youngest-at-heart', emoji: '🐣', scores: [0,0,0,0,0,4,0] },
                    { text: 'The cool, original one with a distinct point of view', emoji: '🎧', scores: [0,0,4,0,1,0,1] }
                ]
            },
            {
                text: 'Which ability do you feel most confident about?',
                options: [
                    { text: 'Expressing ideas and presenting them clearly', emoji: '🎤', scores: [4,1,0,0,0,0,0] },
                    { text: 'Stamina and physical coordination', emoji: '💃', scores: [0,0,0,4,0,0,1] },
                    { text: 'Persuading people and bringing a group together', emoji: '👑', scores: [0,4,0,0,0,0,1] },
                    { text: 'Learning new things and adapting quickly', emoji: '🌟', scores: [0,0,0,0,0,0,4] }
                ]
            },
            {
                text: 'What helps you when you feel stressed?',
                options: [
                    { text: 'Reaching out to someone I trust for comfort', emoji: '🐣', scores: [0,0,0,0,0,4,0] },
                    { text: 'Singing until I have worked through the feeling', emoji: '🎤', scores: [4,0,0,0,0,0,1] },
                    { text: 'Writing down my thoughts in notes or a journal', emoji: '🎧', scores: [0,0,4,0,0,0,1] },
                    { text: 'Using exercise or dance to release some energy', emoji: '💃', scores: [0,0,0,4,0,0,1] }
                ]
            },
            {
                text: 'Which description fits your fashion style best?',
                options: [
                    { text: 'Trend-aware and carefully put together', emoji: '✨', scores: [0,0,0,0,4,0,1] },
                    { text: 'Streetwear with hip-hop influences', emoji: '🎧', scores: [0,0,4,0,1,0,0] },
                    { text: 'Bright, playful, and casual', emoji: '🐣', scores: [0,0,0,0,0,4,0] },
                    { text: 'Versatile—I dress to suit the occasion', emoji: '🌟', scores: [0,1,0,0,1,0,4] }
                ]
            },
            {
                text: 'How do you imagine yourself ten years from now?',
                options: [
                    { text: 'Leading a team or organization', emoji: '👑', scores: [0,4,0,0,0,0,1] },
                    { text: 'Working as a recognized specialist in my field', emoji: '🎤', scores: [4,0,1,0,0,0,0] },
                    { text: 'Building a creative career while experiencing the world', emoji: '💃', scores: [0,0,0,4,1,0,1] },
                    { text: 'Contributing across several fields as a versatile collaborator', emoji: '🌟', scores: [0,0,0,0,0,0,4] }
                ]
            }
        ],
        results: [
            { emoji: '🎤', title: 'Main Vocal', titleEn: 'Main Vocal', color: '#e74c3c', colorEnd: '#c0392b' },
            { emoji: '👑', title: 'Leader', titleEn: 'Leader', color: '#f39c12', colorEnd: '#e67e22' },
            { emoji: '🎧', title: 'Main Rapper', titleEn: 'Main Rapper', color: '#2c3e50', colorEnd: '#1a252f' },
            { emoji: '💃', title: 'Main Dancer', titleEn: 'Main Dancer', color: '#8e44ad', colorEnd: '#6c3483' },
            { emoji: '✨', title: 'Visual', titleEn: 'Visual', color: '#e84393', colorEnd: '#c23177' },
            { emoji: '🐣', title: 'Maknae', titleEn: 'Maknae', color: '#00b894', colorEnd: '#009d7e' },
            { emoji: '🌟', title: 'All-Rounder', titleEn: 'All-Rounder', color: '#0984e3', colorEnd: '#0767b0' }
        ]
    }
};

// Runtime aliases keep the scoring model stable while presentation copy follows the selected locale.
let POS_LABELS = [];
let QUESTIONS = [];
let RESULTS = [];

function applyQuizLanguage(lang) {
    const data = QUIZ_DATA[lang] || QUIZ_DATA.en;
    POS_LABELS = data.labels;
    QUESTIONS = data.questions;
    RESULTS = data.results;
}

applyQuizLanguage(typeof i18n !== 'undefined' ? i18n.getCurrentLanguage() : 'en');
