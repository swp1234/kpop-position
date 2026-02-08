// K-POP Position Test - Data
// 7 positions: main_vocal(0), leader(1), rapper(2), dancer(3), visual(4), maknae(5), allrounder(6)

const POS_LABELS = ['메인보컬', '리더', '메인래퍼', '메인댄서', '비주얼', '막내', '올라운더'];

const QUESTIONS = [
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
];

const RESULTS = [
    {
        emoji: '🎤',
        title: '메인 보컬',
        titleEn: 'Main Vocal',
        subtitle: '"나의 목소리로 세상을 감동시키는 사람"',
        color: '#e74c3c',
        colorEnd: '#c0392b',
        desc: '당신은 그룹의 음악적 중심! 감정을 실어 노래하는 능력이 뛰어나고, 고난도 파트를 소화하는 실력파입니다. 무대에서 라이브로 감동을 주는 타입이에요.',
        traits: ['감정 표현이 풍부하다', '완벽주의 성향이 있다', '무대 위에서 빛나는 타입', '책임감이 강하다'],
        idols: [
            { name: '태연', group: '소녀시대', desc: '1세대 메보의 전설' },
            { name: '정국', group: 'BTS', desc: '황금막내이자 메인보컬' },
            { name: '로제', group: 'BLACKPINK', desc: '독특한 음색의 보컬' },
            { name: '승관', group: '세븐틴', desc: '파워풀한 고음' },
            { name: '해린', group: '뉴진스', desc: '청량한 음색' }
        ],
        realLife: '프레젠테이션 능력이 뛰어나고, 자기 분야에서 전문성을 갈고닦는 타입입니다. 예술이나 창작 분야에서 빛을 발해요.',
        bestMatch: '리더',
        bestMatchEmoji: '👑',
        bestMatchReason: '리더십 + 음악성 = 최고의 시너지',
        tip: '때로는 완벽하지 않아도 괜찮아요. 감정을 살리는 게 기술보다 중요합니다!'
    },
    {
        emoji: '👑',
        title: '리더',
        titleEn: 'Leader',
        subtitle: '"팀의 중심에서 모두를 이끄는 사람"',
        color: '#f39c12',
        colorEnd: '#e67e22',
        desc: '당신은 그룹의 대표 얼굴! 멤버들을 하나로 모으고, 어떤 상황에서도 침착하게 의사결정을 내리는 리더입니다. 팀워크를 최고로 이끌어요.',
        traits: ['카리스마와 의사소통 능력', '중재 능력이 뛰어나다', '멤버 케어에 진심', '압박감에도 침착하다'],
        idols: [
            { name: 'RM', group: 'BTS', desc: '글로벌 리더의 표본' },
            { name: '뱅찬', group: 'Stray Kids', desc: '프로듀싱 리더' },
            { name: '에스쿱스', group: '세븐틴', desc: '13명 총괄 리더' },
            { name: '민지', group: '뉴진스', desc: '신세대 리더' },
            { name: '사쿠라', group: 'LE SSERAFIM', desc: '경험 많은 리더' }
        ],
        realLife: '팀 프로젝트 리더, 갈등 조정자 역할을 잘 해냅니다. 사회생활에서 원만하고 팀장감이에요.',
        bestMatch: '메인 보컬',
        bestMatchEmoji: '🎤',
        bestMatchReason: '리더십 + 실력 = 완벽한 그룹의 시작',
        tip: '가끔은 혼자 짊어지지 말고 팀원들에게 의지해도 괜찮아요!'
    },
    {
        emoji: '🎧',
        title: '메인 래퍼',
        titleEn: 'Main Rapper',
        subtitle: '"강렬한 카리스마로 무대를 지배하는 사람"',
        color: '#2c3e50',
        colorEnd: '#1a252f',
        desc: '당신은 그룹의 카리스마 담당! 강렬한 랩과 독특한 플로우로 무대를 장악하는 타입입니다. 작사 능력과 자기표현에 강합니다.',
        traits: ['자신감이 넘친다', '개성이 뚜렷하다', '솔직하고 직설적', '트렌드에 민감하다'],
        idols: [
            { name: '슈가', group: 'BTS', desc: '프로듀서 겸 래퍼' },
            { name: '한', group: 'Stray Kids', desc: '작사의 천재' },
            { name: '제니', group: 'BLACKPINK', desc: '힙한 랩 스타일' },
            { name: '버논', group: '세븐틴', desc: '독특한 랩 플로우' },
            { name: '류진', group: 'ITZY', desc: '걸크러쉬 래퍼' }
        ],
        realLife: '글쓰기, 자기표현, 패션/트렌드 감각이 뛰어납니다. 마케팅이나 기획 분야에서 두각을 나타내요.',
        bestMatch: '메인 댄서',
        bestMatchEmoji: '💃',
        bestMatchReason: '퍼포먼스의 완벽한 조합',
        tip: '직설적인 것도 좋지만, 가끔은 부드럽게 전달하는 연습을 해보세요!'
    },
    {
        emoji: '💃',
        title: '메인 댄서',
        titleEn: 'Main Dancer',
        subtitle: '"몸으로 감정을 표현하는 무대의 주인공"',
        color: '#8e44ad',
        colorEnd: '#6c3483',
        desc: '당신은 그룹의 퍼포먼스 핵심! 칼군무의 중심에서 에너지를 폭발시키는 타입입니다. 끈기와 노력으로 완벽한 무대를 만들어요.',
        traits: ['에너지가 넘친다', '노력파 & 끈기', '뛰어난 표현력', '승부욕이 강하다'],
        idols: [
            { name: '지민', group: 'BTS', desc: '현대무용 출신' },
            { name: '리노', group: 'Stray Kids', desc: '안무 디렉터' },
            { name: '호시', group: '세븐틴', desc: '퍼포먼스팀 리더' },
            { name: '리사', group: 'BLACKPINK', desc: '세계적 댄서' },
            { name: '카즈하', group: 'LE SSERAFIM', desc: '발레 출신' }
        ],
        realLife: '운동 능력과 체력이 뛰어나고 꾸준한 연습을 중요시합니다. 무대/발표에서 자신감이 넘쳐요.',
        bestMatch: '메인 래퍼',
        bestMatchEmoji: '🎧',
        bestMatchReason: '래퍼의 에너지 + 댄서의 퍼포먼스 = 최강 무대',
        tip: '가끔은 쉬어가는 것도 실력이에요. 번아웃에 주의하세요!'
    },
    {
        emoji: '✨',
        title: '비주얼',
        titleEn: 'Visual',
        subtitle: '"존재 자체가 빛나는 그룹의 얼굴"',
        color: '#e84393',
        colorEnd: '#c23177',
        desc: '당신은 그룹의 센터 비주얼! 첫인상부터 시선을 사로잡는 매력의 소유자입니다. 자기관리가 철저하고 패션 감각도 뛰어나요.',
        traits: ['자기관리가 철저하다', '패션 감각이 뛰어나다', '주목받는 걸 즐긴다', '친화력이 좋다'],
        idols: [
            { name: '진', group: 'BTS', desc: '월드와이드 핸섬' },
            { name: '원영', group: 'IVE', desc: '센터 비주얼' },
            { name: '카리나', group: 'aespa', desc: 'AI 같은 비주얼' },
            { name: '현진', group: 'Stray Kids', desc: '퍼포먼스 비주얼' },
            { name: '유나', group: 'ITZY', desc: '모델급 비주얼' }
        ],
        realLife: '첫인상 관리, 패션/뷰티에 관심이 많고 인플루언서 재능이 있습니다. 마케팅/홍보 분야에서 활약해요.',
        bestMatch: '막내',
        bestMatchEmoji: '🐣',
        bestMatchReason: '비주얼 + 귀여움 = 팬심 폭발 조합',
        tip: '외모도 중요하지만, 내면의 매력도 가꿔보세요!'
    },
    {
        emoji: '🐣',
        title: '막내',
        titleEn: 'Maknae',
        subtitle: '"사랑받는 매력으로 모두를 녹이는 사람"',
        color: '#00b894',
        colorEnd: '#009d7e',
        desc: '당신은 그룹의 귀요미 막내! 밝고 긍정적인 에너지로 분위기를 만드는 타입입니다. 형/언니들의 사랑을 독차지하는 매력둥이예요.',
        traits: ['밝고 긍정적이다', '애교가 많다', '사랑받는 걸 좋아한다', '에너지가 넘친다'],
        idols: [
            { name: '정국', group: 'BTS', desc: '황금막내' },
            { name: '아이엔', group: 'Stray Kids', desc: '귀요미 막내' },
            { name: '디노', group: '세븐틴', desc: '만능 막내' },
            { name: '혜인', group: '뉴진스', desc: '센터 막내' },
            { name: '닝닝', group: 'aespa', desc: '파워 보컬 막내' }
        ],
        realLife: '친화력 최고! 분위기 메이커로 어디서든 사랑받아요. 스트레스 해소와 긍정적 마인드가 장점이에요.',
        bestMatch: '리더',
        bestMatchEmoji: '👑',
        bestMatchReason: '리더의 보살핌 + 막내의 밝은 에너지',
        tip: '가끔은 나이에 맞는 책임감도 보여주면 더 멋져요!'
    },
    {
        emoji: '🌟',
        title: '올라운더',
        titleEn: 'All-Rounder',
        subtitle: '"뭐든 해내는 만능 재주꾼"',
        color: '#0984e3',
        colorEnd: '#0767b0',
        desc: '당신은 그룹의 만능 버팀목! 노래, 춤, 랩 뭐든 다 할 수 있는 다재다능한 타입입니다. 어디에 배치해도 빈틈을 메우는 핵심 멤버예요.',
        traits: ['다재다능하다', '적응력이 뛰어나다', '겸손하다', '팀플레이를 중시한다'],
        idols: [
            { name: '제이홉', group: 'BTS', desc: '댄스+랩+보컬' },
            { name: '펠릭스', group: 'Stray Kids', desc: '랩+댄스+보컬' },
            { name: '도겸', group: '세븐틴', desc: '보컬+버라이어티' },
            { name: '예지', group: 'ITZY', desc: '리더+댄스+랩' },
            { name: '윈터', group: 'aespa', desc: '보컬+댄스+비주얼' }
        ],
        realLife: '멀티플레이어로 빠른 학습 능력과 팀워크가 장점입니다. 위기 대처 능력이 뛰어나 어디서나 환영받아요.',
        bestMatch: '리더',
        bestMatchEmoji: '👑',
        bestMatchReason: '리더 + 만능 = 최강 팀의 완성',
        tip: '모든 걸 잘하려고 하지 말고, 하나의 강점을 더 키워보세요!'
    }
];

// 7x7 compatibility matrix (row = my position, col = other position)
// Order: vocal, leader, rapper, dancer, visual, maknae, allrounder
const COMPATIBILITY = [
    [60, 95, 88, 85, 70, 78, 90],  // vocal
    [95, 55, 82, 80, 75, 85, 92],  // leader
    [88, 82, 58, 95, 72, 75, 88],  // rapper
    [85, 80, 95, 55, 78, 70, 85],  // dancer
    [70, 75, 72, 78, 50, 92, 88],  // visual
    [78, 85, 75, 70, 92, 52, 88],  // maknae
    [90, 92, 88, 85, 88, 88, 65]   // allrounder
];

const PREMIUM_ADVICE = [
    { // main vocal
        trainingTips: ['매일 30분 발성 연습으로 음역대를 넓혀보세요', '감정 표현 연습을 위해 연기 수업을 들어보세요', '복식호흡으로 안정적인 라이브 실력을 키우세요'],
        careerPaths: ['뮤지컬 배우', '보컬 트레이너', '싱어송라이터', '음악 프로듀서'],
        weeklyRoutine: ['월: 발성 연습 + 호흡 훈련', '화: 좋아하는 노래 커버 연습', '수: 감정 표현 연기 연습', '목: 음악 이론 공부', '금: 녹음 & 피드백', '토: 공연/오디션 관람', '일: 목 관리 & 휴식'],
        idolAdvice: '태연처럼 꾸준히 실력을 갈고닦으면 언제든 빛나는 순간이 와요!'
    },
    { // leader
        trainingTips: ['리더십 관련 책을 읽어보세요 (예: 데일 카네기)', '팀원 개인 면담을 통해 소통 능력을 키우세요', '위기 상황 대처 시뮬레이션을 연습해보세요'],
        careerPaths: ['팀 매니저', '프로젝트 리더', '기업 경영자', '이벤트 기획자'],
        weeklyRoutine: ['월: 한 주 계획 수립 & 팀 미팅', '화: 커뮤니케이션 스킬 연습', '수: 갈등 조정 역할극', '목: 리더십 독서 & 메모', '금: 팀 활동 총정리', '토: 멘토링 & 네트워킹', '일: 자기 돌봄 & 충전'],
        idolAdvice: 'RM처럼 진솔한 소통으로 팀원들의 신뢰를 얻으세요!'
    },
    { // rapper
        trainingTips: ['매일 일기를 쓰며 작사 능력을 키우세요', '다양한 장르의 음악을 들으며 플로우를 연구하세요', '프리스타일 랩 연습으로 순발력을 높이세요'],
        careerPaths: ['작사가', '콘텐츠 크리에이터', '마케팅 기획자', '패션 디렉터'],
        weeklyRoutine: ['월: 프리스타일 랩 연습', '화: 작사 & 가사 쓰기', '수: 비트 메이킹 공부', '목: 트렌드 리서치', '금: 녹음 & 믹싱', '토: SNS 콘텐츠 제작', '일: 영감 수집 & 휴식'],
        idolAdvice: '슈가처럼 자기만의 이야기를 담은 가사가 가장 강력합니다!'
    },
    { // dancer
        trainingTips: ['다양한 장르의 춤을 배워 표현력을 넓히세요', '체력 관리를 위해 규칙적인 운동을 하세요', '거울 앞에서 표정 연습도 함께하세요'],
        careerPaths: ['안무가', '댄스 강사', '퍼포먼스 디렉터', '뮤직비디오 감독'],
        weeklyRoutine: ['월: 기본기 스트레칭 & 아이솔레이션', '화: 새로운 장르 도전 (팝핀/왁킹)', '수: 기존 안무 복습 & 디테일', '목: 체력 훈련 & 근력 운동', '금: 프리스타일 & 즉흥 연습', '토: 안무 영상 촬영', '일: 마사지 & 몸 관리'],
        idolAdvice: '호시처럼 매일 땀 흘리는 연습이 최고의 퍼포먼스를 만들어요!'
    },
    { // visual
        trainingTips: ['자기만의 스타일을 찾아 꾸준히 가꾸세요', '표정 연기와 카메라 워크를 연습하세요', '내면의 자신감도 함께 키우세요'],
        careerPaths: ['모델', '인플루언서', '뷰티 크리에이터', '홍보/마케팅 전문가'],
        weeklyRoutine: ['월: 스킨케어 루틴 점검', '화: 패션 트렌드 리서치', '수: 포즈 & 표정 연습', '목: 다이어트 & 운동', '금: 셀프 촬영 & 편집', '토: 쇼핑 & 스타일링', '일: 뷰티 케어 & 휴식'],
        idolAdvice: '원영처럼 꾸준한 자기관리가 최고의 비주얼을 만들어요!'
    },
    { // maknae
        trainingTips: ['귀여움에 안주하지 말고 실력도 키워보세요', '선배들에게 적극적으로 배우는 자세를 가지세요', '긍정적인 에너지를 유지하되, 진지할 때는 진지하게!'],
        careerPaths: ['엔터테이너', '유튜버', '아나운서', '교육 콘텐츠 크리에이터'],
        weeklyRoutine: ['월: 밝은 인사로 한 주 시작', '화: 선배에게 배우기 & 질문', '수: 자기 개발 (약한 분야 보강)', '목: 소통 & 친화력 발휘', '금: 분위기 메이킹 실전', '토: 즐거운 취미 활동', '일: 충전 & 다음 주 준비'],
        idolAdvice: '정국처럼 실력을 갈고닦으면 "황금막내"가 될 수 있어요!'
    },
    { // allrounder
        trainingTips: ['다재다능함을 유지하되, 하나의 강점을 더 키우세요', '새로운 분야에 도전하는 것을 두려워하지 마세요', '팀에서 필요한 역할을 유연하게 채워주세요'],
        careerPaths: ['멀티 크리에이터', '프리랜서', '스타트업 창업자', '예능인'],
        weeklyRoutine: ['월: 보컬 연습', '화: 댄스 연습', '목: 랩/작사 연습', '수: 새로운 스킬 도전', '금: 종합 연습 & 복습', '토: 다양한 콘텐츠 제작', '일: 영감 수집 & 계획'],
        idolAdvice: '제이홉처럼 꾸준한 노력으로 모든 분야에서 빛나세요!'
    }
];

// Group data for fun matching
const KPOP_GROUPS = [
    {
        name: 'BTS', nameKo: '방탄소년단',
        members: [
            { name: 'RM', position: '리더', emoji: '👑' },
            { name: '진', position: '비주얼', emoji: '✨' },
            { name: '슈가', position: '메인래퍼', emoji: '🎧' },
            { name: '제이홉', position: '올라운더', emoji: '🌟' },
            { name: '지민', position: '메인댄서', emoji: '💃' },
            { name: '뷔', position: '비주얼', emoji: '✨' },
            { name: '정국', position: '메인보컬', emoji: '🎤' }
        ]
    },
    {
        name: 'BLACKPINK', nameKo: '블랙핑크',
        members: [
            { name: '지수', position: '리더', emoji: '👑' },
            { name: '제니', position: '메인래퍼', emoji: '🎧' },
            { name: '로제', position: '메인보컬', emoji: '🎤' },
            { name: '리사', position: '메인댄서', emoji: '💃' }
        ]
    },
    {
        name: 'Stray Kids', nameKo: '스트레이 키즈',
        members: [
            { name: '뱅찬', position: '리더', emoji: '👑' },
            { name: '리노', position: '메인댄서', emoji: '💃' },
            { name: '한', position: '메인래퍼', emoji: '🎧' },
            { name: '현진', position: '비주얼', emoji: '✨' },
            { name: '승민', position: '메인보컬', emoji: '🎤' },
            { name: '펠릭스', position: '올라운더', emoji: '🌟' },
            { name: '아이엔', position: '막내', emoji: '🐣' }
        ]
    },
    {
        name: '뉴진스', nameKo: 'NewJeans',
        members: [
            { name: '민지', position: '리더', emoji: '👑' },
            { name: '하니', position: '메인보컬', emoji: '🎤' },
            { name: '다니엘', position: '메인댄서', emoji: '💃' },
            { name: '해린', position: '메인보컬', emoji: '🎤' },
            { name: '혜인', position: '막내', emoji: '🐣' }
        ]
    },
    {
        name: 'LE SSERAFIM', nameKo: '르세라핌',
        members: [
            { name: '사쿠라', position: '리더', emoji: '👑' },
            { name: '채원', position: '메인보컬', emoji: '🎤' },
            { name: '카즈하', position: '메인댄서', emoji: '💃' },
            { name: '은채', position: '막내', emoji: '🐣' }
        ]
    },
    {
        name: 'aespa', nameKo: '에스파',
        members: [
            { name: '카리나', position: '리더', emoji: '👑' },
            { name: '지젤', position: '메인래퍼', emoji: '🎧' },
            { name: '윈터', position: '올라운더', emoji: '🌟' },
            { name: '닝닝', position: '막내', emoji: '🐣' }
        ]
    }
];
