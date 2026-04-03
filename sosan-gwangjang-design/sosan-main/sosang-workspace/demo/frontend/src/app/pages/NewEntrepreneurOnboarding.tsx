import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function NewEntrepreneurOnboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl mx-auto z-10"
      >
        <div className="mx-auto bg-emerald-500/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <Sparkles className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
          예비 사장님이시군요!
        </h1>
        <p className="text-xl md:text-2xl text-slate-400 mb-16 font-light">
          창업 준비를 하나씩 도와드릴게요
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/onboarding/questions")}
          className="group relative inline-flex items-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xl md:text-2xl transition-all shadow-xl shadow-emerald-500/25 w-full md:w-auto justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10">시작하기</span>
          <ArrowRight className="w-7 h-7 relative z-10 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>
    </div>
  );
}