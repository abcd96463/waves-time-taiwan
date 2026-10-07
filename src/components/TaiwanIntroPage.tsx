import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  ArrowLeft, 
  MapPin, 
  Waves, 
  Sun, 
  Compass, 
  Sparkles, 
  Utensils, 
  ShieldCheck, 
  Train, 
  Heart, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';
import heroImage from '../assets/images/taiwan_surf_paradise_1791375388913.jpg';

interface TaiwanIntroPageProps {
  onBack: () => void;
  onExploreSpots: () => void;
  onOpenQuiz: () => void;
}

export const TaiwanIntroPage: React.FC<TaiwanIntroPageProps> = ({
  onBack,
  onExploreSpots,
  onOpenQuiz,
}) => {
  const { lang, t } = useLanguage();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <article className="min-h-screen bg-slate-950 text-slate-100 pb-24 selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Sticky Navigation Bar */}
      <div className="sticky top-16 z-30 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors py-1 px-2.5 -ml-2.5 rounded-lg hover:bg-slate-900 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>{lang === 'zh' ? '返回' : lang === 'ja' ? '戻る' : lang === 'ko' ? '뒤로가기' : lang === 'es' ? 'Volver' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreSpots}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-cyan-400 text-slate-950 rounded-lg hover:bg-cyan-300 transition-colors shadow-sm cursor-pointer"
            >
              <Waves className="h-3.5 w-3.5" />
              <span>{t('hero.btnExplore')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative w-full min-h-[440px] sm:min-h-[520px] overflow-hidden bg-slate-900 flex items-center">
        <img
          src={heroImage}
          alt="Surfing along Taiwan stunning Pacific coast"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-75 contrast-105"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/60 text-cyan-300 font-extrabold tracking-wider uppercase text-xs mb-4 shadow-lg">
            <span>🇹🇼 FORMOSA TAIWAN</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>太平洋美麗之島</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-[1.15]">
            {lang === 'zh' ? (
              <>
                山海交融的衝浪之島，
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
                  臺灣特色與魅力全覽。
                </span>
              </>
            ) : lang === 'ja' ? (
              <>
                雄大な山々と温かい波に抱かれた島、
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
                  台湾の魅力とサーフカルチャー完全ガイド。
                </span>
              </>
            ) : lang === 'ko' ? (
              <>
                푸른 산맥과 따뜻한 파도가 감싸는 섬,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
                  대만의 매력과 서핑 문화 완벽 가이드.
                </span>
              </>
            ) : lang === 'es' ? (
              <>
                Donde las olas cálidas abrazan montañas verdes:
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
                  Guía Completa de Taiwán y su Cultura de Surf.
                </span>
              </>
            ) : (
              <>
                Where Epic Waves Meet Green Mountains:
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 mt-2">
                  The Complete Guide to Taiwan & Surf Culture.
                </span>
              </>
            )}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
            {lang === 'zh'
              ? '1,200 公里環島海岸、268 座三千公尺巍峨百嶽直入深藍太平洋。全年受黑潮暖流滋養，擁有世界級浪點、享譽全球的夜市美食與世界最溫暖安全的微笑——這是一生必訪的亞洲海島。'
              : '1,200 km of diverse coastline where 268 mountain peaks drop into the sapphire Pacific. Blessed year-round by the warm Kuroshio Current, world-class wave breaks, legendary night markets, and global top-tier safety.'}
          </p>
        </div>
      </div>

      {/* 4 Core Pillars Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-xl">
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1">太平洋環島海岸</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">1,200 <span className="text-base text-cyan-300 font-sans">km</span></div>
            <div className="text-xs text-slate-400 mt-1">沙灘、鵝卵石河口與礁石管浪</div>
          </div>
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-xl">
            <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">黑潮暖流水溫</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">24 — 28 <span className="text-base text-amber-300 font-sans">°C</span></div>
            <div className="text-xs text-slate-400 mt-1">四季溫暖 · 免穿厚重防寒衣</div>
          </div>
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-xl">
            <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-1">全球治安評比</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">TOP 1 <span className="text-base text-emerald-300 font-sans">等級</span></div>
            <div className="text-xs text-slate-400 mt-1">單人自由行、深夜漫步極致安心</div>
          </div>
          <div className="bg-slate-900/90 border border-cyan-500/30 p-4 sm:p-5 rounded-2xl shadow-xl backdrop-blur-xl">
            <div className="text-xs text-sky-400 font-bold uppercase tracking-wider mb-1">環島高鐵與公路</div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">300 <span className="text-base text-sky-300 font-sans">km/h</span></div>
            <div className="text-xs text-slate-400 mt-1">高鐵快速串連，機車汽車自駕天堂</div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-16">
        {/* Chapter 1: Surfing Paradise */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Waves className="h-4 w-4" />
            <span>CHAPTER 01 · SURFING IN TAIWAN</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            為什麼全世界衝浪客一生必來一次臺灣？
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            臺灣座落於西太平洋第一島鏈核心，得天獨厚地直接迎接自浩瀚深海奔騰而來的強勁太平洋湧浪（Pacific Groundswell）。加之深海黑潮暖流常年環繞，水質晶瑩澄澈，造就亞洲最具野性活力且四季皆有浪衝的頂級海島。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                <Sun className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">黑潮暖流的終年恩賜</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                太平洋深海暖流全年巡航臺灣東海岸與恆春半島，即使在北半球深冬，水溫依然溫暖維持在 22℃~24℃（夏季更達 28℃）。無需穿著歐美常見的 5mm 笨重防寒衣，一件防磨衣或薄防寒衣即可在晨光中盡情馳騁。
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">WSL 錦標賽主場與多元浪型</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                自宜蘭烏石港的連綿細軟沙灘、台東金樽與東河的世界衝浪聯盟（WSL）鵝卵石定點長板河口，到成功基翬與雙獅的火山礁石空心管浪。無論新手初學起乘，還是職業浪人尋找大浪，全島 24 大浪點皆能完美契合。
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">四季輪動的追浪節律</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                秋冬季（10月至3月）東北季風推動厚實太平洋長波，東海岸與北部浪壁陡峭結實；夏季（6月至9月）西南氣流讓墾丁南灣大浪成形，同時遠洋颱風湧浪（Typhoon Swell）送來史詩級頂級管浪；春季則風平浪鏡，享受悠閒晨衝。
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 2: Food & Night Markets */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Utensils className="h-4 w-4" />
            <span>CHAPTER 02 · WORLD-CLASS FOOD & NIGHT MARKETS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            浪後極致享受：享譽全球的臺灣美食與夜市文化
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            衝浪客最懂在海中划水數小時後的飢腸轆轆。在臺灣，走出海灘不到 10 分鐘，就能融入全世界最豐富精彩的美食宇宙。從清晨的熱騰騰豆漿油條，到夜晚燈火通明的熱鬧夜市，每一口都是對味蕾的極致犒賞。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-2xl">🍜</div>
              <div className="font-bold text-white text-base">紅燒牛肉麵 & 手工水餃</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                濃郁熬煮的牛骨高湯、軟嫩入口即化的厚切牛腱肉與勁道手工拉麵，上岸後補充體力的第一首選。
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-2xl">🥟</div>
              <div className="font-bold text-white text-base">爆汁小籠湯包</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                如藝術品般的薄透麵皮，包裹鮮嫩肉餡與滾燙鮮美湯汁，沾上薑絲黑醋，讓全世界饕客神魂顛倒。
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-2xl">🧋</div>
              <div className="font-bold text-white text-base">正宗波霸珍珠奶茶 & 芒果冰</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                珍奶的正宗發源地！濃郁奶茶搭配現熬 Q 彈黑糖珍珠，夏天再來一碗鋪滿香甜愛文芒果的雪花冰。
              </p>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl space-y-2">
              <div className="text-2xl">🍻</div>
              <div className="font-bold text-white text-base">港邊現撈海鮮與夜市熱炒</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                九層塔炒海蛤、酥炸蚵仔酥、現烤海魚配上冰鎮臺灣金牌啤酒，與當地浪人碰杯暢聊今日大浪。
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 3: Landscapes, Hot Springs & Nature */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="h-4 w-4" />
            <span>CHAPTER 03 · EPIC NATURE & OCEAN HOT SPRINGS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            山海相連的壯麗地貌與臨海天然溫泉
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
            臺灣是全球少數能在 1 小時車程內「從三千公尺高山直奔蔚藍海岸」的奇蹟之島。除衝浪之外，大自然更賦予了多元豐富的戶外探索體驗。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-2xl">♨️</div>
              <h3 className="text-lg font-bold text-white">海邊天然溫泉巡禮</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                宜蘭礁溪碳酸氫鈉溫泉、綠島世界罕見的海底朝日溫泉、新北金山的海邊硫磺泉。衝完浪後浸入暖呼呼的天然泉水，徹底放鬆肌肉與身心。
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-2xl">🛵</div>
              <h3 className="text-lg font-bold text-white">台11線東海岸公路自駕</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                全球公認最美沿海公路之一！右側是浩瀚無垠的太平洋，左側是青翠欲滴的海岸山脈。租輛機車頂著浪板沿海風馳騁，沿途探訪部落海景咖啡。
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-2xl">🐢</div>
              <h3 className="text-lg font-bold text-white">綠蠵龜共游與海洋生態</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                在小琉球、墾丁與綠島，海水能見度高達 20 米以上。只需浮潛或划著浪板，就能經常與悠然自得的野生綠蠵龜並肩游弋。
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 4: Safety & Convenience */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-sky-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>CHAPTER 04 · GLOBAL SAFETY & 24/7 CONVENIENCE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
            全球治安第一梯隊：單人自由行最安心的海島
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            對許多外國旅人而言，旅行中最擔心的治安問題在臺灣完全不需掛心。臺灣長期名列全球最安全友善國家排名前茅，人民純樸熱情，被公認為背包客與單人衝浪客的夢幻樂土。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-white text-base mb-1 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>路不拾遺的極致治安</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                深夜獨自漫步於街道、將手機筆電暫置咖啡廳或海邊，皆無須擔驚受怕，安全感滿分。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-white text-base mb-1 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>24小時便利超商王國</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                每百公尺就有一家 7-Eleven 或全家，隨時可提領現金、購買熱食、申辦上網卡與寄送行李。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="font-bold text-white text-base mb-1 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>臺灣最美的風景是人</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                當地居民與浪人社群極具包容心與熱情，無論在浪點或路邊問路，總能收穫真誠友善的微笑與協助。
              </p>
            </div>
          </div>
        </section>

        {/* Chapter 5: Practical Travel Guide for International Surfers */}
        <section className="bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-950 border border-cyan-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Train className="h-4 w-4" />
            <span>PRACTICAL TRAVEL GUIDE · 行前實用指南</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            外國旅人如何輕鬆出發臺灣衝浪？
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="space-y-2">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">1. 簽證入境</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                歐盟、美、加、日、韓、英、澳等 60 多國旅客享有 <span className="text-white font-bold">90 天免簽證待遇</span>。背起行囊，隨時可出發！
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">2. 機場與島內交通</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                自桃園國際機場（TPE）搭乘機場捷運 35 分鐘直達台北車站；搭乘火車 1 小時即達宜蘭烏石港浪區，或搭乘高鐵、台鐵沿海鐵路深入台東與墾丁。
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider">3. 浪板租借與住宿</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                烏石港、東河、都蘭與佳樂水皆有優質浪人青旅與專業衝浪俱樂部，提供各尺寸長短板租借與初學進階教練課程，輕裝成行無負擔。
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-base font-bold text-white">準備好開啟你的臺灣衝浪冒險了嗎？</div>
              <div className="text-xs text-slate-400 mt-0.5">點擊下方按鈕，即刻探索全島 24 大浪點海況與交通指引</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onExploreSpots}
                className="px-6 py-3 text-sm font-semibold text-slate-950 bg-cyan-400 rounded-xl hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-950/50 flex items-center gap-2 cursor-pointer"
              >
                <span>探索全臺 24 大浪點地圖</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenQuiz}
                className="px-4 py-3 text-sm font-medium text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>命定浪點測驗</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
};
