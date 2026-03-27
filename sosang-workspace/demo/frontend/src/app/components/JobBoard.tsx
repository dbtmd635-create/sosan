import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Building2,
  Calendar,
  Heart,
  Plus,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const jobTypes = ["전체", "서빙", "주방보조", "배달", "판매", "사무", "청소", "기타"];

const mockJobs = [
  { id: 1, type: "구인", title: "주말 서빙 알바 구합니다", business: "맛있는 파스타집", category: "서빙", location: "서울 마포구 홍대입구역 3분", pay: "시급 12,000원", schedule: "주말 11:00-17:00", posted: "1시간 전", isUrgent: true, desc: "주말 피크타임 서빙 도와주실 분. 경험 무관, 친절하신 분 환영!" },
  { id: 2, type: "구인", title: "저녁 주방보조 모집", business: "청춘갈비", category: "주방보조", location: "서울 강남구 역삼역 5분", pay: "시급 13,000원", schedule: "평일 17:00-22:00", posted: "3시간 전", isUrgent: false, desc: "저녁 시간 주방보조. 설거지, 재료 손질 등. 식사 제공." },
  { id: 3, type: "구인", title: "오전 카페 바리스타", business: "모닝커피", category: "서빙", location: "경기 성남시 판교역 7분", pay: "시급 11,500원", schedule: "평일 07:00-13:00", posted: "5시간 전", isUrgent: true, desc: "오전 근무 바리스타. 커피 제조 경험 우대!" },
  { id: 4, type: "구직", title: "편의점/카페 주말 알바 구합니다", business: "구직자: 김OO", category: "판매", location: "서울 종로구 거주", pay: "협의 가능", schedule: "주말 종일 가능", posted: "6시간 전", isUrgent: false, desc: "대학생. 편의점 6개월, 카페 3개월 경험. 성실합니다." },
  { id: 5, type: "구인", title: "배달 라이더 모집 (자차)", business: "동네반찬", category: "배달", location: "서울 강남구 일대", pay: "건당 4,000~6,000원", schedule: "점심/저녁 피크타임", posted: "1일 전", isUrgent: false, desc: "자차(오토바이) 보유 라이더. 보험 가입 필수." },
  { id: 6, type: "구인", title: "매장 청소 파트타임", business: "프레시마트", category: "청소", location: "경기 수원시 영통구", pay: "시급 11,000원", schedule: "매일 06:00-09:00", posted: "1일 전", isUrgent: false, desc: "아침 매장 청소 담당. 주 5일 근무." },
];

export function JobBoard() {
  const [tab, setTab] = useState("all");
  const [selectedType, setSelectedType] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [saved, setSaved] = useState<Set<number>>(new Set());
  const [showPost, setShowPost] = useState(false);

  const filtered = mockJobs.filter((job) => {
    const matchTab = tab === "all" || (tab === "hire" && job.type === "구인") || (tab === "seek" && job.type === "구직");
    const matchType = selectedType === "전체" || job.category === selectedType;
    const matchSearch = !searchQuery || job.title.includes(searchQuery) || job.business.includes(searchQuery);
    return matchTab && matchType && matchSearch;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-start sm:items-center justify-between gap-4 mb-8 flex-col sm:flex-row">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-violet-600" />
            </div>
            <h1 style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.02em' }}>구인 · 구직</h1>
          </div>
          <p className="text-gray-500" style={{ fontSize: '0.9rem' }}>지역 기반 파트타임 · 알바 매칭</p>
        </div>
        <Button className="bg-primary text-white rounded-xl h-10 px-5 shadow-sm" onClick={() => setShowPost(!showPost)}>
          <Plus className="w-4 h-4 mr-1.5" /> 등록하기
        </Button>
      </div>

      {/* Post Form */}
      {showPost && (
        <Card className="mb-6 border-0 shadow-lg ring-1 ring-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontWeight: 600, fontSize: '1.02rem' }}>구인/구직 등록</h3>
              <button onClick={() => setShowPost(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>유형</label>
                <select className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>구인 (사장님)</option><option>구직 (구직자)</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>업종</label>
                <select className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
                  {jobTypes.filter((t) => t !== "전체").map((t) => (<option key={t}>{t}</option>))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>제목</label>
                <Input placeholder="제목을 입력하세요" className="h-11 rounded-xl border-gray-200" />
              </div>
              <div>
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>위치</label>
                <Input placeholder="예: 서울 마포구 홍대입구역" className="h-11 rounded-xl border-gray-200" />
              </div>
              <div>
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>급여</label>
                <Input placeholder="예: 시급 12,000원" className="h-11 rounded-xl border-gray-200" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-gray-500" style={{ fontSize: '0.82rem' }}>상세 설명</label>
                <textarea className="w-full border border-gray-200 rounded-xl p-4 min-h-[100px] text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-gray-400" placeholder="상세 내용을 작성해주세요" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <Button variant="outline" className="rounded-xl h-10 border-gray-200" onClick={() => setShowPost(false)}>취소</Button>
              <Button className="bg-primary text-white rounded-xl h-10 px-6" onClick={() => setShowPost(false)}>등록하기</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs & Search */}
      <Tabs value={tab} onValueChange={setTab} className="mb-5">
        <TabsList className="bg-gray-100 rounded-xl h-9 p-0.5">
          <TabsTrigger value="all" className="rounded-lg h-8 px-4 data-[state=active]:shadow-sm" style={{ fontSize: '0.82rem' }}>전체</TabsTrigger>
          <TabsTrigger value="hire" className="rounded-lg h-8 px-4 data-[state=active]:shadow-sm" style={{ fontSize: '0.82rem' }}>구인</TabsTrigger>
          <TabsTrigger value="seek" className="rounded-lg h-8 px-4 data-[state=active]:shadow-sm" style={{ fontSize: '0.82rem' }}>구직</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative mb-5">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="구인/구직 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-11 rounded-xl bg-white border-gray-200" />
      </div>

      <div className="flex gap-2 flex-wrap mb-8">
        {jobTypes.map((type) => (
          <button
            key={type}
            className={`px-4 py-1.5 rounded-full transition-all ${selectedType === type ? "bg-primary text-white shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
            onClick={() => setSelectedType(type)}
            style={{ fontSize: '0.82rem', fontWeight: 500 }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-gray-400 mb-4" style={{ fontSize: '0.82rem' }}>
        총 <span className="text-foreground" style={{ fontWeight: 600 }}>{filtered.length}건</span>
      </p>

      <div className="space-y-3">
        {filtered.map((job) => (
          <Card key={job.id} className="border-0 shadow-sm ring-1 ring-black/[0.04] hover:shadow-md transition-all group">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2.5">
                    <span className={`px-2.5 py-0.5 rounded-full ${job.type === "구인" ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"}`} style={{ fontSize: '0.72rem', fontWeight: 600 }}>
                      {job.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-500" style={{ fontSize: '0.7rem', fontWeight: 500 }}>{job.category}</span>
                    {job.isUrgent && (
                      <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-red-50 text-red-500 ring-1 ring-red-200" style={{ fontSize: '0.68rem', fontWeight: 600 }}>
                        <Sparkles className="w-2.5 h-2.5" /> 급구
                      </span>
                    )}
                  </div>
                  <h4 className="mb-1 group-hover:text-primary transition-colors" style={{ fontSize: '1rem', fontWeight: 600 }}>{job.title}</h4>
                  <p className="text-gray-400 mb-2.5 flex items-center gap-1" style={{ fontSize: '0.82rem' }}>
                    <Building2 className="w-3.5 h-3.5" /> {job.business}
                  </p>
                  <p className="text-gray-500 mb-3" style={{ fontSize: '0.84rem', lineHeight: 1.5 }}>{job.desc}</p>
                  <div className="flex items-center gap-4 flex-wrap text-gray-400" style={{ fontSize: '0.78rem' }}>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1 text-primary" style={{ fontWeight: 700 }}>
                      <DollarSign className="w-3.5 h-3.5" /> {job.pay}
                    </span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {job.schedule}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.posted}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2.5 shrink-0">
                  <button
                    onClick={() => setSaved((prev) => {
                      const next = new Set(prev);
                      if (next.has(job.id)) next.delete(job.id); else next.add(job.id);
                      return next;
                    })}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${saved.has(job.id) ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-400 hover:bg-gray-100"}`}
                  >
                    <Heart className={`w-[18px] h-[18px] ${saved.has(job.id) ? "fill-current" : ""}`} />
                  </button>
                  <Button className="bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl h-9 px-3 transition-all" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                    지원하기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
