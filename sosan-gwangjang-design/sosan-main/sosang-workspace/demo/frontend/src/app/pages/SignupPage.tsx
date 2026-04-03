import { useNavigate } from "react-router";
import {
  Store, ArrowRight, ChevronLeft,
  FileText, Users, Wrench, TrendingUp, ShoppingCart,
  CheckCircle2, Star, Shield, Zap, Heart,
} from "lucide-react";

// ── 서비스 데이터 정의 ──
const services = [
  {
    badge: "01 — 정부 지원사업",
    icon: FileText,
    headline: "사장님 맞춤 지원사업,\nAI비서가 찾습니다.",
    desc: "창업 준비부터 매장 경영까지, 사장님의 프로필을 분석해 꼭 필요한 지원 정보를 실시간으로 연결해 드립니다.",
    points: ["업종·지역 맞춤 추천", "AI비서 실시간 매칭", "지원사업 큐레이션"],
    accentColor: "#10b981",
    bg: "from-emerald-950/60 to-[#141720]",
  },
  {
    badge: "02 — 사장님 커뮤니티",
    icon: Users,
    headline: "같은 고민,\n혼자 하지 마세요.",
    desc: "AI 트렌드 분석, 경영 고민 상담, 창업·메뉴 분석 AI까지. 전국 사장님 커뮤니티에 합류하여 노하우를 나누세요.",
    points: ["AI 상권 트렌드 분석", "전문가 상담 연결", "활발한 정보 공유"],
    accentColor: "#34d399",
    bg: "from-emerald-950/60 to-[#141720]",
  },
  {
    badge: "03 — 서비스 도구",
    icon: Wrench,
    headline: "복잡한 매장 관리,\n디지털로 더 가볍게.",
    desc: "재고 현황부터 매출 장부, 직원 근태와 마진 계산까지. 매장 운영에 꼭 필요한 기능을 설치 없이 한눈에 관리하세요.",
    points: ["스마트 매출·지출 장부", "실시간 재고 차트", "정밀 마진 계산기"],
    accentColor: "#10b981",
    bg: "from-emerald-950/60 to-[#141720]",
  },
  {
    badge: "04 — 식자재 시세",
    icon: TrendingUp,
    headline: "시장 가기 전에\n시세 먼저 확인하세요.",
    desc: "매일 업데이트되는 전국 식자재 가격과 주간 추이 차트로 최적의 구매 타이밍을 잡으세요. 알림 설정도 가능합니다.",
    points: ["실시간 전국 가격 조회", "주간·월간 추이 분석", "가격 급등 알림"],
    accentColor: "#14b8a6",
    bg: "from-teal-950/60 to-[#141720]",
  },
  {
    badge: "05 — 광장 · 직거래·공구",
    icon: ShoppingCart,
    headline: "같이 사면 더 저렴해요,\n광장에서 만나요.",
    desc: "업소용 집기 직거래부터 공동구매까지. 사장님들과 힘을 합쳐 운영 원가를 획기적으로 낮출 수 있습니다.",
    points: ["안전한 직거래 장터", "공동구매 원가 절감", "사장님 무료 나눔"],
    accentColor: "#3b82f6",
    bg: "from-blue-950/60 to-[#141720]",
  },
];

const stats = [
  { value: "12,847", label: "가입 사장님", suffix: "명" },
  { value: "324",    label: "지원사업",    suffix: "건" },
  { value: "5,291",  label: "커뮤니티 글", suffix: "개" },
  { value: "1,830",  label: "거래 완료",   suffix: "건" },
];

export function SignupPage() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#141720", minHeight: "100vh", color: "white", fontFamily: "sans-serif" }}>

      {/* ── 상단 헤더 ── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-10 py-4"
        style={{ background: "rgba(20,23,32,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* [수정] 대시보드(HomePage)로 이동하도록 경로를 /home으로 변경 */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 transition-all hover:opacity-80 group"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", fontSize: "0.85rem" }}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 홈으로
        </button>

        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#10b981,#34d399)" }}
          >
            <Store className="w-4 h-4 text-white" />
          </div>
          <span style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.03em" }}>소상광장</span>
        </div>

        <button
          onClick={() => navigate("/register")}
          className="flex items-center gap-1.5 px-4 h-9 rounded-lg transition-all hover:brightness-110 shadow-lg shadow-emerald-500/10"
          style={{
            background: "rgba(16,185,129,0.15)", color: "#10b981",
            border: "1px solid rgba(16,185,129,0.35)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer",
          }}
        >
          무료 가입
        </button>
      </header>

      {/* ── Hero 섹션 ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">
        <h1
          className="mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", maxWidth: "850px" }}
        >
          소상공인을 위한<br />
          <span style={{ background: "linear-gradient(135deg, #10b981, #34d399)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", display: "inline-block" }}>
            종합 비즈니스 플랫폼
          </span>
        </h1>

        <p
          className="mb-10"
          style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)", maxWidth: "540px", lineHeight: 1.7 }}
        >
          창업 준비부터 매장 경영까지,<br />
          사장님의 모든 순간을 함께하는 24시간 AI 비즈니스 파트너
        </p>

        {/* 실시간 통계 바 */}
        <div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 px-8 py-6 rounded-2xl mb-12 shadow-2xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className="text-center md:px-4" style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                {s.value}
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginLeft: "3px" }}>{s.suffix}</span>
              </p>
              <p style={{ fontSize: "0.7rem", fontWeight: 500, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5개 서비스 디테일 섹션 ── */}
      {services.map((svc, idx) => (
        <section
          key={svc.badge}
          id={`service-0${idx + 1}`}
          className="relative px-6 sm:px-10 lg:px-20 py-24 overflow-hidden border-t border-white/5"
        >
          {/* 배경 그라데이션 효과 */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at ${idx % 2 === 0 ? "20% 50%" : "80% 50%"}, ${svc.accentColor}10 0%, transparent 60%)` }}
          />

          <div
            className={`relative max-w-[1100px] mx-auto grid md:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            style={{ direction: idx % 2 === 1 ? "rtl" : "ltr" }}
          >
            {/* 텍스트 콘텐츠 */}
            <div style={{ direction: "ltr" }}>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
                style={{
                  fontSize: "0.75rem", fontWeight: 700,
                  background: svc.accentColor + "15",
                  color: svc.accentColor,
                  border: `1px solid ${svc.accentColor}30`,
                }}
              >
                <svc.icon size={14} />
                {svc.badge}
              </span>

              <h2
                className="mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.04em", whiteSpace: "pre-line" }}
              >
                {svc.headline}
              </h2>

              <p
                className="mb-10 leading-relaxed text-slate-400"
                style={{ fontSize: "1.05rem", maxWidth: "460px" }}
              >
                {svc.desc}
              </p>

              <div className="flex flex-col gap-4">
                {svc.points.map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle2 size={20} style={{ color: svc.accentColor }} />
                    <span className="text-slate-300 font-medium">{pt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 비주얼 카드 섹션 */}
            <div style={{ direction: "ltr" }} className="flex items-center justify-center">
              <div
                className="relative w-full max-w-[400px] aspect-square rounded-[2.5rem] flex items-center justify-center shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, ${svc.accentColor}10, transparent)`,
                  border: `1px solid ${svc.accentColor}20`,
                }}
              >
                {/* 메인 아이콘 박스 */}
                <div
                  className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${svc.accentColor}, ${svc.accentColor}dd)`,
                    boxShadow: `0 25px 50px -12px ${svc.accentColor}50`,
                  }}
                >
                  <svc.icon size={64} color="white" strokeWidth={1.5} />
                </div>

                {/* 장식용 레이어 */}
                <div className="absolute inset-4 rounded-[2rem] border-2 border-dashed border-white/5 pointer-events-none" />

                {/* 플로팅 뱃지 (애니메이션 효과처럼 배치) */}
                {svc.points.slice(0, 2).map((pt, pi) => (
                  <div
                    key={pt}
                    className="absolute px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-md"
                    style={{
                      background: "rgba(30, 41, 59, 0.8)",
                      border: `1px solid ${svc.accentColor}40`,
                      top: pi === 0 ? "10%" : "unset",
                      bottom: pi === 1 ? "10%" : "unset",
                      right: pi === 0 ? "-5%" : "unset",
                      left: pi === 1 ? "-5%" : "unset",
                    }}
                  >
                    <p className="text-white text-xs font-bold whitespace-nowrap">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── 하단 마무리 CTA 섹션 ── */}
      <section className="relative py-32 text-center px-6 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/5 pointer-events-none" />
        
        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">소상광장에 합류하세요</h2>
        <p className="text-slate-500 max-w-lg mx-auto mb-12 leading-relaxed">
          로그인 하나로 모든 서비스를 무제한으로 이용할 수 있습니다.<br />
          사장님의 위대한 도전을 소상광장이 기술로 응원합니다.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-500 to-teal-400 text-white font-black rounded-2xl text-xl transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] hover:scale-105 hover:shadow-[0_25px_60px_rgba(16,185,129,0.5)] active:scale-95"
        >
          무료로 시작하기 <ArrowRight />
        </button>

        <div className="flex items-center justify-center gap-8 mt-20 opacity-30 grayscale">
           {[Zap, Shield, Heart].map((Icon, i) => (
             <div key={i} className="flex items-center gap-2"><Icon size={16}/> <span className="text-xs font-bold uppercase tracking-widest">Certified</span></div>
           ))}
        </div>
      </section>
    </div>
  );
}