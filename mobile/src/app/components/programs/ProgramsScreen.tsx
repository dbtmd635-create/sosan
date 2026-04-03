import { useState } from 'react';
import { Search, SlidersHorizontal, Bookmark, BookmarkPlus, ChevronRight, X, Clock, TrendingUp, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSupportPrograms } from '../../../hooks/useApi';
import type { SupportProgram } from '../../../services/api';
import { ProgramDetailModal } from './ProgramDetailModal';

const CATEGORIES = ['전체', '금융/지원', '금융/자금', 'IT/디지털', '교육/컨설팅', '공간지원'];
const SORT_OPTIONS = ['마감 임박순', '최신 등록순', '지원금 높은순', '조회수 높은순'];

export function ProgramsScreen() {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<SupportProgram | null>(null);

  const { programs, loading, toggleBookmark } = useSupportPrograms(activeCategory, search);

  const sortedPrograms = [...programs].sort((a, b) => {
    if (sortBy === 0) return a.dDay - b.dDay;
    if (sortBy === 2) return parseInt(b.supportAmount) - parseInt(a.supportAmount);
    if (sortBy === 3) return b.viewCount - a.viewCount;
    return b.id - a.id;
  });

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 sticky top-0 bg-[#0A0F1A]/95 backdrop-blur-md z-40">
        <h2 className="font-black text-2xl mb-4">지원사업</h2>

        {/* 검색바 */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2.5 bg-[#121927] rounded-xl px-4 py-3 border border-slate-800 focus-within:border-[#00D287]/50 transition-colors">
            <Search size={17} className="text-slate-500 flex-shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="지원사업 검색..."
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border transition-colors ${
              filterOpen ? 'bg-[#00D287] border-[#00D287] text-[#0A0F1A]' : 'bg-[#121927] border-slate-800 text-slate-400'
            }`}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-[#00D287] text-[#0A0F1A] border-[#00D287] shadow-lg shadow-[#00D287]/20'
                  : 'bg-[#121927] text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pb-8">
        {/* 결과 수 + 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-slate-400 text-sm">
            총 <span className="text-white font-semibold">{sortedPrograms.length}</span>개
          </span>
          <div className="flex items-center gap-1">
            {SORT_OPTIONS.map((opt, i) => (
              <button
                key={opt}
                onClick={() => setSortBy(i)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                  sortBy === i ? 'bg-[#1A2332] text-[#00D287] border border-[#00D287]/30' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {i === 0 ? '마감순' : i === 1 ? '최신순' : i === 2 ? '지원금순' : '조회순'}
              </button>
            ))}
          </div>
        </div>

        {/* 프로그램 목록 */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-[#121927] rounded-2xl p-5 border border-slate-800 animate-pulse h-32" />
            ))}
          </div>
        ) : sortedPrograms.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Search size={36} className="text-slate-700" />
            <p className="text-slate-500">검색 결과가 없습니다</p>
            <button onClick={() => { setSearch(''); setActiveCategory('전체'); }} className="text-[#00D287] text-sm">필터 초기화</button>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedPrograms.map((program, i) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelectedProgram(program)}
                className="bg-[#121927] rounded-2xl p-5 border border-slate-800/60 hover:border-[#00D287]/20 active:scale-[0.99] transition-all cursor-pointer group"
              >
                {/* 상단: 카테고리 + D-day + 북마크 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#1A2332] text-slate-400 border border-slate-700 text-xs">{program.category}</span>
                    {program.isUrgent && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#FF4D4D]/20 text-xs font-bold">🔥 마감임박</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-slate-500" />
                      <span className={`text-sm font-black ${program.dDay <= 7 ? 'text-[#FF4D4D]' : program.dDay <= 14 ? 'text-[#FF7B54]' : 'text-slate-400'}`}>
                        D-{program.dDay}
                      </span>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); toggleBookmark(program.id); }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1A2332] border border-slate-700 hover:border-[#00D287]/40 transition-colors"
                    >
                      {program.bookmarked
                        ? <Bookmark size={15} className="text-[#00D287] fill-[#00D287]" />
                        : <BookmarkPlus size={15} className="text-slate-500 group-hover:text-slate-300" />
                      }
                    </button>
                  </div>
                </div>

                {/* 제목 */}
                <h4 className="font-bold text-base mb-1.5 group-hover:text-[#00D287] transition-colors leading-snug">
                  {program.title}
                </h4>

                {/* 설명 */}
                <p className="text-slate-500 text-xs leading-relaxed mb-3 line-clamp-2">{program.description}</p>

                {/* 하단 정보 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-[#00D287] text-sm">{program.supportAmount}</span>
                    <div className="flex items-center gap-1">
                      <Building2 size={12} className="text-slate-500" />
                      <span className="text-slate-500 text-xs">{program.organization}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-slate-600" />
                    <span className="text-slate-600 text-xs">{program.viewCount.toLocaleString()}</span>
                    <ChevronRight size={14} className="text-slate-600 group-hover:text-[#00D287] transition-colors" />
                  </div>
                </div>

                {/* 태그 */}
                {program.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-800">
                    {program.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded-full bg-[#0A0F1A] text-slate-500 border border-slate-800" style={{ fontSize: 10 }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* 정렬 필터 시트 */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setFilterOpen(false)} className="fixed inset-0 bg-black/60 z-[60]" />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D1421] rounded-t-3xl z-[70] p-6"
            >
              <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
              <h3 className="font-black text-lg mb-4">정렬 옵션</h3>
              <div className="space-y-2">
                {SORT_OPTIONS.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(i); setFilterOpen(false); }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      sortBy === i ? 'bg-[#00D287]/10 border-[#00D287]/30 text-[#00D287]' : 'bg-[#121927] border-slate-800 text-slate-300'
                    }`}
                  >
                    <span className="font-medium text-sm">{opt}</span>
                    {sortBy === i && <span className="w-2 h-2 rounded-full bg-[#00D287]" />}
                  </button>
                ))}
              </div>
              <button onClick={() => setFilterOpen(false)} className="w-full mt-4 py-4 rounded-xl bg-[#00D287] text-[#0A0F1A] font-black">
                적용하기
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 프로그램 상세 모달 */}
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
