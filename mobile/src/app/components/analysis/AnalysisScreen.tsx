import { useState } from 'react';
import { Sparkles, RefreshCw, TrendingUp, Users, Target, ChevronRight, AlertCircle, CheckCircle2, Clock, MapPin, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';
import {
  AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { useAiAnalysis, useCommercialAnalysis } from '../../../hooks/useApi';

const TABS = ['AI 경영분석', '상권 분석', '유동인구'];

function ScoreGauge({ score }: { score: number }) {
  const angle = (score / 100) * 180 - 90;
  const color = score >= 70 ? '#00D287' : score >= 50 ? '#FF7B54' : '#FF4D4D';
  return (
    <div className="relative flex flex-col items-center py-4">
      <svg width="200" height="110" viewBox="0 0 200 110">
        {/* Background arc */}
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1A2332" strokeWidth="16" strokeLinecap="round" />
        {/* Score arc */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 251.2} 251.2`}
          style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
        />
        {/* Needle */}
        <g transform={`rotate(${angle}, 100, 100)`}>
          <line x1="100" y1="100" x2="100" y2="32" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="6" fill={color} />
          <circle cx="100" cy="100" r="3" fill="#0A0F1A" />
        </g>
        {/* Labels */}
        <text x="18" y="116" fill="#475569" fontSize="11" textAnchor="middle">0</text>
        <text x="100" y="20" fill="#475569" fontSize="11" textAnchor="middle">50</text>
        <text x="183" y="116" fill="#475569" fontSize="11" textAnchor="middle">100</text>
      </svg>
      <div className="text-center -mt-2">
        <span className="font-black text-5xl" style={{ color }}>{score}</span>
        <span className="text-slate-400 text-lg ml-1">/ 100</span>
        <p className="text-slate-400 text-sm mt-1">경영 종합 점수</p>
      </div>
    </div>
  );
}

const priorityConfig = {
  high: { color: '#FF4D4D', label: '높음', icon: AlertCircle },
  medium: { color: '#FF7B54', label: '중간', icon: Clock },
  low: { color: '#00D287', label: '낮음', icon: CheckCircle2 },
};

function formatKRW(value: number) {
  if (value >= 10000000) return `${(value / 10000000).toFixed(1)}천만`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(0)}백만`;
  return `${(value / 10000).toFixed(0)}만`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1A2332] border border-slate-700 rounded-xl px-3 py-2.5">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-xs font-bold" style={{ color: p.color }}>
          {p.name}: {typeof p.value === 'number' && p.value > 10000 ? `${formatKRW(p.value)}원` : p.value}
        </p>
      ))}
    </div>
  );
};

export function AnalysisScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const { data, loading, generating, generateReport } = useAiAnalysis();
  const { data: commercial, loading: commercialLoading } = useCommercialAnalysis();

  return (
    <div className="min-h-full">
      {/* Header */}
      <header className="px-5 pt-12 pb-4 sticky top-0 bg-[#0A0F1A]/95 backdrop-blur-md z-40">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-black text-2xl">AI 분석</h2>
            <p className="text-slate-500 text-xs mt-0.5">
              {data ? `마지막 업데이트: ${new Date(data.lastUpdated).toLocaleString('ko-KR')}` : '데이터 로딩 중...'}
            </p>
          </div>
          <button
            onClick={generateReport}
            disabled={generating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D287]/10 border border-[#00D287]/30 text-[#00D287] hover:bg-[#00D287]/20 transition-all disabled:opacity-50"
            style={{ fontSize: 13 }}
          >
            <RefreshCw size={14} className={generating ? 'animate-spin' : ''} />
            {generating ? '분석 중...' : '재분석'}
          </button>
        </div>

        {/* 탭 */}
        <div className="flex gap-1 mt-4 bg-[#121927] rounded-xl p-1 border border-slate-800">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === i
                  ? 'bg-[#00D287] text-[#0A0F1A]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pb-8">
        {/* ── AI 경영분석 탭 ── */}
        {activeTab === 0 && (
          <div className="space-y-5">
            {loading ? (
              <div className="space-y-4 pt-4">
                {[120, 200, 160].map((h, i) => (
                  <div key={i} className="bg-[#121927] rounded-2xl border border-slate-800 animate-pulse" style={{ height: h }} />
                ))}
              </div>
            ) : data ? (
              <>
                {/* 점수 게이지 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-[#00D287]" />
                    <h3 className="font-bold text-base">경영 종합 점수</h3>
                    <span className="ml-auto text-slate-500 text-xs">동종업계 상위 32%</span>
                  </div>
                  <ScoreGauge score={data.businessScore} />
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {[
                      { label: '매출 성과', value: 74, color: '#00D287' },
                      { label: '고객 만족', value: 82, color: '#6C63FF' },
                      { label: '운영 효율', value: 68, color: '#FF7B54' },
                    ].map(item => (
                      <div key={item.label} className="bg-[#1A2332] rounded-xl p-3 text-center border border-slate-700">
                        <p className="text-slate-400" style={{ fontSize: 10 }}>{item.label}</p>
                        <p className="font-black text-lg mt-1" style={{ color: item.color }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 매출 트렌드 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp size={16} className="text-[#00D287]" />
                    <h3 className="font-bold text-base">월별 매출 트렌드</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={data.salesTrend} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#00D287" stopOpacity={0.3} />
                          <stop offset="100%" stopColor="#00D287" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#6C63FF" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="#6C63FF" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A2332" />
                      <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatKRW} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                      <Area type="monotone" dataKey="sales" name="실매출" stroke="#00D287" strokeWidth={2.5} fill="url(#salesGrad)" dot={{ fill: '#00D287', r: 3 }} />
                      <Area type="monotone" dataKey="target" name="목표" stroke="#6C63FF" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#targetGrad)" dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* 경쟁사 비교 레이더 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={16} className="text-[#6C63FF]" />
                    <h3 className="font-bold text-base">동종업계 비교</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={data.competitorComparison} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
                      <PolarGrid stroke="#1A2332" />
                      <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 11 }} />
                      <Radar name="나의 업체" dataKey="myScore" stroke="#00D287" fill="#00D287" fillOpacity={0.2} />
                      <Radar name="업계 평균" dataKey="avgScore" stroke="#6C63FF" fill="#6C63FF" fillOpacity={0.1} strokeDasharray="4 3" />
                      <Legend wrapperStyle={{ fontSize: 12 }} />
                      <Tooltip content={<CustomTooltip />} />
                    </RadarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* AI 추천 전략 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles size={16} className="text-[#FF7B54]" />
                    <h3 className="font-bold text-base">AI 추천 전략</h3>
                  </div>
                  <div className="space-y-3">
                    {data.recommendations.map((rec, i) => {
                      const cfg = priorityConfig[rec.priority];
                      const Icon = cfg.icon;
                      return (
                        <div key={i} className="flex gap-3 p-3.5 rounded-xl bg-[#1A2332] border border-slate-700">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${cfg.color}15` }}>
                            <Icon size={16} style={{ color: cfg.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-bold text-sm">{rec.title}</h4>
                              <span className="px-2 py-0.5 rounded-full" style={{ fontSize: 10, background: `${cfg.color}15`, color: cfg.color }}>
                                우선순위 {cfg.label}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">{rec.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            ) : null}
          </div>
        )}

        {/* ── 상권 분석 탭 ── */}
        {activeTab === 1 && (
          <div className="space-y-5">
            {commercialLoading ? (
              <div className="space-y-4 pt-4">
                {[80, 200, 180].map((h, i) => (
                  <div key={i} className="bg-[#121927] rounded-2xl border border-slate-800 animate-pulse" style={{ height: h }} />
                ))}
              </div>
            ) : commercial ? (
              <>
                {/* 지역 헤더 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-[#6C63FF]/20 to-[#0A1628] rounded-2xl p-5 border border-[#6C63FF]/20">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MapPin size={14} className="text-[#6C63FF]" />
                    <span className="text-[#6C63FF] font-semibold text-sm">{commercial.areaName}</span>
                  </div>
                  <div className="flex items-end gap-3">
                    <div>
                      <p className="text-slate-400 text-xs">유동인구 점수</p>
                      <span className="font-black text-4xl text-white">{commercial.footTrafficScore}</span>
                      <span className="text-slate-400 text-lg ml-1">/ 100</span>
                    </div>
                    <div className="flex-1 grid grid-cols-3 gap-2 mb-1">
                      {[
                        { label: '경쟁 강도', value: commercial.competitionLevel, color: '#FF7B54' },
                        { label: '성장률', value: `+${commercial.growthRate}%`, color: '#00D287' },
                        { label: '주변업체', value: `${commercial.nearbyBusinesses}개`, color: '#6C63FF' },
                      ].map(s => (
                        <div key={s.label} className="text-center">
                          <p className="text-slate-500" style={{ fontSize: 10 }}>{s.label}</p>
                          <p className="font-bold text-sm" style={{ color: s.color }}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 요일별 유동인구 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={16} className="text-[#6C63FF]" />
                    <h3 className="font-bold text-base">요일별 유동인구</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={190}>
                    <BarChart data={commercial.weeklyTraffic} margin={{ top: 5, right: 5, bottom: 0, left: -20 }} barSize={8} barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A2332" vertical={false} />
                      <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="morning" name="오전" fill="#6C63FF" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="afternoon" name="오후" fill="#00D287" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="evening" name="저녁" fill="#FF7B54" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </motion.div>

                {/* 업종 순위 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <h3 className="font-bold text-base mb-4">주변 업종 현황</h3>
                  <div className="space-y-3">
                    {commercial.topBusinessTypes.map((b, i) => (
                      <div key={b.type} className="flex items-center gap-3">
                        <span className="text-slate-500 font-bold w-5 text-center" style={{ fontSize: 13 }}>{i + 1}</span>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{b.type}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400 text-xs">{b.count}개</span>
                              <span className={`text-xs font-semibold ${b.growth >= 0 ? 'text-[#00D287]' : 'text-[#FF4D4D]'}`}>
                                {b.growth >= 0 ? '+' : ''}{b.growth}%
                              </span>
                            </div>
                          </div>
                          <div className="h-1.5 bg-[#1A2332] rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700"
                              style={{
                                width: `${(b.count / 72) * 100}%`,
                                background: i === 0 ? '#00D287' : i === 1 ? '#6C63FF' : '#FF7B54',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            ) : null}
          </div>
        )}

        {/* ── 유동인구 탭 ── */}
        {activeTab === 2 && (
          <div className="space-y-5">
            {loading ? (
              <div className="space-y-4 pt-4">
                {[160, 200].map((h, i) => (
                  <div key={i} className="bg-[#121927] rounded-2xl border border-slate-800 animate-pulse" style={{ height: h }} />
                ))}
              </div>
            ) : data ? (
              <>
                {/* 시간대별 유동인구 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={16} className="text-[#FF7B54]" />
                    <h3 className="font-bold text-base">시간대별 유동인구</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={data.footTraffic} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                      <defs>
                        <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#FF7B54" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#FF7B54" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A2332" />
                      <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="count" name="유동인구" stroke="#FF7B54" strokeWidth={2.5} fill="url(#trafficGrad)" dot={{ fill: '#FF7B54', r: 4 }} activeDot={{ r: 6 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {[
                      { label: '최대 유동인구', value: '18시 1,560명', color: '#FF7B54' },
                      { label: '하루 평균', value: '855명', color: '#6C63FF' },
                    ].map(item => (
                      <div key={item.label} className="bg-[#1A2332] rounded-xl p-3 border border-slate-700">
                        <p className="text-slate-400" style={{ fontSize: 10 }}>{item.label}</p>
                        <p className="font-bold text-sm mt-1" style={{ color: item.color }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 연령대 분포 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#121927] rounded-2xl p-5 border border-slate-800">
                  <h3 className="font-bold text-base mb-4">방문객 연령대 분포</h3>
                  {commercial && commercial.demographics.map((d, i) => {
                    const colors = ['#00D287', '#6C63FF', '#FF7B54', '#FFD54F', '#FF4D4D'];
                    return (
                      <div key={d.age} className="mb-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-slate-300 text-sm">{d.age}</span>
                          <span className="font-bold text-sm" style={{ color: colors[i] }}>{d.percentage}%</span>
                        </div>
                        <div className="h-2 bg-[#1A2332] rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${d.percentage}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            className="h-full rounded-full"
                            style={{ background: colors[i] }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </motion.div>

                {/* 인사이트 */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#121927] rounded-2xl p-5 border border-[#00D287]/20 bg-gradient-to-br from-[#00D287]/5 to-transparent">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={16} className="text-[#00D287]" />
                    <h3 className="font-bold text-base">AI 인사이트</h3>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      '저녁 18시 유동인구가 가장 많습니다. 18~20시 프로모션을 강화하세요.',
                      '20~30대 방문객이 60%로, SNS 마케팅 효과가 높을 것으로 예상됩니다.',
                      '주말 유동인구가 평일 대비 2.4배 높습니다. 주말 특화 메뉴를 검토해보세요.',
                    ].map((tip, i) => (
                      <div key={i} className="flex gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#00D287]/15 text-[#00D287] flex items-center justify-center flex-shrink-0 font-bold" style={{ fontSize: 11 }}>{i + 1}</span>
                        <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
