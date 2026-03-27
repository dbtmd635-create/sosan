import { useState } from "react";
import {
  Search,
  MapPin,
  Clock,
  Heart,
  MessageCircle,
  Plus,
  Filter,
  ChevronDown,
  Gift,
  ShoppingCart,
  Camera,
  Tag,
  Users,
  ShoppingBag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const marketCategories = ["전체", "주방기기", "인테리어", "포스/결제", "냉장/냉동", "테이블/의자", "간판/사인", "기타"];

const mockItems = [
  {
    id: 1,
    title: "업소용 냉장고 (유니크 45박스)",
    price: 800000,
    location: "서울 강남구",
    condition: "중고 - 상",
    category: "냉장/냉동",
    posted: "2시간 전",
    views: 234,
    chats: 5,
    likes: 12,
    image: "https://images.unsplash.com/photo-1589109807644-924edf14ee09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwa2l0Y2hlbiUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzE4Njg2Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    type: "거래",
    seller: "마포사장",
    desc: "1년 사용, 상태 양호. 매장 리모델링으로 판매합니다. 직접 픽업.",
  },
  {
    id: 2,
    title: "2인용 테이블 5개 세트",
    price: 150000,
    location: "서울 마포구",
    condition: "중고 - 중",
    category: "테이블/의자",
    posted: "5시간 전",
    views: 156,
    chats: 3,
    likes: 8,
    image: "https://images.unsplash.com/photo-1766074903112-79661da9ab45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbW11bml0eSUyMG1lZXRpbmd8ZW58MXx8fHwxNzcxOTIxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    type: "거래",
    seller: "커피사랑",
    desc: "카페 폐업으로 판매. 테이블 5개 + 의자 10개 세트. 상태 무난합니다.",
  },
  {
    id: 3,
    title: "포스기 (키오스크형) + 프린터",
    price: 350000,
    location: "경기 수원시",
    condition: "중고 - 상",
    category: "포스/결제",
    posted: "1일 전",
    views: 412,
    chats: 8,
    likes: 23,
    image: "",
    type: "거래",
    seller: "수원사장",
    desc: "2024년 구매, 거의 새것. 프로그램 초기화 완료. 터치스크린 + 영수증 프린터 포함.",
  },
  {
    id: 4,
    title: "LED 간판 (세로형 1200x400)",
    price: 120000,
    location: "서울 종로구",
    condition: "중고 - 중",
    category: "간판/사인",
    posted: "1일 전",
    views: 98,
    chats: 2,
    likes: 4,
    image: "",
    type: "거래",
    seller: "종로맛집",
    desc: "업종 변경으로 판매. LED 정상 작동, 디자인 변경 가능.",
  },
  {
    id: 5,
    title: "업소용 가스레인지 (4구)",
    price: 200000,
    location: "부산 해운대구",
    condition: "중고 - 상",
    category: "주방기기",
    posted: "2일 전",
    views: 189,
    chats: 4,
    likes: 11,
    image: "",
    type: "거래",
    seller: "해운대셰프",
    desc: "2년 사용, 화력 좋습니다. 전문 업체 수리 이력 없음.",
  },
];

const sharingItems = [
  {
    id: 101,
    title: "유통기한 임박 밀가루 (25kg) 5포",
    location: "서울 강서구",
    posted: "3시간 전",
    expires: "2026.03.10",
    donor: "빵집사장",
    desc: "유통기한 2주 남은 밀가루입니다. 제빵/제과 하시는 분 가져가세요.",
  },
  {
    id: 102,
    title: "신메뉴 시식용 소스 샘플 (10박스)",
    location: "서울 마포구",
    posted: "6시간 전",
    expires: "2026.04.01",
    donor: "소스공장",
    desc: "신제품 런칭 전 샘플입니다. 외식업 사장님들 테스트해보세요.",
  },
  {
    id: 103,
    title: "일회용 포장 용기 (대) 200개",
    location: "경기 성남시",
    posted: "1일 전",
    expires: "",
    donor: "포장마차",
    desc: "사이즈 잘못 주문해서 나눔합니다. 상태 새것.",
  },
];

const groupBuyItems = [
  { id: 201, title: "로컬 유기농 쌀 공동구매 (10kg)", participants: 18, target: 30, price: "32,000원", originalPrice: "45,000원", deadline: "2026.03.05" },
  { id: 202, title: "친환경 종이 포장용기 공동구매", participants: 12, target: 20, price: "15,000원/500개", originalPrice: "22,000원/500개", deadline: "2026.03.10" },
  { id: 203, title: "업소용 막걸리 공동구매 (20병)", participants: 22, target: 25, price: "48,000원/20병", originalPrice: "65,000원/20병", deadline: "2026.03.03" },
  { id: 204, title: "국산 한우 등심 공동구매", participants: 8, target: 15, price: "85,000원/kg", originalPrice: "120,000원/kg", deadline: "2026.03.12" },
];

export function Marketplace() {
  const [tab, setTab] = useState("trade");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3]));
  const [showPost, setShowPost] = useState(false);
  const [chatOpen, setChatOpen] = useState<number | null>(null);
  const [chatMessage, setChatMessage] = useState("");

  const filteredItems = mockItems.filter((item) => {
    const matchCat = selectedCategory === "전체" || item.category === selectedCategory;
    const matchSearch = !searchQuery || item.title.includes(searchQuery) || item.desc.includes(searchQuery);
    return matchCat && matchSearch;
  });

  return (
    <div 
      className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10"
      style={{
        minHeight: '100vh',
        backgroundColor: '#141720',
        backgroundImage: `radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 50%)`,
      }}
    >
      <div className="flex items-start sm:items-center justify-between gap-4 mb-8 flex-col sm:flex-row">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4 text-amber-600" />
            </div>
            <h1 className="text-white" style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.02em' }}>중고 거래소</h1>
          </div>
          <p className="text-gray-400" style={{ fontSize: '0.9rem' }}>B2B 식자재 · 집기 직거래 및 나눔</p>
        </div>
        <Button className="bg-primary text-white rounded-xl h-10 px-5 shadow-sm" onClick={() => setShowPost(!showPost)}>
          <Plus className="w-4 h-4 mr-1" /> 등록하기
        </Button>
      </div>

      {/* Post Form */}
      {showPost && (
        <Card className="mb-6 border-primary/30 bg-white/5">
          <CardContent className="p-6">
            <h3 className="mb-4 text-white" style={{ fontWeight: 600 }}>물품 등록</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>유형</label>
                <select className="w-full border border-white/10 rounded-lg px-3 py-2 bg-white/5 text-white text-sm">
                  <option>판매</option>
                  <option>나눔</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>카테고리</label>
                <select className="w-full border border-white/10 rounded-lg px-3 py-2 bg-white/5 text-white text-sm">
                  {marketCategories.filter((c) => c !== "전체").map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>제목</label>
                <Input placeholder="물품명을 입력하세요" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
              </div>
              <div>
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>가격</label>
                <Input type="number" placeholder="가격 (원)" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
              </div>
              <div>
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>위치</label>
                <Input placeholder="거래 희망 지역" className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>상세 설명</label>
                <textarea className="w-full border border-white/10 rounded-lg p-3 min-h-[100px] text-sm bg-white/5 text-white placeholder:text-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="물품 상태, 사용 기간 등을 작성해주세요" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-gray-400" style={{ fontSize: '0.875rem' }}>사진</label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <Camera className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500" style={{ fontSize: '0.825rem' }}>클릭하여 사진을 업로드하세요 (최대 5장)</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" className="rounded-lg border-white/10 text-gray-400 hover:bg-white/5" onClick={() => setShowPost(false)}>취소</Button>
              <Button className="bg-primary text-white rounded-lg" onClick={() => setShowPost(false)}>등록</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={tab} onValueChange={setTab} className="mb-6">
        <TabsList className="bg-white/5 rounded-lg">
          <TabsTrigger value="trade" className="rounded-md gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400">
            <ShoppingCart className="w-4 h-4" /> 직거래 장터
          </TabsTrigger>
          <TabsTrigger value="groupbuy" className="rounded-md gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400">
            <ShoppingBag className="w-4 h-4" /> 공동구매
          </TabsTrigger>
          <TabsTrigger value="share" className="rounded-md gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-white text-gray-400">
            <Gift className="w-4 h-4" /> 나눔 섹션
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {tab === "trade" && (
        <>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input placeholder="물품 검색..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            {marketCategories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`rounded-full px-4 py-1 h-auto ${selectedCategory === cat ? "bg-primary text-white" : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ fontSize: '0.825rem' }}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white/5 border-white/10">
                <div className="relative h-48 bg-white/10">
                  {item.image ? (
                    <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-12 h-12 text-gray-600/40" />
                    </div>
                  )}
                  <button
                    onClick={() => setFavorites((prev) => {
                      const next = new Set(prev);
                      if (next.has(item.id)) next.delete(item.id);
                      else next.add(item.id);
                      return next;
                    })}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(item.id) ? "text-red-500 fill-current" : "text-white"}`} />
                  </button>
                  <Badge className={`absolute top-2 left-2 border-0 text-xs ${
                    item.condition.includes("상") ? "bg-green-600 text-white" : "bg-amber-600 text-white"
                  }`}>
                    {item.condition}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h4 className="truncate mb-1 text-white" style={{ fontWeight: 600, fontSize: '0.925rem' }}>{item.title}</h4>
                  <p className="text-primary mb-2" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    {item.price.toLocaleString()}원
                  </p>
                  <p className="text-gray-400 line-clamp-2 mb-3" style={{ fontSize: '0.8rem' }}>{item.desc}</p>
                  <div className="flex items-center justify-between text-gray-500" style={{ fontSize: '0.75rem' }}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                      <span>{item.posted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-0.5"><Heart className="w-3 h-3" /> {item.likes}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle className="w-3 h-3" /> {item.chats}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button className="flex-1 bg-primary text-white rounded-lg" style={{ fontSize: '0.825rem' }}
                      onClick={() => setChatOpen(chatOpen === item.id ? null : item.id)}>
                      <MessageCircle className="w-4 h-4 mr-1" /> 채팅하기
                    </Button>
                  </div>
                  {/* Chat simulation */}
                  {chatOpen === item.id && (
                    <div className="mt-3 border border-white/10 rounded-lg p-3 bg-white/5">
                      <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                        <div className="bg-white/10 rounded-lg p-2" style={{ fontSize: '0.8rem' }}>
                          <span className="text-primary" style={{ fontWeight: 600 }}>{item.seller}</span>: <span className="text-gray-300">안녕하세요! 궁금한 점 물어보세요 😊</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="메시지 입력..."
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          className="flex-1"
                          style={{ fontSize: '0.8rem' }}
                        />
                        <Button size="sm" className="bg-primary text-white rounded-lg" onClick={() => setChatMessage("")}>전송</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {tab === "groupbuy" && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 flex items-center gap-3">
              <ShoppingBag className="w-10 h-10 text-green-600 shrink-0" />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }} className="text-green-800">공동구매로 저렴한 가격에 물품 구매하기</p>
                <p className="text-green-600" style={{ fontSize: '0.8rem' }}>필요한 물품을 공동으로 구매하여 저렴한 가격에 얻으세요</p>
              </div>
            </CardContent>
          </Card>

          {groupBuyItems.map((item) => (
            <Card key={item.id} className="border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                        <ShoppingBag className="w-3 h-3 mr-0.5" /> 공동구매
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{item.target}명 참여</Badge>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.title}</h4>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: '0.825rem' }}>현재 {item.participants}명 참여 중</p>
                    <div className="flex items-center gap-3 mt-2 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.target}명 참여 시</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.deadline}</span>
                      <span className="flex items-center gap-1 text-amber-600">
                        <Tag className="w-3.5 h-3.5" /> {item.price} (원가 {item.originalPrice})
                      </span>
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg shrink-0" style={{ fontSize: '0.825rem' }}>
                    참여하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {tab === "share" && (
        <div className="space-y-4">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-4 flex items-center gap-3">
              <Gift className="w-10 h-10 text-green-600 shrink-0" />
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600 }} className="text-green-800">나눔으로 따뜻한 사장님 커뮤니티</p>
                <p className="text-green-600" style={{ fontSize: '0.8rem' }}>유통기한 임박 식자재나 불필요한 물품을 이웃 사장님께 나눠주세요</p>
              </div>
            </CardContent>
          </Card>

          {sharingItems.map((item) => (
            <Card key={item.id} className="border-border/60 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                        <Gift className="w-3 h-3 mr-0.5" /> 나눔
                      </Badge>
                      <Badge variant="secondary" className="text-xs">{item.donor}</Badge>
                    </div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.title}</h4>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: '0.825rem' }}>{item.desc}</p>
                    <div className="flex items-center gap-3 mt-2 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {item.location}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {item.posted}</span>
                      {item.expires && (
                        <span className="flex items-center gap-1 text-amber-600">
                          <Tag className="w-3.5 h-3.5" /> ~{item.expires}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg shrink-0" style={{ fontSize: '0.825rem' }}>
                    받겠습니다
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}