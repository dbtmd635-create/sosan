import { motion } from 'motion/react';
import { X, Bookmark, BookmarkPlus, ExternalLink, Calendar, MapPin, Building2, Tag, Eye } from 'lucide-react';
import type { SupportProgram } from '../../../services/api';

interface Props {
  program: SupportProgram;
  onClose: () => void;
  onBookmark: (id: number) => void;
}

function DayBadge({ dDay, isUrgent }: { dDay: number; isUrgent: boolean }) {
  const color = dDay <= 7 ? '#FF4D4D' : dDay <= 14 ? '#FF7B54' : '#00D287';
  return (
    <div className="flex flex-col items-center px-4 py-3 rounded-2xl border" style={{ borderColor: `${color}30`, background: `${color}10` }}>
      <span className="text-xs font-semibold" style={{ color }}>마감까지</span>
      <span className="font-black text-3xl leading-none mt-1" style={{ color }}>D-{dDay}</span>
    </div>
  );
}

export function ProgramDetailModal({ program, onClose, onBookmark }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-[#0D1421] rounded-t-3xl z-[90] overflow-hidden"
        style={{ maxHeight: '88vh' }}
      >
        {/* drag handle */}
        <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto mt-3 mb-4" />

        <div className="overflow-y-auto" style={{ maxHeight: 'calc(88vh - 28px)' }}>
          {/* Header */}
          <div className="px-5 pb-4 border-b border-slate-800">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#1A2332] text-slate-400 border border-slate-700" style={{ fontSize: 11 }}>
                    {program.category}
                  </span>
                  {program.isUrgent && (
                    <span className="px-2 py-0.5 rounded-full bg-[#FF4D4D]/10 text-[#FF4D4D] border border-[#FF4D4D]/20 font-bold" style={{ fontSize: 11 }}>
                      마감임박
                    </span>
                  )}
                </div>
                <h3 className="font-black text-lg leading-snug">{program.title}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onBookmark(program.id)} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A2332] border border-slate-700">
                  {program.bookmarked
                    ? <Bookmark size={18} className="text-[#00D287] fill-[#00D287]" />
                    : <BookmarkPlus size={18} className="text-slate-400" />
                  }
                </button>
                <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A2332] border border-slate-700">
                  <X size={18} className="text-slate-400" />
                </button>
              </div>
            </div>
          </div>

          <div className="px-5 py-5 space-y-5">
            {/* D-day + 지원금액 */}
            <div className="flex items-center gap-3">
              <DayBadge dDay={program.dDay} isUrgent={program.isUrgent} />
              <div className="flex-1 bg-[#121927] rounded-2xl p-4 border border-slate-800">
                <p className="text-slate-400 text-xs mb-1">지원 금액</p>
                <p className="font-black text-xl text-[#00D287]">{program.supportAmount}</p>
              </div>
            </div>

            {/* 설명 */}
            <div className="bg-[#121927] rounded-2xl p-4 border border-slate-800">
              <p className="text-slate-300 text-sm leading-relaxed">{program.description}</p>
            </div>

            {/* 상세 정보 */}
            <div className="bg-[#121927] rounded-2xl border border-slate-800 overflow-hidden">
              {[
                { icon: Building2, label: '주관 기관', value: program.organization },
                { icon: MapPin, label: '지원 지역', value: program.region },
                { icon: Calendar, label: '접수 기간', value: `${program.startDate} ~ ${program.endDate}` },
                { icon: Eye, label: '조회수', value: `${program.viewCount.toLocaleString()}회` },
              ].map((item, i) => (
                <div key={item.label} className={`flex items-center gap-3 px-4 py-3.5 ${i !== 0 ? 'border-t border-slate-800' : ''}`}>
                  <item.icon size={16} className="text-slate-500 flex-shrink-0" />
                  <span className="text-slate-400 text-sm flex-shrink-0 w-20">{item.label}</span>
                  <span className="text-white text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>

            {/* 태그 */}
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Tag size={13} className="text-slate-400" />
                <span className="text-slate-400 text-xs">관련 태그</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {program.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-[#1A2332] text-slate-300 border border-slate-700" style={{ fontSize: 12 }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 신청 버튼 */}
            <div className="pb-6">
              <a
                href={program.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#00D287] text-[#0A0F1A] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00e694] active:scale-[0.98] transition-all shadow-lg shadow-[#00D287]/25"
              >
                신청 페이지 바로가기
                <ExternalLink size={18} />
              </a>
              <button
                onClick={onClose}
                className="w-full mt-2 py-3.5 rounded-2xl border border-slate-800 text-slate-400 text-sm font-medium"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
