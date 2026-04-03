import { useNavigate } from "react-router";
import { Mail, Key, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // 가입 완료 후 유형 선택 화면으로 이동
    navigate("/onboarding");
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-700/50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />

        <div className="text-center mb-8">
          <div className="mx-auto bg-emerald-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-2">간편 회원가입</h2>
          <p className="text-slate-400 text-sm">3초만에 가입하고 AI 컨설팅을 시작하세요</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="email"
                placeholder="이메일 주소"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div className="relative">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-12 py-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-lg mt-6"
          >
            무료로 가입하기
          </motion.button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
          이미 계정이 있으신가요?{" "}
          <button onClick={() => navigate("/login")} className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
            로그인
          </button>
        </p>
      </motion.div>
    </div>
  );
}