import { useNavigate } from "react-router";
import { ArrowRight, BarChart3, Store, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-4xl mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-8 border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          정식 출시 기념 1개월 무료 체험
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          소상공인을 위한 <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 drop-shadow-sm">
            AI 사업 파트너
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          창업 준비부터 운영, 매출 상승 전략까지. 데이터와 AI가 사장님의 비즈니스 성공을 확실하게 안내합니다.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/signup")}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-lg md:text-xl transition-all shadow-lg shadow-emerald-500/25 w-full md:w-auto justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <span className="relative z-10">지금 무료로 시작하기</span>
          <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-4xl mx-auto pb-12 opacity-80"
      >
        <FeatureCard 
          icon={<Store className="w-6 h-6 text-emerald-400" />} 
          title="상권 및 입지 분석" 
          desc="AI가 최적의 매장 위치를 추천합니다." 
        />
        <FeatureCard 
          icon={<BarChart3 className="w-6 h-6 text-emerald-400" />} 
          title="실시간 트렌드 파악" 
          desc="요즘 뜨는 아이템과 고객 수요를 확인하세요." 
        />
        <FeatureCard 
          icon={<TrendingUp className="w-6 h-6 text-emerald-400" />} 
          title="매출 시뮬레이션" 
          desc="예상 비용과 수익을 미리 계산해드립니다." 
        />
      </motion.div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/60 transition-colors">
      <div className="p-3 bg-slate-900 rounded-xl mb-4 border border-slate-700">
        {icon}
      </div>
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{desc}</p>
    </div>
  );
}