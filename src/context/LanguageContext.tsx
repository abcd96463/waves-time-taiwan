import React, { createContext, useContext, useState } from 'react';

export type Language = 'zh' | 'en' | 'ja' | 'ko' | 'es';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'zh', label: '繁體中文', nativeName: '繁體中文', flag: '🇹🇼' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ja', label: '日本語', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'es', label: 'Español', nativeName: 'Español', flag: '🇪🇸' },
];

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Navbar
    'nav.brand': '流浪臺灣',
    'nav.brandEn': 'WAVES TIME TAIWAN',
    'nav.taiwanIntro': '臺灣介紹',
    'nav.spots': '全臺浪點',
    'nav.seasons': '四季湧浪',
    'nav.etiquette': '浪人守則',
    'nav.planner': '旅行規劃',
    'nav.quiz': '命定浪點測驗',

    // Hero Section
    'hero.kickerBadge': 'TAIWAN · 臺灣 · FORMOSA',
    'hero.kickerCoast': '1,200 公里太平洋環島海岸',
    'hero.kickerWater': '黑潮暖流水溫 24℃~28℃',
    'hero.kickerSafety': '世界頂級夜市美食與極致治安',
    'hero.titleLine1': '群山擁抱的溫暖浪潮，',
    'hero.titleLine2Prefix': '衝浪與旅行的終極天堂・',
    'hero.taiwanWord': '臺灣',
    'hero.subtitleEn': 'WHERE EPIC PACIFIC SWELLS MEET GREEN MOUNTAINS, NIGHT MARKETS & WARM SMILES',
    'hero.desc': '巍峨綠意百嶽直入蔚藍太平洋，四季皆有黑潮送來 24°C+ 的溫暖好浪。破浪上岸後，迎來的是馳名全球的夜市熱炒、天然臨海溫泉與世界評比最友善安全的微笑——這是一生必訪的亞洲衝浪秘境。',
    'hero.badge1': '全年黑潮暖水 (免厚防寒衣)',
    'hero.badge2': '夜市美食王國 (衝完浪吃爆熱炒小吃)',
    'hero.badge3': '全球治安第一梯隊 (單人自在自駕探索)',
    'hero.badge4': '海邊天然溫泉 & 原民熱情文化',
    'hero.btnExplore': '探索全臺 24 大浪點',
    'hero.btnLearnTaiwan': '詳細了解台灣',
    'hero.btnQuiz': '尋找你的命定浪點',
    'hero.stripHeader': '臺灣海島即時海象與衝浪環境指標',
    'hero.stripSub': '黑潮暖流巡航 · 臺灣全境 24 處經典浪點',
    'hero.waterTemp': '平均水溫',
    'hero.waterTempSub': '黑潮暖水 · 短褲比基尼',
    'hero.swell': '太平洋湧浪',
    'hero.swellSub': '優良深海長波 11~14s',
    'hero.transit': '環島交通',
    'hero.transitMode': '高鐵 + 機車',
    'hero.transitDetail': '自駕',
    'hero.transitSub': '沿海公路極致便利',
    'hero.afterSurf': '浪後生活',
    'hero.afterSurfMode': '夜市美食',
    'hero.afterSurfDetail': '& 溫泉',
    'hero.afterSurfSub': '世界最安全友善國度',

    // Map Section
    'map.badge': "全臺浪點地圖 · LET'S SURF TAIWAN",
    'map.title': '全臺經典衝浪地圖',
    'map.desc': '細緻台灣地理輪廓與環島 20 大浪點標籤，滑鼠移動即時固定顯示海況數值與簡介。',
    'map.hint': '滑鼠移到浪點即可固定觀看該浪點海況',
    'map.pinned': '目前固定：',
    'map.enterDetail': '進入詳細介紹',
    'map.quickSwitch': '全臺 20 大浪點快速切換',
    'map.clickToPin': '點擊即固定',

    // Common
    'common.beginner': '初學者友善',
    'common.intermediate': '中階浪人',
    'common.advanced': '進階高手',
    'common.back': '返回浪點列表',
    'common.langSelect': '選擇語言',
  },
  en: {
    // Navbar
    'nav.brand': 'Surfing Taiwan',
    'nav.brandEn': 'WAVES TIME TAIWAN',
    'nav.taiwanIntro': 'About Taiwan',
    'nav.spots': 'Surf Spots',
    'nav.seasons': 'Seasons & Swell',
    'nav.etiquette': 'Surfer Etiquette',
    'nav.planner': 'Trip Planner',
    'nav.quiz': 'Spot Quiz',

    // Hero Section
    'hero.kickerBadge': 'TAIWAN · FORMOSA',
    'hero.kickerCoast': '1,200 km Pacific Coast',
    'hero.kickerWater': 'Warm Kuroshio Waters 24℃~28℃',
    'hero.kickerSafety': 'World-Famous Night Markets & Global Safety',
    'hero.titleLine1': 'Where Epic Pacific Waves Meet Green Mountains:',
    'hero.titleLine2Prefix': "Asia's Ultimate Surf Paradise · ",
    'hero.taiwanWord': 'Taiwan',
    'hero.subtitleEn': 'WHERE EPIC PACIFIC SWELLS MEET GREEN MOUNTAINS, NIGHT MARKETS & WARM SMILES',
    'hero.desc': 'Towering emerald peaks plunge into the deep blue Pacific, blessed year-round by the warm 24°C+ Kuroshio Current. Step ashore to sizzling night market feasts, soothing ocean hot springs, and the warmest hospitality on Earth. Book your board bag—Taiwan is the surf trip of a lifetime.',
    'hero.badge1': 'Warm 24°C+ Water (Boardshorts & Bikini)',
    'hero.badge2': 'World-Class Food (Night markets & street eats)',
    'hero.badge3': 'Ranked #1 for Safety (Effortless solo travel)',
    'hero.badge4': 'Natural Ocean Springs & Warm Coastal Culture',
    'hero.btnExplore': 'Explore 24 Surf Spots',
    'hero.btnLearnTaiwan': 'Explore Taiwan',
    'hero.btnQuiz': 'Find Your Ideal Spot',
    'hero.stripHeader': 'Live Taiwan Coastal Marine & Travel Indicators',
    'hero.stripSub': 'Warm Kuroshio Current Flowing Along 24 Iconic Spots',
    'hero.waterTemp': 'Water Temp',
    'hero.waterTempSub': 'Warm Kuroshio Current',
    'hero.swell': 'Pacific Swell',
    'hero.swellSub': 'Clean Deep-Sea Waves 11~14s',
    'hero.transit': 'Island Transit',
    'hero.transitMode': 'HSR + Scooter',
    'hero.transitDetail': 'Road Trip',
    'hero.transitSub': 'High-Speed Rail & Coastal Roads',
    'hero.afterSurf': 'After-Surf Life',
    'hero.afterSurfMode': 'Night Markets',
    'hero.afterSurfDetail': '& Springs',
    'hero.afterSurfSub': "World's Friendliest Island",

    // Map Section
    'map.badge': 'TAIWAN SURF MAP · PACIFIC SWELLS',
    'map.title': 'Taiwan Iconic Surf Breaks Map',
    'map.desc': 'Explore 20 iconic surf breaks around Taiwan. Hover or tap any spot on the coastline to inspect real-time swell and conditions.',
    'map.hint': 'Hover or tap spot to pin live marine data',
    'map.pinned': 'Pinned: ',
    'map.enterDetail': 'Explore Spot Guide',
    'map.quickSwitch': 'Quick 20 Surf Spots Switcher',
    'map.clickToPin': 'Click to pin',

    // Common
    'common.beginner': 'Beginner Friendly',
    'common.intermediate': 'Intermediate',
    'common.advanced': 'Advanced Only',
    'common.back': 'Back to Spots',
    'common.langSelect': 'Select Language',
  },
  ja: {
    // Navbar
    'nav.brand': '台湾サーフィン',
    'nav.brandEn': 'WAVES TIME TAIWAN',
    'nav.taiwanIntro': '台湾紹介',
    'nav.spots': 'サーフスポット',
    'nav.seasons': '四季のうねり',
    'nav.etiquette': 'サーファーマナー',
    'nav.planner': 'トリップ計画',
    'nav.quiz': '相性スポット診断',

    // Hero Section
    'hero.kickerBadge': 'TAIWAN · 台湾 · FORMOSA',
    'hero.kickerCoast': '太平洋沿岸1,200km',
    'hero.kickerWater': '黒潮暖流 水温24℃〜28℃',
    'hero.kickerSafety': '絶品夜市グルメ＆世界トップの治安',
    'hero.titleLine1': '雄大な山々と温かい波に抱かれた島、',
    'hero.titleLine2Prefix': 'サーフィンと旅の究極パラダイス・',
    'hero.taiwanWord': '台湾',
    'hero.subtitleEn': 'WHERE EPIC PACIFIC SWELLS MEET GREEN MOUNTAINS, NIGHT MARKETS & WARM SMILES',
    'hero.desc': 'エメラルド色の山々が太平洋へと連なり、年間を通じて黒潮が運ぶ24℃以上の温かい極上の波。海から上がれば、世界に誇る夜市グルメ、海沿いの天然温泉、そして世界一温かく安全な人情が待っています。一生に一度は訪れたいアジアのサーフパラダイスへ。',
    'hero.badge1': '通年黒潮暖流 (厚手ウェットスーツ不要)',
    'hero.badge2': '夜市グルメ天国 (海上がりの熱々小吃＆ビール)',
    'hero.badge3': '世界屈指の治安 (一人旅＆気ままなロードトリップ)',
    'hero.badge4': '海辺の天然温泉＆先住民族の温かい文化',
    'hero.btnExplore': '台湾24大スポット探索',
    'hero.btnLearnTaiwan': '詳細を知る・台湾',
    'hero.btnQuiz': '相性スポット診断',
    'hero.stripHeader': '台湾沿岸リアルタイム海洋環境指標',
    'hero.stripSub': '黒潮暖流が巡る・台湾全土24の名所サーフブレイク',
    'hero.waterTemp': '平均水温',
    'hero.waterTempSub': '黒潮暖流・ボードショーツで快適',
    'hero.swell': '太平洋うねり',
    'hero.swellSub': '良質深海長周期 11〜14秒',
    'hero.transit': '移動手段',
    'hero.transitMode': '新幹線＋スクーター',
    'hero.transitDetail': '快適ドライブ',
    'hero.transitSub': '沿海ルートが極めて便利',
    'hero.afterSurf': '海上がりライフ',
    'hero.afterSurfMode': '夜市グルメ',
    'hero.afterSurfDetail': '＆ 温泉',
    'hero.afterSurfSub': '世界一安全で親日・友好的な島',

    // Map Section
    'map.badge': 'TAIWAN SURF MAP · PACIFIC SWELLS',
    'map.title': '台湾全土サーフブレイクマップ',
    'map.desc': '台湾の美しい海岸線と20の代表的スポット。カーソルを合わせるだけでリアルタイム波情報と解説を固定表示。',
    'map.hint': 'スポットに触れると海況データを固定表示',
    'map.pinned': '選択中：',
    'map.enterDetail': 'スポット詳細ガイドへ',
    'map.quickSwitch': '20大スポット クイック切替',
    'map.clickToPin': 'タップで固定',

    // Common
    'common.beginner': '初心者歓迎',
    'common.intermediate': '中級者向け',
    'common.advanced': '上級者オンリー',
    'common.back': 'スポット一覧へ戻る',
    'common.langSelect': '言語を選択',
  },
  ko: {
    // Navbar
    'nav.brand': '대만 서핑',
    'nav.brandEn': 'WAVES TIME TAIWAN',
    'nav.taiwanIntro': '대만 소개',
    'nav.spots': '서프 스팟',
    'nav.seasons': '사계절 스웰',
    'nav.etiquette': '서퍼 에티켓',
    'nav.planner': '여행 계획',
    'nav.quiz': '인생 스팟 찾기',

    // Hero Section
    'hero.kickerBadge': 'TAIWAN · 대만 · FORMOSA',
    'hero.kickerCoast': '1,200km 태평양 해안선',
    'hero.kickerWater': '구로시오 난류 24℃~28℃',
    'hero.kickerSafety': '세계 최고 야시장 미식과 안전',
    'hero.titleLine1': '푸른 산맥과 따뜻한 파도가 감싸는 섬,',
    'hero.titleLine2Prefix': '서핑과 여행의 궁극의 파라다이스・',
    'hero.taiwanWord': '대만',
    'hero.subtitleEn': 'WHERE EPIC PACIFIC SWELLS MEET GREEN MOUNTAINS, NIGHT MARKETS & WARM SMILES',
    'hero.desc': '장엄한 녹빛 산맥이 짙푸른 태평양으로 이어지고, 사계절 내내 구로시오 난류가 24°C 이상의 따뜻한 파도를 선사합니다. 파도를 탄 뒤에는 세계적으로 유명한 야시장 미식, 천연 해변 온천, 세상에서 가장 친절하고 안전한 미소가 기다립니다. 평생 잊지 못할 아시아의 서핑 천국으로 떠나보세요.',
    'hero.badge1': '사계절 구로시오 난류 (두꺼운 슈트 불필요)',
    'hero.badge2': '야시장 미식 천국 (서핑 후 다채로운 로컬 먹거리)',
    'hero.badge3': '세계 최고 수준의 치안 (혼자서도 안전한 로드트립)',
    'hero.badge4': '해변 천연 온천 & 따스한 원주민 문화',
    'hero.btnExplore': '대만 24대 스팟 탐색',
    'hero.btnLearnTaiwan': '대만 자세히 알아보기',
    'hero.btnQuiz': '인생 스팟 찾기',
    'hero.stripHeader': '대만 연안 실시간 해양 및 여행 지표',
    'hero.stripSub': '구로시오 난류가 흐르는 대만 전역 24곳의 클래식 스팟',
    'hero.waterTemp': '평균 수온',
    'hero.waterTempSub': '따스한 난류 · 보드숏 & 비키니',
    'hero.swell': '태평양 스웰',
    'hero.swellSub': '양질의 딥씨 롱웨이브 11~14초',
    'hero.transit': '섬 교통',
    'hero.transitMode': '고속철도 + 스쿠터',
    'hero.transitDetail': '로드트립',
    'hero.transitSub': '해안 도로 접근성 최상',
    'hero.afterSurf': '서핑 후 라이프',
    'hero.afterSurfMode': '야시장 미식',
    'hero.afterSurfDetail': '& 해변 온천',
    'hero.afterSurfSub': '세계에서 가장 안전하고 친절한 나라',

    // Map Section
    'map.badge': 'TAIWAN SURF MAP · PACIFIC SWELLS',
    'map.title': '대만 클래식 서핑 맵',
    'map.desc': '정밀한 대만 지형 윤곽과 20대 대표 스팟. 마우스를 올리면 실시간 해양 수치와 스팟 정보가 고정 표시됩니다.',
    'map.hint': '스팟에 마우스를 올리면 해양 데이터 고정',
    'map.pinned': '현재 고정: ',
    'map.enterDetail': '스팟 상세 가이드 보기',
    'map.quickSwitch': '20대 스팟 빠른 전환',
    'map.clickToPin': '클릭하여 고정',

    // Common
    'common.beginner': '초보자 환영',
    'common.intermediate': '중급자 추천',
    'common.advanced': '상급자 전용',
    'common.back': '스팟 목록으로 돌아가기',
    'common.langSelect': '언어 선택',
  },
  es: {
    // Navbar
    'nav.brand': 'Surf Taiwán',
    'nav.brandEn': 'WAVES TIME TAIWAN',
    'nav.taiwanIntro': 'Descubre Taiwán',
    'nav.spots': 'Spots de Surf',
    'nav.seasons': 'Swell por Temporada',
    'nav.etiquette': 'Reglas de Surf',
    'nav.planner': 'Planificar Viaje',
    'nav.quiz': 'Tu Spot Ideal',

    // Hero Section
    'hero.kickerBadge': 'TAIWAN · FORMOSA',
    'hero.kickerCoast': '1.200 km de Costa Pacífica',
    'hero.kickerWater': 'Corriente Cálida 24℃~28℃',
    'hero.kickerSafety': 'Mercados Nocturnos Legendarios y Máxima Seguridad',
    'hero.titleLine1': 'Donde las olas cálidas abrazan montañas verdes:',
    'hero.titleLine2Prefix': 'El paraíso definitivo del surf y la aventura · ',
    'hero.taiwanWord': 'Taiwán',
    'hero.subtitleEn': 'WHERE EPIC PACIFIC SWELLS MEET GREEN MOUNTAINS, NIGHT MARKETS & WARM SMILES',
    'hero.desc': 'Imponentes acantilados verdes cayendo directamente en el Pacífico azul, bendecidos todo el año por la corriente cálida de Kuroshio (24°C+). Al salir del agua, te esperan famosos mercados nocturnos, aguas termales junto al mar y la hospitalidad más segura del planeta. El viaje de surf de tu vida te espera en Taiwán.',
    'hero.badge1': 'Aguas Cálidas 24°C+ (Bañador y bikini todo el año)',
    'hero.badge2': 'Paraíso Gastronómico (Comida callejera y mercados)',
    'hero.badge3': 'Máxima Seguridad Mundial (Viajes en moto y carretera)',
    'hero.badge4': 'Aguas Termales Costeras y Cultura Acogedora',
    'hero.btnExplore': 'Explorar 24 Spots de Surf',
    'hero.btnLearnTaiwan': 'Conoce más sobre Taiwán',
    'hero.btnQuiz': 'Encuentra Tu Spot Ideal',
    'hero.stripHeader': 'Indicadores Marítimos y Turísticos en Tiempo Real',
    'hero.stripSub': 'Corriente Cálida de Kuroshio a lo Largo de 24 Spots Icónicos',
    'hero.waterTemp': 'Temp. del Agua',
    'hero.waterTempSub': 'Corriente Cálida de Kuroshio',
    'hero.swell': 'Swell del Pacífico',
    'hero.swellSub': 'Olas Limpias de Mar Profundo 11~14s',
    'hero.transit': 'Transporte',
    'hero.transitMode': 'Tren Rápido + Moto',
    'hero.transitDetail': 'Ruta Costera',
    'hero.transitSub': 'Carreteras Costeras Panorámicas',
    'hero.afterSurf': 'Vida Tras el Surf',
    'hero.afterSurfMode': 'Mercados Nocturnos',
    'hero.afterSurfDetail': '& Termas',
    'hero.afterSurfSub': 'La Isla Más Hospitalaria y Segura del Mundo',

    // Map Section
    'map.badge': 'TAIWAN SURF MAP · PACIFIC SWELLS',
    'map.title': 'Mapa de Spots Icónicos de Taiwán',
    'map.desc': 'Explora 20 olas legendarias alrededor de Taiwán. Pasa el cursor sobre cualquier spot para ver previsiones y guías en tiempo real.',
    'map.hint': 'Pasa el cursor o pulsa para fijar datos marítimos',
    'map.pinned': 'Fijado: ',
    'map.enterDetail': 'Ver Guía del Spot',
    'map.quickSwitch': 'Selector Rápido de 20 Spots',
    'map.clickToPin': 'Haz clic para fijar',

    // Common
    'common.beginner': 'Apto Principiantes',
    'common.intermediate': 'Nivel Intermedio',
    'common.advanced': 'Solo Expertos',
    'common.back': 'Volver a Spots',
    'common.langSelect': 'Seleccionar Idioma',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
  toggleLang: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang') as Language;
      if (['zh', 'en', 'ja', 'ko', 'es'].includes(urlLang)) {
        return urlLang;
      }
      const saved = localStorage.getItem('waves_time_taiwan_lang') as Language;
      if (['zh', 'en', 'ja', 'ko', 'es'].includes(saved)) {
        return saved;
      }
    }
    return 'zh';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('waves_time_taiwan_lang', newLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    }
  };

  const toggleLang = () => {
    const list: Language[] = ['zh', 'en', 'ja', 'ko', 'es'];
    const idx = list.indexOf(lang);
    setLang(list[(idx + 1) % list.length]);
  };

  const t = (key: string): string => {
    return translations[lang]?.[key] || translations.zh?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
