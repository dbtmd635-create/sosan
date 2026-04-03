// =============================================
// 소상 광장 - Spring Boot API 연동 서비스
// Base URL: 환경변수 또는 기본값 사용
// GitHub: https://github.com/dbtmd635-create/sosan.git
// =============================================

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// ─── 타입 정의 ─────────────────────────────────────────────────
export interface User {
  id: number;
  username: string;
  email: string;
  businessName: string;
  businessType: string;
  region: string;
  phone: string;
  createdAt: string;
}

export interface SupportProgram {
  id: number;
  title: string;
  category: string;
  description: string;
  supportAmount: string;
  organization: string;
  startDate: string;
  endDate: string;
  dDay: number;
  isUrgent: boolean;
  link: string;
  region: string;
  tags: string[];
  viewCount: number;
  bookmarked?: boolean;
}

export interface AiAnalysis {
  businessScore: number;
  salesTrend: { month: string; sales: number; target: number }[];
  competitorComparison: { category: string; myScore: number; avgScore: number }[];
  recommendations: { title: string; description: string; priority: 'high' | 'medium' | 'low' }[];
  footTraffic: { time: string; count: number }[];
  lastUpdated: string;
}

export interface CommercialAnalysis {
  areaName: string;
  footTrafficScore: number;
  competitionLevel: string;
  growthRate: number;
  nearbyBusinesses: number;
  weeklyTraffic: { day: string; morning: number; afternoon: number; evening: number }[];
  demographics: { age: string; percentage: number }[];
  topBusinessTypes: { type: string; count: number; growth: number }[];
}

export interface Notification {
  id: number;
  type: 'program' | 'analysis' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface LoginRequest { username: string; password: string; }
export interface LoginResponse { token: string; user: User; }

// ─── API 클라이언트 ──────────────────────────────────────────────
class ApiClient {
  private token: string | null = null;

  constructor() {
    this.token = localStorage.getItem('sosan_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('sosan_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('sosan_token');
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (this.token) headers['Authorization'] = `Bearer ${this.token}`;

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // ─── 인증 ───
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async register(data: Partial<User> & { password: string }): Promise<LoginResponse> {
    return this.request<LoginResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout(): Promise<void> {
    this.clearToken();
  }

  async getProfile(): Promise<User> {
    return this.request<User>('/user/profile');
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/user/profile', { method: 'PUT', body: JSON.stringify(data) });
  }

  // ─── 지원사업 ───
  async getSupportPrograms(params?: {
    category?: string;
    region?: string;
    search?: string;
    sort?: string;
    page?: number;
  }): Promise<{ content: SupportProgram[]; totalPages: number; totalElements: number }> {
    const query = new URLSearchParams(params as Record<string, string>).toString();
    return this.request(`/programs${query ? `?${query}` : ''}`);
  }

  async getSupportProgram(id: number): Promise<SupportProgram> {
    return this.request<SupportProgram>(`/programs/${id}`);
  }

  async bookmarkProgram(id: number): Promise<void> {
    return this.request(`/programs/${id}/bookmark`, { method: 'POST' });
  }

  async getBookmarkedPrograms(): Promise<SupportProgram[]> {
    return this.request<SupportProgram[]>('/user/bookmarks');
  }

  // ─── AI 분석 ───
  async getAiAnalysis(): Promise<AiAnalysis> {
    return this.request<AiAnalysis>('/analysis/ai');
  }

  async getCommercialAnalysis(region?: string): Promise<CommercialAnalysis> {
    return this.request<CommercialAnalysis>(`/analysis/commercial${region ? `?region=${region}` : ''}`);
  }

  async generateReport(): Promise<{ reportId: string; status: string }> {
    return this.request('/analysis/generate', { method: 'POST' });
  }

  // ─── 알림 ───
  async getNotifications(): Promise<Notification[]> {
    return this.request<Notification[]>('/notifications');
  }

  async markNotificationRead(id: number): Promise<void> {
    return this.request(`/notifications/${id}/read`, { method: 'PUT' });
  }
}

export const apiClient = new ApiClient();

// ─── 목 데이터 (백엔드 연동 전 사용) ────────────────────────────
export const MOCK_DATA = {
  user: {
    id: 1,
    username: 'owner_jeonju',
    email: 'owner@example.com',
    businessName: '전주 한옥마을 카페',
    businessType: '카페/음료',
    region: '전북 전주시 완산구',
    phone: '010-1234-5678',
    createdAt: '2024-01-15',
  } as User,

  supportPrograms: [
    {
      id: 1,
      title: '소상공인 디지털 전환 지원사업',
      category: 'IT/디지털',
      description: '디지털 기술 도입으로 경쟁력 강화를 원하는 소상공인 대상 최대 500만원 지원',
      supportAmount: '최대 500만원',
      organization: '중소벤처기업부',
      startDate: '2026-03-01',
      endDate: '2026-04-05',
      dDay: 3,
      isUrgent: true,
      link: 'https://www.mss.go.kr',
      region: '전국',
      tags: ['디지털', 'IT', '무인화'],
      viewCount: 1842,
      bookmarked: false,
    },
    {
      id: 2,
      title: '전주시 소상공인 임차료 지원',
      category: '금융/지원',
      description: '전주시 내 소상공인 대상 월 최대 30만원 임차료 지원 (6개월)',
      supportAmount: '월 30만원 (6개월)',
      organization: '전주시청',
      startDate: '2026-03-15',
      endDate: '2026-04-14',
      dDay: 12,
      isUrgent: false,
      link: 'https://www.jeonju.go.kr',
      region: '전북 전주시',
      tags: ['임차료', '전주시', '소상공인'],
      viewCount: 3254,
      bookmarked: true,
    },
    {
      id: 3,
      title: '수출창업 패키지 지원',
      category: '교육/컨설팅',
      description: '해외 수출을 목표로 하는 창업자 대상 전문 컨설팅 및 교육 전액 무료',
      supportAmount: '전액 무료',
      organization: '중소기업진흥공단',
      startDate: '2026-04-01',
      endDate: '2026-04-27',
      dDay: 25,
      isUrgent: false,
      link: 'https://www.sbc.or.kr',
      region: '전국',
      tags: ['수출', '창업', '컨설팅', '교육'],
      viewCount: 987,
      bookmarked: false,
    },
    {
      id: 4,
      title: '전북 소상공인 경영개선 자금',
      category: '금융/자금',
      description: '경영 어려움을 겪는 소상공인 대상 저금리(연 2%) 운전자금 최대 2천만원',
      supportAmount: '최대 2,000만원',
      organization: '전라북도',
      startDate: '2026-03-01',
      endDate: '2026-05-30',
      dDay: 58,
      isUrgent: false,
      link: 'https://www.jb.go.kr',
      region: '전라북도',
      tags: ['자금', '저금리', '운전자금'],
      viewCount: 5621,
      bookmarked: false,
    },
    {
      id: 5,
      title: '소상공인 스마트상점 기술보급',
      category: 'IT/디지털',
      description: '키오스크, 서빙로봇 등 스마트 기술 보급으로 인건비 절감 지원',
      supportAmount: '최대 300만원',
      organization: '소상공인진흥공단',
      startDate: '2026-03-20',
      endDate: '2026-04-08',
      dDay: 6,
      isUrgent: true,
      link: 'https://www.semas.or.kr',
      region: '전국',
      tags: ['스마트', '키오스크', '자동화'],
      viewCount: 2398,
      bookmarked: false,
    },
    {
      id: 6,
      title: '청년창업 공간지원 사업',
      category: '공간지원',
      description: '39세 이하 청년 창업자 대상 창업 공간 무상 임대 (6개월 ~ 1년)',
      supportAmount: '공간 무상 임대',
      organization: '전주시청년창업센터',
      startDate: '2026-04-01',
      endDate: '2026-06-30',
      dDay: 89,
      isUrgent: false,
      link: 'https://startup.jeonju.go.kr',
      region: '전북 전주시',
      tags: ['청년', '공간', '창업'],
      viewCount: 1203,
      bookmarked: false,
    },
  ] as SupportProgram[],

  aiAnalysis: {
    businessScore: 74,
    salesTrend: [
      { month: '10월', sales: 3200000, target: 3500000 },
      { month: '11월', sales: 3800000, target: 3500000 },
      { month: '12월', sales: 5200000, target: 4000000 },
      { month: '1월',  sales: 3100000, target: 3500000 },
      { month: '2월',  sales: 3600000, target: 3500000 },
      { month: '3월',  sales: 4200000, target: 4000000 },
    ],
    competitorComparison: [
      { category: '매출', myScore: 74, avgScore: 60 },
      { category: '고객만족', myScore: 82, avgScore: 71 },
      { category: '마케팅', myScore: 45, avgScore: 58 },
      { category: '운영효율', myScore: 68, avgScore: 65 },
      { category: '재구매율', myScore: 79, avgScore: 63 },
    ],
    recommendations: [
      { title: 'SNS 마케팅 강화', description: '인스타그램 및 네이버 블로그를 활용한 지역 마케팅으로 신규 고객 유입을 30% 높이세요.', priority: 'high' },
      { title: '비수기 할인 전략', description: '1월·2월 비수기 대비 멤버십 카드 도입 및 포인트 제도로 재방문율을 개선하세요.', priority: 'high' },
      { title: '키오스크 도입 검토', description: '스마트상점 기술보급 사업을 통해 키오스크를 도입하면 운영 비용을 월 40만원 절감할 수 있습니다.', priority: 'medium' },
    ],
    footTraffic: [
      { time: '06시', count: 120 },
      { time: '09시', count: 580 },
      { time: '12시', count: 1240 },
      { time: '15시', count: 890 },
      { time: '18시', count: 1560 },
      { time: '21시', count: 720 },
    ],
    lastUpdated: '2026-04-02T09:30:00',
  } as AiAnalysis,

  commercialAnalysis: {
    areaName: '전주 한옥마을 상권',
    footTrafficScore: 87,
    competitionLevel: '중간',
    growthRate: 12.4,
    nearbyBusinesses: 234,
    weeklyTraffic: [
      { day: '월', morning: 320, afternoon: 540, evening: 480 },
      { day: '화', morning: 290, afternoon: 510, evening: 430 },
      { day: '수', morning: 310, afternoon: 560, evening: 510 },
      { day: '목', morning: 350, afternoon: 620, evening: 580 },
      { day: '금', morning: 480, afternoon: 820, evening: 940 },
      { day: '토', morning: 720, afternoon: 1240, evening: 1100 },
      { day: '일', morning: 680, afternoon: 1180, evening: 880 },
    ],
    demographics: [
      { age: '10대', percentage: 8 },
      { age: '20대', percentage: 32 },
      { age: '30대', percentage: 28 },
      { age: '40대', percentage: 18 },
      { age: '50대+', percentage: 14 },
    ],
    topBusinessTypes: [
      { type: '카페/음료', count: 48, growth: 15.2 },
      { type: '음식점', count: 72, growth: 8.4 },
      { type: '숙박', count: 31, growth: 22.1 },
      { type: '기념품', count: 45, growth: -3.2 },
      { type: '체험', count: 18, growth: 34.5 },
    ],
  } as CommercialAnalysis,

  notifications: [
    { id: 1, type: 'program', title: '마감 임박!', message: '소상공인 디지털 전환 지원사업이 3일 후 마감됩니다.', isRead: false, createdAt: '2026-04-02T08:00:00' },
    { id: 2, type: 'analysis', title: 'AI 분석 완료', message: '3월 경영 분석 리포트가 준비되었습니다. 매출이 전월 대비 16.7% 상승했습니다!', isRead: false, createdAt: '2026-04-01T18:30:00' },
    { id: 3, type: 'program', title: '신규 지원사업', message: '전주시 소상공인 임차료 지원 신규 공고가 등록되었습니다.', isRead: true, createdAt: '2026-03-31T10:00:00' },
    { id: 4, type: 'system', title: '앱 업데이트', message: '소상 광장 v2.0이 출시되었습니다. 상권 분석 기능이 대폭 강화되었습니다!', isRead: true, createdAt: '2026-03-28T09:00:00' },
  ] as Notification[],
};
