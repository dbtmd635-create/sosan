import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BottomNav, type TabId } from './components/common/BottomNav';
import { HomeScreen } from './components/home/HomeScreen';
import { AnalysisScreen } from './components/analysis/AnalysisScreen';
import { ProgramsScreen } from './components/programs/ProgramsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { useAuth } from '../hooks/useApi';

// ── 탭 전환 애니메이션 방향 계산 ───────────────────────────────────
const TAB_ORDER: TabId[] = ['home', 'analysis', 'programs', 'profile'];

function getDirection(from: TabId, to: TabId) {
  return TAB_ORDER.indexOf(to) > TAB_ORDER.indexOf(from) ? 1 : -1;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [prevTab, setPrevTab] = useState<TabId>('home');
  const { user, isLoggedIn, isLoading, login, logout } = useAuth();

  const handleTabChange = (tab: TabId) => {
    if (tab === activeTab) return;
    setPrevTab(activeTab);
    setActiveTab(tab);
  };

  const dir = getDirection(prevTab, activeTab);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '30%' : '-30%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-30%' : '30%', opacity: 0 }),
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#050810]">
      {/* 배경 장식 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00D287]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-[#6C63FF]/5 rounded-full blur-3xl" />
      </div>

      {/* 앱 컨테이너 */}
      <div
        className="relative w-full max-w-[430px] h-screen bg-[#0A0F1A] text-white overflow-hidden flex flex-col"
        style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
      >
        {/* 메인 콘텐츠 */}
        <main className="flex-1 overflow-hidden relative" style={{ paddingBottom: 'max(80px, calc(60px + env(safe-area-inset-bottom)))' }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={activeTab}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0 overflow-y-auto scrollbar-hide"
            >
              {activeTab === 'home' && (
                <HomeScreen user={user} onTabChange={handleTabChange} />
              )}
              {activeTab === 'analysis' && (
                <AnalysisScreen />
              )}
              {activeTab === 'programs' && (
                <ProgramsScreen />
              )}
              {activeTab === 'profile' && (
                <ProfileScreen
                  user={user}
                  isLoggedIn={isLoggedIn}
                  onLogin={login}
                  onLogout={logout}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* 하단 네비게이션 */}
        <BottomNav active={activeTab} onChange={handleTabChange} />
      </div>
    </div>
  );
}