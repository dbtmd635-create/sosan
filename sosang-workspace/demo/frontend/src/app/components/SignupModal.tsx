import { useState, useEffect, useRef, useCallback } from "react";
import {
  Store, X, ArrowRight, Check,
  FileText, Users, Wrench, TrendingUp, ShoppingCart,
  CheckCircle2, Shield, Zap, Heart, ChevronLeft,
} from "lucide-react";

/* ─── 슬라이드 데이터 ──────────────────────────────────────── */
const serviceSlides = [
  {
    badge: "정부 지원사업",
    icon: FileText,
    headline: "지원금 마감, 더 이상 놓치지 마세요.",
    desc: "전국 지자체 지원금·대출·교육 정보를 업종·지역에 맞게 자동으로 알려드립니다.",
    points: ["업종·지역 맞춤 추천", "마감일 자동 알림", "신청 가이드 제공"],
    accentColor: "#f97316",
  },
  {
    badge: "사장님 커뮤니티",
    icon: Users,
    headline: "같은 고민, 혼자 하지 마세요.",
    desc: "업종별 노하우 공유, 경영 고민 상담, 창업·메뉴 분석 AI까지 함께합니다.",
    points: ["업종별 게시판", "창업·메뉴 분석 AI", "전국 사장님 네트워크"],
    accentColor: "#f59e0b",
  },
  {
    badge: "서비스 도구",
    icon: Wrench,
    headline: "수기 장부는 이제 그만, 디지털로.",
    desc: "재고관리, 매출·지출 장부, 직원 근무관리, 마진 계산기까지 모두 무료.",
    points: ["재고·매출 장부", "직원 근무관리", "마진 계산기"],
    accentColor: "#10b981",
  },
  {
    badge: "식자재 시세",
    icon: TrendingUp,
    headline: "시장 가기 전에 시세 먼저 확인하세요.",
    desc: "매일 업데이트되는 식자재 가격과 주간 추이 차트로 최적의 타이밍을 잡으세요.",
    points: ["실시간 가격 조회", "주간·월간 추이 차트", "가격 상승 알림"],
    accentColor: "#14b8a6",
  },
  {
    badge: "광장 — 직거래·공구",
    icon: ShoppingCart,
    headline: "같이 사면 더 저렴해요, 광장에서.",
    desc: "포스기, 냉장고, 테이블 등 업소용 집기를 직거래하거나 공동구매로 절감하세요.",
    points: ["직거래 장터", "공동구매 절감", "나눔 섹션"],
    accentColor: "#3b82f6",
  },
];

const benefits = [
  { icon: FileText,     text: "정부 지원사업 실시간 알림",   color: "#f97316" },
  { icon: Wrench,       text: "서비스 도구 무료 제공",   color: "#10b981" },
  { icon: TrendingUp,   text: "식자재 시세 & 가격 알림",    color: "#14b8a6" },
  { icon: Users,        text: "사장님 커뮤니티 무제한 이용", color: "#f59e0b" },
  { icon: ShoppingCart, text: "직거래·공동구매 광장 참여",   color: "#3b82f6" },
];

const TOTAL = serviceSlides.length; // 5

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin?: () => void;
}

export function SignupModal({ isOpen, onClose, onSwitchToLogin }: SignupModalProps) {
  const [current, setCurrent]       = useState(0);
  const [animDir, setAnimDir]       = useState<"up" | "down">("down");
  const [transitioning, setTrans]   = useState(false);

  /* 가입 폼 상태 */
  const [email, setEmail]           = useState("");
  const [step, setStep]             = useState<"email" | "form" | "done">("email");
  const [name, setName]             = useState("");
  const [password, setPassword]     = useState("");
  const [businessType, setBusiness] = useState("");

  const wheelLock  = useRef(false);
  const slideRef   = useRef<HTMLDivElement>(null);

  /* body 스크롤 잠금 */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* 슬라이드 이동 */
  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || transitioning) return;
    setAnimDir(next > current ? "down" : "up");
    setTrans(true);
    setTimeout(() => {
      setCurrent(next);
      setTrans(false);
    }, 300);
  }, [current, transitioning]);

  /* 마우스 휠 → 슬라이드 전환 */
  useEffect(() => {
    if (!isOpen) return;
    const el = slideRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelLock.current) return;
      wheelLock.current = true;
      setTimeout(() => { wheelLock.current = false; }, 700);
      if (e.deltaY > 0) goTo(current + 1);
      else              goTo(current - 1);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isOpen, current, goTo]);

  /* 키보드 */
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(current + 1);
      if (e.key === "ArrowLeft"  || e.key === "ArrowUp")   goTo(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, current, goTo, onClose]);

  /* 닫힐 때 초기화 */
  useEffect(() => {
    if (!isOpen) {
      setCurrent(0);
      setStep("email");
      setEmail(""); setName(""); setPassword(""); setBusiness("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const slide = serviceSlides[current];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setStep("form");
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("done");
  };
  const handleReset = () => {
    setStep("email"); setEmail(""); setName(""); setPassword(""); setBusiness("");
  };

  /* 슬라이드 애니메이션 */
  const anim = transitioning
    ? animDir === "down" ? "opacity-0 translate-y-4" : "opacity-0 -translate-y-4"
    : "opacity-100 translate-y-0";

  const inputStyle: React.CSSProperties = {
    width: "100%", height: "48px", padding: "0 16px",
    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.07)", color: "white",
    fontSize: "0.92rem", outline: "none",
  };

  return (
    /* ── 오버레이 배경 ── */
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      {/* ── 팝업 카드 ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          maxWidth: "480px",
          maxHeight: "90vh",
          borderRadius: "20px",
          background: "#131313",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.07)",
          overflowY: "auto",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── 헤더 ── */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-6 pt-5 pb-4"
          style={{ background: "#131313", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}
            >
              <Store className="w-4 h-4 text-white" />
            </div>
            <span className="text-white" style={{ fontSize: "1.05rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              소상광장
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ══════════════════════════════════════════
            ① 슬라이드 영역 (위)
        ══════════════════════════════════════════ */}
        <div
          ref={slideRef}
          className="px-6 pt-6 pb-5 select-none"
          style={{
            background: `radial-gradient(ellipse at 60% 20%, ${slide.accentColor}14 0%, transparent 65%), #131313`,
            transition: "background 0.6s ease",
          }}
        >
          {/* 배지 + 아이콘 */}
          <div className="flex items-center gap-2.5 mb-4">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: slide.accentColor + "22" }}
            >
              <slide.icon className="w-4.5 h-4.5" style={{ color: slide.accentColor, width: "18px", height: "18px" }} />
            </div>
            <span
              className="px-3 py-1 rounded-full"
              style={{
                fontSize: "0.75rem", fontWeight: 600,
                background: slide.accentColor + "20",
                color: slide.accentColor,
                border: `1px solid ${slide.accentColor}35`,
              }}
            >
              {slide.badge}
            </span>
          </div>

          {/* 콘텐츠 애니메이션 래퍼 */}
          <div className={`transition-all duration-300 ${anim}`}>
            <h2
              className="text-white mb-2"
              style={{ fontSize: "1.25rem", fontWeight: 800, lineHeight: 1.3, letterSpacing: "-0.03em" }}
            >
              {slide.headline}
            </h2>
            <p className="mb-4" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
              {slide.desc}
            </p>
            <div className="flex flex-col gap-2">
              {slide.points.map((pt) => (
                <div key={pt} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: slide.accentColor }} />
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 슬라이드 인디케이터 */}
          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-1.5">
              {serviceSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "22px" : "6px",
                    height: "6px",
                    background: i === current ? slide.accentColor : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
              휠로 서비스 보기 ↕
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", margin: "0" }} />

        {/* ══════════════════════════════════════════
            ② 가입 폼 영역 (아래)
        ══════════════════════════════════════════ */}
        <div className="px-6 py-6">

          {/* ── STEP 1: 이메일 + 혜택 ── */}
          {step === "email" && (
            <div>
              <h3
                className="text-white mb-1"
                style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.03em" }}
              >
                무료로 시작하세요
              </h3>
              <p className="mb-5" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                이메일 하나로 모든 서비스를 즉시 이용할 수 있어요.
              </p>

              {/* 혜택 목록 */}
              <div className="mb-5 rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
                {benefits.map((item, i) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < benefits.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                  >
                    <item.icon className="w-3.5 h-3.5 shrink-0" style={{ color: item.color }} />
                    <span className="flex-1" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>
                      {item.text}
                    </span>
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)" }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: "#f97316" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* 이메일 입력 */}
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                  onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                />
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  style={{
                    height: "50px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                    color: "white", fontSize: "0.97rem", fontWeight: 700,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(249,115,22,0.55)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.4)")}
                >
                  무료 가입 시작 <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="mt-4 text-center" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)" }}>
                이미 계정이 있으신가요?{" "}
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="underline transition-colors"
                  style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer" }}
                >
                  로그인
                </button>
              </p>

              {/* 신뢰 배지 */}
              <div className="flex items-center justify-center gap-5 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  { icon: Zap, text: "실시간 업데이트" },
                  { icon: Shield, text: "검증된 정보" },
                  { icon: Heart, text: "사장님 중심" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                    <item.icon className="w-3 h-3" />
                    <span style={{ fontSize: "0.7rem" }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: 정보 입력 ── */}
          {step === "form" && (
            <div>
              {/* 진행 단계 */}
              <div className="flex items-center gap-2 mb-5">
                {["이메일", "정보 입력", "완료"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: i <= 1 ? "#f97316" : "rgba(255,255,255,0.08)",
                        fontSize: "0.65rem", fontWeight: 700,
                        color: i <= 1 ? "white" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {i < 1 ? <Check className="w-3 h-3" /> : i + 1}
                    </div>
                    {i < 2 && (
                      <div
                        className="w-7 h-[2px] rounded-full"
                        style={{ background: i < 1 ? "#f97316" : "rgba(255,255,255,0.1)" }}
                      />
                    )}
                  </div>
                ))}
              </div>

              <h3 className="text-white mb-1" style={{ fontSize: "1.3rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                회원 정보 입력
              </h3>
              <p className="mb-5" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>{email}</p>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                    사장님 이름
                  </label>
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="홍길동" required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                    비밀번호
                  </label>
                  <input
                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder="8자 이상 입력해 주세요" required minLength={8} style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                    업종 선택
                  </label>
                  <select
                    value={businessType} onChange={(e) => setBusiness(e.target.value)} required
                    style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                  >
                    <option value="" style={{ background: "#1a1a1a" }}>업종을 선택해 주세요</option>
                    <option value="food" style={{ background: "#1a1a1a" }}>외식업 (식당, 카페, 분식)</option>
                    <option value="retail" style={{ background: "#1a1a1a" }}>소매업 (편의점, 마트)</option>
                    <option value="service" style={{ background: "#1a1a1a" }}>서비스업 (미용, 세탁)</option>
                    <option value="manufacturing" style={{ background: "#1a1a1a" }}>제조업 (공방, 제과)</option>
                    <option value="other" style={{ background: "#1a1a1a" }}>기타</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  style={{
                    height: "50px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                    color: "white", fontSize: "0.97rem", fontWeight: 700,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                  }}
                >
                  소상광장 시작하기 <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-center" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
                  가입 시{" "}
                  <span style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline", cursor: "pointer" }}>이용약관</span> 및{" "}
                  <span style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline", cursor: "pointer" }}>개인정보처리방침</span>에 동의합니다.
                </p>
              </form>

              <button
                onClick={() => setStep("email")}
                className="flex items-center gap-1 mt-4 transition-colors"
                style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
              >
                <ChevronLeft className="w-3.5 h-3.5" /> 이전으로
              </button>
            </div>
          )}

          {/* ── STEP 3: 완료 ── */}
          {step === "done" && (
            <div className="text-center py-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  background: "linear-gradient(135deg, #f97316, #fb923c)",
                  boxShadow: "0 10px 32px rgba(249,115,22,0.45)",
                }}
              >
                <Check className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-white mb-2" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                가입 완료!
              </h3>
              <p className="mb-1" style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)" }}>
                소상광장에 오신 것을 환영합니다 🎉
              </p>
              <p className="mb-7" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>
                {name || "사장님"}의 성공을 함께 응원할게요.
              </p>
              <div className="space-y-3">
                <button
                  onClick={onClose}
                  className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  style={{
                    height: "50px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                    color: "white", fontSize: "0.97rem", fontWeight: 700,
                    border: "none", cursor: "pointer",
                    boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                  }}
                >
                  서비스 시작하기 <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={handleReset}
                  className="w-full h-10 rounded-xl transition-all"
                  style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.3)", background: "transparent", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
                >
                  다시 입력하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
