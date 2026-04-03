import { useState, useEffect, useCallback } from 'react';
import { MOCK_DATA } from '../services/api';

// ─── 범용 API 훅 ─────────────────────────────────────────────────
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fn();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => { run(); }, [run]);

  return { data, loading, error, refetch: run };
}

// ─── 인증 상태 ────────────────────────────────────────────────────
export function useAuth() {
  const [user, setUser] = useState(MOCK_DATA.user);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 데모용 기본 로그인 상태
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, _password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    // TODO: apiClient.login({ username, password })
    setUser({ ...MOCK_DATA.user, username });
    setIsLoggedIn(true);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(MOCK_DATA.user);
  };

  return { user, isLoggedIn, isLoading, login, logout };
}

// ─── 지원사업 ─────────────────────────────────────────────────────
export function useSupportPrograms(filter?: string, search?: string) {
  const [programs, setPrograms] = useState(MOCK_DATA.supportPrograms);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // TODO: apiClient.getSupportPrograms({ category: filter, search })
      let filtered = [...MOCK_DATA.supportPrograms];
      if (filter && filter !== '전체') {
        filtered = filtered.filter(p => p.category === filter);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.includes(q))
        );
      }
      setPrograms(filtered);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filter, search]);

  const toggleBookmark = (id: number) => {
    // TODO: apiClient.bookmarkProgram(id)
    setPrograms(prev =>
      prev.map(p => p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)
    );
  };

  return { programs, loading, toggleBookmark };
}

// ─── AI 분석 ─────────────────────────────────────────────────────
export function useAiAnalysis() {
  const [data, setData] = useState(MOCK_DATA.aiAnalysis);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // TODO: apiClient.getAiAnalysis()
      setData(MOCK_DATA.aiAnalysis);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const generateReport = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    // TODO: apiClient.generateReport()
    setData({ ...MOCK_DATA.aiAnalysis, lastUpdated: new Date().toISOString() });
    setGenerating(false);
  };

  return { data, loading, generating, generateReport };
}

// ─── 상권 분석 ──────────────────────────────────────────────────
export function useCommercialAnalysis(region?: string) {
  const [data, setData] = useState(MOCK_DATA.commercialAnalysis);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // TODO: apiClient.getCommercialAnalysis(region)
      setData(MOCK_DATA.commercialAnalysis);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [region]);

  return { data, loading };
}

// ─── 알림 ────────────────────────────────────────────────────────
export function useNotifications() {
  const [notifications, setNotifications] = useState(MOCK_DATA.notifications);
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markRead = (id: number) => {
    // TODO: apiClient.markNotificationRead(id)
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return { notifications, unreadCount, markRead, markAllRead };
}
