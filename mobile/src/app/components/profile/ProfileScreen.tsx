import { useState } from 'react';
import {
  User, LogIn, LogOut, ChevronRight, Store, Bookmark, BarChart2,
  HeadphonesIcon, Settings, Bell, Shield, ChevronDown, CheckCircle2,
  Edit3, MapPin, Phone, Mail, X, Eye, EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { User as UserType } from '../../../services/api';

interface Props {
  user: UserType;
  isLoggedIn: boolean;
  onLogin: (username: string, password: string) => Promise<boolean>;
  onLogout: () => void;
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#121927] rounded-xl p-4 border border-slate-800 text-center flex-1">
      <p className="font-black text-2xl" style={{ color }}>{value}</p>
      <p className="text-slate-500 text-xs mt-1">{label}</p>
    </div>
  );
}

function MenuItem({
  icon: Icon,
  label,
  sub,
  badge,
  danger,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  sub?: string;
  badge?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#1A2332] transition-colors ${danger ? 'text-[#FF4D4D]' : ''}`}
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${danger ? 'bg-[#FF4D4D]/10' : 'bg-[#1A2332]'}`}>
        <Icon size={18} className={danger ? 'text-[#FF4D4D]' : 'text-slate-400'} />
      </div>
      <div className="flex-1">
        <span className={`font-medium text-sm ${danger ? 'text-[#FF4D4D]' : 'text-slate-200'}`}>{label}</span>
        {sub && <p className="text-slate-500 text-xs mt-0.5">{sub}</p>}
      </div>
      {badge && (
        <span className="px-2 py-0.5 rounded-full bg-[#00D287]/10 text-[#00D287] text-xs font-bold border border-[#00D287]/20">{badge}</span>
      )}
      {!danger && <ChevronRight size={16} className="text-slate-600" />}
    </button>
  );
}

function LoginModal({ onClose, onLogin }: { onClose: () => void; onLogin: (u: string, p: string) => Promise<boolean> }) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!username || !password) { setError('아이디와 비밀번호를 입력해주세요.'); return; }
    setLoading(true);
    setError('');
    try {
      const ok = await onLogin(username, password);
      if (ok) onClose();
      else setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    } catch {
      setError('로그인 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]" />
      <motion.div
        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D1421] rounded-t-3xl z-[90]"
      >
        <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mt-3 mb-4" />

        <div className="px-6 pb-8">
          {/* 탭 */}
          <div className="flex gap-1 bg-[#121927] rounded-xl p-1 border border-slate-800 mb-6">
            {(['login', 'register'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${tab === t ? 'bg-[#00D287] text-[#0A0F1A]' : 'text-slate-400'}`}>
                {t === 'login' ? '로그인' : '무료 가입'}
              </button>
            ))}
          </div>

          <h3 className="font-black text-xl mb-1">소상 광장</h3>
          <p className="text-slate-400 text-sm mb-6">
            {tab === 'login' ? '환영합니다! 계속 로그인해주세요.' : '소상공인 맞춤 서비스를 무료로 시작하세요.'}
          </p>

          <div className="space-y-3 mb-4">
            <div className="bg-[#121927] rounded-xl px-4 py-3.5 border border-slate-800 focus-within:border-[#00D287]/50 transition-colors">
              <p className="text-slate-500 text-xs mb-1">아이디</p>
              <input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="아이디를 입력하세요"
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 outline-none"
              />
            </div>
            <div className="bg-[#121927] rounded-xl px-4 py-3.5 border border-slate-800 focus-within:border-[#00D287]/50 transition-colors">
              <div className="flex items-center justify-between">
                <p className="text-slate-500 text-xs mb-1">비밀번호</p>
                <button onClick={() => setShowPw(!showPw)} className="text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="비밀번호를 입력하세요"
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 outline-none"
              />
            </div>
            {tab === 'register' && (
              <div className="bg-[#121927] rounded-xl px-4 py-3.5 border border-slate-800 focus-within:border-[#00D287]/50 transition-colors">
                <p className="text-slate-500 text-xs mb-1">업체명</p>
                <input
                  placeholder="업체명을 입력하세요"
                  className="w-full bg-transparent text-sm text-white placeholder-slate-600 outline-none"
                />
              </div>
            )}
          </div>

          {error && (
            <p className="text-[#FF4D4D] text-sm mb-3 text-center">{error}</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-[#00D287] text-[#0A0F1A] font-black disabled:opacity-60 hover:bg-[#00e694] active:scale-[0.99] transition-all"
          >
            {loading ? '처리 중...' : tab === 'login' ? '로그인' : '가입하기'}
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-slate-600 text-xs">또는 소셜 로그인</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[
              { name: '카카오', color: '#FEE500', textColor: '#000000', emoji: '💬' },
              { name: '네이버', color: '#03C75A', textColor: '#ffffff', emoji: '🟢' },
            ].map(s => (
              <button key={s.name} className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-800 bg-[#121927] text-slate-300 hover:bg-[#1A2332] transition-colors text-sm font-medium">
                <span>{s.emoji}</span> {s.name} 로그인
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
}

export function ProfileScreen({ user, isLoggedIn, onLogin, onLogout }: Props) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [businessExpanded, setBusinessExpanded] = useState(false);

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="px-5 pt-12 pb-5 bg-[#121927] border-b border-slate-800">
        {isLoggedIn ? (
          <div>
            {/* 프로필 */}
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D287]/30 to-[#00D287]/10 border border-[#00D287]/30 flex items-center justify-center">
                  <User size={28} className="text-[#00D287]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#00D287] rounded-full flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-[#0A0F1A]" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-xl">{user.businessName}</h2>
                  <button className="text-slate-500 hover:text-white"><Edit3 size={15} /></button>
                </div>
                <p className="text-slate-400 text-sm mt-0.5">{user.businessType} · {user.region.split(' ').slice(-1)[0]}</p>
              </div>
            </div>

            {/* 통계 */}
            <div className="flex gap-2">
              <StatCard label="이번달 분석" value="3회" color="#00D287" />
              <StatCard label="관심 공고" value="2개" color="#6C63FF" />
              <StatCard label="경영 점수" value="74점" color="#FF7B54" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1A2332] border border-slate-700 flex items-center justify-center">
              <User size={28} className="text-slate-500" />
            </div>
            <div className="flex-1">
              <h2 className="font-black text-lg">로그인이 필요합니다</h2>
              <p className="text-slate-400 text-sm mt-0.5">소상 광장의 모든 서비스를 이용하세요</p>
            </div>
          </div>
        )}

        {!isLoggedIn && (
          <button
            onClick={() => setLoginOpen(true)}
            className="w-full mt-5 bg-[#00D287] text-[#0A0F1A] font-black py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00e694] active:scale-[0.99] transition-all shadow-lg shadow-[#00D287]/25"
          >
            <LogIn size={18} />
            로그인 / 무료가입
          </button>
        )}
      </header>

      {/* 내 업체 정보 (로그인 시) */}
      {isLoggedIn && (
        <div className="mx-5 mt-4">
          <button
            onClick={() => setBusinessExpanded(!businessExpanded)}
            className="w-full bg-[#121927] rounded-2xl p-4 border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00D287]/10 flex items-center justify-center">
                <Store size={18} className="text-[#00D287]" />
              </div>
              <span className="font-bold text-sm">내 업체 정보</span>
            </div>
            <ChevronDown size={18} className={`text-slate-500 transition-transform ${businessExpanded ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {businessExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-[#121927] border-x border-b border-slate-800 rounded-b-2xl -mt-2 pt-4 pb-4 px-4 space-y-3">
                  {[
                    { icon: Store, label: '업체명', value: user.businessName },
                    { icon: MapPin, label: '주소', value: user.region },
                    { icon: Phone, label: '전화번호', value: user.phone },
                    { icon: Mail, label: '이메일', value: user.email },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-3">
                      <item.icon size={15} className="text-slate-500 flex-shrink-0" />
                      <span className="text-slate-400 text-xs w-16 flex-shrink-0">{item.label}</span>
                      <span className="text-slate-200 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 메뉴 그룹 */}
      <div className="mt-4 space-y-3 px-5 pb-8">
        {/* 서비스 */}
        <div className="bg-[#121927] rounded-2xl border border-slate-800 overflow-hidden">
          <p className="px-5 py-3 text-slate-500 text-xs font-semibold border-b border-slate-800">서비스</p>
          <MenuItem icon={Store} label="내 업체 관리" sub="업체 정보 및 사업자 등록" />
          <div className="border-t border-slate-800">
            <MenuItem icon={Bookmark} label="관심 지원사업" badge="2" />
          </div>
          <div className="border-t border-slate-800">
            <MenuItem icon={BarChart2} label="AI 분석 리포트" sub="보관된 리포트 3개" />
          </div>
        </div>

        {/* 설정 */}
        <div className="bg-[#121927] rounded-2xl border border-slate-800 overflow-hidden">
          <p className="px-5 py-3 text-slate-500 text-xs font-semibold border-b border-slate-800">설정</p>
          <MenuItem icon={Bell} label="알림 설정" sub="마감 임박, AI 분석 알림" />
          <div className="border-t border-slate-800">
            <MenuItem icon={Shield} label="보안 설정" sub="비밀번호 및 2단계 인증" />
          </div>
          <div className="border-t border-slate-800">
            <MenuItem icon={Settings} label="앱 설정" />
          </div>
        </div>

        {/* 고객지원 */}
        <div className="bg-[#121927] rounded-2xl border border-slate-800 overflow-hidden">
          <p className="px-5 py-3 text-slate-500 text-xs font-semibold border-b border-slate-800">고객 지원</p>
          <MenuItem icon={HeadphonesIcon} label="고객센터" sub="평일 09:00 ~ 18:00" />
        </div>

        {/* 앱 버전 정보 */}
        <div className="bg-[#121927] rounded-2xl border border-slate-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">소상 광장</p>
              <p className="text-slate-500 text-xs mt-0.5">버전 2.0.0 · © 2026 소상 광장</p>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-[#00D287]/10 border border-[#00D287]/20">
              <span className="text-[#00D287] text-xs font-semibold">최신 버전</span>
            </div>
          </div>
        </div>

        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border border-[#FF4D4D]/20 bg-[#FF4D4D]/5 text-[#FF4D4D] font-semibold text-sm hover:bg-[#FF4D4D]/10 transition-colors"
          >
            <LogOut size={16} />
            로그아웃
          </button>
        )}
      </div>

      {/* 로그인 모달 */}
      <AnimatePresence>
        {loginOpen && (
          <LoginModal onClose={() => setLoginOpen(false)} onLogin={onLogin} />
        )}
      </AnimatePresence>
    </div>
  );
}
