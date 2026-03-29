import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import {
  Store, ChevronLeft, Sparkles, MapPin, Download, RefreshCw,
  TrendingUp, Zap, Activity, BarChart3, Target,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";

/* ─────────────────────────────────────────
   데이터 정의
───────────────────────────────────────── */
const BUSINESS_TYPES = [
  "음식점 (한식/양식/중식 등)",
  "카페/음료",
  "디저트/베이커리",
  "소매점 (편의점/의류 등)",
  "서비스업 (미용/피트니스 등)",
  "기타",
];

const REGIONS = [
  "서울 강남구/서초구",
  "서울 마포구/용산구",
  "서울 성동구/광진구",
  "기타 서울 지역",
  "경기/인천 수도권",
  "그 외 지방",
];

const TARGET_CUSTOMERS_NEW = [
  "10대~20대 학생",
  "20대~30대 직장인",
  "40대~50대 중장년층",
  "가족 단위 고객",
  "특정 연령층 없음",
];

const AVG_PAYMENT = [
  "1만 원 미만 (가성비 중심)",
  "1만 원 ~ 2만 원 (평균적인 수준)",
  "2만 원 ~ 4만 원 (프리미엄 지향)",
  "4만 원 이상 (고급화 전략)",
];

// 기존 사장님 질문
const MONTHLY_REVENUE = [
  "500만 원 미만",
  "500만~1,000만 원",
  "1,000만~2,000만 원",
  "2,000만 원 이상",
];

const CURRENT_CHALLENGES = [
  "매출이 정체되어 있어요",
  "마케팅/홍보가 어려워요",
  "인건비/재료비 관리",
  "배달/플랫폼 수수료",
  "직원 관리 문제",
  "경쟁 심화",
];

/* ─────────────────────────────────────────
   스타일 헬퍼
───────────────────────────────────────── */
const PAGE_BG: React.CSSProperties = {
  minHeight: "100vh",
  background: "#141720",
  color: "white",
  fontFamily: "'Noto Sans KR', sans-serif",
};

const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  padding: "28px",
};

/* ─────────────────────────────────────────
   공통 헤더
───────────────────────────────────────── */
function TopBar({ onBack, label }: { onBack?: () => void; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      {onBack ? (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 transition-all"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
        >
          <ChevronLeft style={{ width: "16px", height: "16px" }} /> 이전으로
        </button>
      ) : <div />}
      {label && (
        <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.25)" }}>{label}</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   진행 바
───────────────────────────────────────── */
function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <div
          className="h-1.5 rounded-full flex-1 mr-4 overflow-hidden"
          style={{ background: "rgba(255,255,255,0.07)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(current / total) * 100}%`,
              background: "linear-gradient(90deg,#10b981,#34d399)",
            }}
          />
        </div>
        <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", whiteSpace: "nowrap" }}>
          {current} / {total}
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   선택지 버튼
───────────────────────────────────────── */
function ChoiceButton({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left transition-all active:scale-[0.98]"
      style={{
        padding: "18px 22px",
        borderRadius: "14px",
        border: selected
          ? "1.5px solid #10b981"
          : "1px solid rgba(255,255,255,0.1)",
        background: selected
          ? "rgba(16,185,129,0.12)"
          : "rgba(255,255,255,0.04)",
        color: selected ? "#34d399" : "rgba(255,255,255,0.65)",
        fontSize: "0.97rem",
        fontWeight: selected ? 600 : 400,
        cursor: "pointer",
        boxShadow: selected ? "0 0 0 1px rgba(16,185,129,0.3)" : "none",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
          e.currentTarget.style.color = "rgba(255,255,255,0.85)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
          e.currentTarget.style.color = "rgba(255,255,255,0.65)";
        }
      }}
    >
      {label}
    </button>
  );
}

/* ─────────────────────────────────────────
   설문 래퍼
───────────────────────────────────────── */
function QuestionStep({
  step, total, question, options, selected, onSelect, onBack, onNext,
}: {
  step: number; total: number; question: string;
  options: string[]; selected: string;
  onSelect: (v: string) => void; onBack: () => void; onNext: () => void;
}) {
  return (
    <div style={{ ...PAGE_BG, padding: "32px 20px", maxWidth: "840px", margin: "0 auto" }}>
      <TopBar onBack={onBack} />
      <ProgressBar current={step} total={total} />

      {/* AI badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-7"
        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", fontSize: "0.8rem", fontWeight: 600, color: "#34d399" }}>
        <Sparkles style={{ width: "14px", height: "14px" }} />
        AI 어시스턴트의 질문
      </div>

      <h2 className="mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.2 }}>
        {question}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
        {options.map((opt) => (
          <ChoiceButton
            key={opt} label={opt}
            selected={selected === opt}
            onClick={() => onSelect(opt)}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full h-[56px] rounded-2xl transition-all active:scale-[0.99]"
        style={{
          background: selected
            ? "linear-gradient(135deg,#10b981,#34d399)"
            : "rgba(255,255,255,0.06)",
          color: selected ? "white" : "rgba(255,255,255,0.25)",
          fontSize: "1.02rem", fontWeight: 700,
          border: "none", cursor: selected ? "pointer" : "not-allowed",
          boxShadow: selected ? "0 8px 28px rgba(16,185,129,0.4)" : "none",
        }}
      >
        다음으로
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   주소 입력 스텝 (Daum Postcode API)
───────────────────────────────────────── */
interface AddressValue {
  zonecode: string;
  addr: string;
  detail: string;
}

function AddressStep({
  step, total, onBack, onNext, address, onAddressChange,
}: {
  step: number; total: number;
  onBack: () => void; onNext: () => void;
  address: AddressValue;
  onAddressChange: (v: AddressValue) => void;
}) {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).daum?.Postcode) {
      setScriptLoaded(true);
      return;
    }
    if (document.getElementById("daum-postcode-script")) return;
    const script = document.createElement("script");
    script.id = "daum-postcode-script";
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);
  }, []);

  const openPostcode = () => {
    if (!(window as any).daum?.Postcode) return;
    new (window as any).daum.Postcode({
      oncomplete: (data: any) => {
        onAddressChange({
          zonecode: data.zonecode,
          addr: data.roadAddress || data.jibunAddress,
          detail: "",
        });
      },
    }).open();
  };

  const isValid = !!address.addr;

  const baseInput: React.CSSProperties = {
    width: "100%", height: "52px", padding: "0 16px",
    borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.45)",
    fontSize: "0.95rem", outline: "none", cursor: "default",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{ ...PAGE_BG, padding: "32px 20px", maxWidth: "840px", margin: "0 auto" }}>
      <TopBar onBack={onBack} />
      <ProgressBar current={step} total={total} />

      <div
        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-7"
        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", fontSize: "0.8rem", fontWeight: 600, color: "#34d399" }}
      >
        <Sparkles style={{ width: "14px", height: "14px" }} />
        AI 어시스턴트의 질문
      </div>

      <h2 className="mb-10" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.2 }}>
        현재 매장이 위치한 지역은 어디인가요?
      </h2>

      <div className="space-y-3 mb-10">
        {/* 우편번호 + 검색 버튼 */}
        <div className="flex gap-2">
          <input
            readOnly
            value={address.zonecode}
            placeholder="우편번호"
            style={{ ...baseInput, width: "160px", flexShrink: 0 }}
          />
          <button
            onClick={openPostcode}
            style={{
              height: "52px", padding: "0 22px", borderRadius: "12px",
              background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)",
              color: "#34d399", fontSize: "0.92rem", fontWeight: 600,
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(16,185,129,0.15)")}
          >
            주소 검색
          </button>
        </div>

        {/* 주소 (읽기 전용) */}
        <input
          readOnly
          value={address.addr}
          placeholder="주소 검색 버튼을 눌러 주소를 입력해 주세요"
          style={baseInput}
        />

        {/* 상세주소 (주소 검색 후 활성화) */}
        <input
          readOnly={!address.addr}
          value={address.detail}
          onChange={(e) => onAddressChange({ ...address, detail: e.target.value })}
          placeholder={address.addr ? "상세주소를 입력하세요 (동, 호수 등)" : "주소 검색 후 입력 가능합니다"}
          style={{
            ...baseInput,
            cursor: address.addr ? "text" : "default",
            color: address.addr ? "white" : "rgba(255,255,255,0.25)",
            border: address.addr ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.07)",
            background: address.addr ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
          }}
          onFocus={(e) => {
            if (address.addr) {
              e.currentTarget.style.borderColor = "rgba(16,185,129,0.55)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.1)";
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = address.addr ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full h-[56px] rounded-2xl transition-all active:scale-[0.99]"
        style={{
          background: isValid ? "linear-gradient(135deg,#10b981,#34d399)" : "rgba(255,255,255,0.06)",
          color: isValid ? "white" : "rgba(255,255,255,0.25)",
          fontSize: "1.02rem", fontWeight: 700,
          border: "none", cursor: isValid ? "pointer" : "not-allowed",
          boxShadow: isValid ? "0 8px 28px rgba(16,185,129,0.4)" : "none",
        }}
      >
        다음으로
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   로딩 화면
───────────────────────────────────────── */
function LoadingScreen() {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setDots((d) => (d + 1) % 4), 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center" style={{ ...PAGE_BG, minHeight: "100vh" }}>
      <div
        className="mb-8 flex items-center justify-center"
        style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(16,185,129,0.18)", border: "1px solid rgba(16,185,129,0.35)" }}
      >
        <Sparkles style={{ width: "38px", height: "38px", color: "#34d399" }} className="animate-pulse" />
      </div>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "12px" }}>
        AI가 최적의 솔루션을 분석 중입니다
      </h2>
      <div className="flex items-center gap-2" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.92rem" }}>
        <div
          className="w-4 h-4 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(16,185,129,0.5)", borderTopColor: "#34d399" }}
        />
        입력하신 데이터를 기반으로 리포트를 생성하고 있어요{"...".slice(0, dots)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   원형 게이지 (SVG)
───────────────────────────────────────── */
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
          stroke="url(#gaugeGrad)" strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
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

/* ─────────────────────────────────────────
   결과 리포트
───────────────────────────────────────── */
function ResultReport({
  answers, userType, onReset,
}: {
  answers: Record<string, string>; userType: "new" | "existing"; onReset: () => void;
}) {
  // 업종별 동적 데이터 생성
  const bizType = answers.bizType || "카페/음료";
  const region = answers.region || "서울 마포구/용산구";

  const isHighPremium = (answers.avgPayment || "").includes("4만");
  const isMidPremium  = (answers.avgPayment || "").includes("2만");

  const simulData = {
    capital:    isHighPremium ? "1억 2,000만" : isMidPremium ? "8,500만" : "4,200만",
    revenue:    isHighPremium ? "2,800만"     : isMidPremium ? "1,200만" : "800만",
    breakEven:  isHighPremium ? "약 11개월 후" : isMidPremium ? "약 7개월 후" : "약 5개월 후",
    score:      isHighPremium ? 78            : isMidPremium ? 85          : 73,
    comment:    isHighPremium
      ? "고급화 전략은 높은 객단가를 확보하지만 초기 투자 비용이 큰 편입니다. 브랜드 차별화 전략이 핵심입니다."
      : isMidPremium
      ? "현재 선택하신 업종은 초기 인테리어 비용이 높은 편이나, 안정적인 객단가 확보로 빠른 투자금 회수가 예상됩니다."
      : "가성비 전략은 유동 인구가 많은 입지에서 높은 효과를 보입니다. 운영 효율화가 수익 핵심입니다.",
  };

  const blueOceanScores = [
    { name: "경쟁강도", value: 72 },
    { name: "성장성",   value: 95 },
    { name: "수익성",   value: 80 },
    { name: "안정성",   value: 75 },
    { name: "상권 매력도", value: 92 },
  ];

  const locationTop3 = [
    { rank: 1, name: `${region} 인근`, desc: "2030 유동인구 1위, 신규 진입 매장 생존율 82%", score: 98 },
    { rank: 2, name: "홍대입구역 3번 출구 방면", desc: "주말 저녁 시간대 타깃 고객 밀집도 최상", score: 94 },
    { rank: 3, name: "강남역 이면도로 (역삼 방향)", desc: "안정적인 오피스 상권, 객단가 높은 직장인 다수", score: 89 },
  ];

  const searchTrend = [
    { month: "1월", value: 420 },
    { month: "2월", value: 310 },
    { month: "3월", value: 540 },
    { month: "4월", value: 480 },
    { month: "5월", value: 720 },
    { month: "6월", value: 960 },
  ];

  const tags = bizType.includes("카페") ? ["#비건디저트", "#감성카페", "#소금빵", "#팝업스토어"]
    : bizType.includes("음식") ? ["#점심특선", "#가성비맛집", "#혼밥", "#배달맛집"]
    : ["#소상공인", "#창업트렌드", "#지역상권", "#스타트업"];

  const barColors = ["#10b981", "#34d399", "#10b981", "#34d399", "#10b981"];

  return (
    <div style={{ background: "#141720", minHeight: "100vh", color: "white", padding: "32px 20px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

        {/* 헤더 */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="inline-flex items-center px-3 py-1 rounded-full"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", fontSize: "0.75rem", fontWeight: 600, color: "#34d399" }}
              >
                분석 완료
              </span>
              <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>2026년 3월 26일 기준 데이터 반영</span>
            </div>
            <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.04em" }}>
              사장님을 위한 맞춤형 리포트
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

        {/* 행 1: 시뮬레이션 + 블루오션 점수 */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* 창업 시뮬레이션 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.18)" }}
              >
                <BarChart3 style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>창업 시뮬레이션 결과</h3>
            </div>

            <div className="mb-6">
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>예상 초기 자본금</p>
              <div className="flex items-center justify-between">
                <p style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  약 {simulData.capital}<span style={{ fontSize: "1rem", fontWeight: 500 }}>만원</span>
                </p>
                <Activity style={{ width: "22px", height: "22px", color: "#10b981" }} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px" }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>예상 월 매출</p>
                <p style={{ fontSize: "1.25rem", fontWeight: 800, color: "#34d399" }}>{simulData.revenue}만원</p>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px" }}>
                <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: "6px" }}>손익분기점</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 800, color: "white" }}>{simulData.breakEven}</p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.15)" }}
            >
              <Zap style={{ width: "16px", height: "16px", color: "#34d399", flexShrink: 0, marginTop: "1px" }} />
              <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                {simulData.comment}
              </p>
            </div>
          </div>

          {/* 블루오션 종합 점수 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.18)" }}
              >
                <Target style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>블루오션 종합 점수</h3>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8">
              <CircleGauge score={simulData.score} />

              <div className="flex-1 w-full" style={{ height: "160px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={blueOceanScores} barSize={16}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                      axisLine={false} tickLine={false}
                    />
                    <YAxis domain={[0, 100]} hide />
                    <Tooltip
                      contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {blueOceanScores.map((_, i) => (
                        <Cell key={i} fill={barColors[i]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* 행 2: AI 추천 입지 + 검색량 추이 */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* AI 추천 입지 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-6">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.18)" }}
              >
                <MapPin style={{ width: "17px", height: "17px", color: "#34d399" }} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>AI 추천 입지 Top 3</h3>
            </div>

            <div className="flex flex-col gap-3">
              {locationTop3.map((loc) => (
                <div
                  key={loc.rank}
                  className="flex items-start gap-4 rounded-xl p-4 transition-all"
                  style={{
                    background: loc.rank === 1 ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.04)",
                    border: loc.rank === 1 ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: loc.rank === 1 ? "#10b981" : "rgba(255,255,255,0.1)",
                      color: loc.rank === 1 ? "white" : "rgba(255,255,255,0.4)",
                      fontSize: "0.8rem", fontWeight: 700,
                    }}
                  >
                    {loc.rank}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "0.94rem", fontWeight: 600, marginBottom: "3px" }}>{loc.name}</p>
                    <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{loc.desc}</p>
                  </div>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: "#34d399", whiteSpace: "nowrap" }}>
                    {loc.score}점
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 검색량 추이 */}
          <div style={CARD}>
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(249,115,22,0.15)" }}
              >
                <TrendingUp style={{ width: "17px", height: "17px", color: "#f97316" }} />
              </div>
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700 }}>관심 업종 검색량 추이</h3>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>최근 6개월 간의 해당 업종 관심도</p>
              </div>
            </div>

            <div style={{ height: "170px", marginTop: "16px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={searchTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                    axisLine={false} tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                    axisLine={false} tickLine={false}
                    domain={[0, 1100]}
                  />
                  <Tooltip
                    contentStyle={{ background: "#1a1d2a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "0.8rem" }}
                  />
                  <Line
                    type="monotone" dataKey="value" stroke="#ef4444"
                    strokeWidth={2.5} dot={{ fill: "#ef4444", r: 3 }} activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "0.76rem", color: "rgba(255,255,255,0.45)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="mt-8 pt-6 flex flex-wrap gap-3 justify-center" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textAlign: "center", width: "100%", marginBottom: "12px" }}>
            리포트를 바탕으로 소상광장 서비스를 활용해 보세요
          </p>
          {[
            { label: "정부 지원사업 보기", path: "/support", color: "#10b981" },
            { label: "사장님 커뮤니티", path: "/community", color: "#34d399" },
            { label: "식자재 시세 확인", path: "/market-price", color: "#6ee7b7" },
          ].map((item) => (
            <Link
              key={item.path} to={item.path}
              className="px-5 h-10 rounded-xl flex items-center gap-1.5 transition-all"
              style={{
                background: `${item.color}15`,
                border: `1px solid ${item.color}30`,
                color: item.color, fontSize: "0.85rem", fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = `${item.color}25`)}
              onMouseLeave={(e) => (e.currentTarget.style.background = `${item.color}15`)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   메인 컴포넌트
───────────────────────────────────────── */
type FlowState =
  | "typeSelect"
  | "q1" | "q2" | "q3" | "q4"
  | "q1ex" | "q2ex" | "q3ex" | "q4ex"
  | "loading"
  | "result";

export function AIAnalysisPage() {
  const navigate = useNavigate();
  const [flow, setFlow]       = useState<FlowState>("typeSelect");
  const [userType, setUserType] = useState<"new" | "existing">("new");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [addrQ2ex, setAddrQ2ex] = useState<{ zonecode: string; addr: string; detail: string }>({ zonecode: "", addr: "", detail: "" });

  /* 자동 로딩 → 결과 전환 */
  useEffect(() => {
    if (flow === "loading") {
      const t = setTimeout(() => setFlow("result"), 2800);
      return () => clearTimeout(t);
    }
  }, [flow]);

  const ans = (key: string) => answers[key] || "";
  const set = (key: string, val: string) => setAnswers((prev) => ({ ...prev, [key]: val }));

  /* ── 로딩 ── */
  if (flow === "loading") return <LoadingScreen />;

  /* ── 결과 ── */
  if (flow === "result") return (
    <ResultReport
      answers={answers}
      userType={userType}
      onReset={() => { setFlow("typeSelect"); setAnswers({}); }}
    />
  );

  /* ── 설문 스텝 (신생 창업자) ── */
  if (flow === "q1") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={1} total={4}
        question="어떤 업종을 고려하고 계신가요?"
        options={BUSINESS_TYPES}
        selected={ans("bizType")}
        onSelect={(v) => set("bizType", v)}
        onBack={() => setFlow("typeSelect")}
        onNext={() => setFlow("q2")}
      />
    </div>
  );

  if (flow === "q2") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={2} total={4}
        question="어느 지역에서 창업을 준비 중이신가요?"
        options={REGIONS}
        selected={ans("region")}
        onSelect={(v) => set("region", v)}
        onBack={() => setFlow("q1")}
        onNext={() => setFlow("q3")}
      />
    </div>
  );

  if (flow === "q3") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={3} total={4}
        question="가장 주력으로 생각하는 고객층은 누구인가요?"
        options={TARGET_CUSTOMERS_NEW}
        selected={ans("target")}
        onSelect={(v) => set("target", v)}
        onBack={() => setFlow("q2")}
        onNext={() => setFlow("q4")}
      />
    </div>
  );

  if (flow === "q4") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={4} total={4}
        question="예상하시는 1인당 평균 결제 금액은 얼마인가요?"
        options={AVG_PAYMENT}
        selected={ans("avgPayment")}
        onSelect={(v) => set("avgPayment", v)}
        onBack={() => setFlow("q3")}
        onNext={() => setFlow("loading")}
      />
    </div>
  );

  /* ── 설문 스텝 (기존 사장님) ── */
  if (flow === "q1ex") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={1} total={4}
        question="운영 중이신 업종은 무엇인가요?"
        options={BUSINESS_TYPES}
        selected={ans("bizType")}
        onSelect={(v) => set("bizType", v)}
        onBack={() => setFlow("typeSelect")}
        onNext={() => setFlow("q2ex")}
      />
    </div>
  );

  if (flow === "q2ex") return (
    <div style={PAGE_BG}>
      <AddressStep
        step={2} total={4}
        address={addrQ2ex}
        onAddressChange={setAddrQ2ex}
        onBack={() => setFlow("q1ex")}
        onNext={() => {
          const regionStr = [addrQ2ex.addr, addrQ2ex.detail].filter(Boolean).join(" ")
            + (addrQ2ex.zonecode ? ` (${addrQ2ex.zonecode})` : "");
          set("region", regionStr);
          setFlow("q3ex");
        }}
      />
    </div>
  );

  if (flow === "q3ex") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={3} total={4}
        question="현재 월 평균 매출 규모는 어느 정도인가요?"
        options={MONTHLY_REVENUE}
        selected={ans("revenue")}
        onSelect={(v) => set("revenue", v)}
        onBack={() => setFlow("q2ex")}
        onNext={() => setFlow("q4ex")}
      />
    </div>
  );

  if (flow === "q4ex") return (
    <div style={PAGE_BG}>
      <QuestionStep
        step={4} total={4}
        question="가장 큰 경영 고민은 무엇인가요?"
        options={CURRENT_CHALLENGES}
        selected={ans("challenge")}
        onSelect={(v) => set("challenge", v)}
        onBack={() => setFlow("q3ex")}
        onNext={() => setFlow("loading")}
      />
    </div>
  );

  /* ── 유형 선택 화면 ── */
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16"
      style={{ ...PAGE_BG, position: "relative" }}
    >
      {/* 상단 글로우 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.07) 0%, transparent 60%)" }}
      />

      {/* 로고 */}
      <Link to="/" className="flex items-center gap-2.5 mb-14 relative">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg,#f97316,#fb923c)" }}
        >
          <Store className="w-[18px] h-[18px] text-white" />
        </div>
        <span className="text-white" style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
          소상<span style={{ color: "#f97316" }}>광장</span>
          <span style={{ fontSize: "0.72rem", fontWeight: 500, color: "rgba(255,255,255,0.35)", marginLeft: "8px" }}>AI 맞춤 분석</span>
        </span>
      </Link>

      <div className="relative w-full" style={{ maxWidth: "740px" }}>
        {/* AI 뱃지 */}
        <div className="flex justify-center mb-5">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
            style={{ background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", fontSize: "0.8rem", fontWeight: 600, color: "#34d399" }}
          >
            <Sparkles style={{ width: "14px", height: "14px" }} />
            맞춤형 AI 분석을 위해 가장 알맞은 유형을 알려주세요
          </div>
        </div>

        <h1
          className="text-center mb-3"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 800, letterSpacing: "-0.04em" }}
        >
          현재 상황을 선택해주세요
        </h1>
        <p
          className="text-center mb-12"
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.4)" }}
        >
          맞춤형 AI 분석을 위해 가장 알맞은 유형을 알려주세요
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* 신생 창업자 카드 */}
          {[
            {
              key: "new" as const,
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  <path d="M19 8h2m-1-1v2" />
                </svg>
              ),
              title: "신생 창업자",
              desc: "처음 가게를 시작하려고 준비 중입니다. 업종, 위치, 비용 등 전반적인 가이드가 필요해요.",
              nextFlow: "q1" as FlowState,
            },
            {
              key: "existing" as const,
              icon: (
                <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
              ),
              title: "기존 사장님",
              desc: "이미 가게를 운영 중입니다. 매출 상승, 마케팅, 트렌드 분석 등 운영 전략이 필요해요.",
              nextFlow: "q1ex" as FlowState,
            },
          ].map((card) => {
            const isSelected = userType === card.key;
            return (
              <button
                key={card.key}
                onClick={() => {
                  setUserType(card.key);
                  setFlow(card.nextFlow);
                }}
                className="text-left rounded-2xl p-7 transition-all active:scale-[0.98] relative"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(16,185,129,0.4)";
                  e.currentTarget.style.background = "rgba(16,185,129,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
              >
                {/* 우상단 라디오 */}
                <div
                  className="absolute top-5 right-5 w-5 h-5 rounded-full"
                  style={{
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* 아이콘 */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  {card.icon}
                </div>

                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, marginBottom: "10px" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                  {card.desc}
                </p>
              </button>
            );
          })}
        </div>

        <p className="text-center mt-8" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.2)" }}>
          입력하신 정보는 분석 목적으로만 활용되며 저장되지 않습니다.
        </p>
      </div>
    </div>
  );
}