import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, BarChart2, Settings, CheckCheck } from 'lucide-react';
import type { Notification } from '../../../services/api';

interface Props {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
}

const typeIcon = (type: Notification['type']) => {
  if (type === 'program') return <Bell size={16} className="text-[#00D287]" />;
  if (type === 'analysis') return <BarChart2 size={16} className="text-[#6C63FF]" />;
  return <Settings size={16} className="text-slate-400" />;
};

const typeColor = (type: Notification['type']) => {
  if (type === 'program') return 'bg-[#00D287]/10 border-[#00D287]/20';
  if (type === 'analysis') return 'bg-[#6C63FF]/10 border-[#6C63FF]/20';
  return 'bg-slate-800 border-slate-700';
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}분 전`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}시간 전`;
  return `${Math.floor(hours / 24)}일 전`;
}

export function NotificationsDrawer({ open, onClose, notifications, onMarkRead, onMarkAllRead }: Props) {
  const unread = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0D1421] border-l border-slate-800 z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-12 pb-4 border-b border-slate-800">
              <div>
                <h2 className="font-black text-lg">알림</h2>
                {unread > 0 && (
                  <p className="text-slate-400 text-xs mt-0.5">읽지 않은 알림 {unread}개</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unread > 0 && (
                  <button
                    onClick={onMarkAllRead}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1A2332] text-slate-400 hover:text-[#00D287] transition-colors text-xs"
                  >
                    <CheckCheck size={14} />
                    모두 읽음
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1A2332] text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto py-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3">
                  <Bell size={32} className="text-slate-700" />
                  <p className="text-slate-500 text-sm">알림이 없습니다</p>
                </div>
              ) : (
                <div className="px-4 flex flex-col gap-2">
                  {notifications.map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      onClick={() => onMarkRead(n.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        n.isRead ? 'bg-[#121927] border-slate-800/60 opacity-60' : 'bg-[#1A2332] border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${typeColor(n.type)}`}>
                          {typeIcon(n.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm">{n.title}</span>
                            {!n.isRead && (
                              <span className="w-2 h-2 rounded-full bg-[#00D287] flex-shrink-0 ml-2" />
                            )}
                          </div>
                          <p className="text-slate-400 text-xs leading-relaxed">{n.message}</p>
                          <p className="text-slate-600 text-xs mt-2">{timeAgo(n.createdAt)}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
