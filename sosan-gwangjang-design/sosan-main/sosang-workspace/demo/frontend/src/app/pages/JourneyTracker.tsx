import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight,
  PieChart,
  Wallet,
  Building,
  FileText,
  Briefcase,
  Store,
  Tag,
  PartyPopper
} from "lucide-react";

// --- 창업 8단계 데이터 정의 ---
const STAGES = [
  { id: 1, title: '창업 방향 설정', desc: '어떤 사업을 할지 결정해요', icon: Briefcase },
  { id: 2, title: '상권 분석 및 입지 선정', desc: '가게를 열 위치를 정해볼 차례예요', icon: MapPin },
  { id: 3, title: '사업 계획 수립', desc: '예산과 수익 구조를 계획해요', icon: PieChart },
  { id: 4, title: '점포 확보', desc: '실제 계약할 매장을 찾아요', icon: Building },
  { id: 5, title: '인허가 및 등록', desc: '필요한 서류를 챙겨보아요', icon: FileText },
  { id: 6, title: '인테리어 및 설비', desc: '매장을 멋지게 꾸며요', icon: Store },
  { id: 7, title: '메뉴 및 가격 설정', desc: '판매할 상품과 가격을 정해요', icon: Tag },
  { id: 8, title: '오픈 준비', desc: '마지막으로 점검해볼까요?', icon: PartyPopper },
];

export function JourneyTracker() {
  const navigate = useNavigate();
  // 현재 단계 인덱스 (0~8)
  const [currentStageIdx, setCurrentStageIdx] = useState(1); 

  const progress = Math.round((currentStageIdx / STAGES.length) * 100);

  const handleNext = () => {
    setCurrentStageIdx((prev) => Math.min(prev + 1, STAGES.length));
  };

  const currentStage = STAGES[currentStageIdx];

  // ────────────────── 모든 단계 완료 화면 ──────────────────
  if (currentStageIdx === STAGES.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-[#141720]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl mx-auto z-10 bg-slate-800/60 p-12 rounded-3xl border border-slate-700 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="mx-auto bg-emerald-500/10 w-24 h-24 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.3)] relative z-10">
            <PartyPopper className="w-12 h-12 text-emerald-400" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight relative z-10">
            이제 사장님이 되실<br />준비가 완료되었습니다!
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-10 font-light relative z-10">
            그동안 정말 고생 많으셨어요. <br/>가게 운영을 본격적으로 시작해볼까요?
          </p>

          {/* [수정됨] 클릭 시 /home (HomePage.tsx) 경로로 이동 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
            className="w-full group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-lg transition-all shadow-xl shadow-emerald-500/25 justify-center overflow-hidden z-10"
          >
            <span>기존 사장님 모드로 전환하기</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // ────────────────── 단계별 진행 화면 ──────────────────
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-64px)] flex flex-col md:flex-row gap-8 bg-[#141720]">
      {/* Sidebar / Timeline */}
      <div className="w-full md:w-80 shrink-0">
        <div className="sticky top-24 bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 backdrop-blur-sm shadow-xl">
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg mb-2">창업 준비 진행도</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
                {progress}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 w-full h-full -translate-x-full animate-pulse" />
              </motion.div>
            </div>
          </div>

          <div className="space-y-4">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStageIdx;
              const isCurrent = idx === currentStageIdx;

              return (
                <div key={stage.id} className="relative flex items-start gap-4">
                  {idx !== STAGES.length - 1 && (
                    <div 
                      className={`absolute left-[11px] top-8 w-0.5 h-full -z-10 transition-colors duration-500 ${
                        isCompleted ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                    />
                  )}
                  
                  <div className="mt-1 relative z-10 bg-slate-800 rounded-full">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 bg-emerald-500/10 rounded-full" />
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full border-2 border-emerald-400 flex items-center justify-center bg-slate-900 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                        <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                      </div>
                    ) : (
                      <Circle className="w-6 h-6 text-slate-600" />
                    )}
                  </div>

                  <div className={`flex-1 pb-4 transition-colors duration-300 ${isCurrent ? 'opacity-100' : isCompleted ? 'opacity-70' : 'opacity-40'}`}>
                    <p className={`font-semibold text-sm ${isCurrent ? 'text-emerald-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'}`}>
                      단계 {stage.id}
                    </p>
                    <p className={`font-bold ${isCurrent ? 'text-white text-lg' : 'text-slate-200 text-base'}`}>
                      {stage.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStageIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-4 border border-emerald-500/20">
                <currentStage.icon className="w-4 h-4" />
                <span>현재 단계</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                {currentStage.title}
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-light">
                {currentStage.desc}
              </p>
            </div>

            {/* Stage specific content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {renderStageContent(currentStageIdx)}
            </div>

            <div className="mt-auto pt-8 border-t border-slate-800 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="group flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-lg transition-all shadow-lg shadow-emerald-500/25"
              >
                <span>다음 단계로 진행하기</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ────────────────── 상세 단계 콘텐츠 렌더링 ──────────────────
function renderStageContent(stageIdx: number) {
  switch (stageIdx) {
    case 1: // 상권 분석 및 입지 선정 (STAGES[1]에 해당)
      return (
        <>
          <Card
            title="상권 비교 분석"
            icon={<MapPin className="w-6 h-6 text-indigo-400" />}
            subtitle="객사 vs 서신동 비교"
            color="indigo"
          >
            <div className="space-y-4 mt-4 text-white">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">유동인구</span>
                <span className="font-medium bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">객사 압승 🔥</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">평균 임대료</span>
                <span className="font-medium bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">객사가 30% 높음 💰</span>
              </div>
              <div className="mt-4 p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                <p className="text-indigo-300 text-sm font-medium mb-1">AI의 추천</p>
                <p className="text-indigo-100 font-bold text-sm">서신동 (초기 자본 절약 & 경쟁도 낮음)</p>
              </div>
            </div>
          </Card>

          <Card
            title="상권 DNA 분석"
            icon={<TrendingUp className="w-6 h-6 text-blue-400" />}
            subtitle="객사 상권 핵심 요약"
            color="blue"
          >
            <div className="mt-4 flex flex-wrap gap-2">
              {["20대 비율 65%", "카페 밀집 지역", "트렌드 민감도 최상", "주말 저녁 피크"].map((tag, i) => (
                <span key={i} className="px-3 py-1.5 bg-slate-800 text-blue-300 text-[11px] font-bold rounded-lg border border-slate-700">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
              <p className="text-slate-300 text-xs leading-relaxed">
                SNS 감성의 트렌디한 인테리어가 필수적이며, 회전율을 높이는 전략이 유리합니다.
              </p>
            </div>
          </Card>

          <Card
            title="위험 요소 알림"
            icon={<AlertTriangle className="w-6 h-6 text-rose-400" />}
            subtitle="창업 경고 시그널"
            color="rose"
            className="md:col-span-2"
          >
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <div className="flex-1 p-4 bg-rose-500/10 rounded-xl border border-rose-500/20 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <div>
                  <h4 className="text-rose-200 font-bold mb-1 text-sm">동일 업종 과다</h4>
                  <p className="text-rose-200/70 text-xs">반경 500m 내 유사 업종 카페 42개로 경쟁이 매우 심화되어 있습니다.</p>
                </div>
              </div>
              <div className="flex-1 p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                <div>
                  <h4 className="text-amber-200 font-bold mb-1 text-sm">상가 공실률 증가</h4>
                  <p className="text-amber-200/70 text-xs">최근 3개월간 메인 거리 이면도로의 공실률이 5% 상승했습니다.</p>
                </div>
              </div>
            </div>
          </Card>
        </>
      );
    case 2: // 사업 계획 수립
      return (
        <>
          <Card
            title="업종별 수익성 비교"
            icon={<PieChart className="w-6 h-6 text-emerald-400" />}
            subtitle="카페 vs 음식점"
            color="emerald"
          >
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700">
                <div>
                  <p className="text-slate-400 text-[10px] mb-1">카페 예상 월 순수익</p>
                  <p className="text-white font-bold text-sm">약 300만원</p>
                </div>
                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[60%] h-full bg-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800 rounded-xl border border-slate-700">
                <div>
                  <p className="text-slate-400 text-[10px] mb-1">음식점 예상 월 순수익</p>
                  <p className="text-white font-bold text-sm">약 450만원</p>
                </div>
                <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-[90%] h-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </Card>
          <Card
            title="초기 투자 예산"
            icon={<Wallet className="w-6 h-6 text-amber-400" />}
            subtitle="예상 비용 산출"
            color="amber"
          >
             <div className="mt-4 space-y-2">
              <div className="flex justify-between text-xs pb-1 border-b border-white/5">
                <span className="text-slate-400">보증금</span>
                <span className="text-white">3,000만원</span>
              </div>
              <div className="flex justify-between text-xs pb-1 border-b border-white/5">
                <span className="text-slate-400">인테리어</span>
                <span className="text-white">4,500만원</span>
              </div>
              <div className="flex justify-between text-lg pt-2">
                <span className="text-amber-400 font-bold">총 합계</span>
                <span className="text-amber-400 font-bold">9,000만원</span>
              </div>
            </div>
          </Card>
        </>
      );
    default:
      return (
        <Card
          title="AI 컨설팅 진행 중"
          icon={<CheckCircle2 className="w-6 h-6 text-slate-400" />}
          subtitle="데이터를 수집하고 있어요"
          color="slate"
          className="md:col-span-2 opacity-60"
        >
          <div className="h-24 flex items-center justify-center">
            <p className="text-slate-400 text-sm">해당 단계에 맞는 리포트가 준비중입니다.</p>
          </div>
        </Card>
      );
  }
}

// ────────────────── 공통 컴포넌트: 단계 체크 아이템 ──────────────────
function CheckItem({ text, done }: { text: string; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-xl border ${done ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-800 border-slate-700'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${done ? 'border-emerald-500 bg-emerald-500 text-slate-900' : 'border-slate-500 text-transparent'}`}>
        <CheckCircle2 className="w-3.5 h-3.5" />
      </div>
      <span className={`text-sm ${done ? 'text-emerald-100 line-through opacity-70' : 'text-slate-200'}`}>{text}</span>
    </div>
  );
}

// ────────────────── 공통 컴포넌트: 카드 ──────────────────
function Card({ 
  title, 
  subtitle, 
  icon, 
  children, 
  color = "emerald",
  className = "" 
}: { 
  title: string; 
  subtitle: string; 
  icon: React.ReactNode; 
  children: React.ReactNode; 
  color?: "emerald" | "indigo" | "rose" | "amber" | "blue" | "slate";
  className?: string;
}) {
  const hoverColors = {
    emerald: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
    indigo: "hover:border-indigo-500/50 hover:shadow-indigo-500/10",
    rose: "hover:border-rose-500/50 hover:shadow-rose-500/10",
    amber: "hover:border-amber-500/50 hover:shadow-amber-500/10",
    blue: "hover:border-blue-500/50 hover:shadow-blue-500/10",
    slate: "hover:border-slate-500/50",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className={`text-left w-full bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-6 transition-all duration-300 shadow-xl group ${hoverColors[color]} ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
          <p className="text-slate-400 text-[11px] font-medium">{subtitle}</p>
        </div>
        <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-700 group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      {children}
    </motion.div>
  );
}