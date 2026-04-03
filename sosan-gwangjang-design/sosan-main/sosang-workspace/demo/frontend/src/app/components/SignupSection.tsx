import { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, Check,
  FileText, Users, Wrench, TrendingUp, ShoppingCart,
  CheckCircle2, Shield, Zap, Heart, ChevronLeft,
} from "lucide-react";

const serviceSlides = [
  {
    badge: "정부 지원사업",
    icon: FileText,
    headline: "지원금 마감,\n더 이상 놓치지 마세요.",
    desc: "전국 지자체 지원금·대출·교육 정보를 업종·지역에 맞게 자동으로 알려드립니다. 마감일 D-7, D-1 리마인더도 자동 발송.",
    points: ["업종·지역 맞춤 추천", "마감일 자동 알림", "신청 가이드 제공"],
    accentColor: "#f97316",
  },
  {
    badge: "사장님 커뮤니티",
    icon: Users,
    headline: "같은 고민,\n혼자 하지 마세요.",
    desc: "업종별 노하우 공유, 경영 고민 상담, 창업·메뉴 분석 AI까지. 전국 사장님 네트워크에 합류하세요.",
    points: ["업종별 게시판", "창업·메뉴 분석 AI", "전국 사장님 네트워크"],
    accentColor: "#f59e0b",
  },
  {
    badge: "서비스 도구",
    icon: Wrench,
    headline: "수기 장부는 이제 그만,\n디지털로 더 단순하게.",
    desc: "재고관리, 매출·지출 장부, 직원 근무관리, 마진 계산기까지. 앱 설치 없이 웹 브라우저에서 바로, 모두 무료.",
    points: ["재고·매출 장부", "직원 근무관리", "마진 계산기"],
    accentColor: "#10b981",
  },
  {
    badge: "식자재 시세",
    icon: TrendingUp,
    headline: "시장 가기 전에\n시세 먼저 확인하세요.",
    desc: "매일 업데이트되는 식자재 가격과 주간 추이 차트로 최적의 구매 타이밍을. 가격 목표치 알림도 설정할 수 있어요.",
    points: ["실시간 가격 조회", "주간·월간 추이 차트", "가격 상승 알림"],
    accentColor: "#14b8a6",
  },
  {
    badge: "광장 — 직거래·공구",
    icon: ShoppingCart,
    headline: "같이 사면 더 저렴해요,\n광장에서 만나요.",
    desc: "포스기, 냉장고, 테이블 등 업소용 집기를 사장님끼리 직거래하거나 공동구매로 원가를 낮추세요.",
    points: ["직거래 장터", "공동구매 절감", "나눔 섹션"],
    accentColor: "#3b82f6",
  },
];

const benefits = [
  { icon: FileText,     text: "정부 지원사업 실시간 알림",   color: "#f97316" },
  { icon: Wrench,       text: "서비스 도구 무료 제공",       color: "#10b981" },
  { icon: TrendingUp,   text: "식자재 시세 & 가격 알림",    color: "#14b8a6" },
  { icon: Users,        text: "사장님 커뮤니티 무제한 이용", color: "#f59e0b" },
  { icon: ShoppingCart, text: "직거래·공동구매 광장 참여",   color: "#3b82f6" },
];

const stats = [
  { value: "12,847", label: "가입 사장님", suffix: "명" },
  { value: "324",    label: "지원사업",    suffix: "건" },
  { value: "5,291",  label: "커뮤니티 글", suffix: "개" },
  { value: "1,830",  label: "거래 완료",   suffix: "건" },
];

const TOTAL = serviceSlides.length;

export function SignupSection() {
  const [current, setCurrent]       = useState(0);
  const [animDir, setAnimDir]       = useState<"up" | "down">("down");
  const [transitioning, setTrans]   = useState(false);

  const [email, setEmail]           = useState("");
  const [step, setStep]             = useState<"email" | "form" | "done">("email");
  const [name, setName]             = useState("");
  const [password, setPassword]     = useState("");
  const [businessType, setBusiness] = useState("");

  const wheelLock  = useRef(false);
  const slideRef   = useRef<HTMLDivElement>(null);

  const goTo = useCallback((next: number) => {
    if (next < 0 || next >= TOTAL || transitioning) return;
    setAnimDir(next > current ? "down" : "up");
    setTrans(true);
    setTimeout(() => { setCurrent(next); setTrans(false); }, 300);
  }, [current, transitioning]);

  /* 마우스 휠 → 슬라이드 전환 */
  useEffect(() => {
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
  }, [current, goTo]);

  const slide = serviceSlides[current];

  const anim = transitioning
    ? animDir === "down" ? "opacity-0 translate-y-5" : "opacity-0 -translate-y-5"
    : "opacity-100 translate-y-0";

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

  const inputStyle: React.CSSProperties = {
    width: "100%", height: "48px", padding: "0 16px",
    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.07)", color: "white",
    fontSize: "0.9rem", outline: "none",
  };

  return (
    <section id="signup-section" style={{ background: "#111111" }}>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_420px] min-h-[560px]">

          {/* ══════════════════════════════════
              왼쪽: 서비스 슬라이드
          ══════════════════════════════════ */}
          <div
            ref={slideRef}
            className="relative flex flex-col justify-between py-16 pr-0 lg:pr-16 select-none overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at 20% 50%, ${slide.accentColor}10 0%, transparent 55%)`,
              transition: "background 0.6s ease",
            }}
          >
            {/* 슬라이드 콘텐츠 */}
            <div className="flex-1 flex flex-col justify-center">
              <div className={`transition-all duration-300 ${anim}`}>
                {/* 배지 */}
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
                  style={{
                    fontSize: "0.75rem", fontWeight: 600,
                    background: slide.accentColor + "20",
                    color: slide.accentColor,
                    border: `1px solid ${slide.accentColor}38`,
                  }}
                >
                  <slide.icon style={{ width: "14px", height: "14px" }} />
                  {slide.badge}
                </span>

                {/* 헤드라인 */}
                <h2
                  className="text-white mb-5"
                  style={{
                    fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
                    fontWeight: 800,
                    lineHeight: 1.15,
                    letterSpacing: "-0.04em",
                    whiteSpace: "pre-line",
                  }}
                >
                  {slide.headline}
                </h2>

                {/* 설명 */}
                <p
                  className="mb-8 leading-relaxed max-w-md"
                  style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)" }}
                >
                  {slide.desc}
                </p>

                {/* 체크리스트 */}
                <div className="flex flex-col gap-3">
                  {slide.points.map((pt) => (
                    <div key={pt} className="flex items-center gap-3">
                      <CheckCircle2 style={{ width: "16px", height: "16px", color: slide.accentColor, flexShrink: 0 }} />
                      <span className="text-white/75" style={{ fontSize: "0.92rem", fontWeight: 500 }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 하단: 통계 + 휠 안내 */}
            <div className="mt-12">
              <div
                className="flex items-center gap-8 pb-6 mb-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              >
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-white" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>
                      {s.value}
                      <span className="ml-0.5" style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>{s.suffix}</span>
                    </p>
                    <p style={{ fontSize: "0.68rem", fontWeight: 500, color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)" }}>
                마우스 휠로 서비스를 둘러보세요 ↕ &nbsp;
                <span style={{ color: slide.accentColor + "80" }}>
                  {current + 1} / {TOTAL}
                </span>
              </p>
            </div>

            {/* 우측 구분선 (데스크탑) */}
            <div
              className="absolute right-0 top-16 bottom-16 w-px hidden lg:block"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />
          </div>

          {/* ══════════════════════════════════
              오른쪽: 가입 폼
          ══════════════════════════════════ */}
          <div
            className="flex flex-col justify-center py-16 pl-0 lg:pl-14"
            style={{ borderLeft: "none" }}
          >

            {/* ── STEP 1: 이메일 ── */}
            {step === "email" && (
              <div>
                <h3
                  className="text-white mb-1.5"
                  style={{ fontSize: "1.55rem", fontWeight: 800, letterSpacing: "-0.035em" }}
                >
                  무료로 시작하세요
                </h3>
                <p className="mb-6" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
                  이메일 하나로 모든 서비스를 즉시 이용할 수 있어요.
                </p>

                {/* 혜택 목록 */}
                <div
                  className="mb-6 rounded-xl overflow-hidden"
                  style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
                >
                  {benefits.map((item, i) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 px-4 py-3"
                      style={{ borderBottom: i < benefits.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
                    >
                      <item.icon style={{ width: "14px", height: "14px", color: item.color, flexShrink: 0 }} />
                      <span className="flex-1" style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.7)" }}>
                        {item.text}
                      </span>
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.4)" }}
                      >
                        <Check style={{ width: "10px", height: "10px", color: "#f97316" }} />
                      </div>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <input
                    type="email" value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 주소를 입력하세요"
                    required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                    onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                  />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    style={{
                      height: "50px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                      color: "white", fontSize: "0.95rem", fontWeight: 700,
                      border: "none", cursor: "pointer",
                      boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(249,115,22,0.55)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 6px 24px rgba(249,115,22,0.4)")}
                  >
                    무료 가입 시작 <ArrowRight style={{ width: "16px", height: "16px" }} />
                  </button>
                </form>

                <p className="mt-4 text-center" style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
                  이미 계정이 있으신가요?{" "}
                  <button
                    type="button"
                    className="underline"
                    style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer" }}
                  >
                    로그인
                  </button>
                </p>

                <div
                  className="flex items-center justify-center gap-5 mt-6 pt-5"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {[
                    { icon: Zap, text: "실시간 업데이트" },
                    { icon: Shield, text: "검증된 정보" },
                    { icon: Heart, text: "사장님 중심" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.2)" }}>
                      <item.icon style={{ width: "12px", height: "12px" }} />
                      <span style={{ fontSize: "0.68rem" }}>{item.text}</span>
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
                        {i < 1 ? <Check style={{ width: "12px", height: "12px" }} /> : i + 1}
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
                    <label style={{ display: "block", fontSize: "0.77rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                      사장님 이름
                    </label>
                    <input
                      type="text" value={name} onChange={e => setName(e.target.value)}
                      placeholder="홍길동" required style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.77rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                      비밀번호
                    </label>
                    <input
                      type="password" value={password} onChange={e => setPassword(e.target.value)}
                      placeholder="8자 이상 입력해 주세요" required minLength={8} style={inputStyle}
                      onFocus={e => { e.target.style.borderColor = "rgba(249,115,22,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,0.1)"; }}
                      onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.77rem", fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>
                      업종 선택
                    </label>
                    <select
                      value={businessType} onChange={e => setBusiness(e.target.value)}
                      required style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
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
                      color: "white", fontSize: "0.95rem", fontWeight: 700,
                      border: "none", cursor: "pointer",
                      boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                    }}
                  >
                    소상광장 시작하기 <ArrowRight style={{ width: "16px", height: "16px" }} />
                  </button>

                  <p className="text-center" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", lineHeight: 1.6 }}>
                    가입 시{" "}
                    <span style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline", cursor: "pointer" }}>이용약관</span> 및{" "}
                    <span style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline", cursor: "pointer" }}>개인정보처리방침</span>에 동의합니다.
                  </p>
                </form>

                <button
                  onClick={() => setStep("email")}
                  className="flex items-center gap-1 mt-4"
                  style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.25)", background: "none", border: "none", cursor: "pointer" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >
                  <ChevronLeft style={{ width: "14px", height: "14px" }} /> 이전으로
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
                  <Check style={{ width: "32px", height: "32px", color: "white", strokeWidth: 2.5 }} />
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
                    className="w-full flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                    style={{
                      height: "50px", borderRadius: "12px",
                      background: "linear-gradient(135deg, #f97316 0%, #fb923c 100%)",
                      color: "white", fontSize: "0.95rem", fontWeight: 700,
                      border: "none", cursor: "pointer",
                      boxShadow: "0 6px 24px rgba(249,115,22,0.4)",
                    }}
                  >
                    서비스 시작하기 <ArrowRight style={{ width: "16px", height: "16px" }} />
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
    </section>
  );
}
