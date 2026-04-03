import { useState } from "react";
import { useNavigate } from "react-router";
import { UserPlus, Store, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export function TypeSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<"new" | "existing" | null>(null);

  // [핵심] 선택한 유형에 따라 다른 경로로 안내합니다.
  const handleNext = () => {
    if (selected === "new") {
      // 신규 창업자용 흐름 (환영 인트로)
      navigate("/onboarding/new-entrepreneur");
    } else if (selected === "existing") {
      // 기존 사장님용 흐름 (고민 상담 질문)
      navigate("/onboarding/existing/questions");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-[#141720]">
      {/* 상단 텍스트 영역 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
          현재 상황을 선택해주세요
        </h2>
        <p className="text-slate-400 text-lg md:text-xl font-light">
          맞춤형 AI 분석을 위해 가장 알맞은 유형을 알려주세요
        </p>
      </motion.div>

      {/* 카드 선택 영역 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
        <SelectionCard
          id="new"
          title="신생 창업자"
          description="처음 가게를 시작하려고 준비 중입니다. 업종, 위치, 비용 등 전반적인 가이드가 필요해요."
          icon={<UserPlus className="w-10 h-10" />}
          isSelected={selected === "new"}
          onClick={() => setSelected("new")}
        />
        <SelectionCard
          id="existing"
          title="기존 사장님"
          description="이미 가게를 운영 중입니다. 매출 상승, 마케팅, 트렌드 분석 등 운영 전략이 필요해요."
          icon={<Store className="w-10 h-10" />}
          isSelected={selected === "existing"}
          onClick={() => setSelected("existing")}
        />
      </div>

      {/* 하단 버튼 영역 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: selected ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={handleNext}
          disabled={!selected}
          className="flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl text-xl transition-all shadow-lg shadow-emerald-500/25 group"
        >
          다음 단계로
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}

// --- 공통 카드 컴포넌트 ---
function SelectionCard({
  title,
  description,
  icon,
  isSelected,
  onClick,
}: {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative flex flex-col items-center p-10 rounded-[2.5rem] border-2 text-left w-full transition-all duration-300 shadow-xl ${
        isSelected
          ? "border-emerald-500 bg-emerald-500/10 shadow-emerald-500/10"
          : "border-slate-700 bg-slate-800/50 hover:border-slate-500 hover:bg-slate-800"
      }`}
    >
      {/* 체크 표시 아이콘 */}
      <div className="absolute top-8 right-8">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
            isSelected
              ? "border-emerald-500 bg-emerald-500 text-slate-900"
              : "border-slate-600 text-transparent"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
        </div>
      </div>

      {/* 메인 아이콘 */}
      <div
        className={`p-5 rounded-2xl mb-8 ${
          isSelected ? "bg-emerald-500 text-slate-900 shadow-md shadow-emerald-500/20" : "bg-slate-700 text-slate-300"
        } transition-colors`}
      >
        {icon}
      </div>

      <h3 className={`text-2xl font-bold mb-4 ${isSelected ? "text-white" : "text-slate-200"}`}>
        {title}
      </h3>
      
      <p className={`text-center font-light leading-relaxed ${isSelected ? "text-emerald-100" : "text-slate-400"}`}>
        {description}
      </p>
    </motion.button>
  );
}