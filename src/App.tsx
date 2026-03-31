import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Map as MapIcon, Ticket, User, Scan, MapPin, Award, ChevronRight, Users, BookOpen, X, CheckCircle2 } from 'lucide-react';

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
type FlowState = 'none' | 'activation' | 'checkin' | 'match';
type SubViewState = 'none' | 'instructions' | 'spot-details' | 'edit-profile' | 'historical-tickets' | 'share-card' | 'identity-tag' | 'ticket-details';

// --- Reusable Components ---
const TicketCard = ({ tag }: { tag: string }) => {
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');
  const [barcode, setBarcode] = useState<number[]>([]);
  useEffect(() => {
    setBarcode(Array.from({ length: 24 }, () => Math.random() * 3 + 1));
  }, []);

  return (
    <div className="w-full bg-mutton-white rounded-sm shadow-[0_4px_20px_rgba(28,43,45,0.08)] flex flex-col relative overflow-hidden border-[0.5px] border-silver-gray/30">
      {/* Top Header Section */}
      <div className="p-6 pb-4 bg-cyan-blue/5 border-b-[1px] border-dashed border-silver-gray/30 relative">
        <div className="flex justify-between items-start relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-stamp-red rounded-full"></div>
            <h3 className="font-serif text-lg text-cyan-blue tracking-[0.2em]">长安合同</h3>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest uppercase mb-1">SERIAL NO.</p>
            <p className="font-mono text-sm text-cyan-blue tracking-wider">CA-8492</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="font-serif text-2xl text-cyan-blue tracking-widest">{tag || '同游搭子'}</p>
          <p className="text-[10px] text-silver-gray tracking-widest mt-1">癸卯年 · 秋</p>
        </div>
      </div>

      {/* Perforation Line */}
      <div className="h-4 relative bg-mutton-white flex items-center">
        <div className="absolute left-0 w-3 h-4 bg-[var(--color-bg-base)] rounded-r-full shadow-inner border-y-[0.5px] border-r-[0.5px] border-silver-gray/30"></div>
        <div className="w-full border-t-[1.5px] border-dashed border-silver-gray/30 mx-4"></div>
        <div className="absolute right-0 w-3 h-4 bg-[var(--color-bg-base)] rounded-l-full shadow-inner border-y-[0.5px] border-l-[0.5px] border-silver-gray/30"></div>
      </div>

      {/* Middle Content Section */}
      <div className="p-6 pt-2 space-y-6 relative bg-mutton-white">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <TwinFishLeft className="w-48 h-48 text-cyan-blue" />
        </div>
        
        <div className="grid grid-cols-2 gap-6 relative z-10">
          <div>
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1">STATUS / 状态</p>
            <p className="font-serif text-lg text-cyan-blue tracking-[0.2em]">契约达成</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1">IDENTITY / 身份</p>
            <p className="font-serif text-lg text-cyan-blue tracking-[0.2em]">{tag || '同游搭子'}</p>
          </div>
          <div className="col-span-2">
            <p className="font-mono text-[9px] text-silver-gray tracking-widest mb-1">DATE / 互动时间</p>
            <p className="font-serif text-lg text-cyan-blue tracking-[0.1em]">{today}</p>
          </div>
        </div>
      </div>

      {/* Bottom Barcode Section */}
      <div className="p-6 pt-4 border-t-[1px] border-solid border-silver-gray/10 flex justify-between items-end bg-cyan-blue/5">
        <div className="flex flex-col gap-2">
          <div className="flex gap-[2px] h-10 opacity-80">
            {barcode.map((width, i) => (
              <div key={i} className="bg-cyan-blue rounded-sm" style={{ width: `${width}px` }}></div>
            ))}
          </div>
          <p className="font-mono text-[9px] text-silver-gray tracking-widest">08492 77310 99214</p>
        </div>
        <div className="w-12 h-12 border-[1.5px] border-stamp-red text-stamp-red flex items-center justify-center transform -rotate-12 opacity-80 mix-blend-multiply rounded-sm">
          <span className="font-serif text-sm leading-none tracking-[0.2em]" style={{ writingMode: 'vertical-rl' }}>长安<br/>合同</span>
        </div>
      </div>
    </div>
  );
};

// --- Tabs ---
const HomeTab = ({ onOpenFlow, tag, hasMatched, onOpenSubView, onChangeTab, spots }: { onOpenFlow: (flow: FlowState) => void, tag: string, hasMatched: boolean, onOpenSubView: (view: SubViewState) => void, onChangeTab: (tab: TabState) => void, spots: any[] }) => {
  const completedCount = spots.filter(s => s.status === '已打卡').length;
  const recommendedSpot = spots.find(s => s.status === '未打卡') || spots[0];

  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-24">
    {/* Step Indicator */}
    <div className="pt-12 pb-8 px-6 bg-mutton-white">
      <div className="flex justify-between items-center relative">
        <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-silver-gray/20 -z-10 -translate-y-1/2"></div>
        
        {/* Step 1 */}
        <div className="flex flex-col items-center gap-2 bg-mutton-white px-2">
          <div className={`w-2 h-2 rounded-full ${tag ? 'bg-stamp-red' : 'bg-silver-gray'}`}></div>
          <span className={`text-[10px] tracking-widest ${tag ? 'text-stamp-red' : 'text-silver-gray'}`}>激活鱼符</span>
        </div>
        
        {/* Step 2 */}
        <div className="flex flex-col items-center gap-2 bg-mutton-white px-2">
          <div className={`w-2 h-2 rounded-full ${completedCount > 0 ? 'bg-stamp-red' : 'bg-silver-gray'}`}></div>
          <span className={`text-[10px] tracking-widest ${completedCount > 0 ? 'text-stamp-red' : 'text-silver-gray'}`}>探索展馆</span>
        </div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 bg-mutton-white px-2">
          <div className={`w-2 h-2 rounded-full ${hasMatched ? 'bg-stamp-red' : 'bg-silver-gray'}`}></div>
          <span className={`text-[10px] tracking-widest ${hasMatched ? 'text-stamp-red' : 'text-silver-gray'}`}>完成合符</span>
        </div>
      </div>
    </div>

    <div className="px-6 relative z-20 space-y-6">
      {/* 1.2 票证状态卡 - Ticket Style */}
      <div className="bg-mutton-white border-[0.5px] border-silver-gray/30 shadow-md p-6 relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-[0.5px] border-l-[0.5px] border-cyan-blue"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-[0.5px] border-r-[0.5px] border-cyan-blue"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[0.5px] border-l-[0.5px] border-cyan-blue"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-[0.5px] border-r-[0.5px] border-cyan-blue"></div>

        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-serif text-lg text-cyan-blue tracking-[0.2em] mb-1">我的鱼符</h3>
            <p className="text-silver-gray text-xs tracking-widest font-mono">STATUS: {!tag ? 'UNACTIVATED' : (hasMatched ? 'MATCHED' : 'ACTIVATED')}</p>
          </div>
          {tag && (
            <div className="px-3 py-1 bg-cyan-blue/5 text-cyan-blue border-[0.5px] border-cyan-blue/20 text-[10px] tracking-widest font-serif">
              {tag}
            </div>
          )}
        </div>
        <button 
          onClick={() => {
            if (!tag) onOpenFlow('activation');
            else if (!hasMatched) onOpenFlow('match');
            else onChangeTab('commemoration');
          }} 
          className="w-full py-3.5 bg-cyan-blue text-low-gold text-sm tracking-[0.2em] flex justify-center items-center gap-3 transition-transform active:scale-[0.98] border-[0.5px] border-cyan-blue hover:bg-cyan-blue/90"
        >
          {!tag ? <Scan size={16} /> : (hasMatched ? <Ticket size={16} /> : <Scan size={16} />)}
          {!tag ? '开始激活鱼符' : (hasMatched ? '查看专属契约' : '[模拟] 检测双鱼拼合')}
        </button>
      </div>

      {/* 1.3 当前任务总进度 */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <h3 className="font-serif text-md text-cyan-blue tracking-widest">探索进度</h3>
          <span className="font-mono text-xs text-silver-gray">{completedCount} / {spots.length}</span>
        </div>
        <div className="h-1.5 w-full bg-silver-gray/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / spots.length) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-low-gold rounded-full"
          />
        </div>
      </div>

      {/* 1.4 今日推荐点位 & 1.5 快速入口 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center">
          <div>
            <h4 className="font-serif text-sm text-cyan-blue tracking-widest mb-1">今日推荐：{recommendedSpot.name}</h4>
            <p className="text-xs text-silver-gray tracking-widest flex items-center gap-1">
              <MapPin size={12} /> 距离您 2.4 km
            </p>
          </div>
          {recommendedSpot.status === '未打卡' ? (
            <button onClick={() => onOpenFlow('checkin')} className="px-4 py-2 bg-cyan-blue/5 text-cyan-blue border-[1px] border-cyan-blue/20 rounded-sm text-xs tracking-widest hover:bg-cyan-blue/10 transition-colors">
              去打卡
            </button>
          ) : (
            <span className="text-xs text-silver-gray tracking-widest border-[1px] border-silver-gray/20 rounded-sm px-4 py-2 bg-silver-gray/5">已完成</span>
          )}
        </div>
        <button onClick={() => onChangeTab('map')} className="p-5 rounded-sm border-[1px] border-silver-gray/10 flex flex-col items-center justify-center gap-3 bg-mutton-white shadow-sm hover:bg-silver-gray/5 transition-colors">
          <MapIcon size={22} className="text-cyan-blue" strokeWidth={1.5} />
          <span className="text-xs tracking-widest text-silver-gray">活动地图</span>
        </button>
        <button onClick={() => onOpenSubView('instructions')} className="p-5 rounded-sm border-[1px] border-silver-gray/10 flex flex-col items-center justify-center gap-3 bg-mutton-white shadow-sm hover:bg-silver-gray/5 transition-colors">
          <BookOpen size={22} className="text-cyan-blue" strokeWidth={1.5} />
          <span className="text-xs tracking-widest text-silver-gray">活动说明</span>
        </button>
      </div>
    </div>
  </motion.div>
)};

const MapTab = ({ onOpenFlow, onOpenSubView, onSelectSpot, spots }: { onOpenFlow: (flow: FlowState) => void, onOpenSubView: (view: SubViewState) => void, onSelectSpot: (spot: any) => void, spots: any[] }) => {
  const completedCount = spots.filter(s => s.status === '已打卡').length;
  
  return (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24 flex flex-col min-h-full">
    <header className="mb-8 pt-4 shrink-0">
      <h2 className="font-serif text-2xl tracking-[0.2em] text-cyan-blue mb-2">陕西历史博物馆导览</h2>
      <p className="text-xs text-silver-gray tracking-widest">寻访历史印记，收集专属徽章</p>
    </header>

    {/* 任务总进度 */}
    <div className="mb-8 shrink-0">
      <div className="flex justify-between items-end mb-3">
        <h3 className="font-serif text-sm text-cyan-blue tracking-widest">探索进度</h3>
        <span className="font-mono text-xs text-silver-gray">{completedCount} / {spots.length}</span>
      </div>
      <div className="h-1 w-full bg-silver-gray/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(completedCount / spots.length) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-low-gold rounded-full"
        />
      </div>
    </div>

    {/* Museum Guide Timeline Style */}
    <div className="relative pl-4 ml-2 border-l-[0.5px] border-silver-gray/40 space-y-10">
      {spots.map((spot, idx) => (
        <div key={idx} className="relative">
          {/* Timeline Node */}
          <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-[1px] ${spot.status === '已打卡' ? 'bg-low-gold border-low-gold' : 'bg-mutton-white border-silver-gray'}`}></div>
          
          <div 
            onClick={() => {
              onSelectSpot(spot);
              onOpenSubView('spot-details');
            }}
            className="block cursor-pointer group"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-serif text-lg tracking-widest transition-colors ${spot.status === '已打卡' ? 'text-low-gold' : 'text-cyan-blue group-hover:text-low-gold'}`}>{spot.name}</h3>
              <span className={`text-[10px] tracking-widest font-mono px-2 py-0.5 border-[0.5px] ${spot.status === '已打卡' ? 'text-low-gold border-low-gold/30 bg-low-gold/5' : 'text-silver-gray border-silver-gray/30'}`}>
                {spot.status === '已打卡' ? 'COMPLETED' : 'PENDING'}
              </span>
            </div>
            <p className="text-xs text-silver-gray tracking-widest leading-relaxed line-clamp-2 mb-3">{spot.desc}</p>
            
            <div className="flex items-center gap-2 text-[10px] text-cyan-blue/70 tracking-widest">
              <MapPin size={12} />
              <span>查看详情与打卡</span>
              <ChevronRight size={12} className="opacity-50" />
            </div>
          </div>
        </div>
      ))}
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
          <TicketCard tag={tag} />
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

const ProfileTab = ({ tag, nickname, bio, onOpenSubView }: { tag: string, nickname: string, bio: string, onOpenSubView: (view: SubViewState) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pb-24">
    {/* 4.1 个人主页 */}
    <header className="mb-8 pt-4">
      <div onClick={() => onOpenSubView('edit-profile')} className="p-6 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex items-center gap-5 relative overflow-hidden cursor-pointer hover:border-cyan-blue/30 transition-colors">
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cyan-blue/5 to-transparent pointer-events-none"></div>
        <div className="w-16 h-16 rounded-full bg-cyan-blue/5 border-[1px] border-cyan-blue/20 flex items-center justify-center overflow-hidden shrink-0">
          <User className="text-cyan-blue" size={28} strokeWidth={1.5} />
        </div>
        <div>
          <h2 className="font-serif text-xl tracking-[0.2em] text-cyan-blue mb-1">{nickname}</h2>
          <p className="text-xs text-silver-gray tracking-widest font-mono">ID: CA-8492</p>
        </div>
      </div>
    </header>
    <div className="space-y-3">
      <div onClick={() => onOpenSubView('identity-tag')} className="p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center cursor-pointer hover:bg-silver-gray/5 transition-colors">
        <span className="text-sm tracking-widest text-cyan-blue">身份标签</span>
        <span className="text-xs tracking-widest text-silver-gray bg-silver-gray/5 px-3 py-1 rounded-sm">{tag || '未设置'}</span>
      </div>
      <div className="p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center">
        <span className="text-sm tracking-widest text-cyan-blue">票证编号</span>
        <span className="text-xs tracking-widest text-silver-gray font-mono">NO. CA-8492</span>
      </div>
      <button onClick={() => onOpenSubView('historical-tickets')} className="w-full p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center hover:bg-silver-gray/5 transition-colors">
        <span className="text-sm tracking-widest text-cyan-blue">历史票证</span>
        <ChevronRight className="text-silver-gray/50" size={18} strokeWidth={1.5} />
      </button>
      {['我的鱼符状态', '活动记录', '系统设置'].map((item, i) => (
        <button key={i} className="w-full p-5 rounded-sm border-[1px] border-silver-gray/10 bg-mutton-white shadow-sm flex justify-between items-center hover:bg-silver-gray/5 transition-colors">
          <span className="text-sm tracking-widest text-cyan-blue">{item}</span>
          <ChevronRight className="text-silver-gray/50" size={18} strokeWidth={1.5} />
        </button>
      ))}
    </div>
  </motion.div>
);

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
  const [selectedTag, setSelectedTag] = useState('');
  const tags = ['同游搭子', '馆展同好', '校园同行', '汉服同袍'];

  return (
    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-0 bg-[var(--color-bg-base)] z-50 flex flex-col">
      <div className="p-6 flex justify-between items-center">
        <span className="font-mono text-xs text-silver-gray tracking-widest">FLOW A: ACTIVATION</span>
        <button onClick={onClose}><X size={24} className="text-silver-gray" /></button>
      </div>
      
      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Scan className="w-24 h-24 text-cyan-blue mb-8 animate-pulse" strokeWidth={1} />
          <h2 className="font-serif text-2xl text-cyan-blue mb-4 tracking-widest">NFC 识别票证</h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose mb-12">请将手机靠近实体鱼符<br/>读取专属芯片信息</p>
          <button onClick={() => setStep(2)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm flex justify-center items-center gap-4 rounded-sm shadow-md active:scale-[0.98] transition-transform">
            <span className="w-4 h-[1px] bg-current opacity-50"></span>
            [模拟] 识别成功
            <span className="w-4 h-[1px] bg-current opacity-50"></span>
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="flex-1 flex flex-col p-8">
          <div className="mb-12 text-center mt-8">
            <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-widest">选择身份</h2>
            <p className="text-silver-gray text-sm tracking-[0.2em]">赋予半枚鱼符社交属性</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-12">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`py-8 px-4 border-[1px] rounded-sm transition-all duration-300 flex flex-col items-center justify-center relative bg-mutton-white
                  ${selectedTag === tag ? 'border-cyan-blue text-cyan-blue shadow-[0_4px_12px_rgba(28,43,45,0.1)] scale-[1.02]' : 'border-silver-gray/10 text-silver-gray shadow-sm hover:border-silver-gray/30'}`}
              >
                <span className="tracking-[0.2em] text-sm">{tag}</span>
              </button>
            ))}
          </div>
          <button 
            onClick={() => setStep(3)}
            disabled={!selectedTag}
            className={`w-full py-4 tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4 border-[1px] rounded-sm
              ${selectedTag ? 'bg-cyan-blue border-cyan-blue text-mutton-white shadow-md active:scale-[0.98]' : 'bg-transparent border-silver-gray/20 text-silver-gray/50 cursor-not-allowed'}`}
          >
            确认身份
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <CheckCircle2 className="w-24 h-24 text-cyan-blue mb-8" strokeWidth={1} />
          <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-widest">激活成功</h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose mb-12">
            身份标签：{selectedTag}<br/>
            您的鱼符已准备就绪
          </p>
          <button onClick={() => onComplete(selectedTag)} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
            进入首页
          </button>
        </div>
      )}
    </motion.div>
  )
}

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
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 rounded-full border-[1px] border-low-gold flex items-center justify-center mb-6 bg-mutton-white shadow-lg">
            <Award className="w-16 h-16 text-low-gold" strokeWidth={1} />
          </div>
          <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-widest">打卡成功</h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose mb-12">
            解锁文物：{spot?.relic || '未知文物'}<br/>
            获得专属纪念徽章
          </p>
          <button onClick={onClose} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
            完成
          </button>
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
      <div className="p-6 flex justify-between items-center">
        <span className="font-mono text-xs text-silver-gray tracking-widest">FLOW C: MATCH</span>
        <button onClick={onClose}><X size={24} className="text-silver-gray" /></button>
      </div>
      
      {step === 1 && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
          <div className="relative w-56 h-56 mb-16 flex items-center justify-center">
            <div className="absolute inset-0 border-[1px] border-silver-gray/10 rounded-full"></div>
            <div className="absolute inset-4 border-[1px] border-silver-gray/10 rounded-full border-dashed"></div>
            
            <motion.div
              animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : { x: [-30, -32, -30], y: [15, 18, 15], rotate: [-15, -18, -15], scale: 0.9, opacity: 0.8 }}
              transition={isVerifying ? { type: "spring", stiffness: 400, damping: 12, mass: 0.8 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 origin-center"
            >
              <TwinFishLeft className="w-full h-full text-cyan-blue drop-shadow-lg" />
            </motion.div>
            
            <motion.div
              animate={isVerifying ? { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 } : { x: [30, 32, 30], y: [-15, -18, -15], rotate: [15, 18, 15], scale: 0.9, opacity: 0.8 }}
              transition={isVerifying ? { type: "spring", stiffness: 400, damping: 12, mass: 0.8 } : { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute inset-0 origin-center"
            >
              <TwinFishRight className="w-full h-full text-low-gold drop-shadow-lg" />
            </motion.div>

            <AnimatePresence>
              {isVerifying && (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: [0, 0.4, 0] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-10 rounded-full bg-cyan-blue mix-blend-screen pointer-events-none blur-xl"
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isVerifying && (
                <motion.div
                  initial={{ top: '10%', opacity: 0 }}
                  animate={{ top: '90%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-[10%] right-[10%] h-[1px] bg-cyan-blue shadow-[0_0_10px_rgba(28,43,45,0.5)] z-10"
                />
              )}
            </AnimatePresence>
          </div>

          <h2 className="font-serif text-2xl text-cyan-blue mb-4 tracking-[0.2em]">
            {isVerifying ? '契约生成中...' : '物理拼合'}
          </h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose max-w-[240px] mb-8">
            将两枚鱼符物理拼接<br/>触发 NFC 感应
          </p>

          <button 
            onClick={handleVerify}
            disabled={isVerifying}
            className={`w-full py-4 tracking-[0.2em] text-sm transition-all duration-500 flex items-center justify-center gap-4 border-[1px] rounded-sm
              ${isVerifying ? 'bg-transparent border-silver-gray/20 text-silver-gray cursor-not-allowed' : 'bg-cyan-blue border-cyan-blue text-mutton-white shadow-md active:scale-[0.98]'}`}
          >
            {isVerifying ? (
              <span className="font-mono text-xs">VERIFYING...</span>
            ) : (
              <>
                <span className="w-4 h-[1px] bg-current opacity-50"></span>
                [模拟] 触发碰一碰
                <span className="w-4 h-[1px] bg-current opacity-50"></span>
              </>
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-20 h-20 text-cyan-blue mb-6" strokeWidth={1} />
          <h2 className="font-serif text-3xl text-cyan-blue mb-4 tracking-widest">合符成功</h2>
          <p className="text-silver-gray text-sm tracking-[0.2em] leading-loose mb-12">
            匹配对象：{tag || '同游搭子'}<br/>
            已解锁专属纪念页内容
          </p>
          <button onClick={onComplete} className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
            查看纪念页
          </button>
        </div>
      )}
    </motion.div>
  )
}

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

const ShareCardView = ({ tag, onClose }: { tag: string, onClose: () => void }) => (
  <FullScreenView title="分享卡片" subtitle="Share Card" onClose={onClose}>
    <div className="p-6 flex flex-col items-center">
      <div className="w-full transform scale-90 origin-top">
        <TicketCard tag={tag} />
      </div>
      <div className="w-full mt-4 space-y-4">
        <button className="w-full py-4 bg-cyan-blue text-mutton-white tracking-[0.2em] text-sm rounded-sm shadow-md active:scale-[0.98] transition-transform">
          保存图片
        </button>
        <button onClick={onClose} className="w-full py-4 border-[1px] border-silver-gray/20 text-cyan-blue tracking-[0.2em] text-sm rounded-sm active:scale-[0.98] transition-transform">
          返回
        </button>
      </div>
    </div>
  </FullScreenView>
);

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

  const currentStep = !userTag ? 1 : (!hasMatched ? 2 : 3);
  const steps = ['激活鱼符', '探索长安', '完成合符'];

  return (
    <div className="max-w-md mx-auto h-screen shadow-2xl overflow-hidden relative bg-[var(--color-bg-base)] flex flex-col">
      {/* Global Progress Indicator */}
      <div className="pt-8 pb-2 px-6 flex justify-between items-center bg-[var(--color-bg-base)] z-10 relative">
        <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-silver-gray/10"></div>
        {steps.map((stepName, index) => {
          const stepNum = index + 1;
          const isActive = currentStep === stepNum;
          const isPast = currentStep > stepNum;
          return (
            <div key={index} className={`flex flex-col items-center gap-1 ${isActive ? 'text-cyan-blue' : isPast ? 'text-cyan-blue/50' : 'text-silver-gray/30'}`}>
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-stamp-red' : isPast ? 'bg-cyan-blue/50' : 'bg-silver-gray/30'}`}></div>
              <span className="font-mono text-[9px] tracking-widest">{stepName}</span>
            </div>
          );
        })}
      </div>

      {/* Main Tabs Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && <HomeTab onOpenFlow={setActiveFlow} tag={userTag} hasMatched={hasMatched} onOpenSubView={setSubViewState} onChangeTab={setActiveTab} spots={spots} />}
        {activeTab === 'map' && <MapTab onOpenFlow={setActiveFlow} onOpenSubView={setSubViewState} onSelectSpot={setSelectedSpot} spots={spots} />}
        {activeTab === 'commemoration' && <CommemorationTab tag={userTag} hasMatched={hasMatched} onOpenSubView={setSubViewState} spots={spots} />}
        {activeTab === 'profile' && <ProfileTab tag={userTag} nickname={nickname} bio={bio} onOpenSubView={setSubViewState} />}
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
          <ShareCardView tag={userTag} onClose={() => setSubViewState('none')} />
        )}
        {subViewState === 'ticket-details' && (
          <FullScreenView title="票证详情" subtitle="Ticket Details" onClose={() => setSubViewState('historical-tickets')}>
            <div className="p-6">
              <TicketCard tag="汉服同袍" />
            </div>
          </FullScreenView>
        )}
      </AnimatePresence>
    </div>
  );
}
