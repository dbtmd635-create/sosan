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
        <circle cx="70" cy="70" r={r} fill="none" stroke="url(#gaugeGradEx)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 70 70)" style={{ transition: "stroke-dashoffset 1s ease" }} />
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
            <span className="inline-flex items-center px-3 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", fontSize: "0.75rem", fontWeight: 600, color: "#34d399" }}>
              분석 완료
            </span>
            <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>2026년 4월 기준 데이터 반영</span>
          </div>
          <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
            기존 사장님 맞춤형 리포트
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {}} className="flex items-center gap-2 px-4 h-10 rounded-xl transition-all" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.84rem", fontWeight: 500, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}>
            <Download style={{ width: "15px", height: "15px" }} /> PDF 저장
          </button>
          <button onClick={onReset} className="flex items-center gap-2 px-4 h-10 rounded-xl transition-all" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#34d399", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.25)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.15)")}>
            <RefreshCw style={{ width: "15px", height: "15px" }} /> 새로운 분석
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   기존 사장님 리포트 (메인 export)
───────────────────────────────────────── */
export function ExistingResultReport({ answers, onReset }: { answers: Record<string, string>; onReset: () => void }) {
  const revenue   = answers.revenue   || "500만~1,000만 원";
  const challenge = answers.challenge || "매출이 정체되어 있어요";

  const isHighRevenue = revenue.includes("2,000");
  const isMidRevenue  = revenue.includes("1,000");

  const score = isHighRevenue ? 82 : isMidRevenue ? 74 : 61;

  const trendData = [
    { month: "11월", value: isHighRevenue ? 2100 : isMidRevenue ? 1200 : 480 },
    { month: "12월", value: isHighRevenue ? 2400 : isMidRevenue ? 1350 : 520 },
    { month: "1월",  value: isHighRevenue ? 2200 : isMidRevenue ? 1180 : 490 },
    { month: "2월",  value: isHighRevenue ? 2600 : isMidRevenue ? 1420 : 560 },
    { month: "3월",  value: isHighRevenue ? 2450 : isMidRevenue ? 1300 : 510 },
    { month: "4월",  value: isHighRevenue ? 2800 : isMidRevenue ? 1550 : 590 },
  ];

  const skillScores = [
    { name: "마케팅", value: isHighRevenue ? 78 : 55 },
    { name: "원가관리", value: isHighRevenue ? 85 : isMidRevenue ? 70 : 48 },
    { name: "고객관리", value: isHighRevenue ? 90 : 65 },
    { name: "운영효율", value: isHighRevenue ? 72 : 60 },
    { name: "디지털화", value: isHighRevenue ? 68 : 42 },
  ];
  const barColors = ["#10b981", "#34d399", "#10b981", "#34d399", "#10b981"];

  const strategies = challenge.includes("매출")
    ? [
        { icon: "📊", title: "데이터 기반 메뉴 최적화", desc: "최근 3개월 판매 데이터 분석 결과, 상위 20% 메뉴가 전체 매출의 68%를 차지합니다. 하위 메뉴를 정리하고 인기 메뉴 중심으로 재편하세요." },
        { icon: "📱", title: "SNS 마케팅 강화", desc: "동종 업계 대비 온라인 노출이 40% 낮습니다. 인스타그램·카카오채널 운영으로 신규 고객 유입을 늘리세요." },
        { icon: "🎯", title: "재방문 고객 프로그램", desc: "스탬프 카드 또는 멤버십 도입으로 재방문율을 현재 대비 25% 이상 높일 수 있습니다." },
      ]
    : challenge.includes("마케팅")
    ? [
        { icon: "📱", title: "카카오 채널 개설", desc: "무료로 시작할 수 있는 카카오채널을 통해 단골 고객에게 신메뉴·이벤트 소식을 직접 전달하세요." },
        { icon: "🏷️", title: "네이버 플레이스 최적화", desc: "사진 10장 이상 업로드, 영업시간 정확히 설정, 리뷰 답글 작성으로 검색 노출 순위를 올리세요." },
        { icon: "🎁", title: "오픈런 이벤트 기획", desc: "주 1회 한정 메뉴 또는 얼리버드 할인으로 SNS 바이럴을 유도하세요." },
      ]
    : [
        { icon: "💰", title: "원가율 점검", desc: "식자재 원가율이 업계 평균(30%)보다 높다면, 발주량 조정과 로스 관리부터 시작하세요." },
        { icon: "⚡", title: "배달 채널 수수료 협상", desc: "배달앱 수수료가 부담이라면 자체 배달 앱(배민1, 쿠팡이츠) 외에 전화 주문 채널을 병행하세요." },
        { icon: "📦", title: "공동 구매 활용", desc: "소상광장 공동구매 기능으로 주변 사장님들과 함께 식자재를 대량 구매해 원가를 줄이세요." },
      ];

  const industryTrend = [
    { month: "11월", 내업종: 100, 업계평균: 100 },
    { month: "12월", 내업종: 108, 업계평균: 105 },
    { month: "1월",  내업종: 103, 업계평균: 102 },
    { month: "2월",  내업종: 115, 업계평균: 107 },
    { month: "3월",  내업종: 110, 업계평균: 104 },
    { month: "4월",  내업종: 122, 업계평균: 109 },
  ];

  return (
    <div style={{ background: "#141720", minHeight: "100vh", color: "white", padding: "32px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <ReportHeader onReset={onReset} />

        {/* 행 1 */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* 매출 현황 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.18)" }}>
                <BarChart3 style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>매출 현황 및 성장 여력 분석</h3>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>최근 6개월 월 매출 추이</p>
              </div>
            </div>
            <div style={{ height: "160px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }} />
                  <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-3 mt-4">
              <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: "10px", padding: "12px 14px", flex: 1 }}>
                <p style={{ fontSize: "0.72rem", color: "#34d399", fontWeight: 600, marginBottom: "4px" }}>현재 월 매출</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>{revenue}</p>
              </div>
              <div style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: "10px", padding: "12px 14px", flex: 1 }}>
                <p style={{ fontSize: "0.72rem", color: "#60a5fa", fontWeight: 600, marginBottom: "4px" }}>성장 여력</p>
                <p style={{ fontSize: "1.1rem", fontWeight: 800, color: "white" }}>{isHighRevenue ? "+18%" : isMidRevenue ? "+24%" : "+35%"}</p>
              </div>
            </div>
          </div>

          {/* 경영 역량 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(16,185,129,0.18)" }}>
                <Target style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>경영 역량 현황 점수</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <CircleGauge score={score} />
              <div className="flex-1 w-full" style={{ height: "150px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillScores} barSize={14}>
                    <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }} />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {skillScores.map((_, i) => <Cell key={i} fill={barColors[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 행 2: AI 개선 전략 */}
        <div style={{ ...CARD, marginBottom: "16px" }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(245,158,11,0.15)" }}>
              <Zap style={{ width: "17px", height: "17px", color: "#fbbf24" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>AI 맞춤 개선 전략 Top 3</h3>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>현재 상황 기반 우선순위 전략</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {strategies.map((s, i) => (
              <div key={s.title} className="rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontSize: "1.3rem" }}>{s.icon}</span>
                  <div>
                    <span className="px-1.5 py-0.5 rounded mr-2" style={{ fontSize: "0.62rem", fontWeight: 700, background: "rgba(16,185,129,0.2)", color: "#34d399" }}>0{i + 1}</span>
                    <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>{s.title}</span>
                  </div>
                </div>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 행 3: 업종 트렌드 */}
        <div style={CARD}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(249,115,22,0.15)" }}>
              <TrendingUp style={{ width: "17px", height: "17px", color: "#f97316" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>업종 매출 트렌드 전망</h3>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>내 업종 vs 업계 평균 (기준 100)</p>
            </div>
          </div>
          <div style={{ height: "160px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={industryTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[90, 130]} tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }} />
                <Line type="monotone" dataKey="내업종" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 3 }} />
                <Line type="monotone" dataKey="업계평균" stroke="rgba(255,255,255,0.25)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><div style={{ width: "12px", height: "3px", background: "#10b981", borderRadius: "2px" }} /><span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>내 업종</span></div>
            <div className="flex items-center gap-1.5"><div style={{ width: "12px", height: "2px", background: "rgba(255,255,255,0.3)", borderRadius: "2px", borderTop: "1px dashed rgba(255,255,255,0.3)" }} /><span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>업계 평균</span></div>
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="mt-8 pt-6 flex flex-wrap gap-3 justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textAlign: "center", width: "100%", marginBottom: "12px" }}>리포트를 바탕으로 소상광장 서비스를 활용해 보세요</p>
          {[
            { label: "정부 지원사업 보기", path: "/support", color: "#10b981" },
            { label: "사장님 커뮤니티", path: "/community", color: "#34d399" },
            { label: "식자재 시세 확인", path: "/market-price", color: "#6ee7b7" },
            { label: "직거래 장터", path: "/trade", color: "#a7f3d0" },
          ].map((item) => (
            <Link key={item.path} to={item.path} className="px-5 h-10 rounded-xl flex items-center gap-1.5 transition-all" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color, fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.background = `${item.color}25`)} onMouseLeave={(e) => (e.currentTarget.style.background = `${item.color}15`)}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
