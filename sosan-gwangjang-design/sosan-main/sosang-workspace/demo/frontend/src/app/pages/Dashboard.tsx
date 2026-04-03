import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { 
  TrendingUp, 
  MapPin, 
  Activity, 
  Download, 
  ArrowRight,
  Calculator,
  Compass,
  Lightbulb,
  Home
} from "lucide-react";

const trendData = [
  { name: "1월", value: 400 }, { name: "2월", value: 300 }, { name: "3월", value: 550 },
  { name: "4월", value: 450 }, { name: "5월", value: 700 }, { name: "6월", value: 900 },
];

const scoreData = [
  { name: "경쟁강도", score: 80 }, { name: "성장성", score: 90 },
  { name: "수익성", score: 75 }, { name: "안정성", score: 85 }, { name: "상권 매력도", score: 95 },
];

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 bg-[#141720]">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full border border-emerald-500/30">분석 완료</span>
            <p className="text-slate-400 text-sm">2026년 3월 24일 기준 데이터 반영</p>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">사장님을 위한 맞춤형 리포트</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors border border-slate-700"><Download size={16} /> <span>PDF 저장</span></button>
          <button onClick={() => navigate("/onboarding")} className="flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 rounded-xl shadow-lg transition-all"><span>새로운 분석</span></button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 카드 1: 창업/경영 시뮬레이션 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6 relative z-10"><div className="p-3 bg-slate-900 rounded-2xl border border-slate-700"><Calculator className="text-emerald-400" /></div><h2 className="text-2xl font-bold text-white">경영 개선 시뮬레이션</h2></div>
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50">
              <div><p className="text-slate-400 text-sm mb-1">예상 매출 상승액</p><p className="text-3xl font-black text-white">월 +350<span className="text-lg text-slate-400 font-medium ml-1">만원</span></p></div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center"><Activity className="text-emerald-400" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50"><p className="text-slate-400 text-sm mb-2">원가 절감 예상</p><p className="text-xl font-bold text-emerald-400">-12% 감소</p></div>
              <div className="p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50"><p className="text-slate-400 text-sm mb-2">예상 마진율</p><p className="text-xl font-bold text-white">약 32% 확보</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20"><Lightbulb className="text-emerald-400 mt-0.5 shrink-0" size={18} /><p className="text-sm text-emerald-100/90 leading-relaxed">배달 위주에서 홀 방문 고객을 유도하는 인스타그램 마케팅을 강화할 경우, 현재보다 마진율이 약 12% 개선될 것으로 분석됩니다.</p></div>
          </div>
        </motion.div>

        {/* 카드 2: 종합 분석 점수 */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-8 flex flex-col hover:border-blue-500/30 transition-colors">
          <div className="flex items-center gap-4 mb-6"><div className="p-3 bg-slate-900 rounded-2xl border border-slate-700"><Compass className="text-blue-400" /></div><h2 className="text-2xl font-bold text-white">비즈니스 건강도 점수</h2></div>
          <div className="flex items-center justify-center mb-8 flex-col">
            <div className="relative flex items-center justify-center w-40 h-40 rounded-full border-[8px] border-slate-700/50 bg-slate-900/50">
              <svg className="absolute inset-0 w-full h-full transform -rotate-90"><circle cx="50%" cy="50%" r="45%" fill="none" stroke="currentColor" strokeWidth="8" className="text-emerald-500" strokeDasharray="280" strokeDashoffset="42" strokeLinecap="round" /></svg>
              <div className="text-center"><span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-200">85</span><span className="block text-sm text-slate-400 mt-1">점 / 100</span></div>
            </div>
          </div>
          <div className="h-48 w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} /><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} /><YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} /><Tooltip cursor={{ fill: '#334155', opacity: 0.4 }} contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} /><Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} /></BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* 하단 메인 화면 이동 버튼 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-16 flex justify-center">
        <button 
          onClick={() => navigate("/home")}
          className="group flex items-center gap-3 px-12 py-5 bg-slate-800 hover:bg-slate-700 text-white font-black rounded-2xl border border-slate-700 transition-all hover:scale-105 shadow-2xl"
        >
          <Home className="w-6 h-6 text-emerald-400" />
          <span>홈으로</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </div>
  );
}