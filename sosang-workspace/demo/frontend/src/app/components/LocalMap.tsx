import { useState } from "react";
import {
  MapPin,
  Search,
  Star,
  Phone,
  Clock,
  ExternalLink,
  Ticket,
  ShoppingBag,
  PenSquare,
  Heart,
  ChevronRight,
  Users,
  Tag,
  Navigation,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const mockShops = [
  {
    id: 1,
    name: "한옥마을 비빔밥집",
    category: "외식업",
    subcategory: "한식",
    rating: 4.8,
    reviews: 342,
    address: "전주시 완산구 은행로 65 (한옥마을)",
    phone: "063-231-1234",
    hours: "10:30 - 21:00",
    desc: "전통 돌솥비빔밥과 콩나물국밥을 전주 정통 방식으로",
    image: "https://images.unsplash.com/photo-1573470571028-a0ca7a723959?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBiaWJpbWJhcCUyMHRyYWRpdGlvbmFsJTIwZm9vZHxlbnwxfHx8fDE3NzE5MjM2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: true,
    isOpen: true,
    lat: 35.8155,
    lng: 127.1530,
  },
  {
    id: 2,
    name: "경원당 전통찻집",
    category: "카페/베이커리",
    subcategory: "전통찻집",
    rating: 4.9,
    reviews: 187,
    address: "전주시 완산구 태조로 44 (한옥마을)",
    phone: "063-232-5678",
    hours: "09:00 - 20:00",
    desc: "한옥에서 즐기는 전통차와 수제 한과, 모싯잎송편",
    image: "https://images.unsplash.com/photo-1748077228194-e7d5b947287a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjB0cmFkaXRpb25hbCUyMHRlYSUyMGNhZmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE5MjM2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: false,
    isOpen: true,
    lat: 35.8148,
    lng: 127.1520,
  },
  {
    id: 3,
    name: "객리단길 수제버거",
    category: "외식업",
    subcategory: "양식",
    rating: 4.6,
    reviews: 156,
    address: "전주시 완산구 경기전길 89 (객리단길)",
    phone: "063-287-3456",
    hours: "11:30 - 21:30",
    desc: "전주 한우 패티로 만든 수제버거 전문점",
    image: "https://images.unsplash.com/photo-1628309273501-009fa473f65e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjB0cmFkaXRpb25hbCUyMGhhbm9rJTIwdmlsbGFnZSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzcxOTIzNjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: true,
    isOpen: true,
    lat: 35.8170,
    lng: 127.1495,
  },
  {
    id: 4,
    name: "풍남문 베이커리",
    category: "카페/베이커리",
    subcategory: "베이커리",
    rating: 4.7,
    reviews: 213,
    address: "전주시 완산구 풍남문3길 22",
    phone: "063-255-7890",
    hours: "07:30 - 22:00",
    desc: "초코파이의 도시 전주에서 탄생한 수제 초코파이 & 빵",
    image: "https://images.unsplash.com/photo-1648808692677-017af08104d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBiYWtlcnklMjBwYXN0cnklMjBzaG9wfGVufDF8fHx8MTc3MTkyMzYzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: true,
    isOpen: true,
    lat: 35.8125,
    lng: 127.1485,
  },
  {
    id: 5,
    name: "남부시장 청년몰 떡갈비",
    category: "외식업",
    subcategory: "한식",
    rating: 4.5,
    reviews: 289,
    address: "전주시 완산구 풍남문1길 29 (남부시장)",
    phone: "063-244-0123",
    hours: "10:00 - 20:00",
    desc: "남부시장 청년몰에서 만나는 전주식 떡갈비와 막걸리",
    image: "https://images.unsplash.com/photo-1768006240774-1e40deba1598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBzdHJlZXQlMjBtYXJrZXQlMjBmb29kJTIwc3RhbGx8ZW58MXx8fHwxNzcxOTIzNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: false,
    isOpen: false,
    lat: 35.8105,
    lng: 127.1510,
  },
  {
    id: 6,
    name: "전주 공예공방 솜씨",
    category: "서비스업",
    subcategory: "공예/체험",
    rating: 4.8,
    reviews: 98,
    address: "전주시 완산구 한지길 58 (한옥마을)",
    phone: "063-288-4567",
    hours: "10:00 - 18:00",
    desc: "한지 공예, 부채 만들기 등 전주 전통 체험 프로그램",
    image: "https://images.unsplash.com/photo-1749704491811-eaa3a8822966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjB0cmFkaXRpb25hbCUyMGNyYWZ0JTIwd29ya3Nob3B8ZW58MXx8fHwxNzcxOTIzNjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    hasCoupon: true,
    isOpen: true,
    lat: 35.8162,
    lng: 127.1545,
  },
];

const coupons = [
  { id: 1, shop: "한옥마을 비빔밥집", discount: "15% 할인", condition: "전주비빔밥 2인 세트 주문 시", expires: "2026.03.31", code: "BIBIM2026" },
  { id: 2, shop: "풍남문 베이커리", discount: "수제 초코파이 2+1", condition: "수제 초코파이 2박스 구매 시", expires: "2026.03.15", code: "CHOCO2026" },
  { id: 3, shop: "전주 공예공방 솜씨", discount: "체험비 20% 할인", condition: "한지 공예 체험 예약 시", expires: "2026.04.30", code: "CRAFT2026" },
  { id: 4, shop: "한옥마을 연합", discount: "스탬프 5곳 완성 시 10,000원 상품권", condition: "참여 가게 5곳 방문 스탬프", expires: "2026.06.30", code: "HANOK2026" },
  { id: 5, shop: "객리단길 수제버거", discount: "음료 무료 업그레이드", condition: "버거 세트 주문 시", expires: "2026.03.20", code: "BURGER26" },
];

const groupBuyItems = [
  { id: 1, title: "전주 로컬 유기농 쌀 공동구매 (10kg)", participants: 18, target: 30, price: "32,000원", originalPrice: "45,000원", deadline: "2026.03.05" },
  { id: 2, title: "친환경 종이 포장용기 공동구매", participants: 12, target: 20, price: "15,000원/500개", originalPrice: "22,000원/500개", deadline: "2026.03.10" },
  { id: 3, title: "전주 지역 막걸리 공동구매 (업소용)", participants: 22, target: 25, price: "48,000원/20병", originalPrice: "65,000원/20병", deadline: "2026.03.03" },
  { id: 4, title: "전주 한우 등심 공동구매", participants: 8, target: 15, price: "85,000원/kg", originalPrice: "120,000원/kg", deadline: "2026.03.12" },
];

const blogPosts = [
  { id: 1, shop: "한옥마을 비빔밥집", title: "봄나물 비빔밥 출시! 냉이·달래·쑥으로 만든 전주 봄 한정 메뉴", time: "1시간 전", likes: 67 },
  { id: 2, shop: "경원당 전통찻집", title: "매화차 시즌 오픈 ☕ 전주 한옥마을에서 봄 향기를", time: "3시간 전", likes: 45 },
  { id: 3, shop: "객리단길 수제버거", title: "전주 한우 신메뉴: 매콤 고추장 버거 런칭 이벤트!", time: "5시간 전", likes: 38 },
  { id: 4, shop: "풍남문 베이커리", title: "설 연휴 한정 한과 선물세트 예약 받습니다", time: "1일 전", likes: 89 },
  { id: 5, shop: "남부시장 청년몰 떡갈비", title: "이번 주말 남부시장 야시장 특별 참여! 떡갈비 세트 할인", time: "1일 전", likes: 52 },
  { id: 6, shop: "전주 공예공방 솜씨", title: "봄맞이 한지 꽃등 만들기 클래스 오픈 (선착순 15명)", time: "2일 전", likes: 34 },
];

// Jeonju map pin positions (simulated on a visual grid)
const mapPins = [
  { id: 1, label: "비빔밥집", color: "bg-primary", top: "35%", left: "55%" },
  { id: 2, label: "전통찻집", color: "bg-emerald-500", top: "42%", left: "48%" },
  { id: 3, label: "수제버거", color: "bg-blue-500", top: "28%", left: "38%" },
  { id: 4, label: "베이커리", color: "bg-amber-500", top: "60%", left: "42%" },
  { id: 5, label: "청년몰", color: "bg-rose-500", top: "68%", left: "50%" },
  { id: 6, label: "공예공방", color: "bg-violet-500", top: "30%", left: "62%" },
];

const jeonjuAreas = [
  { name: "한옥마을", count: 48 },
  { name: "객리단길", count: 32 },
  { name: "남부시장", count: 27 },
  { name: "덕진공원", count: 15 },
  { name: "전주역", count: 22 },
];

export function LocalMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 2]));
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedPin, setSelectedPin] = useState<number | null>(null);
  const categories = ["전체", "외식업", "카페/베이커리", "서비스업"];

  const filteredShops = mockShops.filter((shop) => {
    const matchCat = selectedCategory === "전체" || shop.category === selectedCategory;
    const matchSearch = !searchQuery || shop.name.includes(searchQuery) || shop.address.includes(searchQuery) || shop.subcategory.includes(searchQuery);
    const matchPin = selectedPin === null || shop.id === selectedPin;
    return matchCat && matchSearch && matchPin;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
            <MapPin className="w-4 h-4 text-rose-600" />
          </div>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 700, letterSpacing: '-0.02em' }}>전주 동네 사장님</h1>
        </div>
        <p className="text-gray-500" style={{ fontSize: '0.9rem' }}>전주 지역 소상공인 연합 마케팅 플랫폼</p>
      </div>

      <Tabs defaultValue="map">
        <TabsList className="bg-gray-100 rounded-xl mb-8 flex-wrap h-auto gap-1 p-1">
          <TabsTrigger value="map" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm px-4">
            <MapPin className="w-4 h-4" /> 동네 가게
          </TabsTrigger>
          <TabsTrigger value="coupon" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm px-4">
            <Ticket className="w-4 h-4" /> 쿠폰/할인
          </TabsTrigger>
          <TabsTrigger value="groupbuy" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm px-4">
            <ShoppingBag className="w-4 h-4" /> 공동구매
          </TabsTrigger>
          <TabsTrigger value="blog" className="rounded-lg gap-1.5 data-[state=active]:shadow-sm px-4">
            <PenSquare className="w-4 h-4" /> 홍보관
          </TabsTrigger>
        </TabsList>

        {/* Map / Shop List Tab */}
        <TabsContent value="map">
          {/* Simulated Jeonju Map */}
          <Card className="mb-6 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-50 via-sky-50 to-amber-50 h-72 sm:h-80 relative">
              {/* Map grid lines */}
              <div className="absolute inset-0 opacity-10">
                {[...Array(8)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute w-full border-t border-gray-400" style={{ top: `${(i + 1) * 11}%` }} />
                ))}
                {[...Array(8)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute h-full border-l border-gray-400" style={{ left: `${(i + 1) * 11}%` }} />
                ))}
              </div>

              {/* Simulated road paths */}
              <div className="absolute top-0 bottom-0 left-[45%] w-[3px] bg-gray-300/40 rotate-3" />
              <div className="absolute left-0 right-0 top-[50%] h-[3px] bg-gray-300/40 -rotate-1" />
              <div className="absolute top-[20%] bottom-[20%] left-[60%] w-[2px] bg-gray-300/30 -rotate-6" />

              {/* Area labels */}
              <div className="absolute top-[18%] left-[50%] -translate-x-1/2 bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-gray-200/50">
                <span className="text-gray-500" style={{ fontSize: '0.65rem', fontWeight: 600 }}>한옥마을</span>
              </div>
              <div className="absolute top-[22%] left-[30%] bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-gray-200/50">
                <span className="text-gray-500" style={{ fontSize: '0.65rem', fontWeight: 600 }}>객리단길</span>
              </div>
              <div className="absolute bottom-[18%] left-[45%] bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-gray-200/50">
                <span className="text-gray-500" style={{ fontSize: '0.65rem', fontWeight: 600 }}>남부시장</span>
              </div>
              <div className="absolute top-[50%] right-[12%] bg-white/60 backdrop-blur-sm rounded-lg px-2.5 py-1 border border-gray-200/50">
                <span className="text-gray-500" style={{ fontSize: '0.65rem', fontWeight: 600 }}>풍남문</span>
              </div>

              {/* Map Pins */}
              {mapPins.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setSelectedPin(selectedPin === pin.id ? null : pin.id)}
                  className={`absolute flex flex-col items-center group transition-transform ${selectedPin === pin.id ? "scale-125 z-10" : "hover:scale-110"}`}
                  style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -100%)" }}
                >
                  <div className={`${pin.color} text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg ring-2 ring-white ${selectedPin === pin.id ? "ring-4 ring-primary/30" : ""}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className={`mt-1 bg-white rounded-md px-1.5 py-0.5 shadow-sm border border-gray-100 ${selectedPin === pin.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 600 }} className="text-gray-700 whitespace-nowrap">{pin.label}</span>
                  </div>
                </button>
              ))}

              {/* Center info */}
              <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-md border border-gray-100">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-primary" />
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>전주시 완산구</p>
                    <p className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>등록 가게 {mockShops.length}곳 · 한옥마을 일대</p>
                  </div>
                </div>
              </div>

              {/* Area quick chips */}
              <div className="absolute top-3 left-3 right-3 flex gap-1.5 flex-wrap">
                {jeonjuAreas.map((area) => (
                  <button
                    key={area.name}
                    onClick={() => setSearchQuery(area.name === searchQuery ? "" : area.name)}
                    className={`bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm border transition-colors ${searchQuery === area.name ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300"}`}
                  >
                    <span style={{ fontSize: '0.7rem', fontWeight: 500 }} className={searchQuery === area.name ? "text-primary" : "text-gray-600"}>
                      {area.name} <span className="text-gray-400">{area.count}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Search & Filter */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="가게명, 주소, 업종 검색... (예: 비빔밥, 한옥마을)"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSelectedPin(null); }}
              className="pl-10 rounded-xl bg-white"
            />
          </div>
          <div className="flex gap-2 flex-wrap mb-6">
            {selectedPin !== null && (
              <Button
                variant="outline"
                className="rounded-full px-4 py-1 h-auto border-primary text-primary"
                onClick={() => setSelectedPin(null)}
                style={{ fontSize: '0.825rem' }}
              >
                ✕ 핀 선택 해제
              </Button>
            )}
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`rounded-full px-4 py-1 h-auto ${selectedCategory === cat ? "bg-primary text-white" : ""}`}
                onClick={() => { setSelectedCategory(cat); setSelectedPin(null); }}
                style={{ fontSize: '0.825rem' }}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Shop Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.map((shop) => (
              <Card key={shop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-44">
                  <ImageWithFallback src={shop.image} alt={shop.name} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setFavorites((prev) => {
                      const next = new Set(prev);
                      if (next.has(shop.id)) next.delete(shop.id);
                      else next.add(shop.id);
                      return next;
                    })}
                    className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors hover:bg-white"
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(shop.id) ? "text-red-500 fill-current" : "text-gray-400"}`} />
                  </button>
                  {shop.hasCoupon && (
                    <Badge className="absolute top-2 left-2 bg-primary text-white border-0 text-xs">쿠폰</Badge>
                  )}
                  <Badge className={`absolute bottom-2 left-2 border-0 text-xs ${shop.isOpen ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                    {shop.isOpen ? "영업중" : "준비중"}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{shop.name}</h4>
                      <Badge variant="outline" className="text-xs mt-1">{shop.subcategory}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{shop.rating}</span>
                      <span className="text-muted-foreground" style={{ fontSize: '0.75rem' }}>({shop.reviews})</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2 line-clamp-1" style={{ fontSize: '0.825rem' }}>{shop.desc}</p>
                  <div className="mt-3 space-y-1 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                    <p className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 shrink-0" /> {shop.address}</p>
                    <p className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 shrink-0" /> {shop.hours}</p>
                    <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 shrink-0" /> {shop.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredShops.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p style={{ fontWeight: 500 }}>검색 결과가 없습니다</p>
              <p style={{ fontSize: '0.85rem' }} className="mt-1">다른 검색어나 카테고리를 선택해보세요</p>
            </div>
          )}
        </TabsContent>

        {/* Coupons Tab */}
        <TabsContent value="coupon">
          <div className="space-y-4">
            <div>
              <h3 style={{ fontWeight: 600 }}>전주 연합 쿠폰 & 할인</h3>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '0.875rem' }}>전주 지역 사장님들이 함께 만드는 할인 혜택</p>
            </div>
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="border-border/60 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="text-xs mb-2">{coupon.shop}</Badge>
                      <h4 className="text-primary" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{coupon.discount}</h4>
                      <p className="text-muted-foreground mt-1" style={{ fontSize: '0.825rem' }}>{coupon.condition}</p>
                      <p className="text-muted-foreground mt-1" style={{ fontSize: '0.75rem' }}>유효기간: ~{coupon.expires}</p>
                    </div>
                    <div className="text-center shrink-0">
                      <div className="bg-secondary rounded-xl px-4 py-3">
                        <Ticket className="w-6 h-6 text-primary mx-auto mb-1" />
                        <span className="text-primary" style={{ fontSize: '0.75rem', fontWeight: 600 }}>{coupon.code}</span>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 rounded-lg" style={{ fontSize: '0.75rem' }}>받기</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Group Buy Tab */}
        <TabsContent value="groupbuy">
          <div className="space-y-4">
            <div>
              <h3 style={{ fontWeight: 600 }}>전주 사장님 공동 구매</h3>
              <p className="text-muted-foreground mt-1" style={{ fontSize: '0.875rem' }}>전주 지역 가게들과 함께 식자재·비품을 저렴하게 구매하세요</p>
            </div>
            {groupBuyItems.map((item) => {
              const progress = (item.participants / item.target) * 100;
              return (
                <Card key={item.id} className="border-border/60 hover:shadow-md transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-muted-foreground" style={{ fontSize: '0.8rem' }}>
                          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {item.participants}/{item.target}명</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> ~{item.deadline}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-primary" style={{ fontSize: '1rem', fontWeight: 700 }}>{item.price}</p>
                        <p className="text-muted-foreground line-through" style={{ fontSize: '0.8rem' }}>{item.originalPrice}</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                      <div className="bg-primary h-2.5 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground" style={{ fontSize: '0.8rem' }}>{Math.round(progress)}% 달성</span>
                      <Button className="bg-primary text-white rounded-lg" style={{ fontSize: '0.825rem' }}>참여하기</Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Blog Tab */}
        <TabsContent value="blog">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 style={{ fontWeight: 600 }}>전주 사장님 홍보관</h3>
                <p className="text-muted-foreground mt-1" style={{ fontSize: '0.875rem' }}>오늘의 메뉴, 이벤트, 전주 소식을 직접 올려보세요</p>
              </div>
              <Button className="bg-primary text-white rounded-lg">
                <PenSquare className="w-4 h-4 mr-1" /> 글 올리기
              </Button>
            </div>
            {blogPosts.map((post) => (
              <Card key={post.id} className="border-border/60 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <Badge variant="secondary" className="text-xs mb-2">{post.shop}</Badge>
                    <h4 className="truncate" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{post.title}</h4>
                    <p className="text-muted-foreground mt-1" style={{ fontSize: '0.8rem' }}>{post.time}</p>
                  </div>
                  <div className="flex items-center gap-1 text-red-400 shrink-0">
                    <Heart className="w-4 h-4" /> <span style={{ fontSize: '0.825rem' }}>{post.likes}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
