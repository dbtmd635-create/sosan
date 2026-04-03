import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";

const questions = [
  { id: "industry", title: "어떤 업종을 고려하고 계신가요?", options: ["음식점", "카페/음료", "디저트/베이커리", "소매점", "서비스업", "아직 모르겠어요"] },
  { id: "region", title: "어느 지역에서 창업을 준비 중이신가요?", options: ["서울 강남/서초", "서울 마포/용산", "서울 성동/광진", "기타 서울", "수도권", "그 외 지방"] },
  { id: "target", title: "주력 고객층은 누구인가요?", options: ["학생", "직장인", "중장년층", "가족 단위", "특정 연령층 없음"] },
  { id: "price", title: "평균 결제 금액은 얼마인가요?", options: ["1만 원 미만", "1만 원 ~ 2만 원", "2만 원 ~ 4만 원", "4만 원 이상"] },
];

export function Questionnaire() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelectOption = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setIsAnalyzing(true);
        // [수정] 분석 완료 후 JourneyTracker 화면으로 이동!
        setTimeout(() => navigate("/onboarding/journey"), 2500); 
      }
    }, 400);
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-[#141720]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mb-8 p-6 bg-emerald-500/10 rounded-full border border-emerald-500/30">
          <Sparkles className="w-12 h-12 text-emerald-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">AI가 최적의 솔루션을 분석 중입니다</h2>
        <p className="text-slate-400 text-lg flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> 입력하신 데이터를 기반으로 리포트를 생성하고 있어요...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-[calc(100vh-64px)] flex flex-col bg-[#141720]">
      <div className="mb-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group font-bold">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> <span>이전으로</span>
        </button>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="text-slate-400 text-sm font-black whitespace-nowrap">{currentIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }} className="absolute inset-0">
            <div className="flex items-center gap-3 mb-10 text-emerald-400 bg-emerald-500/10 w-fit px-4 py-2 rounded-full border border-emerald-500/20">
              <Sparkles className="w-5 h-5" /> <span className="font-bold text-xs uppercase tracking-wider">AI Assistant Question</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-12 tracking-tight leading-tight">{currentQuestion.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, idx) => (
                <motion.button key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleSelectOption(option)} className="text-left p-6 rounded-2xl border-2 border-slate-700 bg-slate-800/60 text-slate-300 hover:border-emerald-500 hover:bg-emerald-500/20 hover:text-white transition-all font-bold text-lg">
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}