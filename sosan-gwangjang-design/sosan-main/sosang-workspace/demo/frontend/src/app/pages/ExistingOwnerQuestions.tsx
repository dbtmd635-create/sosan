import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Loader2, ArrowLeft } from "lucide-react";

// --- 기존 사장님용 맞춤 질문 데이터 ---
const questions = [
  { 
    id: "pain_point", 
    title: "현재 경영에서 가장 큰 고민은 무엇인가요?", 
    options: ["매출 증대 및 홍보", "원가 절감 및 마진 확보", "인력 관리 및 채용", "경쟁 업체 대응", "상권 트렌드 변화"] 
  },
  { 
    id: "duration", 
    title: "매장을 운영하신 지 얼마나 되셨나요?", 
    options: ["1년 미만", "1년 ~ 3년", "3년 ~ 5년", "5년 이상"] 
  },
  { 
    id: "marketing", 
    title: "현재 주로 이용하시는 홍보 채널은 무엇인가요?", 
    options: ["인스타그램/SNS", "네이버 플레이스", "배달 앱", "오프라인 홍보", "딱히 하고 있지 않음"] 
  },
  { 
    id: "sales_goal", 
    title: "목표로 하시는 월 매출 상승치는 얼마인가요?", 
    options: ["현재의 10% 증대", "현재의 30% 증대", "현재의 50% 이상 증대", "현상 유지 및 내실 강화"] 
  },
];

export function ExistingOwnerQuestions() {
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
        // 분석 애니메이션 후 리포트(Dashboard)로 이동
        setTimeout(() => navigate("/dashboard"), 2500); 
      }
    }, 400);
  };

  if (isAnalyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 text-center bg-[#141720]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="mb-8 p-6 bg-emerald-500/10 rounded-full border border-emerald-500/30">
          <Sparkles className="w-12 h-12 text-emerald-400" />
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tighter">운영 데이터를 기반으로 리포트를 생성 중입니다</h2>
        <p className="text-slate-400 text-lg flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-500" /> 사장님께 딱 맞는 매출 상승 전략을 분석하고 있어요...
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
              <Sparkles className="w-5 h-5" /> <span className="font-bold text-xs uppercase tracking-wider">Existing Owner Analysis</span>
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