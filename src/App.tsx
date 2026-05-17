import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Map as MapIcon, Ticket, User, Scan, MapPin, Award, ChevronRight, Users, BookOpen, X, CheckCircle2, Radio, Compass, Lock, Check, Settings } from 'lucide-react';

// --- Shared SVGs ---
const TwinFishLeft = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 10 A 40 40 0 0 0 50 90 A 20 20 0 0 1 50 50 A 20 20 0 0 0 50 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    <circle cx="50" cy="30" r="3" fill="currentColor"/>
    <path d="M 40 50 Q 30 50 30 40" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

const TwinFishRight = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 50 10 A 40 40 0 0 1 50 90 A 20 20 0 0 1 50 50 A 20 20 0 0 0 50 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
    <circle cx="50" cy="70" r="3" fill="currentColor"/>
    <path d="M 60 50 Q 70 50 70 60" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

// --- Types ---
type TabState = 'home' | 'map' | 'commemoration' | 'profile';
type FlowState = 'none' | 'activation' | 'checkin' | 'match' | 'peer-discovery';
type SubViewState = 'none' | 'instructions' | 'spot-details' | 'edit-profile' | 'historical-tickets' | 'share-card' | 'identity-tag' | 'ticket-details' | 'sensing-settings' | 'relic-details';

// --- Reusable Components ---
const TicketCard = ({ tag, hasMatched, spots, onSelectSpot, onOpenSubView }: { tag: string, hasMatched?: boolean, spots?: any[], onSelectSpot?: (spot: any) => void, onOpenSubView?: (view: SubViewState) => void }) => {
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
  const [barcode, setBarcode] = useState<number[]>([]);
  useEffect(() => {
    setBarcode(Array.from({ length: 24 }, () => Math.random() * 3 + 1));
  }, []);

  const completedSpots = spots?.filter(s => s.status === '已打卡') || [];

  return (
    <div className="w-full bg-mutton-white rounded-md shadow-[0_16px_40px_rgba(28,43,45,0.15)] flex flex-col relative overflow-hidden border-[0.5px] border-low-gold/40">
      {/* Top Header Section */}
      <div className="pt-10 pb-8 px-6 bg-[url('https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-mutton-white/95 via-mutton-white/80 to-mutton-white/95 backdrop-blur-[2px]"></div>
        <div className="flex justify-between items-start relative z-10 mb-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-1.5 h-1.5 bg-stamp-red rounded-full"></div>
              <span className="font-mono text-[9px] text-stamp-red tracking-widest uppercase">Official Souvenir</span>
            </div>
            <h3 className="font-serif text-xl text-cyan-blue tracking-[0.2em]">陕西历史博物馆导览</h3>
            <p className="font-serif text-xs text-cyan-blue/60 tracking-widest">大唐遗宝主题路线</p>
          </div>
        </div>
        <div className="relative z-10 flex justify-between items-end border-t-[0.5px] border-cyan-blue/10 pt-4">
          <div>
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Serial No.</p>
            <p className="font-mono text-sm text-cyan-blue tracking-wider">CA-8492-7731</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Date</p>
            <p className="font-mono text-sm text-cyan-blue tracking-widest">{today}</p>
          </div>
        </div>
      </div>

      {/* Perforation Line */}
      <div className="h-6 relative bg-mutton-white flex items-center z-20">
        <div className="absolute -left-3 w-6 h-6 bg-[var(--color-bg-base)] rounded-full shadow-inner border-[0.5px] border-low-gold/30"></div>
        <div className="w-full border-t-[1.5px] border-dashed border-low-gold/40 mx-4"></div>
        <div className="absolute -right-3 w-6 h-6 bg-[var(--color-bg-base)] rounded-full shadow-inner border-[0.5px] border-low-gold/30"></div>
      </div>

      {/* Middle Content Section */}
      <div className="px-6 py-8 space-y-8 relative bg-mutton-white flex-1">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <TwinFishLeft className="w-64 h-64 text-cyan-blue" />
        </div>
        
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Identity / 身份标签</p>
              <p className="font-serif text-lg text-cyan-blue tracking-widest">{tag || '同游搭子'}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Status / 状态</p>
              <p className={`font-serif text-lg tracking-[0.2em] ${hasMatched ? 'text-stamp-red' : 'text-cyan-blue'}`}>
                {hasMatched ? '契约达成' : '等待合符'}
              </p>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-end mb-3">
              <p className="font-mono text-[9px] text-silver-gray tracking-widest uppercase">Exploration / 探索进度</p>
              <p className="font-serif text-sm text-cyan-blue tracking-widest">{completedSpots.length} / {spots?.length || 0} 点位</p>
            </div>
            
            {/* Collected Badges */}
            <div className="flex flex-wrap gap-2 p-4 bg-silver-gray/5 border-[0.5px] border-silver-gray/10 rounded-sm min-h-[80px]">
              {completedSpots.length > 0 ? completedSpots.map((spot, i) => (
                <div 
                  key={i} 
                  onClick={(e) => {
                    if (onSelectSpot && onOpenSubView) {
                      e.stopPropagation();
                      onSelectSpot(spot);
                      onOpenSubView('relic-details');
                    }
                  }}
                  className={`px-3 py-1.5 border-[0.5px] border-low-gold/50 bg-low-gold/10 text-low-gold text-xs tracking-widest rounded-sm font-serif shadow-sm ${onSelectSpot ? 'cursor-pointer hover:bg-low-gold/20 transition-colors' : ''}`}
                >
                  {spot.relic}
                </div>
              )) : (
                <p className="text-xs text-silver-gray/60 tracking-widest font-serif w-full text-center mt-2">暂无收集印记</p>
              )}
            </div>
          </div>
        </div>
        
        {hasMatched && (
          <div className="absolute top-4 right-4 w-16 h-16 border-[1.5px] border-stamp-red text-stamp-red flex items-center justify-center transform -rotate-12 opacity-80 mix-blend-multiply rounded-sm pointer-events-none">
            <span className="font-serif text-lg leading-none tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>已合</span>
          </div>
        )}
      </div>

      {/* Bottom Barcode Section */}
      <div className="p-6 py-8 border-t-[1px] border-dashed border-silver-gray/20 flex justify-between items-end bg-silver-gray/5 relative">
        <div className="flex flex-col gap-3 w-full">
          <div className="flex justify-between items-center w-full">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest uppercase">Digital Souvenir</p>
            <p className="font-mono text-[9px] text-silver-gray tracking-widest">08492 77310 99214</p>
          </div>
          <div className="flex gap-[2px] h-12 opacity-60 w-full justify-between">
            {barcode.map((width, i) => (
              <div key={i} className="bg-cyan-blue rounded-sm" style={{ width: `${width}px`, flexShrink: 0 }}></div>
            ))}
          </div>
        </div>
        
        {/* Decorative Seal */}
        <div className="absolute right-8 -top-8 w-16 h-16 border-[1px] border-stamp-red/40 rounded-full flex items-center justify-center opacity-80 bg-mutton-white shadow-sm transform rotate-12">
          <div className="w-14 h-14 border-[0.5px] border-dashed border-stamp-red/60 rounded-full flex items-center justify-center">
            <span className="font-serif text-xs text-stamp-red tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>长安印</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tabs ---
const HomeTab = ({ onOpenFlow, onOpenSubView, tag, hasMatched, spots, sensingEnabled, onChangeTab }: { onOpenFlow: (flow: FlowState) => void, onOpenSubView: (view: SubViewState) => void, tag: string, hasMatched: boolean, spots: any[], sensingEnabled: boolean, onChangeTab: (tab: TabState) => void }) => {
  const completedCount = spots.filter(s => s.status === '已打卡').length;
  const totalSpots = spots.length;
  const isAllCompleted = completedCount === totalSpots;
  
  let currentStatus = '未激活';
  let primaryActionText = '开始激活鱼符';
  let primaryAction = () => onOpenFlow('activation');

  if (tag) {
    if (isAllCompleted && hasMatched) {
      currentStatus = '已完成';
      primaryActionText = '生成数字纪念页';
      primaryAction = () => onChangeTab('commemoration');
    } else if (isAllCompleted && !hasMatched) {
      currentStatus = '待合符';
      primaryActionText = '去合符确认';
      primaryAction = () => onOpenFlow('peer-discovery');
    } else if (hasMatched) {
      currentStatus = '已合符';
      primaryActionText = '查看合符结果';
      primaryAction = () => onOpenFlow('match');
    } else {
      currentStatus = '探索中';
      primaryActionText = '前往下一个点位';
      primaryAction = () => onOpenFlow('checkin');
    }
  }

  const nextSpot = spots.find(s => s.status === '未打卡');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24 space-y-6">
      {/* 一、顶部状态驾驶舱 */}
      <div className="bg-cyan-blue text-mutton-white p-8 rounded-sm shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mutton-white/5 rounded-full -mr-24 -mt-24 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-low-gold/5 rounded-full -ml-16 -mb-16 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-mutton-white/50 mb-2 uppercase font-mono">Current Status</p>
              <h2 className="font-serif text-5xl tracking-[0.2em] text-mutton-white">{currentStatus}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-[0.2em] text-mutton-white/50 mb-1 uppercase font-mono">Ticket No.</p>
              <span className="text-xs font-mono text-low-gold/80">CA-8492</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-10">
            <div>
              <p className="text-[10px] tracking-widest text-mutton-white/40 mb-1">活动名称</p>
              <h3 className="text-xs tracking-widest text-mutton-white/90 truncate">陕西历史博物馆导览</h3>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest text-mutton-white/40 mb-1">身份标签</p>
              <span className="text-xs tracking-widest text-mutton-white/90">{tag || '待激活'}</span>
            </div>
          </div>

          <button 
            onClick={primaryAction} 
            className="w-full py-5 bg-low-gold text-cyan-blue text-sm tracking-[0.3em] rounded-sm font-bold shadow-[0_4px_20px_rgba(184,161,114,0.3)] active:scale-[0.97] transition-all flex justify-center items-center gap-3 group"
          >
            {primaryActionText}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 二、当前任务系统 */}
      {tag && (
        <div className="bg-mutton-white border-[0.5px] border-silver-gray/20 p-6 rounded-sm shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1 h-full bg-low-gold/20"></div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-low-gold rounded-full"></div>
              <h3 className="text-xs font-serif tracking-[0.2em] text-cyan-blue uppercase">Mission / 当前任务</h3>
            </div>
            <span className="text-[10px] font-mono text-silver-gray tracking-widest">PROGRESS: {completedCount}/{totalSpots}</span>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-cyan-blue/5 border-[0.5px] border-cyan-blue/10 flex items-center justify-center shrink-0">
                <MapPin size={18} className="text-cyan-blue" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-silver-gray tracking-widest mb-1 uppercase font-mono">Next Target / 下一目标点位</p>
                <p className="text-sm tracking-[0.1em] text-cyan-blue font-medium">{nextSpot?.name || '已全部完成'}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-sm bg-low-gold/5 border-[0.5px] border-low-gold/10 flex items-center justify-center shrink-0">
                <Ticket size={18} className="text-low-gold" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-silver-gray tracking-widest mb-1 uppercase font-mono">Unlock / 完成后解锁内容</p>
                <p className="text-xs tracking-widest text-cyan-blue/80">专属文物印记 · 路线深度解析</p>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] text-silver-gray tracking-widest uppercase">Route Completion</span>
                <span className="text-[9px] font-mono text-cyan-blue">{Math.round((completedCount / totalSpots) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-silver-gray/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(completedCount / totalSpots) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-cyan-blue"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 三、社交感应区 */}
      <div className="bg-mutton-white border-[0.5px] border-silver-gray/20 p-6 rounded-sm shadow-sm relative overflow-hidden">
        {sensingEnabled && (
          <div className="absolute top-0 right-0 p-4">
            <div className="relative">
              <div className="w-2 h-2 bg-stamp-red rounded-full animate-ping absolute"></div>
              <div className="w-2 h-2 bg-stamp-red rounded-full relative"></div>
            </div>
          </div>
        )}
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-full ${sensingEnabled ? 'bg-stamp-red/5' : 'bg-silver-gray/5'}`}>
            <Radio size={16} className={sensingEnabled ? 'text-stamp-red' : 'text-silver-gray'} />
          </div>
          <div>
            <h3 className="text-xs font-serif tracking-[0.2em] text-cyan-blue">同好感应</h3>
            <p className="text-[9px] text-silver-gray tracking-widest uppercase font-mono">Social Sensing</p>
          </div>
        </div>

        <div className="relative">
          {sensingEnabled ? (
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-cyan-blue font-medium tracking-widest">
                  已发现可互动对象
                </p>
                <p className="text-[10px] text-silver-gray tracking-widest leading-relaxed">
                  当前路线重合度较高，建议主动接近并准备合符。
                </p>
              </div>
              <div className="flex gap-1 mb-4">
                {[1, 2, 3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                    className="h-0.5 flex-1 bg-stamp-red/20 rounded-full"
                  ></motion.div>
                ))}
              </div>
              <button 
                onClick={() => onOpenFlow('peer-discovery')}
                className="w-full py-3 bg-stamp-red/5 border-[0.5px] border-stamp-red/20 text-stamp-red tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>进入感应发现</span>
                <ChevronRight size={14} />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-silver-gray tracking-widest leading-relaxed">
                开启感应以发现附近路线相近的同好，开启一段跨越时空的“合符”之旅。
              </p>
              <button 
                onClick={() => onOpenSubView('sensing-settings')}
                className="w-full py-3 border-[0.5px] border-silver-gray/30 text-cyan-blue tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-all"
              >
                开启同好感应
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const MapTab = ({ onOpenFlow, onOpenSubView, onSelectSpot, spots }: { onOpenFlow: (flow: FlowState) => void, onOpenSubView: (view: SubViewState) => void, onSelectSpot: (spot: any) => void, spots: any[] }) => {
  const completedCount = spots.filter(s => s.status === '已打卡').length;
  const totalSpots = spots.length;
  const matchUnlocked = completedCount >= 2;
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 flex flex-col min-h-full bg-mutton-white">
      {/* 一、顶部路线任务总控 */}
      <div className="sticky top-0 z-30 bg-mutton-white/95 backdrop-blur-md border-b-[0.5px] border-silver-gray/20 p-6 shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] text-silver-gray tracking-[0.3em] uppercase font-mono mb-1">Mission Control / 路线总控</p>
            <h2 className="font-serif text-2xl tracking-[0.1em] text-cyan-blue">唐代主题路线 · 大唐遗宝</h2>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-silver-gray tracking-widest uppercase font-mono mb-1">Progress</p>
            <span className="text-xl font-mono text-cyan-blue">{completedCount}<span className="text-silver-gray/40 mx-1">/</span>{totalSpots}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-silver-gray/5 p-3 rounded-sm border-[0.5px] border-silver-gray/10">
            <p className="text-[9px] text-silver-gray tracking-widest uppercase mb-1">Current Segment / 当前路段</p>
            <p className="text-xs text-cyan-blue tracking-widest truncate">何家村遗宝展厅 A区</p>
          </div>
          <div className={`p-3 rounded-sm border-[0.5px] transition-colors ${matchUnlocked ? 'bg-low-gold/10 border-low-gold/30' : 'bg-silver-gray/5 border-silver-gray/10'}`}>
            <p className="text-[9px] text-silver-gray tracking-widest uppercase mb-1">Match Status / 合符条件</p>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${matchUnlocked ? 'bg-low-gold shadow-[0_0_8px_rgba(184,161,114,0.6)]' : 'bg-silver-gray/30'}`}></div>
              <p className={`text-xs tracking-widest ${matchUnlocked ? 'text-low-gold font-medium' : 'text-silver-gray'}`}>
                {matchUnlocked ? '已解锁合符' : `还差 ${2 - completedCount} 点位`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 二、中部点位任务链 */}
      <div className="p-8 space-y-10 flex-1 relative">
        {/* 纵向路径线 */}
        <div className="absolute left-[47px] top-12 bottom-12 w-[1px] bg-silver-gray/10 z-0"></div>

        {spots.map((spot, index) => {
          const isCompleted = spot.status === '已打卡';
          const isActive = spot.status === '未打卡';
          const isLocked = false;

          let cardStyle = '';
          let statusLabel = '';
          let statusColor = '';
          let typeText = index % 2 === 0 ? '文物打卡点' : '讲解屏解锁点';
          let timeText = `预计步行 ${5 + (index - completedCount) * 2} min`;

          if (isCompleted) {
            cardStyle = 'bg-cyan-blue/5 border-cyan-blue/20 opacity-90';
            statusLabel = '已完成';
            statusColor = 'text-cyan-blue bg-cyan-blue/10';
            timeText = '已探索完毕';
          } else if (isActive) {
            cardStyle = 'bg-mutton-white border-cyan-blue border-[1.5px] shadow-[0_8px_24px_rgba(28,43,45,0.15)] z-10 scale-[1.02]';
            statusLabel = '当前目标';
            statusColor = 'text-mutton-white bg-stamp-red';
          } else {
            cardStyle = 'bg-mutton-white border-silver-gray/20 opacity-60';
            statusLabel = '未开启';
            statusColor = 'text-silver-gray bg-silver-gray/10';
          }

          return (
            <div key={spot.id} className="relative pl-14">
              {/* 路径节点 */}
              <div className={`absolute left-0 top-6 w-10 h-10 rounded-full border-2 border-mutton-white flex items-center justify-center z-10 transition-all duration-500 ${
                isCompleted ? 'bg-cyan-blue' : isActive ? 'bg-stamp-red scale-110 shadow-[0_0_15px_rgba(196,30,58,0.4)]' : 'bg-silver-gray/20'
              }`}>
                {isCompleted ? (
                  <CheckCircle2 size={16} className="text-mutton-white" />
                ) : (
                  <span className={`font-mono text-xs ${isActive ? 'text-mutton-white font-bold' : 'text-silver-gray'}`}>{index + 1}</span>
                )}
              </div>

              <div className={`p-6 rounded-sm border-[1px] relative overflow-hidden transition-all duration-500 ${cardStyle}`}>
                {isActive && (
                  <div className="absolute top-0 right-0 p-2">
                    <div className="w-1.5 h-1.5 bg-stamp-red rounded-full animate-pulse"></div>
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-serif tracking-widest mb-1 ${isActive ? 'text-cyan-blue font-bold text-xl' : isLocked ? 'text-cyan-blue/70 font-medium text-lg' : 'text-cyan-blue/90 text-lg'}`}>{spot.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] text-silver-gray tracking-widest uppercase font-mono">{typeText}</span>
                      <span className="text-silver-gray/30 text-[9px]">|</span>
                      <span className="text-[9px] text-silver-gray tracking-widest uppercase font-mono">{timeText}</span>
                    </div>
                  </div>
                  <span className={`text-[9px] tracking-[0.2em] px-2 py-1 rounded-sm uppercase font-mono ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>

                {isActive && (
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { onSelectSpot(spot); onOpenSubView('spot-details'); }} 
                    className="mt-2 w-full py-3 bg-cyan-blue text-mutton-white text-[10px] tracking-[0.3em] rounded-sm flex justify-center items-center gap-2 uppercase font-mono shadow-md"
                  >
                    <Scan size={14} />
                    执行打卡
                  </motion.button>
                )}
                
                {isCompleted && (
                  <div 
                    onClick={() => { onSelectSpot(spot); onOpenSubView('relic-details'); }}
                    className="mt-4 pt-4 border-t-[0.5px] border-cyan-blue/20 flex items-center gap-3 text-[11px] text-cyan-blue tracking-widest bg-cyan-blue/5 p-3 rounded-sm cursor-pointer hover:bg-cyan-blue/10 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-low-gold/20 flex items-center justify-center shrink-0 border-[0.5px] border-low-gold/40">
                      <Ticket size={12} className="text-low-gold" />
                    </div>
                    <span className="font-serif"><span className="text-silver-gray text-[10px] mr-1">已解锁印记:</span> {spot.relic}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 三、底部提示 */}
      <div className="px-8 py-10 text-center">
        <p className="text-[10px] text-silver-gray tracking-[0.2em] leading-loose">
          完成更多点位，可解锁更高合符资格。<br/>
          路线完成度将影响后续合符条件。
        </p>
      </div>
    </motion.div>
  );
};

const CommemorationTab = ({ tag, hasMatched, onOpenSubView, onSelectSpot, onOpenFlow, spots }: { tag: string, hasMatched: boolean, onOpenSubView: (view: SubViewState) => void, onSelectSpot: (spot: any) => void, onOpenFlow: (flow: FlowState) => void, spots: any[] }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] min-h-full">
    <header className="mb-8 pt-4 flex justify-between items-end">
      <div>
        <h2 className="font-serif text-2xl tracking-[0.3em] text-cyan-blue">长安合同</h2>
        <p className="text-silver-gray tracking-[0.2em] text-[9px] uppercase font-mono mt-1 opacity-70">Digital Commemoration / 数字纪念</p>
      </div>
      <div className="text-right">
        <p className="text-[9px] text-stamp-red font-mono tracking-widest uppercase">Verified / 已核验</p>
        <p className="text-[8px] text-silver-gray font-mono tracking-widest mt-0.5">2026.04.03</p>
      </div>
    </header>

    {/* 核心票证区域 - Ticket Style */}
    <div className="relative mb-12 group">
      {/* 票证阴影与质感 */}
      <div className="absolute inset-x-2 -bottom-2 h-full bg-black/5 blur-xl rounded-sm -z-10" />
      
      <div className="bg-mutton-white border-[0.5px] border-silver-gray/30 p-1 relative overflow-hidden shadow-sm">
        {/* 锯齿边缘装饰 (模拟票根) */}
        <div className="absolute left-0 top-0 bottom-0 w-1 flex flex-col justify-around py-2 z-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-bg-base)] -ml-0.5 border-[0.5px] border-silver-gray/20" />
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1 flex flex-col justify-around py-2 z-10">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 rounded-full bg-[var(--color-bg-base)] -mr-0.5 border-[0.5px] border-silver-gray/20" />
          ))}
        </div>

        <div className="border-[0.5px] border-cyan-blue/20 p-6 relative">
          {/* 四角装饰 */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-[1px] border-l-[1px] border-low-gold/40" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-[1px] border-r-[1px] border-low-gold/40" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-[1px] border-l-[1px] border-low-gold/40" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-[1px] border-r-[1px] border-low-gold/40" />

          {hasMatched ? (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onOpenSubView('share-card')} 
              className="cursor-pointer"
            >
              <TicketCard tag={tag} hasMatched={hasMatched} spots={spots} onSelectSpot={onSelectSpot} onOpenSubView={onOpenSubView} />
              <div className="mt-8 pt-6 border-t-[0.5px] border-dashed border-silver-gray/20 flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-silver-gray/20" />
                  <span className="font-serif text-[10px] text-silver-gray tracking-[0.4em] uppercase">Scan to Share</span>
                  <div className="w-8 h-[1px] bg-silver-gray/20" />
                </div>
                <div className="flex items-center gap-2 text-cyan-blue/60">
                  <Scan size={14} />
                  <span className="text-[10px] tracking-[0.2em] font-mono">TAP TO VIEW FULL CONTRACT</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-cyan-blue/80 border-[0.5px] border-dashed border-silver-gray/20 m-2 bg-silver-gray/5">
              <div className="relative mb-6">
                <Ticket size={48} strokeWidth={1} className="text-silver-gray/40" />
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-cyan-blue/5 blur-xl rounded-full"
                />
              </div>
              <p className="text-xs tracking-[0.3em] font-serif mb-6 text-silver-gray">契约待解锁</p>
              
              <div className="w-full px-8 space-y-4">
                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-2">
                  <span className="text-[10px] text-silver-gray tracking-widest">当前合符状态</span>
                  <span className="text-[10px] text-stamp-red font-bold tracking-widest">待确认</span>
                </div>
                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-2">
                  <span className="text-[10px] text-silver-gray tracking-widest">已满足条件</span>
                  <span className="text-[10px] text-cyan-blue tracking-widest">路线 {spots.filter(s => s.status === '已打卡').length}/{spots.length}，点位印记已获得</span>
                </div>
                <div className="pt-2 flex flex-col items-center gap-3">
                  <span className="text-[9px] text-silver-gray tracking-widest uppercase font-mono">Next Step / 下一步建议</span>
                  <button 
                    onClick={() => onOpenFlow('peer-discovery')}
                    className="px-6 py-2 bg-cyan-blue text-mutton-white text-[10px] tracking-[0.2em] rounded-sm shadow-sm"
                  >
                    前往发现同好 / 完成实体拼合
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* 收集成就 - Artifact Stamp Style */}
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-serif text-sm text-cyan-blue tracking-[0.2em] flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-stamp-red rounded-full shadow-[0_0_8px_rgba(182,53,46,0.4)]"></span>
          已获印记
        </h3>
        <span className="text-[9px] text-silver-gray font-mono tracking-widest uppercase">
          {spots.filter(s => s.status === '已打卡').length} / {spots.length} Collected
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {spots.map((spot, i) => {
          const isCompleted = spot.status === '已打卡';
          return (
            <motion.div 
              key={i} 
              whileHover={isCompleted ? { y: -4 } : {}}
              onClick={() => {
                if (isCompleted) {
                  onSelectSpot(spot);
                  onOpenSubView('relic-details');
                }
              }}
              className={`aspect-square border-[0.5px] flex flex-col items-center justify-center gap-2 relative overflow-hidden transition-all duration-500
                ${isCompleted ? 'bg-mutton-white border-low-gold/30 shadow-md cursor-pointer' : 'bg-silver-gray/5 border-silver-gray/10 opacity-40'}`}
            >
              {/* 印章背景纹理 */}
              {isCompleted && (
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 mix-blend-multiply" />
              )}
              
              <div className={`w-12 h-12 rounded-full border-[1.5px] flex items-center justify-center relative overflow-hidden
                ${isCompleted ? 'border-stamp-red/60 text-stamp-red shadow-inner bg-mutton-white/50' : 'border-silver-gray/20 text-silver-gray'}`}>
                {isCompleted && (
                  <motion.div 
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 border-[4px] border-stamp-red/5 rounded-full z-10"
                  />
                )}
                {isCompleted && spot.badgeIcon ? (
                  <img src={spot.badgeIcon} className="w-full h-full object-cover" alt={spot.relic} />
                ) : (
                  <span className="font-serif text-xs font-bold leading-tight text-center px-1" style={{ writingMode: 'vertical-rl' }}>
                    {isCompleted ? spot.relic : '未获'}
                  </span>
                )}
              </div>
              <span className="text-[8px] tracking-widest text-silver-gray uppercase font-mono mt-1">
                {isCompleted ? 'Acquired' : 'Locked'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>

    {/* 历史回顾入口 */}
    <motion.button 
      whileHover={{ x: 4 }}
      onClick={() => onOpenSubView('historical-tickets')}
      className="w-full py-5 border-[0.5px] border-silver-gray/20 text-cyan-blue text-[10px] tracking-[0.3em] flex justify-between items-center px-6 bg-mutton-white shadow-sm hover:shadow-md transition-all uppercase font-mono"
    >
      <div className="flex items-center gap-3">
        <div className="w-1 h-4 bg-cyan-blue/20" />
        <span>Historical Archives / 回看历史票证</span>
      </div>
      <ChevronRight size={14} className="text-silver-gray/60" />
    </motion.button>
  </motion.div>
);

const ProfileTab = ({ tag, nickname, bio, avatar, onOpenSubView, sensingEnabled, setSensingEnabled }: { tag: string, nickname: string, bio: string, avatar: string | null, onOpenSubView: (view: SubViewState) => void, sensingEnabled: boolean, setSensingEnabled: (v: boolean) => void }) => {
  const [isDiscoverable, setIsDiscoverable] = useState(true);
  const [notificationMode, setNotificationMode] = useState<'vibrate' | 'silent'>('vibrate');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] min-h-full">
      <header className="mb-8 pt-4">
        <h2 className="font-serif text-2xl tracking-[0.3em] text-cyan-blue">身份与设备</h2>
        <p className="text-silver-gray tracking-[0.2em] text-[9px] uppercase font-mono mt-1 opacity-70">Identity & Device Management</p>
      </header>

      <div className="space-y-10">
        {/* 一、身份信息区 - Identity Card */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-serif text-sm text-cyan-blue tracking-[0.2em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-low-gold rounded-full shadow-[0_0_8px_rgba(184,161,114,0.4)]"></span>
              身份信息
            </h3>
            <span className="text-[9px] text-silver-gray font-mono tracking-widest uppercase">Profile</span>
          </div>
          
          <motion.div 
            whileHover={{ y: -2 }}
            onClick={() => onOpenSubView('edit-profile')} 
            className="p-6 rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm flex items-center gap-5 relative cursor-pointer hover:border-cyan-blue/30 transition-all"
          >
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/10 flex items-center justify-center shrink-0 overflow-hidden">
                {avatar ? <img src={avatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="text-cyan-blue/60" size={32} strokeWidth={1} />}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-stamp-red rounded-full border-2 border-mutton-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-mutton-white rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-serif text-xl tracking-[0.1em] text-cyan-blue">{nickname}</h4>
                <span className="text-[9px] tracking-[0.2em] text-low-gold bg-low-gold/5 px-2 py-1 rounded-sm border-[0.5px] border-low-gold/20 uppercase font-mono">{tag || 'No Tag'}</span>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-[9px] text-silver-gray tracking-[0.2em] font-mono uppercase">ID: CA-8492-2026</p>
                <div className="w-[1px] h-2 bg-silver-gray/20" />
                <p className="text-[9px] text-silver-gray tracking-[0.2em] font-mono uppercase">Level: 初级馆友</p>
              </div>
            </div>
            <ChevronRight className="text-silver-gray/30" size={18} />
          </motion.div>
        </section>

        {/* 二、票证与鱼符 - Device Status */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-serif text-sm text-cyan-blue tracking-[0.2em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-cyan-blue rounded-full shadow-[0_0_8px_rgba(10,50,80,0.4)]"></span>
              票证与设备
            </h3>
            <span className="text-[9px] text-silver-gray font-mono tracking-widest uppercase">Device</span>
          </div>
          
          <div className="rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm overflow-hidden divide-y-[0.5px] divide-silver-gray/10">
            <div className="p-5 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.2em] text-silver-gray uppercase font-mono">Talisman Status / 鱼符状态</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                  <span className="text-xs tracking-widest text-cyan-blue font-serif">已激活 (Active)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-silver-gray font-mono tracking-widest block mb-1 uppercase">Battery</span>
                <span className="text-[10px] text-cyan-blue font-mono font-bold tracking-widest">85%</span>
              </div>
            </div>
            
            <div className="p-5 flex justify-between items-center">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.2em] text-silver-gray uppercase font-mono">Current Mission / 当前任务</span>
                <span className="text-xs tracking-widest text-cyan-blue font-serif block">陕西历史博物馆导览</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-silver-gray font-mono tracking-widest block mb-1 uppercase">Progress</span>
                <span className="text-[10px] text-cyan-blue font-mono font-bold tracking-widest">3/12</span>
              </div>
            </div>

            <motion.button 
              whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
              onClick={() => onOpenSubView('historical-tickets')} 
              className="w-full p-5 flex justify-between items-center transition-colors text-left"
            >
              <span className="text-[10px] tracking-[0.2em] text-cyan-blue uppercase font-mono font-bold">Historical Archives / 历史档案</span>
              <ChevronRight className="text-silver-gray/30" size={16} />
            </motion.button>
          </div>
        </section>

        {/* 三、感应设置 - Sensing Config */}
        <section>
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-serif text-sm text-cyan-blue tracking-[0.2em] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-stamp-red rounded-full shadow-[0_0_8px_rgba(182,53,46,0.4)]"></span>
              感应设置
            </h3>
            <button onClick={() => onOpenSubView('sensing-settings')} className="text-[9px] text-cyan-blue tracking-[0.2em] flex items-center gap-1 uppercase font-mono font-bold">
              Config <ChevronRight size={10} />
            </button>
          </div>
          
          <div className="bg-mutton-white border-[0.5px] border-silver-gray/20 rounded-sm shadow-sm p-2">
            <div className="flex items-center justify-between p-4 border-b-[0.5px] border-silver-gray/10">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${sensingEnabled ? 'bg-cyan-blue/10 text-cyan-blue' : 'bg-silver-gray/10 text-silver-gray'}`}>
                  <Radio size={18} />
                </div>
                <div>
                  <p className="text-xs tracking-widest text-cyan-blue font-serif">同好感应 (BLE Sensing)</p>
                  <p className="text-[9px] text-silver-gray tracking-widest font-mono uppercase mt-0.5">Discover nearby peers</p>
                </div>
              </div>
              <button 
                onClick={() => setSensingEnabled(!sensingEnabled)}
                className={`w-12 h-6 rounded-full transition-all duration-500 relative ${sensingEnabled ? 'bg-cyan-blue shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]' : 'bg-silver-gray/20'}`}
              >
                <motion.div 
                  animate={{ x: sensingEnabled ? 26 : 2 }}
                  className="absolute top-1 left-0 w-4 h-4 bg-mutton-white rounded-full shadow-md"
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4 opacity-50">
                <div className="p-2 rounded-full bg-silver-gray/10 text-silver-gray">
                  <Scan size={18} />
                </div>
                <div>
                  <p className="text-xs tracking-widest text-cyan-blue font-serif">极近场确认 (NFC Match)</p>
                  <p className="text-[9px] text-silver-gray tracking-widest font-mono uppercase mt-0.5">Always active for safety</p>
                </div>
              </div>
              <span className="text-[8px] text-silver-gray font-mono tracking-widest uppercase bg-silver-gray/10 px-2 py-1 rounded-sm">System Default</span>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-16 pt-8 border-t-[0.5px] border-silver-gray/10 text-center">
        <p className="text-[8px] text-silver-gray tracking-[0.4em] uppercase font-mono">Changan Contract v1.2.0-PRO</p>
        <p className="text-[8px] text-silver-gray tracking-[0.2em] font-serif mt-2 opacity-50">陕西历史博物馆 · 联合呈现</p>
      </div>
    </motion.div>
  );
};

const BottomNav = ({ activeTab, onChange }: { activeTab: TabState, onChange: (t: TabState) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'map', icon: MapIcon, label: '地图' },
    { id: 'commemoration', icon: Ticket, label: '纪念' },
    { id: 'profile', icon: User, label: '我的' },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-[var(--color-bg-base)] border-t-[1px] border-silver-gray/20 flex justify-around items-center px-4 z-40">
      {tabs.map(t => {
        const Icon = t.icon;
        const isActive = activeTab === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id as TabState)} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-cyan-blue' : 'text-silver-gray/50'}`}>
            <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-[10px] tracking-widest">{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}

// --- Independent Flows ---

// Flow A: Activation
const ActivationFlow = ({ onClose, onComplete }: { onClose: () => void, onComplete: (tag: string, nickname: string, bio: string, avatar: string | null) => void }) => {
  const [step, setStep] = useState(1);
  const [tempName, setTempName] = useState('访客_8492');
  const [tempBio, setTempBio] = useState('对长安的历史充满好奇。');
  const [tempTag, setTempTag] = useState('汉服同袍');
  const [tempAvatar, setTempAvatar] = useState<string | null>(null);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: '100%', opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: '100%', opacity: 0 }} 
        transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
        className="w-full max-w-[420px] h-[90vh] bg-[var(--color-bg-base)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col relative"
      >
        {/* 顶部区域 */}
        <div className="p-6 pb-4 flex justify-between items-start shrink-0 relative z-10">
          <div>
            <span className="font-mono text-[10px] text-silver-gray tracking-[0.3em] uppercase mb-2 block">Activation</span>
            <h2 className="font-serif text-2xl text-cyan-blue tracking-[0.2em] mb-1">激活鱼符</h2>
            <p className="text-silver-gray text-[10px] tracking-widest">完成实体票证与数字身份绑定</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-silver-gray/5 rounded-full transition-colors">
            <X size={24} className="text-silver-gray" />
          </button>
        </div>

        <div className="flex-1 flex flex-col p-6 pt-0 overflow-y-auto">
          {/* 步骤进度区 */}
          <div className="flex justify-center items-center gap-2 mb-6 mt-4">
            <div className={`flex flex-col items-center gap-1 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono transition-colors ${step >= 1 ? 'bg-low-gold text-mutton-white shadow-sm' : 'bg-silver-gray/20 text-silver-gray'}`}>1</div>
              <span className={`text-[8px] tracking-widest ${step >= 1 ? 'text-cyan-blue font-medium' : 'text-silver-gray'}`}>靠近鱼符</span>
            </div>
            <div className={`w-4 h-[1px] mb-3 transition-colors ${step >= 2 ? 'bg-low-gold/50' : 'bg-silver-gray/20'}`}></div>
            <div className={`flex flex-col items-center gap-1 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono transition-colors ${step >= 2 ? 'bg-low-gold text-mutton-white shadow-sm' : 'bg-silver-gray/20 text-silver-gray'}`}>2</div>
              <span className={`text-[8px] tracking-widest ${step >= 2 ? 'text-cyan-blue font-medium' : 'text-silver-gray'}`}>读取身份</span>
            </div>
            <div className={`w-4 h-[1px] mb-3 transition-colors ${step >= 3 ? 'bg-low-gold/50' : 'bg-silver-gray/20'}`}></div>
            <div className={`flex flex-col items-center gap-1 ${step >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono transition-colors ${step >= 3 ? 'bg-low-gold text-mutton-white shadow-sm' : 'bg-silver-gray/20 text-silver-gray'}`}>3</div>
              <span className={`text-[8px] tracking-widest ${step >= 3 ? 'text-cyan-blue font-medium' : 'text-silver-gray'}`}>确认信息</span>
            </div>
            <div className={`w-4 h-[1px] mb-3 transition-colors ${step >= 4 ? 'bg-low-gold/50' : 'bg-silver-gray/20'}`}></div>
            <div className={`flex flex-col items-center gap-1 ${step >= 4 ? 'opacity-100' : 'opacity-30'}`}>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-mono transition-colors ${step >= 4 ? 'bg-low-gold text-mutton-white shadow-sm' : 'bg-silver-gray/20 text-silver-gray'}`}>4</div>
              <span className={`text-[8px] tracking-widest ${step >= 4 ? 'text-cyan-blue font-medium' : 'text-silver-gray'}`}>完成激活</span>
            </div>
          </div>

          {/* 中部核心识别区 */}
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px] mb-8">
            {step !== 3 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {/* 环形感应图形 */}
                <motion.div 
                  animate={{ scale: step === 2 ? [1, 1.1, 1] : 1, opacity: step === 2 ? [0.3, 0.6, 0.3] : 0.3 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-48 h-48 rounded-full border-[0.5px] border-low-gold/30 absolute"
                />
                <motion.div 
                  animate={{ scale: step === 2 ? [1, 1.2, 1] : 1, opacity: step === 2 ? [0.1, 0.3, 0.1] : 0.1 }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-64 h-64 rounded-full border-[0.5px] border-low-gold/20 absolute"
                />
                {step === 2 && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-32 h-32 rounded-full bg-low-gold/10 absolute"
                  />
                )}
              </div>
            )}
            
            {step === 3 ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full space-y-4 relative z-10">
                <div className="flex justify-center mb-2">
                  <label className="w-20 h-20 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/20 flex items-center justify-center relative cursor-pointer overflow-hidden">
                    {tempAvatar ? <img src={tempAvatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="text-cyan-blue" size={32} strokeWidth={1.5} />}
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-mutton-white rounded-full border-[1px] border-silver-gray/20 flex items-center justify-center shadow-sm">
                      <Scan size={10} className="text-cyan-blue" />
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                  </label>
                </div>
                <div>
                  <label className="block text-[10px] text-silver-gray tracking-widest mb-1">昵称</label>
                  <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} className="w-full p-3 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue text-sm tracking-widest focus:outline-none focus:border-cyan-blue" />
                </div>
                <div>
                  <label className="block text-[10px] text-silver-gray tracking-widest mb-1">身份标签</label>
                  <input type="text" value={tempTag} onChange={e => setTempTag(e.target.value)} className="w-full p-3 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue text-sm tracking-widest focus:outline-none focus:border-cyan-blue" />
                </div>
                <div>
                  <label className="block text-[10px] text-silver-gray tracking-widest mb-1">个人简介</label>
                  <textarea rows={2} value={tempBio} onChange={e => setTempBio(e.target.value)} className="w-full p-3 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue text-sm tracking-widest focus:outline-none focus:border-cyan-blue resize-none"></textarea>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="w-28 h-28 bg-mutton-white rounded-full shadow-[0_8px_30px_rgba(184,161,114,0.15)] flex items-center justify-center relative z-10 border-[0.5px] border-low-gold/40">
                  {step === 4 ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <CheckCircle2 className="w-12 h-12 text-low-gold" strokeWidth={1.5} />
                    </motion.div>
                  ) : (
                    <Scan className={`w-12 h-12 text-cyan-blue ${step === 2 ? 'animate-pulse' : ''}`} strokeWidth={1.5} />
                  )}
                </div>
                
                <p className="mt-8 text-sm text-cyan-blue tracking-[0.2em] font-serif relative z-10">
                  {step === 1 ? '准备激活票证' : step === 2 ? '正在识别...' : '激活成功'}
                </p>
                {step === 2 && (
                  <p className="text-[9px] text-silver-gray tracking-widest font-mono mt-2 uppercase">Reading NFC Data</p>
                )}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 w-full p-4 border-[0.5px] border-silver-gray/20 bg-mutton-white rounded-sm shadow-sm space-y-3 relative z-10">
                    <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-3">
                      <span className="text-[10px] text-silver-gray tracking-widest uppercase">Talisman ID / 票证编号</span>
                      <span className="text-sm text-cyan-blue font-mono tracking-wider">CA-8492</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-silver-gray tracking-widest uppercase">Identity Tag / 身份标签</span>
                      <span className="text-[10px] text-low-gold bg-low-gold/10 px-3 py-1 rounded-sm tracking-widest border-[0.5px] border-low-gold/30">{tempTag}</span>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* 底部操作区 */}
          <div className="mt-auto space-y-3 relative z-20 shrink-0">
            {step === 1 && (
              <>
                <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.3em] text-sm rounded-sm shadow-xl active:scale-[0.97] transition-all font-bold uppercase font-mono">
                  开始识别
                </button>
                <button className="w-full py-2 text-silver-gray tracking-[0.2em] text-[10px] rounded-sm active:scale-[0.98] transition-transform">
                  无法识别？查看帮助
                </button>
              </>
            )}
            {step === 2 && (
              <div className="w-full py-4 bg-transparent border-[1px] border-silver-gray/20 text-silver-gray tracking-[0.3em] text-sm rounded-sm flex items-center justify-center gap-3 uppercase font-mono cursor-not-allowed">
                <div className="w-4 h-4 border-2 border-silver-gray/30 border-t-silver-gray rounded-full animate-spin"></div>
                <span>VERIFYING...</span>
              </div>
            )}
            {step === 3 && (
              <button onClick={() => setStep(4)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.3em] text-sm rounded-sm shadow-xl active:scale-[0.97] transition-all font-bold uppercase font-mono">
                确认信息
              </button>
            )}
            {step === 4 && (
              <button onClick={() => onComplete(tempTag, tempName, tempBio, tempAvatar)} className="w-full py-4 bg-low-gold text-mutton-white tracking-[0.3em] text-sm rounded-sm shadow-xl active:scale-[0.97] transition-all font-bold uppercase font-mono">
                Enter Changan / 进入首页
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Flow B: Check-in
const CheckInFlow = ({ onClose, spot }: { onClose: () => void, spot: any }) => {
  const [step, setStep] = useState(1);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <motion.div 
        initial={{ y: '100%', opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        exit={{ y: '100%', opacity: 0 }} 
        transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
        className="w-full max-w-[420px] h-[90vh] bg-[var(--color-bg-base)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col relative"
      >
        <div className="p-6 flex justify-between items-center shrink-0">
          <span className="font-mono text-[10px] text-silver-gray tracking-widest uppercase">Check-in Flow</span>
          <button onClick={onClose} className="p-2 -mr-2 hover:bg-silver-gray/5 rounded-full transition-colors">
            <X size={24} className="text-silver-gray" />
          </button>
        </div>
        
        {step === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center overflow-y-auto">
            <div className="relative mb-8">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-cyan-blue/20 rounded-full blur-2xl"
              />
              <MapPin className="w-16 h-16 text-cyan-blue relative z-10 animate-bounce" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-2xl text-cyan-blue mb-3 tracking-widest">到达点位：{spot?.name || '未知点位'}</h2>
            <p className="text-silver-gray text-xs tracking-[0.2em] leading-loose mb-8">请使用手机 NFC 轻触感应区<br/>解锁文物信息</p>
            <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform font-bold">
              [模拟] NFC 轻触
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col p-6 pt-0 overflow-y-auto">
            {/* 顶部区域 */}
            <div className="text-center mb-8 mt-2">
              <span className="font-mono text-[10px] text-low-gold tracking-[0.3em] uppercase mb-2 block">Check-in Complete</span>
              <h2 className="font-serif text-3xl text-cyan-blue mb-2 tracking-[0.2em]">打卡成功</h2>
              <p className="text-silver-gray text-[10px] tracking-[0.2em] uppercase font-mono">已完成当前点位记录</p>
            </div>

            {/* 结果反馈区 - 票证印章感 */}
            <div className="relative w-full border-[0.5px] border-silver-gray/30 bg-mutton-white rounded-sm p-6 mb-8 shadow-sm">
              {/* 装饰角 */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-[0.5px] border-l-[0.5px] border-cyan-blue/40"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-[0.5px] border-r-[0.5px] border-cyan-blue/40"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[0.5px] border-l-[0.5px] border-cyan-blue/40"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[0.5px] border-r-[0.5px] border-cyan-blue/40"></div>
              
              {/* 印章 */}
              <motion.div 
                initial={{ scale: 2, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="absolute -top-4 -right-2 w-16 h-16 border-2 border-stamp-red/60 rounded-full flex items-center justify-center text-stamp-red/60 font-serif text-lg font-bold shadow-sm mix-blend-multiply"
              >
                <div className="w-14 h-14 border-[1px] border-stamp-red/40 rounded-full flex items-center justify-center">
                  <span className="tracking-widest" style={{ writingMode: 'vertical-rl' }}>已阅</span>
                </div>
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-1.5 h-1.5 bg-low-gold rounded-full"></span>
                  <span className="text-[10px] text-silver-gray tracking-widest uppercase font-mono">{spot?.type === 'relic' ? '文物打卡点' : '讲解屏解锁点'}</span>
                </div>
                <h3 className="font-serif text-xl text-cyan-blue tracking-widest mb-4">{spot?.name || '未知点位'}</h3>
                <div className="flex items-center justify-between border-t-[0.5px] border-silver-gray/20 pt-4">
                  <span className="text-[10px] text-silver-gray tracking-widest">当前状态</span>
                  <span className="text-[10px] text-cyan-blue tracking-widest font-medium bg-cyan-blue/5 px-2 py-1 rounded-sm">已完成</span>
                </div>
              </div>
            </div>

            {/* 解锁内容区 */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <h4 className="font-serif text-sm text-cyan-blue tracking-widest">解锁进度</h4>
                <span className="text-[10px] text-silver-gray font-mono">3 / 8</span>
              </div>
              
              {/* 进度条 */}
              <div className="h-1 w-full bg-silver-gray/10 rounded-full overflow-hidden mb-4">
                <motion.div 
                  initial={{ width: '25%' }}
                  animate={{ width: '37.5%' }}
                  transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-low-gold"
                />
              </div>

              {/* 解锁卡片 */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-cyan-blue text-mutton-white p-4 rounded-sm flex items-start gap-4 shadow-md"
              >
                <div className="w-12 h-12 bg-mutton-white/10 rounded-sm flex items-center justify-center shrink-0 border-[0.5px] border-mutton-white/20">
                  <Award className="w-6 h-6 text-low-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] text-low-gold tracking-widest uppercase border-[0.5px] border-low-gold/30 px-1.5 py-0.5 rounded-sm">新徽章</span>
                    <span className="text-[10px] text-mutton-white/60 tracking-widest">已加入纪念册</span>
                  </div>
                  <h5 className="font-serif text-sm tracking-widest mb-1">{spot?.relic || '文物徽章'}</h5>
                  <p className="text-[10px] text-mutton-white/60 tracking-widest leading-relaxed line-clamp-2">
                    {spot?.description || '成功解锁该点位的专属纪念徽章与详细文物说明。'}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* 下一步引导区 */}
            <div className="mt-auto space-y-3 shrink-0">
              <button onClick={onClose} className="w-full py-4 bg-low-gold text-mutton-white tracking-[0.3em] text-sm rounded-sm shadow-xl active:scale-[0.97] transition-all font-bold uppercase font-mono">
                前往下一个点位
              </button>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3 border-[0.5px] border-silver-gray/30 text-cyan-blue tracking-[0.2em] text-[10px] rounded-sm active:scale-[0.97] transition-all bg-mutton-white">
                  返回地图
                </button>
                <button onClick={onClose} className="flex-1 py-3 border-[0.5px] border-silver-gray/30 text-cyan-blue tracking-[0.2em] text-[10px] rounded-sm active:scale-[0.97] transition-all bg-mutton-white">
                  查看纪念册
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

// Flow C: Match
const MatchFlow = ({ onClose, tag, onComplete }: { onClose: () => void, tag: string, onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => setStep(2), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-blue/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-[420px] bg-mutton-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* 一、合符确认页 */}
        {step === 1 && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            {/* 顶部区域 */}
            <div className="flex justify-between items-start p-6 pb-4 border-b-[0.5px] border-silver-gray/20 shrink-0">
              <div>
                <span className="font-mono text-[10px] text-low-gold tracking-[0.3em] uppercase mb-1 block">Match Confirmation</span>
                <h2 className="font-serif text-2xl text-cyan-blue tracking-widest mb-1">合符确认</h2>
                <p className="text-[10px] text-silver-gray tracking-widest">已检测到双鱼拼合</p>
              </div>
              <button onClick={onClose} className="p-2 -mr-2 text-silver-gray hover:text-cyan-blue transition-colors rounded-full hover:bg-silver-gray/10">
                <X size={20} />
              </button>
            </div>

            {/* 核心视觉区 */}
            <div className="flex-1 flex items-center justify-center relative p-6 min-h-[260px]">
              {/* 契约边框装饰 */}
              <div className="absolute inset-6 border-[0.5px] border-silver-gray/20 rounded-sm pointer-events-none">
                <div className="absolute top-0 left-0 w-2 h-2 border-t-[0.5px] border-l-[0.5px] border-cyan-blue/40"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-[0.5px] border-r-[0.5px] border-cyan-blue/40"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[0.5px] border-l-[0.5px] border-cyan-blue/40"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[0.5px] border-r-[0.5px] border-cyan-blue/40"></div>
              </div>

              <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center">
                {/* 仪式感背景 */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-[0.5px] border-low-gold/30 rounded-full border-dashed"
                />
                <div className="absolute inset-4 border-[0.5px] border-cyan-blue/10 rounded-full" />
                
                {/* 拼合动画 */}
                <div className="relative w-28 h-28">
                  <motion.div
                    animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1.05 } : { x: -24, y: 12, rotate: -25 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="absolute inset-0 z-20"
                  >
                    <TwinFishLeft className="w-full h-full text-cyan-blue drop-shadow-md" />
                  </motion.div>
                  
                  <motion.div
                    animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1.05 } : { x: 24, y: -12, rotate: 25 }}
                    transition={{ type: "spring", stiffness: 250, damping: 18 }}
                    className="absolute inset-0 z-20"
                  >
                    <TwinFishRight className="w-full h-full text-low-gold drop-shadow-md" />
                  </motion.div>

                  {/* 拼合时的光效 */}
                  <AnimatePresence>
                    {isVerifying && (
                      <>
                        {/* 瞬间的强光闪烁 (闪烁一次) */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 2] }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="absolute inset-0 bg-low-gold/40 rounded-full blur-xl z-10"
                        />
                        {/* 白光爆闪增强契约感 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.9, 0] }}
                          transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                          className="absolute inset-[-20px] bg-mutton-white rounded-full blur-md z-30 pointer-events-none"
                        />
                        {/* 拼合后的稳定微光 */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className="absolute inset-0 bg-low-gold/20 rounded-full blur-xl z-10"
                        />
                      </>
                    )}
                  </AnimatePresence>
                </div>

                {/* 装饰文字 */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-mutton-white px-3 border-[0.5px] border-stamp-red/30 z-30">
                  <span className="font-serif text-[10px] text-stamp-red tracking-[0.3em]">契</span>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-mutton-white px-3 border-[0.5px] border-stamp-red/30 z-30">
                  <span className="font-serif text-[10px] text-stamp-red tracking-[0.3em]">合</span>
                </div>
              </div>
            </div>

            {/* 对象信息区 */}
            <div className="px-6 pb-6 shrink-0">
              <div className="bg-mutton-white border-[0.5px] border-silver-gray/30 p-5 rounded-sm shadow-sm relative overflow-hidden">
                {/* 票证边缘装饰 (CSS 模拟锯齿) */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPjxjaXJjbGUgY3g9IjQiIGN5PSIwIiByPSIyIiBmaWxsPSIjZjRmNGY0Ii8+PC9zdmc+')] opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjQiPjxjaXJjbGUgY3g9IjQiIGN5PSI0IiByPSIyIiBmaWxsPSIjZjRmNGY0Ii8+PC9zdmc+')] opacity-50"></div>
                
                {/* 待确认印章 */}
                <div className="absolute -right-4 -top-4 w-16 h-16 border-[1px] border-stamp-red/20 rounded-full flex items-center justify-center transform rotate-12">
                  <div className="w-12 h-12 border-[0.5px] border-stamp-red/20 rounded-full flex items-center justify-center">
                    <span className="font-serif text-[10px] text-stamp-red/40 tracking-widest" style={{ writingMode: 'vertical-rl' }}>待确认</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-3 mb-3 relative z-10">
                  <span className="text-[10px] text-silver-gray tracking-widest">对象身份</span>
                  <span className="text-xs text-cyan-blue font-serif tracking-widest">{tag || '同游搭子'}</span>
                </div>
                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-3 mb-3 relative z-10">
                  <span className="text-[10px] text-silver-gray tracking-widest">所属活动</span>
                  <span className="text-[10px] text-cyan-blue tracking-widest">陕西历史博物馆导览</span>
                </div>
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[10px] text-silver-gray tracking-widest">合符状态</span>
                  <span className="text-[10px] text-low-gold tracking-widest flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-low-gold animate-pulse"></span>
                    待双方确认
                  </span>
                </div>
              </div>
              <p className="text-[9px] text-silver-gray/80 text-center mt-4 tracking-widest leading-relaxed">
                确认后将建立本次活动关系记录，<br/>并解锁专属纪念内容。
              </p>
            </div>

            {/* 确认操作区 */}
            <div className="p-6 pt-0 shrink-0 space-y-2">
              <button 
                onClick={handleVerify}
                disabled={isVerifying}
                className={`w-full py-4 tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-3 rounded-sm font-bold
                  ${isVerifying ? 'bg-silver-gray/10 text-silver-gray cursor-not-allowed' : 'bg-cyan-blue text-mutton-white shadow-lg active:scale-[0.98]'}`}
              >
                {isVerifying ? (
                  <>
                    <div className="w-3 h-3 border-[1.5px] border-silver-gray/30 border-t-silver-gray rounded-full animate-spin"></div>
                    <span>确认中...</span>
                  </>
                ) : (
                  '确认合符'
                )}
              </button>
              <button 
                onClick={onClose}
                disabled={isVerifying}
                className="w-full py-3 text-silver-gray/70 tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-colors hover:bg-silver-gray/5 hover:text-cyan-blue bg-transparent"
              >
                返回稍后再说
              </button>
            </div>
          </div>
        )}

        {/* 二、合符成功页 */}
        {step === 2 && (
          <div className="flex-1 flex flex-col h-full overflow-y-auto">
            {/* 顶部区域 */}
            <div className="flex justify-between items-start p-6 pb-4 border-b-[0.5px] border-silver-gray/20 shrink-0">
              <div>
                <span className="font-mono text-[10px] text-low-gold tracking-[0.3em] uppercase mb-1 block">Match Success</span>
                <h2 className="font-serif text-2xl text-cyan-blue tracking-widest mb-1">合符成功</h2>
                <p className="text-[10px] text-silver-gray tracking-widest">本次活动关系记录已建立</p>
              </div>
              <button onClick={onClose} className="p-2 -mr-2 text-silver-gray hover:text-cyan-blue transition-colors rounded-full hover:bg-silver-gray/10">
                <X size={20} />
              </button>
            </div>

            {/* 成功反馈区 */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 relative min-h-[240px]">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
                className="relative z-10 mb-6"
              >
                <div className="w-20 h-20 border-[1.5px] border-low-gold rounded-full flex items-center justify-center bg-low-gold/5 shadow-[0_0_20px_rgba(184,161,114,0.2)]">
                  <Check className="w-8 h-8 text-low-gold" strokeWidth={2} />
                </div>
              </motion.div>
              
              <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center opacity-80">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 z-20">
                    <TwinFishLeft className="w-full h-full text-cyan-blue drop-shadow-sm" />
                  </div>
                  <div className="absolute inset-0 z-20">
                    <TwinFishRight className="w-full h-full text-low-gold drop-shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* 结果信息区 */}
            <div className="px-6 pb-6 shrink-0">
              <div className="bg-mutton-white border-[0.5px] border-silver-gray/20 p-5 rounded-sm shadow-sm relative">
                <div className="absolute top-0 right-0 w-12 h-12 border-b-[0.5px] border-l-[0.5px] border-stamp-red/20 rounded-bl-full flex items-center justify-center bg-stamp-red/5">
                  <span className="font-serif text-[10px] text-stamp-red/60 transform rotate-45 translate-x-1 -translate-y-1">已立契</span>
                </div>
                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-3 mb-3">
                  <span className="text-[10px] text-silver-gray tracking-widest">匹配对象</span>
                  <span className="text-xs text-cyan-blue font-serif tracking-widest">{tag || '同游搭子'}</span>
                </div>
                <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-3 mb-3">
                  <span className="text-[10px] text-silver-gray tracking-widest">当前状态</span>
                  <span className="text-[10px] text-cyan-blue tracking-widest font-medium">已完成</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-silver-gray tracking-widest">已解锁</span>
                  <span className="text-[10px] text-low-gold tracking-widest">专属纪念页 / 合符条目</span>
                </div>
              </div>
              <p className="text-[9px] text-silver-gray/80 text-center mt-4 tracking-widest">
                本次合符记录已同步至数字纪念页，可在活动结束后保存与分享。
              </p>
            </div>

            {/* 下一步操作区 */}
            <div className="p-6 pt-0 shrink-0 space-y-3">
              <button 
                onClick={onComplete}
                className="w-full py-4 bg-low-gold text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform font-bold"
              >
                查看数字纪念页
              </button>
              <button 
                onClick={onClose}
                className="w-full py-3 border-[0.5px] border-silver-gray/30 text-cyan-blue tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform bg-mutton-white"
              >
                返回首页继续探索
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const PeerDiscoveryFlow = ({ onClose, onGoToMatch, onGoToSettings }: { onClose: () => void, onGoToMatch: () => void, onGoToSettings: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-blue/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-[420px] bg-mutton-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* 顶部区域 */}
        <div className="flex justify-between items-start p-6 pb-4 border-b-[0.5px] border-silver-gray/20 shrink-0">
          <div>
            <span className="font-mono text-[10px] text-low-gold tracking-[0.3em] uppercase mb-1 block">Peer Discovery</span>
            <h2 className="font-serif text-2xl text-cyan-blue tracking-widest mb-1">附近发现同好</h2>
            <p className="text-[10px] text-silver-gray tracking-widest">已检测到可能存在的同活动对象</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-silver-gray hover:text-cyan-blue transition-colors rounded-full hover:bg-silver-gray/10">
            <X size={20} />
          </button>
        </div>

        {/* 状态信息区 */}
        <div className="px-6 py-4 flex gap-4 border-b-[0.5px] border-silver-gray/10 bg-silver-gray/5 shrink-0">
          <div className="flex-1">
            <span className="text-[9px] text-silver-gray tracking-widest block mb-1">感应状态</span>
            <span className="text-xs text-cyan-blue tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-low-gold rounded-full animate-pulse"></span>
              已开启 (震动提示)
            </span>
          </div>
          <div className="w-[0.5px] bg-silver-gray/20"></div>
          <div className="flex-1">
            <span className="text-[9px] text-silver-gray tracking-widest block mb-1">当前活动</span>
            <span className="text-xs text-cyan-blue tracking-widest">陕西历史博物馆导览</span>
          </div>
        </div>

        {/* 核心感应区 */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-6 overflow-hidden min-h-[240px]">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* 渐进式扩散线条 */}
            {[1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ 
                  scale: [0.5, 1.5, 2.5], 
                  opacity: [0, 0.2, 0] 
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  delay: i * 1,
                  ease: "easeOut"
                }}
                className="absolute w-32 h-32 border-[0.5px] border-low-gold rounded-full"
              />
            ))}
            
            {/* 核心微光 */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-40 h-40 bg-low-gold/20 rounded-full blur-2xl"
            />
          </div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 mx-auto border-[0.5px] border-low-gold/40 rounded-full flex items-center justify-center bg-mutton-white/50 backdrop-blur-sm">
              <Radio size={24} className="text-low-gold animate-pulse" />
            </div>
            <div>
              <p className="font-serif text-lg text-cyan-blue tracking-widest mb-2">已进入发现区</p>
              <p className="text-xs text-silver-gray tracking-widest leading-relaxed">
                附近存在可互动对象<br/>建议主动靠近并准备拼合鱼符
              </p>
            </div>
          </div>
        </div>

        {/* 弱身份提示区 */}
        <div className="px-6 pb-6 shrink-0">
          <div className="bg-mutton-white border-[0.5px] border-silver-gray/20 p-4 rounded-sm shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-blue/30"></div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 bg-cyan-blue/5 text-cyan-blue text-[10px] tracking-widest rounded-sm border-[0.5px] border-cyan-blue/10">
                同活动对象
              </span>
              <span className="px-2.5 py-1 bg-cyan-blue/5 text-cyan-blue text-[10px] tracking-widest rounded-sm border-[0.5px] border-cyan-blue/10">
                标签相近
              </span>
              <span className="px-2.5 py-1 bg-cyan-blue/5 text-cyan-blue text-[10px] tracking-widest rounded-sm border-[0.5px] border-cyan-blue/10">
                路线相近
              </span>
            </div>
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="p-6 pt-0 shrink-0 space-y-3">
          <button 
            onClick={onGoToMatch}
            className="w-full py-4 bg-cyan-blue text-mutton-white text-sm tracking-[0.2em] rounded-sm shadow-md active:scale-[0.98] transition-transform font-bold"
          >
            我已找到对方，去合符确认
          </button>
          <button 
            onClick={onGoToSettings}
            className="w-full py-3 border-[0.5px] border-silver-gray/30 text-silver-gray tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform bg-mutton-white"
          >
            管理感应设置
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Sub Views ---
const FullScreenView = ({ title, subtitle, onClose, children }: { title: string, subtitle?: string, onClose: () => void, children: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-4"
  >
    <motion.div 
      initial={{ y: '100%', opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      exit={{ y: '100%', opacity: 0 }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
      className="w-full max-w-[420px] h-[90vh] bg-[var(--color-bg-base)] rounded-[28px] shadow-2xl overflow-hidden flex flex-col relative"
    >
      <div className="p-6 pt-8 flex justify-between items-start bg-mutton-white border-b-[0.5px] border-silver-gray/10 shrink-0">
        <div>
          {subtitle && <span className="font-mono text-[10px] text-low-gold tracking-[0.3em] uppercase mb-1 block">{subtitle}</span>}
          <h2 className="font-serif text-2xl text-cyan-blue tracking-widest">{title}</h2>
        </div>
        <button onClick={onClose} className="p-2 -mr-2 hover:bg-silver-gray/5 rounded-full transition-colors">
          <X size={24} className="text-silver-gray" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const InstructionsView = ({ onClose }: { onClose: () => void }) => (
  <FullScreenView title="活动说明" subtitle="Instructions" onClose={onClose}>
    <div className="p-6 space-y-6 text-sm text-silver-gray tracking-widest leading-loose">
      <p>1. 领取实体鱼符：在指定地点领取您的专属半枚鱼符。</p>
      <p>2. 碰一碰激活：使用手机 NFC 触碰鱼符，激活您的数字身份。</p>
      <p>3. 探索打卡：前往地图上的推荐点位，再次使用 NFC 触碰感应区，解锁文物并收集徽章。</p>
      <p>4. 寻找契合：遇到持有另一半鱼符的同好，将两枚鱼符物理拼合，触发双鱼感应，生成完整的长安合同。</p>
    </div>
  </FullScreenView>
);

const RelicDetailsView = ({ spot, onClose }: { spot: any, onClose: () => void }) => (
  <FullScreenView title="印记详情" subtitle="Relic Details" onClose={onClose}>
    <div className="p-6 flex flex-col items-center">
      <div className="w-32 h-32 rounded-full bg-low-gold/10 border-[2px] border-low-gold/40 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(184,161,114,0.2)] overflow-hidden">
        {spot?.badgeIcon ? (
          <img src={spot.badgeIcon} alt={spot?.relic} className="w-full h-full object-cover" />
        ) : (
          <Ticket size={48} className="text-low-gold" />
        )}
      </div>
      <h3 className="font-serif text-2xl text-cyan-blue tracking-widest mb-2">{spot?.relic}</h3>
      <p className="text-xs text-silver-gray tracking-widest uppercase font-mono mb-8">Official Souvenir Stamp</p>
      
      <div className="w-full bg-mutton-white border-[0.5px] border-silver-gray/20 p-6 rounded-sm shadow-sm space-y-4">
        <div>
          <p className="text-[10px] text-silver-gray tracking-widest mb-1">来源点位</p>
          <p className="text-sm text-cyan-blue tracking-widest font-medium">{spot?.name}</p>
        </div>
        <div className="w-full h-[0.5px] bg-silver-gray/20"></div>
        <div>
          <p className="text-[10px] text-silver-gray tracking-widest mb-2">印记故事</p>
          <p className="text-xs text-cyan-blue/80 tracking-widest leading-relaxed">
            这枚印记代表了你在长安之旅中的一次重要探索。它不仅是数字纪念，更是你与这座城市历史连接的证明。
          </p>
        </div>
      </div>
    </div>
  </FullScreenView>
);

const SpotDetailsView = ({ spot, onClose, onCheckIn }: { spot: any, onClose: () => void, onCheckIn: () => void }) => {
  const bgImage = spot?.id === 1 ? 'https://openaccess-cdn.clevelandart.org/1983.24/1983.24_web.jpg' : `https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop&seed=${spot?.name}`;

  return (
  <FullScreenView title="点位详情" subtitle="Spot Details" onClose={onClose}>
    <div className="w-full h-64 bg-cyan-blue relative">
      <img src={bgImage} className="absolute inset-0 w-full h-full object-contain opacity-80 mix-blend-luminosity" alt={spot?.name} referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-bg-base)]"></div>
    </div>
    <div className="p-6 -mt-12 relative z-10">
      <div className="bg-mutton-white p-6 rounded-sm shadow-md border-[1px] border-silver-gray/10 mb-6">
        <h2 className="font-serif text-2xl text-cyan-blue tracking-widest mb-2">{spot?.name}</h2>
        <p className="text-xs text-silver-gray tracking-widest mb-6">关联文物：{spot?.relic}</p>
        <p className="text-sm text-silver-gray tracking-widest leading-loose mb-8">
          这里是关于{spot?.name}的详细介绍。探索这座历史遗迹，感受长安的厚重底蕴。
        </p>
        {spot?.status === '未打卡' ? (
          <button onClick={onCheckIn} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
            前往打卡
          </button>
        ) : (
          <div className="w-full py-4 bg-silver-gray/10 text-silver-gray tracking-[0.2em] text-sm rounded-sm text-center">
            已完成探索
          </div>
        )}
      </div>
    </div>
  </FullScreenView>
)};

const EditProfileView = ({ nickname, bio, tag, avatar, onSave, onClose }: { nickname: string, bio: string, tag: string, avatar: string | null, onSave: (n: string, b: string, t: string, a: string | null) => void, onClose: () => void }) => {
  const [tempName, setTempName] = useState(nickname);
  const [tempBio, setTempBio] = useState(bio);
  const [tempTag, setTempTag] = useState(tag);
  const [tempAvatar, setTempAvatar] = useState(avatar);
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
  <FullScreenView title="编辑个人信息" subtitle="Edit Profile" onClose={onClose}>
    <div className="p-6 space-y-6">
      <div className="flex justify-center mb-8">
        <label className="w-24 h-24 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/20 flex items-center justify-center relative cursor-pointer overflow-hidden">
          {tempAvatar ? <img src={tempAvatar} alt="avatar" className="w-full h-full object-cover" /> : <User className="text-cyan-blue" size={40} strokeWidth={1.5} />}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-mutton-white rounded-full border-[1px] border-silver-gray/20 flex items-center justify-center shadow-sm">
            <Scan size={14} className="text-cyan-blue" />
          </div>
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </label>
      </div>
      <div>
        <label className="block text-xs text-silver-gray tracking-widest mb-2">昵称</label>
        <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} className="w-full p-4 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue tracking-widest focus:outline-none focus:border-cyan-blue" />
      </div>
      <div>
        <label className="block text-xs text-silver-gray tracking-widest mb-2">身份标签</label>
        <input type="text" value={tempTag} onChange={e => setTempTag(e.target.value)} className="w-full p-4 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue tracking-widest focus:outline-none focus:border-cyan-blue" />
      </div>
      <div>
        <label className="block text-xs text-silver-gray tracking-widest mb-2">个人简介</label>
        <textarea rows={3} value={tempBio} onChange={e => setTempBio(e.target.value)} className="w-full p-4 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue tracking-widest focus:outline-none focus:border-cyan-blue resize-none"></textarea>
      </div>
      <button onClick={() => { onSave(tempName, tempBio, tempTag, tempAvatar); onClose(); }} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform mt-8">
        保存更改
      </button>
    </div>
  </FullScreenView>
)};

const IdentityTagView = ({ tag, onSave, onClose }: { tag: string, onSave: (t: string) => void, onClose: () => void }) => {
  const [tempTag, setTempTag] = useState(tag);
  const tags = ['汉服同袍', '文创收集控', '历史考据党', '博物馆打卡', '国风摄影', '长安原住民'];

  return (
  <FullScreenView title="身份标签" subtitle="Identity Tag" onClose={onClose}>
    <div className="p-6 flex flex-col items-center justify-center h-full min-h-[60vh]">
      <div className="w-48 h-48 rounded-full border-[1px] border-dashed border-cyan-blue/30 flex items-center justify-center mb-8 relative">
        <div className="absolute inset-2 rounded-full border-[1px] border-cyan-blue/10"></div>
        <h2 className="font-serif text-3xl text-cyan-blue tracking-[0.2em]">{tempTag || '未设置'}</h2>
      </div>
      
      <div className="w-full mb-8">
        <p className="text-xs text-silver-gray tracking-widest mb-4 text-center">选择新的身份标签</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setTempTag(t)}
              className={`px-4 py-2 text-xs tracking-widest rounded-sm border-[0.5px] transition-colors ${
                tempTag === t 
                  ? 'bg-cyan-blue text-mutton-white border-cyan-blue' 
                  : 'bg-mutton-white text-silver-gray border-silver-gray/30 hover:border-cyan-blue/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => { onSave(tempTag); onClose(); }} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform mt-auto">
        保存标签
      </button>
    </div>
  </FullScreenView>
)};

const HistoricalTicketsView = ({ onClose, onOpenTicket }: { onClose: () => void, onOpenTicket: () => void }) => (
  <FullScreenView title="历史票证" subtitle="Historical Tickets" onClose={onClose}>
    <div className="p-6 space-y-4 bg-silver-gray/5 min-h-full">
      {[
        { date: '2025.10.01', tag: '汉服同袍', id: 'CA-7721', title: '大唐遗宝展' },
        { date: '2025.05.18', tag: '馆展同好', id: 'CA-3309', title: '长安十二时辰' },
      ].map((ticket, i) => (
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          key={i} 
          onClick={onOpenTicket} 
          className="relative bg-mutton-white rounded-sm shadow-sm border-[0.5px] border-silver-gray/20 cursor-pointer overflow-hidden flex"
        >
          {/* Left Stub */}
          <div className="w-12 bg-cyan-blue/5 border-r-[1.5px] border-dashed border-silver-gray/20 flex flex-col items-center justify-center py-4 relative shrink-0">
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#f4f4f5] rounded-full border-b-[0.5px] border-l-[0.5px] border-silver-gray/20 z-10"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#f4f4f5] rounded-full border-t-[0.5px] border-l-[0.5px] border-silver-gray/20 z-10"></div>
            <Ticket size={16} className="text-cyan-blue/40 mb-2" />
            <span className="font-mono text-[8px] text-cyan-blue/60 tracking-widest" style={{ writingMode: 'vertical-rl' }}>{ticket.id}</span>
          </div>
          
          {/* Right Content */}
          <div className="flex-1 p-5 flex justify-between items-center">
            <div>
              <h4 className="font-serif text-base text-cyan-blue tracking-widest mb-1">{ticket.title}</h4>
              <p className="text-[10px] text-silver-gray tracking-widest font-mono uppercase">{ticket.date}</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <span className="text-[10px] text-stamp-red tracking-widest border-[0.5px] border-stamp-red/20 bg-stamp-red/5 px-2 py-1 rounded-sm mb-2 inline-block font-serif">{ticket.tag}</span>
              <div className="flex items-center gap-1 text-silver-gray">
                <span className="text-[9px] tracking-widest uppercase font-mono">View</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </FullScreenView>
);

const ShareCardView = ({ tag, hasMatched, spots, onClose }: { tag: string, hasMatched: boolean, spots: any[], onClose: () => void }) => (
  <FullScreenView title="数字纪念页" subtitle="Digital Souvenir" onClose={onClose}>
    <div className="p-6 flex flex-col items-center h-full">
      <div className="w-full flex-1 flex items-center justify-center">
        <div className="w-full transform scale-95 origin-center">
          <TicketCard tag={tag} hasMatched={hasMatched} spots={spots} />
        </div>
      </div>
      <div className="w-full mt-8 space-y-4 pb-6">
        <button className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
          保存纪念页
        </button>
        <button onClick={onClose} className="w-full py-4 border-[1px] border-cyan-blue/30 text-cyan-blue tracking-[0.2em] text-sm rounded-sm active:scale-[0.98] transition-transform bg-mutton-white">
          分享纪念卡片
        </button>
      </div>
    </div>
  </FullScreenView>
);

const SensingSettingsView = ({ onClose }: { onClose: () => void }) => {
  const [sensingEnabled, setSensingEnabled] = useState(true);
  const [isDiscoverable, setIsDiscoverable] = useState(true);
  const [notificationMode, setNotificationMode] = useState<'vibrate' | 'silent'>('vibrate');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan-blue/40 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-[420px] bg-mutton-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* 顶部区域 */}
        <div className="flex justify-between items-start p-6 pb-4 border-b-[0.5px] border-silver-gray/20 shrink-0">
          <div>
            <h2 className="font-serif text-xl text-cyan-blue tracking-widest mb-1">同好感应设置</h2>
            <p className="text-[10px] text-silver-gray tracking-widest">管理附近同活动对象的发现与提示方式</p>
          </div>
          <button onClick={onClose} className="p-2 -mr-2 text-silver-gray hover:text-cyan-blue transition-colors rounded-full hover:bg-silver-gray/10">
            <X size={20} />
          </button>
        </div>

        {/* 开关设置区 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 1. 同好感应 */}
          <div className="flex justify-between items-center">
            <div className="pr-4">
              <span className="text-sm tracking-widest text-cyan-blue block mb-1">同好感应</span>
              <span className="text-[10px] tracking-widest text-silver-gray leading-relaxed block">开启后，系统会在近距范围内提示可能存在的同活动对象</span>
            </div>
            <button 
              onClick={() => setSensingEnabled(!sensingEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${sensingEnabled ? 'bg-low-gold' : 'bg-silver-gray/30'}`}
            >
              <div className={`w-5 h-5 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${sensingEnabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          
          {/* 2. 可被发现 */}
          <div className="flex justify-between items-center">
            <div className="pr-4">
              <span className="text-sm tracking-widest text-cyan-blue block mb-1">可被发现</span>
              <span className="text-[10px] tracking-widest text-silver-gray leading-relaxed block">开启后，你也会被其他已开启感应的用户发现</span>
            </div>
            <button 
              onClick={() => setIsDiscoverable(!isDiscoverable)}
              className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${isDiscoverable ? 'bg-low-gold' : 'bg-silver-gray/30'}`}
            >
              <div className={`w-5 h-5 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${isDiscoverable ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>

          {/* 3. 提示方式 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm tracking-widest text-cyan-blue">提示方式</span>
            <div className="flex bg-silver-gray/10 rounded-sm p-1">
              <button 
                onClick={() => setNotificationMode('silent')}
                className={`px-4 py-1.5 text-[10px] tracking-widest rounded-sm transition-colors ${notificationMode === 'silent' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
              >
                静默提示
              </button>
              <button 
                onClick={() => setNotificationMode('vibrate')}
                className={`px-4 py-1.5 text-[10px] tracking-widest rounded-sm transition-colors ${notificationMode === 'vibrate' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
              >
                震动提示
              </button>
            </div>
          </div>

          {/* 4. 生效范围 */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-sm tracking-widest text-cyan-blue">生效范围</span>
            <span className="text-[10px] tracking-widest text-silver-gray bg-silver-gray/5 px-3 py-1.5 rounded-sm border-[0.5px] border-silver-gray/10">仅本次活动开启</span>
          </div>

          {/* 说明区 */}
          <div className="bg-cyan-blue/5 border-[0.5px] border-cyan-blue/10 p-4 rounded-sm mt-6">
            <p className="text-[10px] text-cyan-blue/80 tracking-widest leading-relaxed">
              系统只提供近距范围内的弱提示，不显示精确距离。<br/>最终关系确认仍需通过实体鱼符拼合与近场验证完成。
            </p>
          </div>
        </div>

        {/* 底部操作区 */}
        <div className="p-6 pt-2 shrink-0 space-y-3">
          <button onClick={onClose} className="w-full py-3.5 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform font-bold">
            保存设置
          </button>
          <button onClick={onClose} className="w-full py-3 border-[0.5px] border-silver-gray/30 text-silver-gray tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform bg-mutton-white">
            取消
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [activeTab, setActiveTab] = useState<TabState>('home');
  const [activeFlow, setActiveFlow] = useState<FlowState>('none');
  const [subViewState, setSubViewState] = useState<SubViewState>('none');
  const [userTag, setUserTag] = useState(''); // Empty initially to show Activation flow
  const [nickname, setNickname] = useState('访客_8492');
  const [bio, setBio] = useState('对长安的历史充满好奇。');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);

  const [sensingEnabled, setSensingEnabled] = useState(true);

  const [spots, setSpots] = useState([
    { id: 1, name: '唐三彩女立俑', status: '未打卡', relic: '女立俑', badgeImage: 'https://openaccess-cdn.clevelandart.org/1983.24/1983.24_web.jpg', badgeIcon: '/sancai-badge.png' },
    { id: 2, name: '鎏金舞马衔杯纹银壶', status: '未打卡', relic: '舞马银壶' },
    { id: 3, name: '皇后之玺', status: '未打卡', relic: '皇后玺' },
  ]);

  const handleCheckInComplete = () => {
    if (selectedSpot) {
      setSpots(spots.map(s => s.id === selectedSpot.id ? { ...s, status: '已打卡' } : s));
    }
    setActiveFlow('none');
  };

  useEffect(() => {
    if (!hasInitialized) {
      if (!userTag) {
        setActiveFlow('activation');
      }
      setHasInitialized(true);
    }
  }, [hasInitialized, userTag]);

  return (
    <div className="max-w-md mx-auto h-screen shadow-2xl overflow-hidden relative bg-[var(--color-bg-base)] flex flex-col">
      {/* Main Tabs Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && <HomeTab onOpenFlow={setActiveFlow} onOpenSubView={setSubViewState} tag={userTag} hasMatched={hasMatched} spots={spots} sensingEnabled={sensingEnabled} onChangeTab={setActiveTab} />}
        {activeTab === 'map' && <MapTab onOpenFlow={setActiveFlow} onOpenSubView={setSubViewState} onSelectSpot={setSelectedSpot} spots={spots} />}
        {activeTab === 'commemoration' && <CommemorationTab tag={userTag} hasMatched={hasMatched} onOpenSubView={setSubViewState} onSelectSpot={setSelectedSpot} onOpenFlow={setActiveFlow} spots={spots} />}
        {activeTab === 'profile' && <ProfileTab tag={userTag} nickname={nickname} bio={bio} avatar={avatar} onOpenSubView={setSubViewState} sensingEnabled={sensingEnabled} setSensingEnabled={setSensingEnabled} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />

      {/* Independent Flows (Overlays) */}
      <AnimatePresence>
        {activeFlow === 'activation' && (
          <ActivationFlow onClose={() => setActiveFlow('none')} onComplete={(tag, n, b, a) => { 
            setUserTag(tag); 
            setNickname(n);
            setBio(b);
            if (a) setAvatar(a);
            setActiveFlow('none'); 
          }} />
        )}
        {activeFlow === 'checkin' && (
          <CheckInFlow onClose={handleCheckInComplete} spot={selectedSpot || spots[0]} />
        )}
        {activeFlow === 'match' && (
          <MatchFlow onClose={() => setActiveFlow('none')} tag={userTag} onComplete={() => { setHasMatched(true); setActiveFlow('none'); setActiveTab('commemoration'); }} />
        )}
        {activeFlow === 'peer-discovery' && (
          <PeerDiscoveryFlow onClose={() => setActiveFlow('none')} onGoToMatch={() => setActiveFlow('match')} onGoToSettings={() => { setActiveFlow('none'); setActiveTab('profile'); }} />
        )}
      </AnimatePresence>

      {/* Sub Views (Overlays) */}
      <AnimatePresence>
        {subViewState === 'instructions' && (
          <InstructionsView onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'spot-details' && (
          <SpotDetailsView spot={selectedSpot} onClose={() => setSubViewState('none')} onCheckIn={() => { setSubViewState('none'); setActiveFlow('checkin'); }} />
        )}
        {subViewState === 'edit-profile' && (
          <EditProfileView nickname={nickname} bio={bio} tag={userTag} avatar={avatar} onSave={(n, b, t, a) => { setNickname(n); setBio(b); setUserTag(t); setAvatar(a); }} onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'identity-tag' && (
          <IdentityTagView tag={userTag} onSave={setUserTag} onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'historical-tickets' && (
          <HistoricalTicketsView onClose={() => setSubViewState('none')} onOpenTicket={() => { setSubViewState('ticket-details'); }} />
        )}
        {subViewState === 'share-card' && (
          <ShareCardView tag={userTag} hasMatched={hasMatched} spots={spots} onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'ticket-details' && (
          <FullScreenView title="票证详情" subtitle="Ticket Details" onClose={() => setSubViewState('historical-tickets')}>
            <div className="p-6 flex flex-col items-center">
              <div className="w-full transform scale-95 origin-top">
                <TicketCard tag="汉服同袍" hasMatched={true} spots={spots} />
              </div>
              <div className="w-full mt-6 flex gap-4 px-2">
                <button className="flex-1 py-3 border-[0.5px] border-silver-gray/30 text-cyan-blue tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  <span>保存图片</span>
                </button>
                <button className="flex-1 py-3 bg-cyan-blue text-mutton-white tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md">
                  <span>分享票证</span>
                </button>
              </div>
            </div>
          </FullScreenView>
        )}
        {subViewState === 'sensing-settings' && (
          <SensingSettingsView onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'relic-details' && (
          <RelicDetailsView spot={selectedSpot} onClose={() => setSubViewState('none')} />
        )}
      </AnimatePresence>
    </div>
  );
}
