import { useState } from "react";
import {
  Radio,
  Users,
  MessageCircle,
  Heart,
  Eye,
  Clock,
  Play,
  Bell,
  Calendar,
  Video,
  Mic,
  Monitor,
  Send,
  Sparkles,
  Star,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const liveNow = [
  {
    id: 1,
    title: "금요일 밤! 포차 운영 노하우 실시간 Q&A",
    host: "포차사장",
    avatar: "🍺",
    viewers: 342,
    likes: 89,
    category: "외식업",
    duration: "32분째",
    thumbnail: "🎙️",
    tags: ["Q&A", "포차", "야간영업"],
  },
  {
    id: 2,
    title: "배달앱 마케팅 실전 세팅 라이브",
    host: "마케팅고수",
    avatar: "📢",
    viewers: 578,
    likes: 156,
    category: "마케팅",
    duration: "1시간 12분째",
    thumbnail: "💻",
    tags: ["배달앱", "마케팅", "실전"],
  },
];

const upcomingLives = [
  {
    id: 3,
    title: "세무사와 함께하는 종합소득세 절세 전략",
    host: "김세무사",
    avatar: "📋",
    scheduledAt: "3월 11일 (화) 오후 7시",
    reservations: 234,
    category: "세금/법률",
    description: "자영업자 종합소득세 신고 시즌! 절세를 위해 꼭 알아야 할 공제 항목과 실전 팁을 세무사가 직접 알려드립니다.",
  },
  {
    id: 4,
    title: "1인 카페 창업 A to Z 실시간 상담",
    host: "카페컨설턴트",
    avatar: "☕",
    scheduledAt: "3월 12일 (수) 오후 3시",
    reservations: 189,
    category: "창업",
    description: "입지 선정부터 인테리어, 메뉴 구성, 초기 비용까지. 카페 창업의 모든 것을 실시간으로 상담해드립니다.",
  },
  {
    id: 5,
    title: "프랜차이즈 계약 시 주의사항 총정리",
    host: "법률전문가",
    avatar: "⚖️",
    scheduledAt: "3월 13일 (목) 오후 8시",
    reservations: 312,
    category: "세금/법률",
    description: "프랜차이즈 가맹 계약서 주요 조항 분석, 불리한 조건 판별법, 분쟁 시 대처 방안을 알려드립니다.",
  },
  {
    id: 6,
    title: "전주 한옥마을 상권 분석 & 입점 전략",
    host: "상권분석가",
    avatar: "🗺️",
    scheduledAt: "3월 14일 (금) 오후 2시",
    reservations: 156,
    category: "상권분석",
    description: "한옥마을 유동인구 데이터, 시간대별 매출 패턴, 추천 업종 분석을 공유합니다.",
  },
];

const pastHighlights = [
  { id: 7, title: "배달 포장 꿀팁 모음", host: "치킨사장", views: 4520, duration: "45분", avatar: "🍗" },
  { id: 8, title: "인스타 마케팅 실전편", host: "SNS전문가", views: 8230, duration: "1시간 20분", avatar: "📱" },
  { id: 9, title: "인건비 절약 자동화 도구", host: "효율왕", views: 3100, duration: "38분", avatar: "🤖" },
];

export function LiveStream() {
  const [reservedLives, setReservedLives] = useState<Set<number>>(new Set());
  const [chatMessage, setChatMessage] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-200">
          <Radio className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
            사장님 라이브
          </h2>
          <p className="text-gray-500" style={{ fontSize: "0.82rem" }}>
            실시간 강의 · Q&A · 노하우 공유
          </p>
        </div>
      </div>

      {/* ═══ Live Now ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>지금 라이브 중</h3>
          <Badge className="bg-red-50 text-red-500 border-0" style={{ fontSize: "0.7rem" }}>{liveNow.length}개</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {liveNow.map((live) => (
            <Card key={live.id} className="border-0 shadow-md ring-1 ring-red-100 overflow-hidden cursor-pointer hover:shadow-xl transition-all group">
              {/* Video Area */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 h-44 flex items-center justify-center">
                <span style={{ fontSize: "3rem" }}>{live.thumbnail}</span>

                {/* LIVE Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-1 rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 700 }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE
                </div>

                {/* Viewers */}
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg" style={{ fontSize: "0.72rem" }}>
                  <Eye className="w-3 h-3" /> {live.viewers}명
                </div>

                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-lg" style={{ fontSize: "0.72rem" }}>
                  <Clock className="w-3 h-3 inline mr-0.5" /> {live.duration}
                </div>

                {/* Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-red-500/90 flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center" style={{ fontSize: "0.9rem" }}>{live.avatar}</span>
                  <div>
                    <span style={{ fontSize: "0.78rem", fontWeight: 600 }}>{live.host}</span>
                    <span className="text-gray-400 ml-1.5 px-1.5 py-0.5 bg-gray-100 rounded" style={{ fontSize: "0.65rem" }}>{live.category}</span>
                  </div>
                </div>
                <h4 className="line-clamp-1" style={{ fontSize: "0.9rem", fontWeight: 600 }}>{live.title}</h4>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {live.tags.map((tag) => (
                    <span key={tag} className="text-red-500 bg-red-50 px-2 py-0.5 rounded-md" style={{ fontSize: "0.68rem" }}>#{tag}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══ Upcoming ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-blue-500" />
          <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>예정된 라이브</h3>
        </div>

        <div className="space-y-3">
          {upcomingLives.map((live) => (
            <Card key={live.id} className="border-0 shadow-sm ring-1 ring-black/[0.04] hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0" style={{ fontSize: "1.3rem" }}>
                    {live.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600" style={{ fontSize: "0.68rem", fontWeight: 500 }}>{live.category}</span>
                      <span className="text-gray-400" style={{ fontSize: "0.75rem" }}>
                        <Clock className="w-3 h-3 inline mr-0.5" /> {live.scheduledAt}
                      </span>
                    </div>
                    <h4 className="mb-1" style={{ fontSize: "0.92rem", fontWeight: 600 }}>{live.title}</h4>
                    <p className="text-gray-500 line-clamp-1 mb-2" style={{ fontSize: "0.78rem" }}>{live.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 flex items-center gap-1" style={{ fontSize: "0.75rem" }}>
                        <Users className="w-3 h-3" /> {live.reservations}명 예약
                      </span>
                      <Button
                        variant={reservedLives.has(live.id) ? "outline" : "default"}
                        className={`rounded-xl h-8 px-4 ${
                          reservedLives.has(live.id)
                            ? "border-blue-200 text-blue-600"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                        style={{ fontSize: "0.78rem" }}
                        onClick={() => {
                          setReservedLives((prev) => {
                            const next = new Set(prev);
                            next.has(live.id) ? next.delete(live.id) : next.add(live.id);
                            return next;
                          });
                        }}
                      >
                        <Bell className="w-3.5 h-3.5 mr-1" />
                        {reservedLives.has(live.id) ? "예약완료" : "알림 예약"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ═══ Past Highlights ═══ */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-4 h-4 text-amber-500" />
          <h3 style={{ fontSize: "1rem", fontWeight: 600 }}>인기 다시보기</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {pastHighlights.map((hl) => (
            <Card key={hl.id} className="border-0 shadow-sm ring-1 ring-black/[0.04] hover:shadow-md transition-all cursor-pointer group">
              <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 h-28 rounded-t-xl flex items-center justify-center">
                <span style={{ fontSize: "2rem" }}>{hl.avatar}</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/60 text-white px-1.5 py-0.5 rounded" style={{ fontSize: "0.65rem" }}>{hl.duration}</span>
              </div>
              <CardContent className="p-3">
                <h5 className="line-clamp-1 mb-1" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{hl.title}</h5>
                <div className="flex items-center justify-between text-gray-400" style={{ fontSize: "0.72rem" }}>
                  <span>{hl.host}</span>
                  <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {hl.views.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
