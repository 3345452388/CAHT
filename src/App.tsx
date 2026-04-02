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
type SubViewState = 'none' | 'instructions' | 'spot-details' | 'edit-profile' | 'historical-tickets' | 'share-card' | 'identity-tag' | 'ticket-details' | 'sensing-settings';

// --- Reusable Components ---
const TicketCard = ({ tag, hasMatched, spots }: { tag: string, hasMatched?: boolean, spots?: any[] }) => {
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
  const [barcode, setBarcode] = useState<number[]>([]);
  useEffect(() => {
    setBarcode(Array.from({ length: 24 }, () => Math.random() * 3 + 1));
  }, []);

  const completedSpots = spots?.filter(s => s.status === '已打卡') || [];

  return (
    <div className="w-full bg-mutton-white rounded-sm shadow-[0_8px_30px_rgba(28,43,45,0.12)] flex flex-col relative overflow-hidden border-[1px] border-low-gold/30">
      {/* Top Header Section */}
      <div className="p-6 pb-4 bg-[url('https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=400&auto=format&fit=crop')] bg-cover relative">
        <div className="absolute inset-0 bg-mutton-white/90 backdrop-blur-sm"></div>
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-stamp-red rounded-full"></div>
            <h3 className="font-serif text-lg text-cyan-blue tracking-[0.2em]">陕西历史博物馆导览</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest uppercase mb-1">SERIAL NO.</p>
            <p className="font-mono text-sm text-cyan-blue tracking-wider">CA-8492</p>
          </div>
        </div>
        <div className="mt-6 relative z-10 flex justify-between items-end">
          <div>
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Date / 日期</p>
            <p className="font-serif text-lg text-cyan-blue tracking-widest">{today}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Identity / 身份</p>
            <p className="font-serif text-lg text-cyan-blue tracking-widest">{tag || '同游搭子'}</p>
          </div>
        </div>
      </div>

      {/* Perforation Line */}
      <div className="h-4 relative bg-mutton-white flex items-center">
        <div className="absolute left-0 w-3 h-4 bg-[var(--color-bg-base)] rounded-r-full shadow-inner border-y-[1px] border-r-[1px] border-low-gold/30"></div>
        <div className="w-full border-t-[1.5px] border-dashed border-low-gold/40 mx-4"></div>
        <div className="absolute right-0 w-3 h-4 bg-[var(--color-bg-base)] rounded-l-full shadow-inner border-y-[1px] border-l-[1px] border-low-gold/30"></div>
      </div>

      {/* Middle Content Section */}
      <div className="p-6 pt-4 space-y-6 relative bg-mutton-white">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <TwinFishLeft className="w-48 h-48 text-cyan-blue" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div className="col-span-2 flex justify-between items-center border-b-[0.5px] border-silver-gray/20 pb-4">
            <div>
              <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1 uppercase">Match Status / 合符状态</p>
              <p className={`font-serif text-lg tracking-[0.2em] ${hasMatched ? 'text-stamp-red' : 'text-cyan-blue'}`}>
                {hasMatched ? '契约达成' : '等待合符'}
              </p>
            </div>
            {hasMatched && (
              <div className="w-12 h-12 border-[1.5px] border-stamp-red text-stamp-red flex items-center justify-center transform -rotate-12 opacity-80 mix-blend-multiply rounded-sm">
                <span className="font-serif text-sm leading-none tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>已合</span>
              </div>
            )}
          </div>
          
          <div className="col-span-2">
            <div className="flex justify-between items-end mb-3">
              <p className="font-mono text-[9px] text-silver-gray tracking-widest uppercase">Exploration / 探索进度</p>
              <p className="font-serif text-sm text-cyan-blue tracking-widest">{completedSpots.length} / {spots?.length || 0} 点位</p>
            </div>
            
            {/* Collected Badges */}
            <div className="flex flex-wrap gap-2">
              {completedSpots.length > 0 ? completedSpots.map((spot, i) => (
                <div key={i} className="px-2 py-1 border-[0.5px] border-low-gold/50 bg-low-gold/10 text-low-gold text-[10px] tracking-widest rounded-sm font-serif">
                  {spot.relic}
                </div>
              )) : (
                <p className="text-xs text-silver-gray tracking-widest font-serif">暂无收集印记</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Barcode Section */}
      <div className="p-6 pt-4 border-t-[1px] border-solid border-low-gold/20 flex justify-between items-end bg-low-gold/5 relative">
        <div className="flex flex-col gap-2">
          <div className="flex gap-[2px] h-10 opacity-60">
            {barcode.map((width, i) => (
              <div key={i} className="bg-cyan-blue rounded-sm" style={{ width: `${width}px` }}></div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-silver-gray tracking-widest">08492 77310 99214</p>
        </div>
        
        {/* Decorative Seal */}
        <div className="absolute right-6 bottom-6 w-16 h-16 border-[1px] border-low-gold/40 rounded-full flex items-center justify-center opacity-50">
          <div className="w-14 h-14 border-[0.5px] border-dashed border-low-gold/60 rounded-full flex items-center justify-center">
            <span className="font-serif text-xs text-low-gold tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>长安印</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Tabs ---
const HomeTab = ({ onOpenFlow, tag, hasMatched, spots, sensingEnabled, onChangeTab }: { onOpenFlow: (flow: FlowState) => void, tag: string, hasMatched: boolean, spots: any[], sensingEnabled: boolean, onChangeTab: (tab: TabState) => void }) => {
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24 space-y-6">
      {/* 一、顶部状态卡 */}
      <div className="bg-cyan-blue text-mutton-white p-8 rounded-sm shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-mutton-white/5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="mb-6">
            <p className="text-[10px] tracking-widest text-mutton-white/60 mb-1">当前活动名称</p>
            <h3 className="text-sm tracking-widest text-mutton-white">陕西历史博物馆导览</h3>
          </div>

          <div className="flex justify-between items-end mb-6">
            <div>
              <p className="text-[10px] tracking-widest text-mutton-white/60 mb-1">当前状态</p>
              <h2 className="font-serif text-3xl tracking-[0.2em]">{currentStatus}</h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest text-mutton-white/60 mb-1">票证编号</p>
              <span className="text-xs font-mono text-low-gold">NO. CA-8492</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] tracking-widest text-mutton-white/60 mb-1">当前身份标签</p>
            <span className="text-sm tracking-widest">{tag || '暂无标签'}</span>
          </div>

          <button onClick={primaryAction} className="w-full py-4 bg-low-gold text-cyan-blue text-sm tracking-[0.2em] rounded-sm font-medium shadow-md active:scale-[0.98] transition-transform flex justify-center items-center gap-2">
            {primaryActionText}
          </button>
        </div>
      </div>

      {/* 二、当前任务区 */}
      {tag && (
        <div className="bg-mutton-white border-[0.5px] border-silver-gray/30 p-5 rounded-sm shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-serif tracking-widest text-cyan-blue">当前路线进度</h3>
            <span className="text-xs font-mono text-silver-gray">{completedCount} / {totalSpots}</span>
          </div>
          <div className="w-full h-1 bg-silver-gray/10 rounded-full mb-6 overflow-hidden">
            <div className="h-full bg-cyan-blue transition-all duration-500" style={{ width: `${(completedCount / totalSpots) * 100}%` }}></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-blue/5 flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-cyan-blue" />
            </div>
            <div>
              <p className="text-[10px] text-silver-gray tracking-widest mb-1">下一个推荐点位</p>
              <p className="text-sm tracking-widest text-cyan-blue mb-1">{spots.find(s => s.status === '未打卡')?.name || '已全部完成'}</p>
              <p className="text-[10px] text-silver-gray tracking-widest">预计步行 5 分钟 · 可解锁专属徽章</p>
            </div>
          </div>
        </div>
      )}

      {/* 三、社交提示区 */}
      <div className="bg-mutton-white border-[0.5px] border-silver-gray/30 p-5 rounded-sm shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-serif tracking-widest text-cyan-blue flex items-center gap-2">
            <Radio size={16} className={sensingEnabled ? 'text-stamp-red' : 'text-silver-gray'} />
            同好感应
          </h3>
          <span className={`text-[10px] tracking-widest px-2 py-0.5 rounded-sm ${sensingEnabled ? 'bg-stamp-red/10 text-stamp-red' : 'bg-silver-gray/10 text-silver-gray'}`}>
            {sensingEnabled ? '感应中' : '已关闭'}
          </span>
        </div>
        <p className="text-xs text-silver-gray tracking-widest leading-relaxed mb-4">
          {sensingEnabled ? '附近存在 2 名可互动对象，建议保持关注。' : '开启感应以发现附近路线相近的同好。'}
        </p>
        <button onClick={() => onChangeTab('profile')} className="w-full py-3 bg-silver-gray/5 text-cyan-blue text-xs tracking-widest rounded-sm border-[0.5px] border-silver-gray/20 active:scale-[0.98] transition-transform">
          管理感应设置
        </button>
      </div>
    </motion.div>
  );
};

const MapTab = ({ onOpenFlow, onOpenSubView, onSelectSpot, spots }: { onOpenFlow: (flow: FlowState) => void, onOpenSubView: (view: SubViewState) => void, onSelectSpot: (spot: any) => void, spots: any[] }) => {
  const completedCount = spots.filter(s => s.status === '已打卡').length;
  const totalSpots = spots.length;
  
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24 flex flex-col min-h-full bg-mutton-white">
    {/* 一、顶部固定路线总览条 */}
    <div className="sticky top-0 z-30 bg-mutton-white/95 backdrop-blur-md border-b-[0.5px] border-silver-gray/20 p-6 shadow-sm">
      <p className="text-[10px] text-silver-gray tracking-widest mb-2">陕西历史博物馆导览</p>
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-serif text-xl tracking-[0.2em] text-cyan-blue">唐代主题路线 · 大唐遗宝展区</h2>
        <div className="text-right">
          <span className="text-[10px] text-silver-gray tracking-widest block mb-1">完成进度</span>
          <span className="text-sm font-mono text-cyan-blue">{completedCount} / {totalSpots}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-silver-gray/5 p-3 rounded-sm border-[0.5px] border-silver-gray/10">
        <div className={`w-2 h-2 rounded-full ${completedCount >= 2 ? 'bg-low-gold shadow-[0_0_8px_rgba(184,161,114,0.6)]' : 'bg-silver-gray/30'}`}></div>
        <span className="text-xs tracking-widest text-cyan-blue">
          {completedCount >= 2 ? '已解锁合符条件' : '需完成 2 个点位解锁合符'}
        </span>
      </div>
    </div>

    {/* 二、中部点位区 */}
    <div className="p-6 space-y-6 flex-1 relative pl-10">
      {/* 路线连接线 */}
      <div className="absolute left-[21px] top-12 bottom-12 w-[1px] bg-silver-gray/20 z-0"></div>

      {spots.map((spot, index) => {
        const isCompleted = spot.status === '已打卡';
        const isActive = spot.status === '未打卡' && index === completedCount;
        const isLocked = spot.status === '未打卡' && index > completedCount;

        let cardStyle = '';
        let statusText = '';
        let typeText = index % 2 === 0 ? '文物打卡点' : '讲解屏解锁点';
        let distanceText = '';

        if (isCompleted) {
          cardStyle = 'bg-cyan-blue/5 border-cyan-blue/10 opacity-60';
          statusText = '已完成';
          distanceText = '已打卡';
        } else if (isActive) {
          cardStyle = 'bg-mutton-white border-cyan-blue shadow-[0_4px_12px_rgba(28,43,45,0.08)] z-10';
          statusText = '已到达未打卡';
          distanceText = '距您约 5 米';
        } else {
          cardStyle = 'bg-mutton-white border-silver-gray/20 opacity-50';
          statusText = '未到达';
          distanceText = `预计步行 ${5 + (index - completedCount) * 3} 分钟`;
        }

        return (
          <div key={spot.id} className="relative z-10">
            {/* 路线节点 */}
            <div className={`absolute -left-[33px] top-6 w-4 h-4 rounded-full border-2 border-mutton-white flex items-center justify-center ${isCompleted ? 'bg-cyan-blue' : isActive ? 'bg-stamp-red animate-pulse' : 'bg-silver-gray/30'}`}>
              {isCompleted && <CheckCircle2 size={10} className="text-mutton-white" />}
            </div>

            <div className={`p-5 rounded-sm border-[1px] relative overflow-hidden transition-all duration-300 ${cardStyle}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className={`font-serif text-base tracking-widest mb-1 ${isActive ? 'text-cyan-blue font-bold' : 'text-cyan-blue'}`}>{spot.name}</h3>
                  <p className="text-[10px] text-silver-gray tracking-widest">{typeText} · {distanceText}</p>
                </div>
                <span className={`text-[10px] tracking-widest px-2 py-1 rounded-sm ${isCompleted ? 'bg-cyan-blue/10 text-cyan-blue' : isActive ? 'bg-stamp-red text-mutton-white' : 'bg-silver-gray/10 text-silver-gray'}`}>
                  {statusText}
                </span>
              </div>
              
              {isActive && (
                <button onClick={() => { onSelectSpot(spot); onOpenSubView('spot-details'); }} className="mt-4 w-full py-3 bg-cyan-blue text-mutton-white text-xs tracking-widest rounded-sm active:scale-[0.98] transition-transform flex justify-center items-center gap-2">
                  <Scan size={14} />
                  查看详情并打卡
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>

    {/* 三、底部提示区 */}
    <div className="px-6 pb-6">
      <div className="bg-silver-gray/5 border-[0.5px] border-silver-gray/20 p-4 rounded-sm text-center">
        <p className="text-[10px] text-silver-gray tracking-widest">完成指定点位后，可提升合符条件匹配度</p>
      </div>
    </div>
  </motion.div>
)};

const CommemorationTab = ({ tag, hasMatched, onOpenSubView, spots }: { tag: string, hasMatched: boolean, onOpenSubView: (view: SubViewState) => void, spots: any[] }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24">
    <header className="mb-6 pt-4">
      <h2 className="font-serif text-2xl tracking-[0.2em] text-cyan-blue">数字纪念</h2>
      <p className="text-silver-gray tracking-[0.2em] text-[10px] uppercase font-mono mt-1">Digital Souvenirs</p>
    </header>

    {/* Certificate Frame Style */}
    <div className="p-4 border-[0.5px] border-silver-gray/30 bg-mutton-white shadow-sm relative mb-8">
      {/* Decorative Corners */}
      <div className="absolute top-1 left-1 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-cyan-blue/50"></div>
      <div className="absolute top-1 right-1 w-3 h-3 border-t-[0.5px] border-r-[0.5px] border-cyan-blue/50"></div>
      <div className="absolute bottom-1 left-1 w-3 h-3 border-b-[0.5px] border-l-[0.5px] border-cyan-blue/50"></div>
      <div className="absolute bottom-1 right-1 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-cyan-blue/50"></div>

      {hasMatched ? (
        <div onClick={() => onOpenSubView('share-card')} className="cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]">
          <TicketCard tag={tag} hasMatched={hasMatched} spots={spots} />
          <p className="text-center text-[10px] text-silver-gray tracking-widest mt-4 flex items-center justify-center gap-1">
            <Scan size={10} /> 点击查看并分享专属契约
          </p>
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-silver-gray border-[0.5px] border-dashed border-silver-gray/30 m-2">
          <Ticket size={32} className="mb-4 opacity-50" />
          <p className="text-sm tracking-widest font-serif">完成合符后解锁契约卡</p>
        </div>
      )}
    </div>

    {/* 3.2 徽章与收集内容 - Stamp Style */}
    <div className="mb-8">
      <h3 className="font-serif text-sm text-cyan-blue tracking-widest mb-4 flex items-center gap-2">
        <span className="w-1 h-1 bg-low-gold rounded-full"></span>
        已获印记
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {spots.map((spot, i) => {
          const isCompleted = spot.status === '已打卡';
          return (
          <div key={i} className="aspect-square border-[0.5px] border-silver-gray/30 flex flex-col items-center justify-center gap-2 bg-mutton-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-5 mix-blend-multiply group-hover:opacity-10 transition-opacity"></div>
            <div className={`w-10 h-10 rounded-full border-[1px] flex items-center justify-center ${isCompleted ? 'border-stamp-red/40 text-stamp-red' : 'border-silver-gray/30 text-silver-gray opacity-30'}`}>
              <span className="font-serif text-xs" style={{ writingMode: 'vertical-rl' }}>{isCompleted ? spot.relic : '未获'}</span>
            </div>
          </div>
        )})}
      </div>
    </div>

    {/* 3.6 历史票证列表 */}
    <button 
      onClick={() => onOpenSubView('historical-tickets')}
      className="w-full py-4 border-[0.5px] border-silver-gray/30 text-cyan-blue text-sm tracking-widest flex justify-between items-center px-4 bg-mutton-white hover:bg-mutton-white/80 transition-colors"
    >
      <span className="font-serif">回看历史票证</span>
      <ChevronRight size={16} className="text-silver-gray" />
    </button>
  </motion.div>
);

const ProfileTab = ({ tag, nickname, bio, onOpenSubView, sensingEnabled, setSensingEnabled }: { tag: string, nickname: string, bio: string, onOpenSubView: (view: SubViewState) => void, sensingEnabled: boolean, setSensingEnabled: (v: boolean) => void }) => {
  const [isDiscoverable, setIsDiscoverable] = useState(true);
  const [notificationMode, setNotificationMode] = useState<'vibrate' | 'silent'>('vibrate');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24">
      <header className="mb-6 pt-4">
        <h2 className="font-serif text-2xl tracking-[0.2em] text-cyan-blue">身份与设备</h2>
        <p className="text-silver-gray tracking-[0.2em] text-[10px] uppercase font-mono mt-1">Identity & Device</p>
      </header>

      <div className="space-y-8">
        {/* 一、身份信息区 */}
        <section>
          <h3 className="font-serif text-sm text-cyan-blue tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-low-gold rounded-full"></span>
            身份信息
          </h3>
          <div onClick={() => onOpenSubView('edit-profile')} className="p-5 rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm flex items-center gap-4 relative cursor-pointer hover:border-cyan-blue/30 transition-colors">
            <div className="w-14 h-14 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/20 flex items-center justify-center shrink-0">
              <User className="text-cyan-blue" size={24} strokeWidth={1.5} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-serif text-lg tracking-[0.1em] text-cyan-blue">{nickname}</h4>
                <span className="text-[10px] tracking-widest text-low-gold bg-low-gold/10 px-2 py-0.5 rounded-sm border-[0.5px] border-low-gold/30">{tag || '未设置标签'}</span>
              </div>
              <p className="text-[10px] text-silver-gray tracking-widest font-mono">NO. CA-8492</p>
            </div>
            <ChevronRight className="text-silver-gray/40" size={16} />
          </div>
        </section>

        {/* 二、票证信息区 */}
        <section>
          <h3 className="font-serif text-sm text-cyan-blue tracking-widest mb-3 flex items-center gap-2">
            <span className="w-1 h-1 bg-low-gold rounded-full"></span>
            票证信息
          </h3>
          <div className="rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm overflow-hidden">
            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <span className="text-xs tracking-widest text-silver-gray">当前鱼符状态</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-xs tracking-widest text-cyan-blue">已激活</span>
              </div>
            </div>
            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <span className="text-xs tracking-widest text-silver-gray">当前活动</span>
              <span className="text-xs tracking-widest text-cyan-blue">陕西历史博物馆导览</span>
            </div>
            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <span className="text-xs tracking-widest text-silver-gray">历史票证</span>
              <span className="text-xs tracking-widest text-cyan-blue font-mono">2 张</span>
            </div>
            <button onClick={() => onOpenSubView('historical-tickets')} className="w-full p-4 flex justify-between items-center hover:bg-silver-gray/5 transition-colors text-left">
              <span className="text-xs tracking-widest text-cyan-blue">活动记录入口</span>
              <ChevronRight className="text-silver-gray/40" size={16} />
            </button>
          </div>
        </section>

        {/* 三、感应设置区 */}
        <section>
          <div className="flex justify-between items-end mb-3">
            <h3 className="font-serif text-sm text-cyan-blue tracking-widest flex items-center gap-2">
              <span className="w-1 h-1 bg-low-gold rounded-full"></span>
              感应设置
            </h3>
            <button onClick={() => onOpenSubView('sensing-settings')} className="text-[10px] text-cyan-blue tracking-widest flex items-center gap-1">
              <Settings size={12} /> 高级设置
            </button>
          </div>
          
          <div className="rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm overflow-hidden">
            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <div>
                <span className="text-xs tracking-widest text-cyan-blue block mb-1">同好感应</span>
                <span className="text-[9px] tracking-widest text-silver-gray">允许发现附近路线相近的同好</span>
              </div>
              <button 
                onClick={() => setSensingEnabled(!sensingEnabled)}
                className={`w-10 h-5 rounded-full transition-colors relative ${sensingEnabled ? 'bg-cyan-blue' : 'bg-silver-gray/30'}`}
              >
                <div className={`w-4 h-4 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${sensingEnabled ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </button>
            </div>
            
            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <div>
                <span className="text-xs tracking-widest text-cyan-blue block mb-1">可被发现</span>
                <span className="text-[9px] tracking-widest text-silver-gray">允许其他用户感应到你</span>
              </div>
              <button 
                onClick={() => setIsDiscoverable(!isDiscoverable)}
                className={`w-10 h-5 rounded-full transition-colors relative ${isDiscoverable ? 'bg-cyan-blue' : 'bg-silver-gray/30'}`}
              >
                <div className={`w-4 h-4 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${isDiscoverable ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
              </button>
            </div>

            <div className="p-4 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
              <span className="text-xs tracking-widest text-cyan-blue">提示方式</span>
              <div className="flex bg-silver-gray/10 rounded-sm p-0.5">
                <button 
                  onClick={() => setNotificationMode('vibrate')}
                  className={`px-3 py-1 text-[10px] tracking-widest rounded-sm transition-colors ${notificationMode === 'vibrate' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
                >
                  震动
                </button>
                <button 
                  onClick={() => setNotificationMode('silent')}
                  className={`px-3 py-1 text-[10px] tracking-widest rounded-sm transition-colors ${notificationMode === 'silent' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
                >
                  静默
                </button>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <span className="text-xs tracking-widest text-cyan-blue">生效范围</span>
              <span className="text-[10px] tracking-widest text-silver-gray bg-silver-gray/5 px-2 py-1 rounded-sm">仅本次活动</span>
            </div>
          </div>
        </section>
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
const ActivationFlow = ({ onClose, onComplete }: { onClose: () => void, onComplete: (tag: string) => void }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 1500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <span className="font-mono text-xs text-silver-gray tracking-widest uppercase">Activation</span>
        <button onClick={onClose}><X size={24} className="text-silver-gray" /></button>
      </div>
      
      {step === 1 && (
        <div className="flex-1 flex flex-col p-6">
          <div className="text-center mb-8 mt-4">
            <h2 className="font-serif text-3xl text-cyan-blue mb-3 tracking-[0.2em]">激活鱼符</h2>
            <p className="text-silver-gray text-xs tracking-[0.2em] uppercase font-mono">完成实体票证与数字身份绑定</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-blue text-mutton-white flex items-center justify-center text-xs font-mono">1</div>
              <span className="text-[10px] text-cyan-blue tracking-widest">靠近鱼符</span>
            </div>
            <div className="w-8 h-[1px] bg-silver-gray/30 mt-4"></div>
            <div className="flex flex-col items-center gap-2 opacity-30">
              <div className="w-8 h-8 rounded-full bg-silver-gray text-mutton-white flex items-center justify-center text-xs font-mono">2</div>
              <span className="text-[10px] text-silver-gray tracking-widest">读取身份</span>
            </div>
            <div className="w-8 h-[1px] bg-silver-gray/30 mt-4"></div>
            <div className="flex flex-col items-center gap-2 opacity-30">
              <div className="w-8 h-8 rounded-full bg-silver-gray text-mutton-white flex items-center justify-center text-xs font-mono">3</div>
              <span className="text-[10px] text-silver-gray tracking-widest">完成激活</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[200px] mb-8">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full border-[1px] border-cyan-blue/40 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="w-32 h-32 rounded-full border-[1px] border-cyan-blue/20 absolute"></div>
              <div className="w-40 h-40 rounded-full border-[1px] border-cyan-blue/10 absolute"></div>
            </div>
            <div className="w-24 h-24 bg-mutton-white rounded-full shadow-[0_0_30px_rgba(28,43,45,0.1)] flex items-center justify-center relative z-10 border-[0.5px] border-silver-gray/20">
              <Scan className="w-10 h-10 text-cyan-blue" strokeWidth={1.5} />
            </div>
            <p className="mt-16 text-xs text-cyan-blue tracking-widest font-serif relative z-10">等待感应...</p>
          </div>

          <div className="mt-auto space-y-4 relative z-20">
            <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
              开始识别
            </button>
            <button className="w-full py-4 text-silver-gray tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform">
              无法识别？查看帮助
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 rounded-full border-[2px] border-cyan-blue border-t-transparent animate-spin mb-8"></div>
          <h2 className="font-serif text-xl text-cyan-blue tracking-[0.2em] mb-2">正在读取身份</h2>
          <p className="text-xs text-silver-gray tracking-widest font-mono">READING DATA...</p>
        </div>
      )}

      {step === 3 && (
        <div className="flex-1 flex flex-col p-6">
          <div className="text-center mb-8 mt-4">
            <h2 className="font-serif text-3xl text-cyan-blue mb-3 tracking-[0.2em]">激活鱼符</h2>
            <p className="text-silver-gray text-xs tracking-[0.2em] uppercase font-mono">完成实体票证与数字身份绑定</p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-2 opacity-30">
              <div className="w-8 h-8 rounded-full bg-silver-gray text-mutton-white flex items-center justify-center text-xs font-mono">1</div>
              <span className="text-[10px] text-silver-gray tracking-widest">靠近鱼符</span>
            </div>
            <div className="w-8 h-[1px] bg-silver-gray/30 mt-4"></div>
            <div className="flex flex-col items-center gap-2 opacity-30">
              <div className="w-8 h-8 rounded-full bg-silver-gray text-mutton-white flex items-center justify-center text-xs font-mono">2</div>
              <span className="text-[10px] text-silver-gray tracking-widest">读取身份</span>
            </div>
            <div className="w-8 h-[1px] bg-silver-gray/30 mt-4"></div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-cyan-blue text-mutton-white flex items-center justify-center text-xs font-mono">3</div>
              <span className="text-[10px] text-cyan-blue tracking-widest">完成激活</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center mb-8">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="font-serif text-2xl text-cyan-blue tracking-[0.2em] mb-8">激活成功</h3>
            
            <div className="w-full p-6 border-[0.5px] border-silver-gray/20 bg-mutton-white rounded-sm shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b-[0.5px] border-silver-gray/10 pb-4">
                <span className="text-xs text-silver-gray tracking-widest">票证编号</span>
                <span className="text-sm text-cyan-blue font-mono tracking-wider">CA-8492</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-silver-gray tracking-widest">当前身份标签</span>
                <span className="text-xs text-low-gold bg-low-gold/10 px-3 py-1 rounded-sm tracking-widest border-[0.5px] border-low-gold/30">汉服同袍</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <button onClick={() => onComplete('汉服同袍')} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
              进入首页
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// Flow B: Check-in
const CheckInFlow = ({ onClose, spot }: { onClose: () => void, spot: any }) => {
  const [step, setStep] = useState(1);

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <span className="font-mono text-xs text-silver-gray tracking-widest">FLOW B: CHECK-IN</span>
        <button onClick={onClose}><X size={24} className="text-silver-gray" /></button>
      </div>
      
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <MapPin className="w-24 h-24 text-cyan-blue mb-8 animate-bounce" strokeWidth={1} />
          <h2 className="font-serif text-2xl text-cyan-blue mb-4 tracking-widest">到达点位：{spot?.name || '未知点位'}</h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose mb-12">请使用手机 NFC 轻触感应区<br/>解锁文物信息</p>
          <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
            [模拟] NFC 轻触
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col p-8">
          <div className="text-center mb-12 mt-8">
            <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-[0.2em]">打卡成功</h2>
            <p className="text-silver-gray text-xs tracking-[0.2em] uppercase font-mono">已完成当前点位记录</p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full p-6 border-[0.5px] border-silver-gray/20 bg-mutton-white rounded-sm shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('https://images.unsplash.com/photo-1615800098779-1be32e60cca3?q=80&w=200&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-multiply"></div>
              
              <div className="relative z-10">
                <h3 className="font-serif text-xl text-cyan-blue tracking-widest mb-1">{spot?.name || '未知点位'}</h3>
                <p className="text-[10px] text-silver-gray tracking-widest uppercase font-mono">{spot?.type === 'relic' ? '文物打卡点' : '讲解屏解锁点'}</p>
              </div>

              <div className="relative z-10 border-t-[0.5px] border-silver-gray/10 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-silver-gray tracking-widest">当前进度更新</span>
                  <span className="text-sm text-cyan-blue font-mono tracking-wider">1 / 5</span>
                </div>
                <div className="w-full h-1 bg-silver-gray/10 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-blue w-1/5"></div>
                </div>
              </div>

              <div className="relative z-10 border-t-[0.5px] border-silver-gray/10 pt-4">
                <span className="text-xs text-silver-gray tracking-widest block mb-3">新解锁内容</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full border-[1px] border-low-gold/50 bg-low-gold/5 flex items-center justify-center text-low-gold">
                    <span className="font-serif text-xs" style={{ writingMode: 'vertical-rl' }}>{spot?.relic || '印记'}</span>
                  </div>
                  <div>
                    <p className="text-sm text-cyan-blue tracking-widest mb-1">专属文物印记</p>
                    <p className="text-[10px] text-silver-gray tracking-widest">已存入数字纪念页</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 w-16 h-16 border-[1.5px] border-stamp-red text-stamp-red flex items-center justify-center transform -rotate-12 opacity-80 mix-blend-multiply rounded-sm">
                <span className="font-serif text-sm leading-none tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>已阅</span>
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-4">
            <button onClick={onClose} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
              前往下一个点位
            </button>
            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-4 border-[1px] border-silver-gray/20 text-cyan-blue tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform">
                返回地图
              </button>
              <button onClick={onClose} className="flex-1 py-4 border-[1px] border-silver-gray/20 text-cyan-blue tracking-[0.2em] text-xs rounded-sm active:scale-[0.98] transition-transform">
                查看纪念收集
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// Flow C: Match
const MatchFlow = ({ onClose, tag, onComplete }: { onClose: () => void, tag: string, onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => setStep(2), 3000);
  };

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
      {/* 一、顶部标题区 */}
      <div className="p-6 pt-12 flex justify-between items-center bg-mutton-white border-b-[1px] border-silver-gray/10 shrink-0 shadow-sm z-10">
        <div>
          <h2 className="font-serif text-2xl text-cyan-blue tracking-widest">合符确认</h2>
          <p className="font-mono text-[10px] text-stamp-red tracking-widest mt-1 uppercase">已检测到双鱼拼合</p>
        </div>
        <button onClick={onClose} className="p-2 -mr-2"><X size={24} className="text-silver-gray" /></button>
      </div>
      
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-between p-8 overflow-y-auto">
          {/* 二、核心视觉区 */}
          <div className="relative w-full max-w-[300px] aspect-square mt-4 flex items-center justify-center shrink-0">
            {/* 契约感背景 */}
            <div className="absolute inset-0 border-[1px] border-low-gold/30 rounded-sm rotate-45 scale-75"></div>
            <div className="absolute inset-0 border-[1px] border-cyan-blue/10 rounded-full"></div>
            <div className="absolute inset-4 border-[1px] border-low-gold/20 rounded-full border-dashed"></div>
            
            {/* 印章感装饰 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mutton-white px-2">
              <span className="font-serif text-xs text-stamp-red tracking-widest">契</span>
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-mutton-white px-2">
              <span className="font-serif text-xs text-stamp-red tracking-widest">合</span>
            </div>

            <motion.div
              animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : { x: [-20, -22, -20], y: [10, 12, 10], rotate: [-10, -12, -10], scale: 0.95, opacity: 0.9 }}
              transition={isVerifying ? { type: "spring", stiffness: 400, damping: 12, mass: 0.8 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 origin-center"
            >
              <TwinFishLeft className="w-full h-full text-cyan-blue drop-shadow-md" />
            </motion.div>
            
            <motion.div
              animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : { x: [20, 22, 20], y: [-10, -12, -10], rotate: [10, 12, 10], scale: 0.95, opacity: 0.9 }}
              transition={isVerifying ? { type: "spring", stiffness: 400, damping: 12, mass: 0.8 } : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 origin-center"
            >
              <TwinFishRight className="w-full h-full text-low-gold drop-shadow-md" />
            </motion.div>

            <AnimatePresence>
              {isVerifying && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-10 rounded-full bg-low-gold mix-blend-screen pointer-events-none blur-xl"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVerifying && (
                <motion.div
                  initial={{ top: '10%', opacity: 0 }}
                  animate={{ top: '90%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-[10%] right-[10%] h-[1px] bg-low-gold shadow-[0_0_10px_rgba(184,161,114,0.8)] z-10"
                />
              )}
            </AnimatePresence>
          </div>

          {/* 三、对象信息区 */}
          <div className="w-full mt-10 mb-8 bg-mutton-white border-[1px] border-silver-gray/20 p-6 rounded-sm shadow-sm relative shrink-0">
            <div className="absolute -top-3 left-6 bg-mutton-white px-2">
              <span className="font-mono text-[10px] text-silver-gray tracking-widest uppercase">Target Info</span>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b-[1px] border-silver-gray/10 pb-3">
                <span className="text-xs text-silver-gray tracking-widest">匹配对象</span>
                <span className="text-sm text-cyan-blue font-serif tracking-widest">{tag || '同游搭子'}</span>
              </div>
              <div className="flex justify-between items-center border-b-[1px] border-silver-gray/10 pb-3">
                <span className="text-xs text-silver-gray tracking-widest">所属活动</span>
                <span className="text-sm text-cyan-blue font-serif tracking-widest">陕西历史博物馆导览</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-silver-gray tracking-widest">当前状态</span>
                <span className="text-xs text-stamp-red tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-stamp-red animate-pulse"></span>
                  等待双方确认
                </span>
              </div>
            </div>
          </div>

          {/* 四、操作区 */}
          <div className="w-full space-y-4 mt-auto shrink-0">
            <button 
              onClick={handleVerify}
              disabled={isVerifying}
              className={`w-full py-4 tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4 rounded-sm shadow-md
                ${isVerifying ? 'bg-transparent border-[1px] border-silver-gray/20 text-silver-gray cursor-not-allowed' : 'bg-cyan-blue text-mutton-white active:scale-[0.98]'}`}
            >
              {isVerifying ? (
                <span className="font-mono text-xs">VERIFYING CONTRACT...</span>
              ) : (
                '确认合符'
              )}
            </button>
            <button 
              onClick={onClose}
              disabled={isVerifying}
              className="w-full py-4 border-[1px] border-silver-gray/20 text-silver-gray tracking-[0.2em] text-sm rounded-sm active:scale-[0.98] transition-transform bg-transparent"
            >
              返回稍后再说
            </button>
          </div>
        </div>
      )}

      {/* 五、结果反馈态 */}
      {step === 2 && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* 成功背景装饰 */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-96 h-96 border-[1px] border-low-gold/10 rounded-full"></div>
            <div className="absolute w-64 h-64 border-[1px] border-low-gold/20 rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <CheckCircle2 className="w-20 h-20 text-low-gold mb-6" strokeWidth={1} />
          </motion.div>
          
          <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-widest">合符成功</h2>
          
          <div className="bg-mutton-white border-[1px] border-low-gold/30 p-6 rounded-sm shadow-sm mb-12 relative z-10 w-full max-w-[280px]">
            <p className="text-sm text-cyan-blue tracking-widest leading-loose mb-2 font-serif">
              契约已生成
            </p>
            <p className="text-xs text-silver-gray tracking-widest leading-loose">
              已解锁专属纪念内容<br/>
              您与 {tag || '同游搭子'} 的长安记忆已封存
            </p>
          </div>

          <button onClick={onComplete} className="w-full py-4 bg-low-gold text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform relative z-10">
            去查看数字纪念页
          </button>
        </div>
      )}
    </motion.div>
  )
}

const PeerDiscoveryFlow = ({ onClose, onGoToMatch, onGoToSettings }: { onClose: () => void, onGoToMatch: () => void, onGoToSettings: () => void }) => {
  const [isSensing, setIsSensing] = useState(true);
  const [sensingStage, setSensingStage] = useState(0); // 0: searching, 1: entered zone, 2: approaching

  useEffect(() => {
    if (isSensing) {
      const timer1 = setTimeout(() => setSensingStage(1), 2000);
      const timer2 = setTimeout(() => setSensingStage(2), 5000);
      return () => { clearTimeout(timer1); clearTimeout(timer2); };
    } else {
      setSensingStage(0);
    }
  }, [isSensing]);

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
      {/* 一、顶部状态区 */}
      <div className="p-6 flex justify-between items-center bg-mutton-white border-b-[1px] border-silver-gray/10 shrink-0 shadow-sm z-10">
        <div>
          <h2 className="font-serif text-xl text-cyan-blue tracking-widest">附近发现同好</h2>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isSensing ? 'bg-stamp-red animate-pulse' : 'bg-silver-gray'}`}></span>
              <span className="text-[10px] text-silver-gray tracking-widest">{isSensing ? '感应已开启' : '感应已关闭'}</span>
            </div>
            <span className="text-[10px] text-silver-gray/30">|</span>
            <span className="text-[10px] text-silver-gray tracking-widest">震动提示模式</span>
          </div>
        </div>
        <button onClick={onClose} className="p-2 -mr-2"><X size={24} className="text-silver-gray" /></button>
      </div>

      {/* 二、核心提示区 */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative overflow-hidden">
        <div className="relative w-64 h-64 flex items-center justify-center mb-8">
          {/* 基础圆环 */}
          <div className="absolute inset-0 border-[0.5px] border-silver-gray/20 rounded-full"></div>
          <div className="absolute inset-8 border-[0.5px] border-silver-gray/10 rounded-full"></div>
          <div className="absolute inset-16 border-[0.5px] border-silver-gray/5 rounded-full"></div>

          {/* 扫描动画 */}
          {isSensing && sensingStage === 0 && (
            <>
              <motion.div animate={{ scale: [1, 2, 3], opacity: [0.8, 0.3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }} className="absolute inset-24 bg-cyan-blue/10 rounded-full" />
              <motion.div animate={{ scale: [1, 2, 3], opacity: [0.8, 0.3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }} className="absolute inset-24 bg-cyan-blue/10 rounded-full" />
            </>
          )}

          {/* 发现动画 */}
          {isSensing && sensingStage > 0 && (
            <>
              <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-10 bg-stamp-red/5 rounded-full" />
              <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute inset-16 bg-stamp-red/5 rounded-full" />
            </>
          )}

          {/* 中心图标 */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center z-10 transition-colors duration-500 ${sensingStage > 0 ? 'bg-stamp-red/10 border-[1px] border-stamp-red/30 shadow-[0_0_15px_rgba(186,76,64,0.2)]' : 'bg-cyan-blue/5 border-[1px] border-cyan-blue/20'}`}>
            <Radio size={24} className={sensingStage > 0 ? 'text-stamp-red' : 'text-cyan-blue'} />
          </div>
        </div>

        <div className="text-center h-20">
          <AnimatePresence mode="wait">
            {sensingStage === 0 ? (
              <motion.div key="stage0" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-sm text-cyan-blue tracking-widest mb-2 font-serif">正在感应环境</p>
                <p className="text-xs text-silver-gray tracking-widest">请保持设备亮屏</p>
              </motion.div>
            ) : sensingStage === 1 ? (
              <motion.div key="stage1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-base text-stamp-red tracking-widest mb-2 font-serif">已进入发现区</p>
                <p className="text-xs text-cyan-blue tracking-widest">附近存在可互动对象</p>
              </motion.div>
            ) : (
              <motion.div key="stage2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <p className="text-lg text-stamp-red tracking-widest mb-2 font-serif">目标正在接近</p>
                <p className="text-xs text-cyan-blue tracking-widest">建议主动靠近并准备拼合鱼符</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 三、弱身份提示区 */}
        <AnimatePresence>
          {sensingStage > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 bg-mutton-white border-[0.5px] border-silver-gray/20 p-5 rounded-sm shadow-sm w-full max-w-[280px]">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-silver-gray/10 flex items-center justify-center">
                  <User size={14} className="text-silver-gray" />
                </div>
                <div>
                  <p className="text-xs text-cyan-blue tracking-widest font-medium">同活动对象</p>
                  <p className="text-[10px] text-silver-gray tracking-widest mt-0.5">未确认前不显示详细资料</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] tracking-widest px-2 py-1 bg-cyan-blue/5 text-cyan-blue rounded-sm">标签相近</span>
                <span className="text-[10px] tracking-widest px-2 py-1 bg-cyan-blue/5 text-cyan-blue rounded-sm">路线相近</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 四、底部动作 */}
      <div className="p-6 space-y-4 bg-mutton-white border-t-[1px] border-silver-gray/10 shrink-0">
        <button 
          onClick={onGoToMatch}
          disabled={sensingStage === 0}
          className={`w-full py-4 tracking-[0.2em] text-sm transition-all duration-500 rounded-sm shadow-md flex justify-center items-center gap-2
            ${sensingStage > 0 ? 'bg-cyan-blue text-mutton-white active:scale-[0.98]' : 'bg-silver-gray/10 text-silver-gray/50 cursor-not-allowed'}`}
        >
          {sensingStage > 0 ? '我已找到对方，去合符确认' : '等待感应...'}
        </button>
        <button onClick={onGoToSettings} className="w-full py-4 border-[1px] border-silver-gray/20 text-cyan-blue tracking-[0.2em] text-sm rounded-sm active:scale-[0.98] transition-transform bg-mutton-white">
          去管理感应设置
        </button>
      </div>
    </motion.div>
  );
};

// --- Sub Views ---
const FullScreenView = ({ title, subtitle, onClose, children }: { title: string, subtitle?: string, onClose: () => void, children: React.ReactNode }) => (
  <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
    <div className="p-6 pt-12 flex justify-between items-center bg-mutton-white border-b-[1px] border-silver-gray/10 shrink-0">
      <div>
        <h2 className="font-serif text-xl text-cyan-blue tracking-widest">{title}</h2>
        {subtitle && <p className="font-mono text-[10px] text-silver-gray tracking-widest uppercase mt-1">{subtitle}</p>}
      </div>
      <button onClick={onClose} className="p-2 -mr-2"><X size={24} className="text-silver-gray" /></button>
    </div>
    <div className="flex-1 overflow-y-auto">
      {children}
    </div>
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

const SpotDetailsView = ({ spot, onClose, onCheckIn }: { spot: any, onClose: () => void, onCheckIn: () => void }) => (
  <FullScreenView title="点位详情" subtitle="Spot Details" onClose={onClose}>
    <div className="w-full h-64 bg-cyan-blue relative">
      <img src={`https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop&seed=${spot?.name}`} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity" alt={spot?.name} referrerPolicy="no-referrer" />
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
);

const EditProfileView = ({ nickname, bio, onSave, onClose }: { nickname: string, bio: string, onSave: (n: string, b: string) => void, onClose: () => void }) => {
  const [tempName, setTempName] = useState(nickname);
  const [tempBio, setTempBio] = useState(bio);

  return (
  <FullScreenView title="编辑个人信息" subtitle="Edit Profile" onClose={onClose}>
    <div className="p-6 space-y-6">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/20 flex items-center justify-center relative">
          <User className="text-cyan-blue" size={40} strokeWidth={1.5} />
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-mutton-white rounded-full border-[1px] border-silver-gray/20 flex items-center justify-center shadow-sm">
            <Scan size={14} className="text-cyan-blue" />
          </div>
        </div>
      </div>
      <div>
        <label className="block text-xs text-silver-gray tracking-widest mb-2">昵称</label>
        <input type="text" value={tempName} onChange={e => setTempName(e.target.value)} className="w-full p-4 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue tracking-widest focus:outline-none focus:border-cyan-blue" />
      </div>
      <div>
        <label className="block text-xs text-silver-gray tracking-widest mb-2">个人简介</label>
        <textarea rows={3} value={tempBio} onChange={e => setTempBio(e.target.value)} className="w-full p-4 bg-mutton-white border-[1px] border-silver-gray/20 rounded-sm text-cyan-blue tracking-widest focus:outline-none focus:border-cyan-blue resize-none"></textarea>
      </div>
      <button onClick={() => { onSave(tempName, tempBio); onClose(); }} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform mt-8">
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
    <div className="p-6 space-y-4">
      {[
        { date: '2025.10.01', tag: '汉服同袍', id: 'CA-7721' },
        { date: '2025.05.18', tag: '馆展同好', id: 'CA-3309' },
      ].map((ticket, i) => (
        <div key={i} onClick={onOpenTicket} className="p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center cursor-pointer hover:border-cyan-blue/30 transition-colors">
          <div>
            <h4 className="font-serif text-md text-cyan-blue tracking-widest mb-1">长安合同</h4>
            <p className="text-xs text-silver-gray tracking-widest font-mono">{ticket.date}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-silver-gray tracking-widest bg-silver-gray/5 px-3 py-1 rounded-sm mb-2 inline-block">{ticket.tag}</span>
            <p className="text-[10px] text-silver-gray tracking-widest font-mono">NO. {ticket.id}</p>
          </div>
        </div>
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
    <FullScreenView title="同好感应设置" subtitle="Sensing Settings" onClose={onClose}>
      <div className="p-6 space-y-8">
        <div className="rounded-sm border-[0.5px] border-silver-gray/20 bg-mutton-white shadow-sm overflow-hidden">
          <div className="p-5 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
            <div>
              <span className="text-sm tracking-widest text-cyan-blue block mb-1">同好感应</span>
              <span className="text-[10px] tracking-widest text-silver-gray">允许发现附近路线相近的同好</span>
            </div>
            <button 
              onClick={() => setSensingEnabled(!sensingEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${sensingEnabled ? 'bg-cyan-blue' : 'bg-silver-gray/30'}`}
            >
              <div className={`w-5 h-5 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${sensingEnabled ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>
          
          <div className="p-5 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
            <div>
              <span className="text-sm tracking-widest text-cyan-blue block mb-1">可被发现</span>
              <span className="text-[10px] tracking-widest text-silver-gray">允许其他用户感应到你</span>
            </div>
            <button 
              onClick={() => setIsDiscoverable(!isDiscoverable)}
              className={`w-12 h-6 rounded-full transition-colors relative ${isDiscoverable ? 'bg-cyan-blue' : 'bg-silver-gray/30'}`}
            >
              <div className={`w-5 h-5 bg-mutton-white rounded-full absolute top-0.5 transition-transform ${isDiscoverable ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
            </button>
          </div>

          <div className="p-5 border-b-[0.5px] border-silver-gray/10 flex justify-between items-center">
            <span className="text-sm tracking-widest text-cyan-blue">提示方式</span>
            <div className="flex bg-silver-gray/10 rounded-sm p-1">
              <button 
                onClick={() => setNotificationMode('vibrate')}
                className={`px-4 py-1.5 text-xs tracking-widest rounded-sm transition-colors ${notificationMode === 'vibrate' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
              >
                震动
              </button>
              <button 
                onClick={() => setNotificationMode('silent')}
                className={`px-4 py-1.5 text-xs tracking-widest rounded-sm transition-colors ${notificationMode === 'silent' ? 'bg-mutton-white text-cyan-blue shadow-sm' : 'text-silver-gray'}`}
              >
                静默
              </button>
            </div>
          </div>

          <div className="p-5 flex justify-between items-center">
            <span className="text-sm tracking-widest text-cyan-blue">生效范围</span>
            <span className="text-xs tracking-widest text-silver-gray bg-silver-gray/5 px-3 py-1 rounded-sm border-[0.5px] border-silver-gray/10">仅本次活动</span>
          </div>
        </div>

        <div className="bg-cyan-blue/5 border-[0.5px] border-cyan-blue/20 p-4 rounded-sm flex gap-3 items-start">
          <Radio className="text-cyan-blue shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-cyan-blue/80 tracking-widest leading-relaxed">
            系统仅在近距范围内提示可能存在的同活动对象，最终关系确认仍需完成实体拼合。
          </p>
        </div>
      </div>
    </FullScreenView>
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
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [hasMatched, setHasMatched] = useState(false);

  const [sensingEnabled, setSensingEnabled] = useState(true);

  const [spots, setSpots] = useState([
    { id: 1, name: '镶金兽首玛瑙杯', status: '未打卡', relic: '玛瑙杯' },
    { id: 2, name: '鎏金舞马衔杯纹银壶', status: '已打卡', relic: '舞马银壶' },
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
        {activeTab === 'home' && <HomeTab onOpenFlow={setActiveFlow} tag={userTag} hasMatched={hasMatched} spots={spots} sensingEnabled={sensingEnabled} onChangeTab={setActiveTab} />}
        {activeTab === 'map' && <MapTab onOpenFlow={setActiveFlow} onOpenSubView={setSubViewState} onSelectSpot={setSelectedSpot} spots={spots} />}
        {activeTab === 'commemoration' && <CommemorationTab tag={userTag} hasMatched={hasMatched} onOpenSubView={setSubViewState} spots={spots} />}
        {activeTab === 'profile' && <ProfileTab tag={userTag} nickname={nickname} bio={bio} onOpenSubView={setSubViewState} sensingEnabled={sensingEnabled} setSensingEnabled={setSensingEnabled} />}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onChange={setActiveTab} />

      {/* Independent Flows (Overlays) */}
      <AnimatePresence>
        {activeFlow === 'activation' && (
          <ActivationFlow onClose={() => setActiveFlow('none')} onComplete={(tag) => { setUserTag(tag); setActiveFlow('none'); }} />
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
          <EditProfileView nickname={nickname} bio={bio} onSave={(n, b) => { setNickname(n); setBio(b); }} onClose={() => setSubViewState('none')} />
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
            <div className="p-6">
              <TicketCard tag="汉服同袍" hasMatched={true} spots={spots} />
            </div>
          </FullScreenView>
        )}
        {subViewState === 'sensing-settings' && (
          <SensingSettingsView onClose={() => setSubViewState('none')} />
        )}
      </AnimatePresence>
    </div>
  );
}
