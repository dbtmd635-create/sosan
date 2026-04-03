import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { Search, Send, ArrowLeft, MoreVertical, Phone, Video } from "lucide-react";

/* ─────────────────────────────────────────
   타입 정의
───────────────────────────────────────── */
interface Message {
  id: number;
  text: string;
  fromMe: boolean;
  time: string;
}

interface Conversation {
  id: number;
  name: string;
  itemTitle: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
}

/* ─────────────────────────────────────────
   목 데이터
───────────────────────────────────────── */
const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "김사장",
    itemTitle: "업소용 냉장고 (호바트)",
    lastMessage: "네, 직거래 가능합니다. 언제 오실 수 있나요?",
    time: "오전 10:23",
    unread: 2,
    avatar: "김",
  },
  {
    id: 2,
    name: "이대표",
    itemTitle: "에스프레소 머신 (드롱기)",
    lastMessage: "사진 더 보내드릴게요",
    time: "어제",
    unread: 0,
    avatar: "이",
  },
  {
    id: 3,
    name: "박점주",
    itemTitle: "POS 시스템 (구름)",
    lastMessage: "가격 조금 조정 가능한가요?",
    time: "어제",
    unread: 1,
    avatar: "박",
  },
  {
    id: 4,
    name: "최사장",
    itemTitle: "업소용 가스레인지 (린나이)",
    lastMessage: "안녕하세요! 아직 판매 중인가요?",
    time: "3일 전",
    unread: 0,
    avatar: "최",
  },
  {
    id: 5,
    name: "정대표",
    itemTitle: "테이블 4인용 x6 (나눔)",
    lastMessage: "감사합니다! 내일 가져갈게요",
    time: "4일 전",
    unread: 0,
    avatar: "정",
  },
];

const MOCK_MESSAGES: Record<number, Message[]> = {
  1: [
    { id: 1, text: "안녕하세요! 업소용 냉장고 아직 판매 중인가요?", fromMe: true, time: "오전 9:45" },
    { id: 2, text: "네, 아직 판매 중입니다! 상태 아주 좋아요.", fromMe: false, time: "오전 9:50" },
    { id: 3, text: "혹시 직거래 가능한가요? 어디 계신지 여쭤봐도 될까요?", fromMe: true, time: "오전 10:15" },
    { id: 4, text: "네, 직거래 가능합니다. 언제 오실 수 있나요?", fromMe: false, time: "오전 10:23" },
  ],
  2: [
    { id: 1, text: "에스프레소 머신 관심 있습니다. 사용 기간이 어떻게 되나요?", fromMe: true, time: "어제 3:10" },
    { id: 2, text: "약 1년 반 됐어요. 카페 폐업하면서 내놓는 거라 상태 좋습니다.", fromMe: false, time: "어제 3:20" },
    { id: 3, text: "사진 더 보내드릴 수 있을까요?", fromMe: true, time: "어제 3:35" },
    { id: 4, text: "사진 더 보내드릴게요", fromMe: false, time: "어제 3:40" },
  ],
  3: [
    { id: 1, text: "POS 시스템 문의드립니다. 정가에서 좀 내려주실 수 있나요?", fromMe: true, time: "어제 11:00" },
    { id: 2, text: "가격 조금 조정 가능한가요?", fromMe: true, time: "어제 11:01" },
  ],
  4: [
    { id: 1, text: "안녕하세요! 아직 판매 중인가요?", fromMe: true, time: "3일 전" },
  ],
  5: [
    { id: 1, text: "테이블 나눔 신청 드립니다. 혹시 아직 있나요?", fromMe: true, time: "4일 전 2:00" },
    { id: 2, text: "네! 내일 가져가실 수 있으면 드릴게요", fromMe: false, time: "4일 전 2:30" },
    { id: 3, text: "감사합니다! 내일 가져갈게요", fromMe: true, time: "4일 전 2:35" },
  ],
};

/* ─────────────────────────────────────────
   ChatPage
───────────────────────────────────────── */
export function ChatPage() {
  const location = useLocation();
  const locationState = location.state as { sellerName?: string; itemTitle?: string } | null;

  // 초기 선택: 외부에서 넘어온 대화 or 첫 번째
  const initialId = locationState?.sellerName
    ? MOCK_CONVERSATIONS.find((c) => c.name === locationState.sellerName)?.id ?? 1
    : 1;

  const [selectedId, setSelectedId] = useState<number>(initialId);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [search, setSearch] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Record<number, Message[]>>(MOCK_MESSAGES);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);

  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId)!;
  const currentMessages = messages[selectedId] || [];

  // 메시지 자동 스크롤
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [currentMessages]);

  // 외부 진입 시 새 대화 추가
  useEffect(() => {
    if (locationState?.sellerName && locationState?.itemTitle) {
      const exists = conversations.find((c) => c.name === locationState.sellerName);
      if (!exists) {
        const newId = Math.max(...conversations.map((c) => c.id)) + 1;
        setConversations((prev) => [
          {
            id: newId,
            name: locationState.sellerName!,
            itemTitle: locationState.itemTitle!,
            lastMessage: "",
            time: "방금",
            unread: 0,
            avatar: locationState.sellerName!.charAt(0),
          },
          ...prev,
        ]);
        setMessages((prev) => ({ ...prev, [newId]: [] }));
        setSelectedId(newId);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredConversations = conversations.filter((c) => {
    if (filter === "unread" && c.unread === 0) return false;
    if (search && !c.name.includes(search) && !c.itemTitle.includes(search)) return false;
    return true;
  });

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    const newMsg: Message = {
      id: Date.now(),
      text: inputText.trim(),
      fromMe: true,
      time: timeStr,
    };
    setMessages((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg],
    }));
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId ? { ...c, lastMessage: inputText.trim(), time: "방금" } : c
      )
    );
    setInputText("");
  };

  return (
    <div
      className="flex"
      style={{
        height: "100vh",
        background: "#141720",
        color: "white",
        fontFamily: "'Noto Sans KR', sans-serif",
      }}
    >
      {/* ── 왼쪽: 대화 목록 ── */}
      <div
        className="flex flex-col shrink-0"
        style={{
          width: "320px",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* 헤더 */}
        <div style={{ padding: "20px 16px 0" }}>
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => history.back()}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,255,255,0.4)",
                padding: "4px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ArrowLeft size={18} />
            </button>
            <h2 style={{ fontSize: "1.15rem", fontWeight: 800, letterSpacing: "-0.03em" }}>
              채팅
            </h2>
          </div>

          {/* 검색 */}
          <div
            className="flex items-center gap-2 rounded-xl px-3 mb-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              height: "40px",
            }}
          >
            <Search size={15} style={{ color: "rgba(255,255,255,0.3)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름 또는 물품 검색"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "0.88rem",
                width: "100%",
              }}
            />
          </div>

          {/* 탭 */}
          <div
            className="flex gap-1 mb-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              borderRadius: "10px",
              padding: "3px",
            }}
          >
            {(["all", "unread"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                style={{
                  flex: 1,
                  height: "32px",
                  borderRadius: "7px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: filter === tab ? 700 : 400,
                  background: filter === tab ? "rgba(16,185,129,0.2)" : "transparent",
                  color: filter === tab ? "#34d399" : "rgba(255,255,255,0.4)",
                  transition: "all 0.2s",
                }}
              >
                {tab === "all" ? "전체" : "안읽음"}
              </button>
            ))}
          </div>
        </div>

        {/* 대화 목록 */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 8px 16px" }}>
          {filteredConversations.length === 0 ? (
            <p
              className="text-center mt-10"
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.25)" }}
            >
              대화가 없습니다
            </p>
          ) : (
            filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedId(conv.id);
                  setConversations((prev) =>
                    prev.map((c) => (c.id === conv.id ? { ...c, unread: 0 } : c))
                  );
                }}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all"
                style={{
                  background:
                    selectedId === conv.id
                      ? "rgba(16,185,129,0.1)"
                      : "transparent",
                  border:
                    selectedId === conv.id
                      ? "1px solid rgba(16,185,129,0.2)"
                      : "1px solid transparent",
                  cursor: "pointer",
                  marginBottom: "2px",
                }}
              >
                {/* 아바타 */}
                <div
                  className="flex items-center justify-center shrink-0 rounded-full"
                  style={{
                    width: "44px",
                    height: "44px",
                    background: "linear-gradient(135deg,#10b981,#34d399)",
                    fontSize: "1rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {conv.avatar}
                </div>

                {/* 텍스트 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span style={{ fontSize: "0.92rem", fontWeight: 700 }}>{conv.name}</span>
                    <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
                      {conv.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(16,185,129,0.7)",
                      marginBottom: "2px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conv.itemTitle}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.35)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {conv.lastMessage || "대화를 시작해보세요"}
                  </p>
                </div>

                {/* 안읽음 배지 */}
                {conv.unread > 0 && (
                  <div
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#10b981",
                      fontSize: "0.68rem",
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    {conv.unread}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── 오른쪽: 메시지 영역 ── */}
      <div className="flex flex-col flex-1" style={{ height: "100vh", overflow: "hidden" }}>
        {/* 채팅 헤더 */}
        <div
          className="flex items-center justify-between px-6 shrink-0"
          style={{
            height: "68px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <div>
            <p style={{ fontSize: "1rem", fontWeight: 700 }}>{selected.name}</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(16,185,129,0.7)", marginTop: "1px" }}>
              {selected.itemTitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <Phone size={16} />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <Video size={16} />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <MoreVertical size={16} />
            </button>
          </div>
        </div>

        {/* 메시지 목록 */}
        <div
          ref={messagesContainerRef}
          className="flex-1 px-6 py-5"
          style={{ overflowY: "auto" }}
        >
          {/* 물품 정보 카드 */}
          <div
            className="flex justify-center mb-6"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(16,185,129,0.1)",
                border: "1px solid rgba(16,185,129,0.2)",
                fontSize: "0.78rem",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              <span style={{ color: "#34d399", fontWeight: 600 }}>{selected.itemTitle}</span>
              에 대한 대화
            </div>
          </div>

          {currentMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40">
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.25)" }}>
                첫 메시지를 보내보세요!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
                >
                  {!msg.fromMe && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mr-2 self-end"
                      style={{
                        background: "linear-gradient(135deg,#10b981,#34d399)",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {selected.avatar}
                    </div>
                  )}
                  <div
                    style={{
                      maxWidth: "65%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.fromMe ? "flex-end" : "flex-start",
                      gap: "3px",
                    }}
                  >
                    <div
                      style={{
                        padding: "10px 14px",
                        borderRadius: msg.fromMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                        background: msg.fromMe
                          ? "linear-gradient(135deg,#10b981,#34d399)"
                          : "rgba(255,255,255,0.08)",
                        color: msg.fromMe ? "white" : "rgba(255,255,255,0.85)",
                        fontSize: "0.88rem",
                        lineHeight: 1.5,
                        fontWeight: msg.fromMe ? 500 : 400,
                      }}
                    >
                      {msg.text}
                    </div>
                    <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.25)" }}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 입력 영역 */}
        <div
          className="px-6 py-4 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-4"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              height: "52px",
            }}
          >
            <input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="메시지를 입력하세요..."
              style={{
                flex: 1,
                background: "none",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "0.92rem",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim()}
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                border: "none",
                cursor: inputText.trim() ? "pointer" : "not-allowed",
                background: inputText.trim()
                  ? "linear-gradient(135deg,#10b981,#34d399)"
                  : "rgba(255,255,255,0.08)",
                color: inputText.trim() ? "white" : "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
