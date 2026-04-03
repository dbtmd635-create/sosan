import { useState, useEffect, useMemo } from "react";
import { 
  TrendingUp, RefreshCw, Search, AlertTriangle, 
  ArrowUpRight, ArrowDownRight, Minus, Flame,
  ChevronUp, ChevronDown, Star, Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// --- 1. 타입 정의 ---
type PriceDirection = "up" | "down" | "stable";
interface Ingredient {
  id: number; name: string; category: string; price: number;
  unit: string; change: number; changePercent: number; direction: PriceDirection;
  stats: { high: number; highDate: string; low: number; lowDate: string; avg: number; };
  trendData: { dateLabel: string; fullDate: string; price: number }[]; 
  isHotHighlight: boolean; 
  updatedAt: string;
}

// --- 2. 그래프 컴포넌트 ---
const PollcentChart = ({ data }: { data: any[] }) => {
  if (data.length < 2) return <div className="h-24 flex items-center justify-center text-xs text-gray-700 bg-black/10 rounded-2xl">데이터 부족</div>;
  return (
    <div className="h-32 w-full mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, bottom: 20, left: 15 }}>
          <XAxis dataKey="dateLabel" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6b7280' }} interval={0} ticks={[data[0].dateLabel, data[data.length - 1].dateLabel]} />
          <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide={true} />
          <Tooltip content={({ active, payload }: any) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#1a1d27] border border-gray-800 p-2 rounded-lg shadow-xl text-[10px]">
                  <p className="text-gray-500 mb-0.5">{payload[0].payload.fullDate}</p>
                  <p className="font-bold text-white">{payload[0].value.toLocaleString()}원</p>
                </div>
              );
            }
            return null;
          }} cursor={{ stroke: '#374151', strokeDasharray: '3 3' }} />
          <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} dot={{ r: 3, fill: '#10b981', strokeWidth: 0 }} activeDot={{ r: 5, strokeWidth: 0 }} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- 3. 메인 컴포넌트 ---
export function MarketPrice() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataDate, setDataDate] = useState("");
  
  // --- [즐겨찾기 상태] localStorage에서 초기값 불러오기 ---
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("sosang_favs");
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = import.meta.env.VITE_KAMIS_KEY;
  const USER_ID = import.meta.env.VITE_KAMIS_ID;

  // 즐겨찾기 상태가 변할 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("sosang_favs", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const formatStatsDate = (dateStr: string) => dateStr ? dateStr.substring(2).replace(/-/g, '.') : "";
  const formatYoilLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const yoilArr = ['일', '월', '화', '수', '목', '금', '토'];
    return `${month}/${day}(${yoilArr[date.getDay()]})`;
  };

  useEffect(() => {
    const fetchKamisData = async () => {
      try {
        setIsLoading(true);
        const getFormattedDate = (daysAgo: number) => {
          const d = new Date();
          d.setDate(d.getDate() - daysAgo);
          return d.toISOString().split('T')[0];
        };

        let resultData = null;
        let usedOffset = 0;

        for (let i = 0; i <= 7; i++) {
          const targetDate = getFormattedDate(i);
          const response = await fetch(
            `/api-kamis/service/price/xml.do?action=dailyPriceByCategoryList` +
            `&p_product_cls_code=01&p_item_category_code=200&p_regday=${targetDate}` +
            `&p_cert_key=${API_KEY}&p_cert_id=${USER_ID}&p_returntype=json`
          );
          const text = await response.text();
          if (text.trim().startsWith("<!DOCTYPE")) continue;
          const parsed = JSON.parse(text);
          if (parsed.data !== "200" && parsed.data?.item) {
            resultData = parsed.data.item;
            usedOffset = i;
            break;
          }
        }

        if (!resultData) throw new Error("데이터를 가져올 수 없습니다.");
        setDataDate(getFormattedDate(usedOffset));

        const rawItems = Array.isArray(resultData) ? resultData : [resultData];
        const mappedData: Ingredient[] = rawItems.map((item: any, index: number) => {
          const safeParse = (val: any) => parseInt(val?.toString().replace(/[^0-9]/g, "") || "0") || 0;

          const p_today = safeParse(item.dpr1);
          const p_yesterday = safeParse(item.dpr2);
          const p_1week = safeParse(item.dpr3);
          const p_2week = safeParse(item.dpr4);
          const p_1month = safeParse(item.dpr5);
          
          const points = [
            { price: p_today, date: getFormattedDate(usedOffset) },
            { price: p_yesterday, date: getFormattedDate(usedOffset + 1) },
            { price: p_1week, date: getFormattedDate(usedOffset + 7) },
            { price: p_2week, date: getFormattedDate(usedOffset + 14) },
            { price: p_1month, date: getFormattedDate(usedOffset + 30) },
          ].filter(p => p.price > 0);

          const highPoint = points.reduce((max, p) => p.price > max.price ? p : max, points[0]);
          const lowPoint = points.reduce((min, p) => p.price < min.price ? p : min, points[0]);
          const avg = Math.round(points.reduce((a, b) => a + b.price, 0) / points.length);

          const diff = p_yesterday !== 0 ? p_today - p_yesterday : 0;
          const percent = p_yesterday !== 0 ? parseFloat(((diff / p_yesterday) * 100).toFixed(1)) : 0;

          return {
            id: index,
            name: item.item_name,
            category: "채소",
            price: p_today,
            unit: item.unit,
            change: diff,
            changePercent: percent,
            isHotHighlight: percent >= 5,
            direction: p_yesterday === 0 || diff === 0 ? "stable" : diff > 0 ? "up" : "down",
            stats: { high: highPoint.price, highDate: formatStatsDate(highPoint.date), low: lowPoint.price, lowDate: formatStatsDate(lowPoint.date), avg },
            trendData: points.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(p => ({
              fullDate: p.date, dateLabel: formatYoilLabel(p.date), price: p.price
            })),
            updatedAt: item.regday,
          };
        });

        setIngredients(mappedData);
      } catch (error: any) {
        setErrorMsg(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchKamisData();
  }, [API_KEY, USER_ID]);

  // 검색, 급등, 즐겨찾기 필터링 로직
  const { filtered, hotItems, favoriteItems } = useMemo(() => {
    const searchFiltered = ingredients.filter(i => i.name.includes(searchQuery));
    return { 
      filtered: searchFiltered, 
      hotItems: searchFiltered.filter(i => i.isHotHighlight),
      favoriteItems: searchFiltered.filter(i => favorites.includes(i.name))
    };
  }, [searchQuery, ingredients, favorites]);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen bg-[#141720] text-emerald-400 font-bold">시세 분석 중...</div>;

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12 min-h-screen bg-[#141720] text-white">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-2"><TrendingUp className="text-emerald-400" /> 실시간 식자재 시세</h1>
          <p className="text-gray-400">전주대 캡스톤 : 사장님을 위한 맞춤형 가격 대시보드</p>
        </div>
        <div className="text-xs text-gray-600 bg-white/5 px-3 py-1 rounded-full">기준일: {dataDate}</div>
      </header>

      {/* --- 즐겨찾기 섹션 (관심 품목) --- */}
      {favoriteItems.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-black mb-6 text-emerald-400 flex items-center gap-2">
            <Star className="fill-emerald-400" /> 사장님 관심 품목
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteItems.map(item => <PriceCard key={`fav-${item.id}`} item={item} isFav toggleFav={toggleFavorite} />)}
          </div>
        </section>
      )}

      {/* 급등 품목 섹션 */}
      {hotItems.length > 0 && (
        <section className="mb-12 p-8 bg-amber-950/20 border-2 border-amber-500/40 rounded-3xl">
          <h2 className="text-2xl font-black mb-6 text-orange-400 flex items-center gap-2"><Flame /> 가격 급등 주의보</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotItems.map(item => <PriceCard key={`hot-${item.id}`} item={item} isHot toggleFav={toggleFavorite} isFav={favorites.includes(item.name)} />)}
          </div>
        </section>
      )}

      <div className="relative mb-10 group">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 group-focus-within:text-emerald-400 transition-colors" />
        <input className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="품목명을 검색하세요..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(item => <PriceCard key={item.id} item={item} isFav={favorites.includes(item.name)} toggleFav={toggleFavorite} />)}
      </div>
    </div>
  );
}

// --- 가격 카드 컴포넌트 ---
function PriceCard({ item, isHot, isFav, toggleFav }: { item: Ingredient, isHot?: boolean, isFav: boolean, toggleFav: (n: string) => void }) {
  return (
    <div className={`bg-white/5 border border-white/10 rounded-[32px] p-6 transition-all hover:bg-white/10 ${isHot ? 'border-orange-500/50' : ''}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-2 py-0.5 bg-emerald-500/10 rounded-md text-emerald-400 text-[10px] font-bold mb-1.5 uppercase">{item.category}</span>
          <h3 className="text-2xl font-black">{item.name} <span className="text-xs text-gray-500 font-normal">{item.unit}</span></h3>
        </div>
        <button 
          onClick={() => toggleFav(item.name)}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <Star className={`w-6 h-6 ${isFav ? 'fill-yellow-400 stroke-yellow-400' : 'text-gray-600'}`} />
        </button>
      </div>
      
      <div className="flex justify-between items-end mb-4">
        <div className="text-4xl font-black leading-none">{item.price.toLocaleString()}원</div>
        <div className={`text-sm font-black flex items-center ${item.direction === 'up' ? 'text-red-400' : 'text-blue-400'}`}>
          {item.direction === 'up' ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
          {item.changePercent}%
        </div>
      </div>
      
      <PollcentChart data={item.trendData} />

      <div className="mt-6 p-5 bg-black/30 rounded-2xl space-y-3 text-xs">
        <div className="flex justify-between items-center text-emerald-400 font-bold">
          <span className="flex items-center gap-1.5"><ChevronUp size={14}/> 최고가 ({item.stats.highDate})</span>
          <span>{item.stats.high.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center text-gray-400 border-t border-white/5 pt-2">
          <span className="flex items-center gap-1.5"><Minus size={14}/> 평균가</span>
          <span>{item.stats.avg.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between items-center text-red-400 font-bold border-t border-white/5 pt-2">
          <span className="flex items-center gap-1.5"><ChevronDown size={14}/> 최저가 ({item.stats.lowDate})</span>
          <span>{item.stats.low.toLocaleString()}원</span>
        </div>
      </div>
    </div>
  );
}