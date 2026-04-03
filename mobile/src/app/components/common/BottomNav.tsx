import { Home, BarChart2, FileText, User } from 'lucide-react';
import { motion } from 'motion/react';

export type TabId = 'home' | 'analysis' | 'programs' | 'profile';

interface Props {
  active: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; icon: React.ElementType; label: string }[] = [
  { id: 'home', icon: Home, label: '홈' },
  { id: 'analysis', icon: BarChart2, label: 'AI 분석' },
  { id: 'programs', icon: FileText, label: '지원사업' },
  { id: 'profile', icon: User, label: '마이' },
];

export function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="absolute bottom-0 w-full bg-[#0D1421]/95 backdrop-blur-xl border-t border-slate-800 px-4 pt-3 pb-safe flex justify-around items-center z-50" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className="flex flex-col items-center gap-1 relative px-3"
          >
            {isActive && (
              <motion.div
                layoutId="tabIndicator"
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#00D287] rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 ${
              isActive ? 'bg-[#00D287]/15' : 'hover:bg-slate-800'
            }`}>
              <tab.icon
                size={22}
                className={`transition-colors duration-200 ${isActive ? 'text-[#00D287]' : 'text-slate-500'}`}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
            </div>
            <span
              className={`transition-colors duration-200 ${isActive ? 'text-[#00D287]' : 'text-slate-500'}`}
              style={{ fontSize: 10, fontWeight: isActive ? 700 : 500 }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}