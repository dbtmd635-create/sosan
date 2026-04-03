import { useState } from 'react';
import { Bell, ChevronRight, Sparkles, TrendingUp, TrendingDown, Users, Zap, ArrowRight, MapPin, BookmarkPlus, Bookmark, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';
import { useNotifications, useSupportPrograms } from '../../../hooks/useApi';
import type { User } from '../../../services/api';
import { NotificationsDrawer } from '../notifications/NotificationsDrawer';
import { ProgramDetailModal } from '../programs/ProgramDetailModal';
import type { SupportProgram } from '../../../services/api';

interface Props {
  user: User;
  onTabChange: (tab: string) => void;
}

const miniChart = [
  { v: 32 }, { v: 38 }, { v: 35 }, { v: 52 }, { v: 31 }, { v: 36 }, { v: 42 },
];

export function HomeScreen({ user, onTabChange }: Props) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<SupportProgram | null>(null);
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();
  const { programs, toggleBookmark } = useSupportPrograms('전체');

  const urgentPrograms = programs.filter(p => p.isUrgent || p.dDay <= 7).slice(0, 3);
  const featuredPrograms = programs.slice(0, 4);

  return (
    <div className="min-h-full">
      {/* ── 헤더 ── */}
      <header className="px-5 pt-12 pb-4 flex justify-between items-center sticky top-0 bg-[#0A0F1A]/95 backdrop-blur-md z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#00D287] flex items-center justify-center shadow-lg shadow-[#00D287]/30">
            <Sparkles className="text-[#0A0F1A]" size={18} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none">소상 광장</h1>
            <p className="text-[10px] text-slate-500 mt-0.5">전주·전북 소상공인 플랫폼</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setNotifOpen(true)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-[#121927] border border-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF4D4D] rounded-full text-white flex items-center justify-center" style={{ fontSize: 10, fontWeight: 700 }}>
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── 인사말 ── */}
      <div className="px-5 mb-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p className="text-slate-400 text-sm mb-1">안녕하세요 👋</p>
          <h2 className="font-black text-2xl leading-tight">
            <span className="text-[#00D287]">{user.businessName}</span><br />
            오늘의 현황이에요
          </h2>
        </motion.div>
      </div>

      {/* ── 요약 통계 카드 ── */}
      <div className="px-5 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '이번달 매출', value: '420만원', change: '+16.7%', up: true, icon: TrendingUp, color: '#00D287' },
            { label: '유동인구', value: '1,240', change: '+8.3%', up: true, icon: Users, color: '#6C63FF' },
            { label: '관심 공고', value: '6건', change: '3건 마감임박', up: false, icon: Zap, color: '#FF7B54' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-[#121927] rounded-2xl p-3.5 border border-slate-800/60"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${stat.color}20` }}>
                <stat.icon size={16} style={{ color: stat.color }} />
              </div>
              <p className="text-slate-400" style={{ fontSize: 10 }}>{stat.label}</p>
              <p className="font-black text-base leading-tight mt-0.5">{stat.value}</p>
              <p className="mt-0.5" style={{ fontSize: 10, color: stat.up ? '#00D287' : '#FF7B54' }}>
                {stat.up ? <TrendingUp size={10} className="inline mr-0.5" /> : <TrendingDown size={10} className="inline mr-0.5" />}
                {stat.change}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── AI 경영 분석 CTA ── */}
      <div className="px-5 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#00D287]/20 via-[#00D287]/10 to-[#0A1628] border border-[#00D287]/30 p-5"
        >
          {/* 배경 장식 */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D287]/10 rounded-full -translate-y-8 translate-x-8 blur-2xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00D287]/15 border border-[#00D287]/25">
                <Sparkles size={12} className="text-[#00D287]" />
                <span className="text-[#00D287] font-semibold" style={{ fontSize: 11 }}>AI 경영 분석</span>
              </div>
              <span className="text-slate-500" style={{ fontSize: 11 }}>오늘 09:30 업데이트</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-slate-300 text-sm mb-1">경영 종합 점수</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-black text-4xl text-white">74</span>
                  <span className="text-slate-400 text-sm">/ 100</span>
                  <span className="text-[#00D287] text-sm font-semibold">▲ 5p</span>
                </div>
                <p className="text-slate-500 text-xs mt-1">동종업계 상위 32%</p>
              </div>
              <div className="w-28 h-14">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={miniChart} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00D287" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#00D287" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="v" stroke="#00D287" strokeWidth={2} fill="url(#cg)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <button
              onClick={() => onTabChange('analysis')}
              className="mt-4 w-full bg-[#00D287] text-[#0A0F1A] font-black py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#00e694] active:scale-[0.98] transition-all shadow-lg shadow-[#00D287]/25"
            >
              상세 분석 리포트 보기
              <ArrowRight size={17} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── 마감 임박 공고 ── */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#FF4D4D] rounded-full" />
            <h3 className="font-black text-base">마감 임박 공고</h3>
          </div>
          <button onClick={() => onTabChange('programs')} className="flex items-center gap-1 text-slate-400 hover:text-[#00D287] transition-colors" style={{ fontSize: 12 }}>
            전체보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {urgentPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              onClick={() => setSelectedProgram(program)}
              className="bg-[#121927] rounded-xl p-4 flex justify-between items-center border border-slate-800/60 hover:border-slate-700 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-[#1A2332] text-slate-400 border border-slate-700" style={{ fontSize: 10 }}>
                    {program.category}
                  </span>
                  {program.isUrgent && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#FF4D4D]/20" style={{ fontSize: 10, fontWeight: 700 }}>
                      마감임박
                    </span>
                  )}
                </div>
                <h4 className="font-bold text-sm truncate pr-2 group-hover:text-[#00D287] transition-colors">{program.title}</h4>
                <p className="text-slate-500 mt-0.5 flex items-center gap-1" style={{ fontSize: 11 }}>
                  <span>{program.supportAmount}</span>
                  <span>·</span>
                  <span>{program.organization}</span>
                </p>
              </div>
              <div className="flex flex-col items-center ml-3">
                <span className="text-slate-500" style={{ fontSize: 10 }}>D-</span>
                <span className="font-black text-xl leading-none" style={{ color: program.dDay <= 7 ? '#FF4D4D' : '#00D287' }}>
                  {program.dDay}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 상권 분석 미리보기 ── */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#6C63FF] rounded-full" />
            <h3 className="font-black text-base">내 상권 분석</h3>
          </div>
          <button onClick={() => onTabChange('analysis')} className="flex items-center gap-1 text-slate-400 hover:text-[#00D287] transition-colors" style={{ fontSize: 12 }}>
            자세히 <ChevronRight size={14} />
          </button>
        </div>
        <div className="bg-[#121927] rounded-2xl border border-slate-800/60 overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1632352926852-f35f4e5c4c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400"
              alt="상권"
              className="w-full h-36 object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121927] via-[#121927]/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <div className="flex items-center gap-1.5 mb-1">
                <MapPin size={13} className="text-[#00D287]" />
                <span className="text-[#00D287] font-semibold" style={{ fontSize: 12 }}>전주 한옥마을 상권</span>
              </div>
              <p className="text-white font-bold text-base">유동인구 점수 87점</p>
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-slate-800 border-t border-slate-800">
            {[
              { label: '경쟁 강도', value: '중간' },
              { label: '성장률', value: '+12.4%' },
              { label: '주변 업체', value: '234개' },
            ].map(item => (
              <div key={item.label} className="p-3 text-center">
                <p className="text-slate-400" style={{ fontSize: 10 }}>{item.label}</p>
                <p className="font-bold text-sm mt-0.5 text-[#00D287]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 맞춤 지원사업 전체 ── */}
      <div className="px-5 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-5 bg-[#00D287] rounded-full" />
            <h3 className="font-black text-base">맞춤 지원사업</h3>
          </div>
          <button onClick={() => onTabChange('programs')} className="flex items-center gap-1 text-slate-400 hover:text-[#00D287] transition-colors" style={{ fontSize: 12 }}>
            전체보기 <ChevronRight size={14} />
          </button>
        </div>
        <div className="flex flex-col gap-2.5">
          {featuredPrograms.map((program, i) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
              onClick={() => setSelectedProgram(program)}
              className="bg-[#121927] rounded-xl p-4 border border-slate-800/60 hover:border-[#00D287]/30 active:scale-[0.99] transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-[#1A2332] text-slate-400 border border-slate-700" style={{ fontSize: 10 }}>
                      {program.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#1A2332] text-slate-400 border border-slate-700" style={{ fontSize: 10 }}>
                      {program.region}
                    </span>
                  </div>
                  <h4 className="font-bold text-sm group-hover:text-[#00D287] transition-colors mb-1">{program.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00D287] font-semibold" style={{ fontSize: 12 }}>{program.supportAmount}</span>
                    <span className="text-slate-600" style={{ fontSize: 12 }}>·</span>
                    <span className="text-slate-500" style={{ fontSize: 12 }}>{program.organization}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 ml-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(program.id); }}
                    className="text-slate-600 hover:text-[#00D287] transition-colors"
                  >
                    {program.bookmarked ? <Bookmark size={18} className="text-[#00D287] fill-[#00D287]" /> : <BookmarkPlus size={18} />}
                  </button>
                  <div className="flex items-center gap-0.5">
                    <Clock size={11} className="text-slate-500" />
                    <span className="font-bold" style={{ fontSize: 12, color: program.dDay <= 7 ? '#FF4D4D' : '#94a3b8' }}>
                      D-{program.dDay}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => onTabChange('programs')}
          className="w-full mt-3 py-3.5 rounded-xl border border-slate-800 text-slate-400 hover:border-[#00D287]/30 hover:text-[#00D287] transition-all flex items-center justify-center gap-2 text-sm"
        >
          지원사업 더 보기 <ArrowRight size={15} />
        </button>
      </div>

      {/* Notifications Drawer */}
      <NotificationsDrawer
        open={notifOpen}
        onClose={() => setNotifOpen(false)}
        notifications={notifications}
        onMarkRead={markRead}
        onMarkAllRead={markAllRead}
      />

      {/* Program Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <ProgramDetailModal
            program={selectedProgram}
            onClose={() => setSelectedProgram(null)}
            onBookmark={toggleBookmark}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
