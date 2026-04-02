import { Link } from "react-router";
import {
  Download, RefreshCw, BarChart3, Target, Activity, Zap, MapPin, TrendingUp, ChevronRight,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "28px",
};

/* ── 원형 게이지 ── */
function CircleGauge({ score }: { score: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative flex items-center justify-center" style={{ width: "140px", height: "140px" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke="url(#gaugeGradEx)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="gaugeGradEx" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <p style={{ fontSize: "2rem", fontWeight: 800, color: "#34d399", lineHeight: 1 }}>{score}</p>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)" }}>점 / 100</p>
      </div>
    </div>
  );
}

/* ── 공통 헤더 ── */
function ReportHeader({ onReset }: { onReset: () => void }) {
  return (
    <div className="mb-8">
      {/* 뒤로가기 */}
      <button
        onClick={onReset}
        className="flex items-center gap-1.5 mb-6 transition-all"
        style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: "0.82rem", padding: 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
      >
        <ChevronRight style={{ width: "14px", height: "14px", transform: "rotate(180deg)" }} />
        유형 선택으로 돌아가기
      </button>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full"
              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", fontSize: "0.75rem", fontWeight: 600, color: "#34d399" }}
            >
              분석 완료
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>2026년 3월 30일 기준 데이터 반영</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            기존 사장님 맞춤형 리포트
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="flex items-center gap-2 px-4 h-10 rounded-xl transition-all"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.84rem", fontWeight: 500, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <Download style={{ width: "15px", height: "15px" }} /> PDF 저장
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 h-10 rounded-xl transition-all"
            style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.15)")}
          >
            <RefreshCw style={{ width: "15px", height: "15px" }} /> 새로운 분석
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── 하단 링크 ── */
function ReportFooter() {
  return (
    <div className="mt-8 pt-6 flex flex-wrap gap-3 justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textAlign: "center", width: "100%", marginBottom: "12px" }}>
        리포트를 바탕으로 소상광장 서비스를 활용해 보세요
      </p>
      {[
        { label: "정부 지원사업 보기", path: "/support", color: "#10b981" },
        { label: "사장님 커뮤니티",    path: "/community",    color: "#34d399" },
        { label: "식자재 시세 확인",   path: "/market-price", color: "#6ee7b7" },
      ].map((item) => (
        <Link
          key={item.path} to={item.path}
          className="px-5 h-10 rounded-xl flex items-center gap-1.5 transition-all"
          style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = `${item.color}25`)}
          onMouseLeave={(e) => (e.currentTarget.style.background = `${item.color}15`)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   기존 사장님 리포트 (메인 export)
───────────────────────────────────────── */
export function ExistingResultReport({
  answers, onReset,
}: {
  answers: Record<string, string>; onReset: () => void;
}) {
  const bizType   = answers.bizType   || "카페/음료";
  const challenge = answers.challenge || "매출이 정체되어 있어요";
  const revenue   = answers.revenue   || "500만~1,000만 원";

  const isHighRev = revenue.includes("2,000만");
  const isMidRev  = revenue.includes("1,000만");

  const revenueData = {
    current:    isHighRev ? "2,000만+" : isMidRev ? "1,000만~2,000만" : "500만~1,000만",
    potential:  isHighRev ? "2,800만원" : isMidRev ? "1,600만원" : "900만원",
    growthRate: isHighRev ? "+40%" : isMidRev ? "+55%" : "+80%",
    score:      isHighRev ? 82 : isMidRev ? 74 : 68,
    comment: challenge.includes("마케팅")
      ? "SNS·배달앱 마케팅 최적화로 신규 고객 유입을 늘리면 단기간 내 유의미한 매출 상승이 기대됩니다."
      : challenge.includes("인건비")
      ? "식자재·인건비 원가 구조를 재설계하면 현재 매출에서 수익성을 크게 개선할 수 있습니다."
      : challenge.includes("배달")
      ? "플랫폼 수수료 부담을 줄이는 자사 채널 구축과 단골 고객 관리가 핵심 전략입니다."
      : "현재 상권 내 경쟁 환경을 분석하고 차별화 포인트를 강화하면 매출 정체를 돌파할 수 있습니다.",
  };

  const competitionScores = [
    { name: "마케팅",   value: challenge.includes("마케팅") ? 42 : 71 },
    { name: "원가관리", value: challenge.includes("인건비") ? 38 : 65 },
    { name: "고객관리", value: 78 },
    { name: "플랫폼",   value: challenge.includes("배달")   ? 35 : 60 },
    { name: "차별화",   value: challenge.includes("경쟁")   ? 40 : 70 },
  ];

  const strategies = challenge.includes("마케팅") ? [
    { rank: 1, title: "SNS 단골 마케팅 강화",         desc: "인스타그램 릴스·단골 고객 리뷰 이벤트로 신규 유입 +30% 달성 사례 다수", score: 97 },
    { rank: 2, title: "배달앱 피크타임 광고 운영",     desc: "점심·저녁 피크타임에 집중된 쿠폰 발행으로 주문 전환율 극대화",          score: 91 },
    { rank: 3, title: "지역 커뮤니티 협업 프로모션",   desc: "근처 사업장·아파트 단체와 제휴 할인으로 고정 수요 확보",               score: 85 },
  ] : challenge.includes("인건비") ? [
    { rank: 1, title: "스마트 스케줄링 도입",   desc: "피크 시간대 집중 배치, 비피크 감축으로 인건비 15~25% 절감 가능",           score: 96 },
    { rank: 2, title: "식자재 공동구매 참여",   desc: "소상광장 공동구매로 주요 식자재 원가 20~30% 절감 사례 확인",               score: 90 },
    { rank: 3, title: "메뉴 원가율 재분석",     desc: "수익성 낮은 메뉴를 정리하고 마진 높은 메뉴를 전면에 배치",                 score: 84 },
  ] : challenge.includes("배달") ? [
    { rank: 1, title: "자체 픽업 할인 채널 운영",   desc: "카카오 채널·네이버 예약 활용으로 수수료 없는 픽업 주문 유도",           score: 95 },
    { rank: 2, title: "단골 전용 멤버십 앱 도입",   desc: "스탬프 적립·단골 쿠폰으로 배달 플랫폼 의존도를 낮추는 전략",           score: 89 },
    { rank: 3, title: "주문 채널 다각화 전략",       desc: "배달앱 2개 이상 동시 운영 + 자사 SNS 주문 연동으로 리스크 분산",        score: 83 },
  ] : [
    { rank: 1, title: "경쟁 매장 대비 차별 메뉴 개발", desc: "상권 내 없는 시그니처 메뉴 1~2개 개발로 검색 노출 및 재방문율 향상",  score: 94 },
    { rank: 2, title: "단골 고객 리텐션 강화",         desc: "포인트 적립·생일 할인 등 CRM 프로그램 도입으로 방문 주기 단축",       score: 88 },
    { rank: 3, title: "리뷰 관리 및 평점 최적화",      desc: "배달앱·네이버 리뷰에 성실하게 응대하면 노출 알고리즘 우선 순위 상승", score: 82 },
  ];

  const revenueTrend = [
    { month: "1월", value: isHighRev ? 2100 : isMidRev ? 1050 : 520 },
    { month: "2월", value: isHighRev ? 1900 : isMidRev ? 980  : 480 },
    { month: "3월", value: isHighRev ? 2300 : isMidRev ? 1200 : 610 },
    { month: "4월", value: isHighRev ? 2200 : isMidRev ? 1150 : 570 },
    { month: "5월", value: isHighRev ? 2500 : isMidRev ? 1350 : 680 },
    { month: "6월", value: isHighRev ? 2800 : isMidRev ? 1600 : 900 },
  ];

  const trendTags = bizType.includes("카페") ? ["#감성카페", "#시그니처음료", "#카페창업", "#스페셜티"]
    : bizType.includes("음식")               ? ["#혼밥트렌드", "#배달최적화", "#가성비맛집", "#단골관리"]
    :                                          ["#소상공인", "#매출상승", "#원가절감", "#마케팅전략"];

  const barColors = ["#10b981", "#34d399", "#10b981", "#34d399", "#10b981"];

  return (
    <div style={{ background: "#141720", minHeight: "100vh", color: "white", padding: "32px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ReportHeader onReset={onReset} />

        {/* 행 1: 매출 현황 분석 + 경영 역량 점수 */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* 매출 현황 분석 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.18)" }}>
                <BarChart3 style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>매출 현황 및 성장 여력 분석</h3>
            </div>
            <div className="mb-6">
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>현재 월 매출 구간</p>
              <div className="flex items-center justify-between">
                <p style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  {revenueData.current}<span style={{ fontSize: "1rem", fontWeight: 500 }}>만원</span>
                </p>
                <Activity style={{ width: "22px", height: "22px", color: "#10b981" }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px" }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>개선 시 예상 매출</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#34d399" }}>{revenueData.potential}</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px" }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>매출 성장 여력</p>
                <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#34d399" }}>{revenueData.growthRate}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)" }}>
              <Zap style={{ width: "16px", height: "16px", color: "#34d399", flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{revenueData.comment}</p>
            </div>
          </div>

          {/* 경영 역량 점수 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.18)" }}>
                <Target style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>경영 역량 현황 점수</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <CircleGauge score={revenueData.score} />
              <div className="flex-1 w-full" style={{ height: "160px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitionScores} barSize={16}>
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {competitionScores.map((entry, i) => (
                        <Cell key={i} fill={entry.value < 50 ? "#ef4444" : barColors[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 행 2: AI 맞춤 개선 전략 + 매출 트렌드 */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* AI 맞춤 개선 전략 Top 3 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.18)" }}>
                <MapPin style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>AI 맞춤 개선 전략 Top 3</h3>
            </div>
            <div className="flex flex-col gap-3">
              {strategies.map((s) => (
                <div
                  key={s.rank}
                  className="flex items-start gap-4 rounded-xl p-4 transition-all"
                  style={{
                    background: s.rank === 1 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                    border:     s.rank === 1 ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: s.rank === 1 ? "#10b981" : "rgba(255,255,255,0.1)", color: s.rank === 1 ? "white" : "rgba(255,255,255,0.4)", fontSize: "0.8rem", fontWeight: 700 }}
                  >
                    {s.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.94rem", fontWeight: 600, marginBottom: "3px" }}>{s.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{s.desc}</p>
                  </div>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#34d399", whiteSpace: "nowrap" }}>{s.score}점</span>
                </div>
              ))}
            </div>
          </div>

          {/* 업종 매출 트렌드 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
                <TrendingUp style={{ width: "17px", height: "17px", color: "#f97316" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>업종 매출 트렌드 전망</h3>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>최근 6개월 및 AI 예측 성장 추이</p>
              </div>
            </div>
            <div style={{ height: "170px", marginTop: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }}
                    formatter={(v: number) => [`${v.toLocaleString()}만원`, "매출"]}
                  />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {trendTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.76rem", color: "rgba(255,255,255,0.45)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ReportFooter />
      </div>
    </div>
  );
}
