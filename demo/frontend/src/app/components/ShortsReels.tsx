import { useState } from "react";
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Video,
  Music,
  Type,
  Sparkles,
  Eye,
  TrendingUp,
  Clock,
  Upload,
  X,
  Camera,
  Scissors,
  Palette,
  Volume2,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Send,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const mockShorts = [
  {
    id: 1,
    author: "치킨사장",
    avatar: "🍗",
    title: "배달포장 꿀팁 30초",
    description: "포장이 무너지지 않는 배달 포장법! 고객 만족도 급상승 🚀",
    thumbnail: "🎬",
    views: 12400,
    likes: 892,
    comments: 67,
    shares: 34,
    duration: "0:28",
    tags: ["배달팁", "포장", "외식업"],
    isHot: true,
    timeAgo: "3시간 전",
  },
  {
    id: 2,
    author: "카페장인",
    avatar: "☕",
    title: "라떼아트 1분 마스터",
    description: "초보도 할 수 있는 하트 라떼아트, 연습 3일이면 충분합니다",
    thumbnail: "🎨",
    views: 28900,
    likes: 2341,
    comments: 156,
    shares: 89,
    duration: "0:58",
    tags: ["카페", "라떼아트", "스킬업"],
    isHot: true,
    timeAgo: "5시간 전",
  },
  {
    id: 3,
    author: "반찬가게",
    avatar: "🥘",
    title: "매출 3배 올린 진열법",
    description: "같은 반찬인데 진열만 바꿨더니 매출이 3배! 색감 배치의 비밀",
    thumbnail: "📊",
    views: 8700,
    likes: 654,
    comments: 43,
    shares: 28,
    duration: "0:45",
    tags: ["진열", "매출업", "소매업"],
    isHot: false,
    timeAgo: "8시간 전",
  },
  {
    id: 4,
    author: "빵집사장",
    avatar: "🥐",
    title: "SNS 바이럴 촬영법",
    description: "핸드폰으로 맛있어 보이는 빵 사진 찍는 각도와 조명 팁",
    thumbnail: "📸",
    views: 15600,
    likes: 1203,
    comments: 89,
    shares: 67,
    duration: "0:35",
    tags: ["SNS마케팅", "촬영팁", "베이커리"],
    isHot: true,
    timeAgo: "12시간 전",
  },
  {
    id: 5,
    author: "고기집사장",
    avatar: "🥩",
    title: "원가 절감 비밀 레시피",
    description: "부위별 활용도를 높여서 원가율 10% 낮추는 실전 노하우",
    thumbnail: "💰",
    views: 6300,
    likes: 478,
    comments: 56,
    shares: 19,
    duration: "0:52",
    tags: ["원가절감", "레시피", "외식업"],
    isHot: false,
    timeAgo: "1일 전",
  },
  {
    id: 6,
    author: "네일샵",
    avatar: "💅",
    title: "예약 노쇼 방지 시스템",
    description: "예약 노쇼 때문에 스트레스 받으셨죠? 이 방법으로 노쇼율 90% 줄였어요",
    thumbnail: "📅",
    views: 9200,
    likes: 734,
    comments: 92,
    shares: 45,
    duration: "0:40",
    tags: ["노쇼방지", "예약관리", "서비스업"],
    isHot: false,
    timeAgo: "1일 전",
  },
];

const trendingTags = ["#매출업팁", "#원가절감", "#SNS마케팅", "#배달노하우", "#인테리어", "#메뉴개발", "#직원관리", "#세금절약"];

export function ShortsReels() {
  const [showCreate, setShowCreate] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("전체");
  const [likedShorts, setLikedShorts] = useState<Set<number>>(new Set());
  const [savedShorts, setSavedShorts] = useState<Set<number>>(new Set());

  const filters = ["전체", "인기", "최신", "외식업", "서비스업", "소매업", "마케팅"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-200">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, letterSpacing: "-0.02em" }}>
              사장님 숏폼
            </h2>
            <p className="text-gray-500" style={{ fontSize: "0.82rem" }}>
              30초~1분 영업 노하우 · 꿀팁 공유
            </p>
          </div>
        </div>
        <Button
          className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl h-10 px-5 shadow-md shadow-pink-200 hover:shadow-lg transition-all"
          onClick={() => setShowCreate(!showCreate)}
        >
          <Plus className="w-4 h-4 mr-1.5" /> 만들기
        </Button>
      </div>

      {/* Create Form */}
      {showCreate && (
        <Card className="border-0 shadow-lg ring-1 ring-pink-100">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontWeight: 600, fontSize: "1.02rem" }}>숏폼 영상 만들기</h3>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-pink-200 rounded-2xl p-8 text-center bg-pink-50/30 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-pink-100 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-7 h-7 text-pink-500" />
              </div>
              <p style={{ fontSize: "0.92rem", fontWeight: 600 }} className="mb-1">영상을 업로드하세요</p>
              <p className="text-gray-400" style={{ fontSize: "0.78rem" }}>MP4, MOV · 최대 60초 · 세로형(9:16) 권장</p>
              <Button variant="outline" className="mt-4 rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50">
                <Camera className="w-4 h-4 mr-1.5" /> 파일 선택
              </Button>
            </div>

            {/* Editing Tools */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[
                { icon: Scissors, label: "자르기", color: "text-violet-500 bg-violet-50" },
                { icon: Type, label: "자막 추가", color: "text-blue-500 bg-blue-50" },
                { icon: Music, label: "배경음악", color: "text-emerald-500 bg-emerald-50" },
                { icon: Palette, label: "필터", color: "text-amber-500 bg-amber-50" },
              ].map((tool) => (
                <button
                  key={tool.label}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-xl ${tool.color} hover:opacity-80 transition-all`}
                >
                  <tool.icon className="w-5 h-5" />
                  <span style={{ fontSize: "0.72rem", fontWeight: 500 }}>{tool.label}</span>
                </button>
              ))}
            </div>

            {/* AI Suggestion */}
            <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-xl p-4 mb-5 flex items-start gap-3 ring-1 ring-violet-100">
              <Sparkles className="w-4 h-4 text-violet-500 mt-0.5 shrink-0" />
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 600 }} className="text-violet-700 mb-1">AI 콘텐츠 추천</p>
                <p className="text-violet-600" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
                  현재 인기 주제: "배달 포장 꿀팁", "1분 레시피", "매장 청소 루틴" — 이 주제로 영상을 만들면 조회수 상승이 기대됩니다!
                </p>
              </div>
            </div>

            {/* Title & Tags */}
            <div className="space-y-3">
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 placeholder:text-gray-400"
                placeholder="제목을 입력하세요 (최대 30자)"
              />
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 placeholder:text-gray-400"
                placeholder="태그 추가 (예: #배달팁 #외식업)"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="rounded-xl h-10 border-gray-200" onClick={() => setShowCreate(false)}>취소</Button>
                <Button className="bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-xl h-10 px-6">업로드</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trending Tags */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {trendingTags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full bg-pink-50 text-pink-600 whitespace-nowrap cursor-pointer hover:bg-pink-100 transition-colors"
            style={{ fontSize: "0.78rem", fontWeight: 500 }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`px-3.5 py-1.5 rounded-full transition-all whitespace-nowrap ${
              selectedFilter === f
                ? "bg-pink-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Shorts Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {mockShorts.map((short) => (
          <div
            key={short.id}
            className="group relative bg-gray-900 rounded-2xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-pink-400 transition-all"
            style={{ aspectRatio: "9/14" }}
          >
            {/* Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
              <span style={{ fontSize: "3rem" }}>{short.thumbnail}</span>
            </div>

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white ml-0.5" />
              </div>
            </div>

            {/* Duration */}
            <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-md" style={{ fontSize: "0.7rem" }}>
              {short.duration}
            </div>

            {/* Hot Badge */}
            {short.isHot && (
              <div className="absolute top-2.5 left-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-2 py-0.5 rounded-md flex items-center gap-0.5" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                <TrendingUp className="w-3 h-3" /> HOT
              </div>
            )}

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-10">
              {/* Author */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center" style={{ fontSize: "0.7rem" }}>
                  {short.avatar}
                </span>
                <span className="text-white" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{short.author}</span>
              </div>
              <p className="text-white line-clamp-2 mb-2" style={{ fontSize: "0.78rem", lineHeight: 1.4 }}>
                {short.description}
              </p>
              <div className="flex items-center gap-3 text-white/70" style={{ fontSize: "0.68rem" }}>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3" /> {short.views >= 10000 ? `${(short.views / 10000).toFixed(1)}만` : short.views.toLocaleString()}
                </span>
                <span className="flex items-center gap-0.5">
                  <Heart className="w-3 h-3" /> {short.likes.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Side Action Buttons */}
            <div className="absolute right-2 bottom-24 flex flex-col gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLikedShorts((prev) => {
                    const next = new Set(prev);
                    next.has(short.id) ? next.delete(short.id) : next.add(short.id);
                    return next;
                  });
                }}
                className="flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${likedShorts.has(short.id) ? "bg-pink-500" : "bg-white/20 backdrop-blur-sm"}`}>
                  <Heart className={`w-4 h-4 ${likedShorts.has(short.id) ? "text-white fill-white" : "text-white"}`} />
                </div>
              </button>
              <button onClick={(e) => e.stopPropagation()} className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSavedShorts((prev) => {
                    const next = new Set(prev);
                    next.has(short.id) ? next.delete(short.id) : next.add(short.id);
                    return next;
                  });
                }}
                className="flex flex-col items-center"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${savedShorts.has(short.id) ? "bg-amber-500" : "bg-white/20 backdrop-blur-sm"}`}>
                  <Bookmark className={`w-4 h-4 ${savedShorts.has(short.id) ? "text-white fill-white" : "text-white"}`} />
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
