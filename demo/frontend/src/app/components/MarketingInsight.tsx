import { useState } from "react";
import {
  ShoppingBag,
  Search,
  ArrowRight,
  Heart,
  MessageSquare,
  Users,
  Clock,
  CheckCircle2,
  X,
  Plus,
  Filter,
  TrendingUp,
  Tag,
  Box,
  Send
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const tradeItems = [
  { id: 1, title: "식당용 4단 선반 (상태 최상)", price: "45,000원", location: "완산구 효자동", time: "2시간 전", category: "주방기구", likes: 12, chats: 5, image: "🏗️", status: "판매중" },
  { id: 2, title: "카페용 원두 그라인더", price: "120,000원", location: "덕진구 송천동", time: "5시간 전", category: "커피용품", likes: 8, chats: 3, image: "☕", status: "예약중" },
  { id: 3, title: "남은 포장 용기 대량 처분", price: "10,000원", location: "완산구 중화산동", time: "1일 전", category: "소모품", likes: 15, chats: 7, image: "📦", status: "판매중" },
  { id: 4, title: "업소용 냉장고 급매", price: "350,000원", location: "덕진구 인후동", time: "2일 전", category: "대형가전", likes: 24, chats: 12, image: "❄️", status: "판매완료" },
];

const groupBuyItems = [
  { id: 1, title: "국내산 쌀 20kg (10포대 남음)", price: "42,000원", deadline: "내일 마감", participants: 15, target: 20, image: "🌾", discount: "25%" },
  { id: 2, title: "친환경 배달 용기 500개 세트", price: "28,500원", deadline: "3일 남음", participants: 42, target: 50, image: "🥡", discount: "15%" },
  { id: 3, title: "식용유 18L x 2통 세트", price: "58,000원", deadline: "5일 남음", participants: 8, target: 15, image: "🛢️", discount: "20%" },
];

export function Marketplace() {
  const [tab, setTab] = useState("trade");
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>비즈니스 장터</h2>
            <p className="text-gray-500" style={{ fontSize: '0.82rem' }}>사장님들끼리 중고 거래부터 공동구매까지</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl border-gray-200">내 거래 내역</Button>
            <Button size="sm" className="rounded-xl bg-primary text-white hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-1.5" /> 물품 등록
            </Button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
              placeholder="필요한 물품을 검색해보세요"
              className="pl-10 h-12 rounded-2xl border-0 shadow-sm ring-1 ring-black/[0.04] bg-white focus:ring-primary/20"
          />
        </div>

        <Tabs defaultValue="trade" onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-2xl mb-6">
            <TabsTrigger value="trade" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">중고 거래</TabsTrigger>
            <TabsTrigger value="groupbuy" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">공동구매</TabsTrigger>
          </TabsList>

          <div className="flex gap-2 overflow-x-auto pb-1 mb-4">
            {["전체", "주방기구", "가구/인테리어", "식자재", "소모품", "가전", "기타"].map((cat) => (
                <Badge key={cat} variant="secondary" className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 border-0 cursor-pointer hover:bg-gray-200 whitespace-nowrap" style={{ fontSize: '0.78rem' }}>
                  {cat}
                </Badge>
            ))}
          </div>

          {tab === "trade" && (
              <div className="grid gap-4">
                {tradeItems.map((item) => (
                    <Card key={item.id} className="border-0 shadow-sm ring-1 ring-black/[0.04] hover:shadow-md transition-shadow group cursor-pointer overflow-hidden">
                      <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                        <div className="w-full sm:w-32 h-32 bg-gray-50 flex items-center justify-center text-4xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                          {item.image}
                        </div>
                        <div className="p-4 flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-primary font-bold" style={{ fontSize: '1rem' }}>{item.price}</span>
                              <Badge className={`border-0 ${
                                  item.status === '판매중' ? 'bg-emerald-50 text-emerald-600' :
                                      item.status === '예약중' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                              }`} style={{ fontSize: '0.65rem' }}>{item.status}</Badge>
                            </div>
                            <button className="text-gray-300 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                          <h4 className="mb-1 truncate" style={{ fontSize: '0.92rem', fontWeight: 600 }}>{item.title}</h4>
                          <div className="flex items-center gap-2 text-gray-400 mb-3" style={{ fontSize: '0.75rem' }}>
                            <span>{item.location}</span>
                            <span>•</span>
                            <span>{item.time}</span>
                            <span>•</span>
                            <span>{item.category}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-gray-400" style={{ fontSize: '0.72rem' }}>
                                <Heart className="w-3.5 h-3.5" /> {item.likes}
                              </div>
                              <div className="flex items-center gap-1 text-gray-400" style={{ fontSize: '0.72rem' }}>
                                <MessageSquare className="w-3.5 h-3.5" /> {item.chats}
                              </div>
                            </div>
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-primary hover:text-primary hover:bg-primary/5 rounded-lg"
                                style={{ fontSize: '0.78rem', fontWeight: 600 }}
                                onClick={() => setShowChat(true)}
                            >
                              채팅하기 <ArrowRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                ))}
              </div>
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
                              <Badge className="bg-green-100 text-green-700 border-none">{item.discount} 할인</Badge>
                              <span className="text-xs text-muted-foreground">{item.deadline}</span>
                            </div>
                            <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                            <p className="text-primary font-bold text-xl mb-4">{item.price}</p>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">현재 참여 인원</span>
                                <span className="font-medium">{item.participants}/{item.target}명</span>
                              </div>
                              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500"
                                    style={{ width: `${(item.participants / item.target) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center text-4xl">
                            {item.image}
                          </div>
                        </div>
                        <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">공동구매 참여하기</Button>
                      </CardContent>
                    </Card>
                ))}
              </div>
          )}
        </Tabs>

        {/* Floating Chat UI */}
        {showChat && (
            <div className="fixed bottom-24 right-6 z-50 animate-in slide-in-from-bottom-4">
              <Card className="w-80 shadow-2xl border-0 ring-1 ring-black/5 overflow-hidden">
                <div className="bg-primary p-4 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">🍞</div>
                    <div>
                      <p className="font-bold" style={{ fontSize: '0.88rem' }}>밀가루공방 사장님</p>
                      <p className="text-white/70" style={{ fontSize: '0.65rem' }}>대화 중 • 5분 전 활동</p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <CardContent className="p-0">
                  <ScrollArea className="h-64 p-4">
                    <div className="space-y-4">
                      <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none mr-8" style={{ fontSize: '0.8rem' }}>
                        안녕하세요! 4단 선반 아직 판매 중인가요?
                        <p className="text-[10px] text-gray-400 mt-1">오후 2:30</p>
                      </div>
                      <div className="bg-primary/10 p-3 rounded-2xl rounded-tr-none ml-8 text-primary" style={{ fontSize: '0.8rem' }}>
                        네, 아직 판매 중입니다. 보러 오실래요?
                        <p className="text-[10px] text-primary/40 mt-1 text-right">오후 2:32</p>
                      </div>
                    </div>
                  </ScrollArea>
                  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="flex gap-2">
                      <Input
                          placeholder="메시지 입력..."
                          // 🚀 아래 줄에서 중복된 className을 하나로 합쳐서 해결했습니다.
                          className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 flex-1"
                          value={chatMessage}
                          onChange={(e) => setChatMessage(e.target.value)}
                          style={{ fontSize: '0.8rem' }}
                      />
                      <Button size="sm" className="bg-primary text-white rounded-lg" onClick={() => setChatMessage("")}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        )}
      </div>
  );
}