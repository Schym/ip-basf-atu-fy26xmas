/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { HeroScene, WaveScene } from './components/QuantumScene';
import { StatCard, Playlist, WrappedSummary, ImageGrid, MetallicaCard } from './components/Diagrams';
import { Play, Pause, Heart, Music2, Battery, Wifi, Signal, Share2, Lock, Delete, Phone, MessageCircle, Mail, Calendar, Camera, Settings, MapPin, Image as ImageIcon, AppWindow, Globe, Cloud, Shield, Users, Clock, Calculator, Bell, Folder, Wallet, Video, Briefcase, FileText, Headphones, Mic, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Relaxing acoustic/piano ambient music
const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3";

// Lock Screen Component
const LockScreen: React.FC<{ onUnlock: () => void; currentTime: string }> = ({ onUnlock, currentTime }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const CORRECT_PIN = "2412";

  useEffect(() => {
    const now = new Date();
    setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);

  const handleDigit = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setError(false);
      
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setTimeout(() => onUnlock(), 300);
        } else {
          setError(true);
          setTimeout(() => {
            setPin("");
            setError(false);
          }, 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "delete"];

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 z-[100] bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f23] flex flex-col items-center justify-between py-16 px-8"
    >
      {/* Time & Date */}
      <div className="text-center mt-8">
        <div className="text-7xl font-thin text-white tracking-tight">{currentTime}</div>
        <div className="text-lg text-white/60 mt-2">{currentDate}</div>
      </div>

      {/* Lock Icon & PIN Display */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Lock size={24} className="text-white/80" />
        </div>
        <p className="text-white/60 text-sm mb-4">Enter PIN to unlock Wrapped</p>
        
        {/* PIN Dots */}
        <div className={`flex gap-4 ${error ? 'animate-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={pin.length > i ? { scale: [1, 1.2, 1] } : {}}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                pin.length > i 
                  ? error ? 'bg-red-500 border-red-500' : 'bg-spotify-green border-spotify-green' 
                  : 'border-white/40 bg-transparent'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Number Pad */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {digits.map((digit, i) => (
          <div key={i} className="flex items-center justify-center">
            {digit === "" ? (
              <div className="w-20 h-20" />
            ) : digit === "delete" ? (
              <button
                onClick={handleDelete}
                className="w-20 h-20 rounded-full flex items-center justify-center text-white/60 hover:bg-white/10 active:bg-white/20 transition-colors"
              >
                <Delete size={24} />
              </button>
            ) : (
              <button
                onClick={() => handleDigit(digit)}
                className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-3xl font-light text-white hover:bg-white/20 active:bg-white/30 transition-colors"
              >
                {digit}
              </button>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

type AppStage = 'locked' | 'home' | 'boot' | 'wrapped';

const HomeScreen: React.FC<{ onOpenWrapped: () => void; currentTime: string }> = ({ onOpenWrapped, currentTime }) => {
  type HomeApp = { key: string; label: string; icon: React.ReactNode; badge?: string };

  // Note: we intentionally use generic glyph icons (not official brand logos) to avoid copyrighted/trademarked assets.
  const homeApps: HomeApp[] = useMemo(
    () => [
      { key: 'phone', label: 'Phone', icon: <Phone size={18} />, badge: '24' },
      { key: 'messages', label: 'Messages', icon: <MessageCircle size={18} />, badge: '17' },
      { key: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={18} />, badge: '38' },
      { key: 'mail', label: 'Mail', icon: <Mail size={18} />, badge: '99+' },
      { key: 'calendar', label: 'Calendar', icon: <Calendar size={18} /> },
      { key: 'camera', label: 'Camera', icon: <Camera size={18} /> },
      { key: 'photos', label: 'Photos', icon: <ImageIcon size={18} /> },
      { key: 'maps', label: 'Maps', icon: <MapPin size={18} /> },
      { key: 'safari', label: 'Safari', icon: <Globe size={18} /> },
      { key: 'settings', label: 'Settings', icon: <Settings size={18} /> },
      { key: 'teams', label: 'Teams', icon: <Users size={18} />, badge: '6' },
      { key: 'linkedin', label: 'LinkedIn', icon: <Users size={18} />, badge: '12' },
      { key: 'outlook', label: 'Outlook', icon: <Mail size={18} />, badge: '21' },
      { key: 'onemicrosoft', label: 'One MS', icon: <Cloud size={18} /> },
      { key: 'security', label: 'Security', icon: <Shield size={18} />, badge: '3' },
      { key: 'apps', label: 'App Store', icon: <AppWindow size={18} /> },
      { key: 'clock', label: 'Clock', icon: <Clock size={18} /> },
      { key: 'calculator', label: 'Calc', icon: <Calculator size={18} /> },
      { key: 'wallet', label: 'Wallet', icon: <Wallet size={18} /> },
      { key: 'files', label: 'Files', icon: <Folder size={18} /> },
      { key: 'alerts', label: 'Alerts', icon: <Bell size={18} />, badge: '13' },
      { key: 'briefing', label: 'Briefing', icon: <Briefcase size={18} />, badge: '4' },
      { key: 'docs', label: 'Docs', icon: <FileText size={18} />, badge: '7' },
      { key: 'meetings', label: 'Meetings', icon: <Video size={18} />, badge: '2' },
      { key: 'podcast', label: 'Pod', icon: <Headphones size={18} /> },
      { key: 'voice', label: 'Voice', icon: <Mic size={18} /> },
      { key: 'agents', label: 'Agents', icon: <Bot size={18} />, badge: '9' },
      { key: 'sparks', label: 'Ideas', icon: <Sparkles size={18} /> },
    ],
    []
  );

  const slots = useMemo(() => {
    const totalSlots = 24; // 6 rows x 4 cols
    const result: Array<HomeApp | null> = Array.from({ length: totalSlots }, () => null);

    // Place Wrapped as a central eye-catcher (row 2, col 2) => index 5 (0-based)
    result[5] = { key: 'wrapped', label: 'Wrapped', icon: <Music2 size={22} className="text-white" /> };

    // Fill remaining slots with apps
    let cursor = 0;
    for (const app of homeApps) {
      while (cursor < totalSlots && result[cursor] !== null) cursor++;
      if (cursor >= totalSlots) break;
      result[cursor] = app;
      cursor++;
    }

    return result;
  }, [homeApps]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 z-[90]"
    >
      {/* Wallpaper */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f111a] via-[#0b0c12] to-black" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-basf-neonPurple/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-basf-neonBlue/15 rounded-full blur-[120px]" />

      <div className="relative h-full w-full px-7 pt-20 pb-28">
        {/* Subtle header */}
        <div className="flex items-center justify-between mb-6 text-white/70 text-xs font-medium">
          <span>{currentTime}</span>
          <span className="tracking-widest uppercase text-[10px]">Home</span>
        </div>

        {/* App grid (iOS-like density) */}
        <div className="grid grid-cols-4 gap-x-3 gap-y-3">
          {slots.map((app, i) => {
            if (!app) {
              return <div key={i} />;
            }

            const isWrapped = app.key === 'wrapped';

            if (isWrapped) {
              return (
                <button
                  key={app.key}
                  onClick={onOpenWrapped}
                  className="flex flex-col items-center gap-2 select-none col-start-2"
                  aria-label="Open BASF x Microsoft Wrapped"
                >
                  <div className="relative w-16 h-16 rounded-[22px] bg-gradient-to-br from-basf-blue to-spotify-green flex items-center justify-center shadow-lg ring-2 ring-white/20">
                    <div className="absolute inset-0 rounded-[22px] bg-white/10" />
                    <div className="relative">{app.icon}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-white/90">Wrapped</span>
                </button>
              );
            }

            return (
              <div key={app.key} className="flex flex-col items-center gap-2 select-none">
                <div className="relative w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/25">
                  {app.icon}
                  {app.badge && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                      {app.badge}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-semibold text-white/35 text-center leading-tight max-w-[60px]">
                  {app.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dock */}
        <div className="absolute left-6 right-6 bottom-10 h-20 rounded-3xl bg-white/8 border border-white/10 backdrop-blur-md flex items-center justify-around">
          {[
            { key: 'dock-phone', icon: <Phone size={20} />, badge: '24' },
            { key: 'dock-msg', icon: <MessageCircle size={20} />, badge: '17' },
            { key: 'dock-wa', icon: <MessageCircle size={20} />, badge: '38' },
            { key: 'dock-mail', icon: <Mail size={20} />, badge: '99+' },
          ].map((item) => (
            <div key={item.key} className="relative w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/25">
              {item.icon}
              <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                {item.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const BootScreen: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const steps = useMemo(
    () => [
      'git init — preparing workspace',
      'npm install — resolving dependencies',
      'compiling catalysts',
      'calculating molecules',
      'stabilizing Azure Cloud',
      'creating endorphins',
      'warming up Copilot',
      'ready',
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => {
        const next = Math.min(prev + 1, steps.length - 1);
        if (next === steps.length - 1) {
          setTimeout(onDone, 500);
        }
        return next;
      });
    }, 650);
    return () => clearInterval(timer);
  }, [onDone, steps.length]);

  const progressPct = Math.round(((idx + 1) / steps.length) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-[95] bg-black"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c12] via-black to-black" />
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-basf-neonPurple/25 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-spotify-green/15 rounded-full blur-[120px]" />

      <div className="relative h-full w-full px-8 pt-28 pb-24 flex flex-col justify-between">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[10px] font-bold tracking-widest uppercase">
            Booting Wrapped
          </div>
          <div className="mt-6 text-2xl font-black text-white leading-tight">Digital Alchemy</div>
          <div className="mt-2 text-xs text-white/60">Preparing your 2025 review…</div>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <div className="text-[10px] text-white/70 font-semibold uppercase tracking-widest">Loading</div>
            <div className="mt-2 font-mono text-[11px] text-white/90 min-h-[18px]">{steps[idx]}</div>
            <div className="mt-4 h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-spotify-green via-basf-neonBlue to-basf-neonPurple"
                initial={{ width: '0%' }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
            <div className="mt-2 text-[10px] text-white/50">{progressPct}%</div>
          </div>
        </div>

        <div className="text-center text-[10px] text-white/40 tracking-widest uppercase">BASF x Microsoft</div>
      </div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState<AppStage>('locked');
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const wheelLockUntilRef = useRef<number>(0);
  const stageRef = useRef<AppStage>(stage);

  const okrs = [
    { title: 'M365 Copilot', subtitle: 'Adoption & usage', status: 'onTrack' as const, progress: 92 },
    { title: 'Fusion Development 2.0', subtitle: 'Initiative momentum', status: 'attention' as const, progress: 74 },
    { title: 'Security', subtitle: 'Protection & compliance', status: 'attention' as const, progress: 81 },
    { title: 'Dynamics365', subtitle: 'ERP foundation', status: 'critical' as const, progress: 58 },
    { title: 'Agentic AI', subtitle: 'Platform delivery', status: 'onTrack' as const, progress: 90 },
    { title: 'Cloud', subtitle: 'Transformation & scale', status: 'onTrack' as const, progress: 87 },
    { title: 'Partnership', subtitle: 'Executive alignment', status: 'onTrack' as const, progress: 89 },
    { title: 'OT Digitalization', subtitle: 'Use cases & adoption', status: 'attention' as const, progress: 70 },
    { title: 'MACC & MP', subtitle: 'Marketplace outcomes', status: 'attention' as const, progress: 73 },
  ];

  const okrCounts = okrs.reduce(
    (acc, okr) => {
      acc.total += 1;
      if (okr.status === 'onTrack') acc.onTrack += 1;
      if (okr.status === 'attention') acc.attention += 1;
      if (okr.status === 'critical') acc.critical += 1;
      return acc;
    },
    { total: 0, onTrack: 0, attention: 0, critical: 0 }
  );

  // Set volume when audio loads
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08; // Very low volume
    }
  }, []);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  const scrollToPage = (direction: 1 | -1) => {
    const container = scrollRef.current;
    if (!container) return;

    const pages = Array.from(container.querySelectorAll<HTMLElement>('[data-snap-page]'));
    if (pages.length === 0) return;

    const currentTop = container.scrollTop;
    let currentIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    for (let i = 0; i < pages.length; i++) {
      const dist = Math.abs(pages[i].offsetTop - currentTop);
      if (dist < bestDist) {
        bestDist = dist;
        currentIdx = i;
      }
    }

    const nextIdx = Math.max(0, Math.min(pages.length - 1, currentIdx + direction));
    const target = pages[nextIdx];
    container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handler = (e: WheelEvent) => {
      if (stageRef.current !== 'wrapped') return;
      if (e.ctrlKey) return;

      const isVertical = Math.abs(e.deltaY) >= Math.abs(e.deltaX);
      if (!isVertical) return;

      const now = Date.now();
      if (now < wheelLockUntilRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 10) return;

      e.preventDefault();
      wheelLockUntilRef.current = now + 650;
      scrollToPage(e.deltaY > 0 ? 1 : -1);
    };

    container.addEventListener('wheel', handler, { passive: false });
    return () => container.removeEventListener('wheel', handler);
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.08;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle unlock -> show Home screen (no music yet)
  const handleUnlock = () => {
    setStage('home');
  };

  const startWrapped = () => {
    setStage('wrapped');
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0.08; // Even lower starting volume
      audio.play();
      setIsPlaying(true);
      
      // Fade out after 10 seconds
      setTimeout(() => {
        const fadeOutDuration = 3000; // 3 seconds fade
        const fadeOutSteps = 30;
        const stepTime = fadeOutDuration / fadeOutSteps;
        const volumeStep = audio.volume / fadeOutSteps;
        
        let currentStep = 0;
        const fadeInterval = setInterval(() => {
          currentStep++;
          const newVolume = Math.max(0, audio.volume - volumeStep);
          audio.volume = newVolume;
          
          if (currentStep >= fadeOutSteps || newVolume <= 0) {
            clearInterval(fadeInterval);
            audio.pause();
            setIsPlaying(false);
          }
        }, stepTime);
      }, 10000); // Start fade after 10 seconds
    }
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying && stage === 'wrapped') {
      interval = setInterval(() => {
        setProgress((p) => (p + 0.5) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, stage]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2">
      
      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />
      
      {/* --- iPHONE CHASSIS --- */}
      <div className="relative w-full max-w-[430px] h-[92vh] max-h-[920px] bg-black rounded-[55px] shadow-[0_0_0_12px_#1f1f1f,0_0_0_14px_#3f3f3f,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-[8px] border-black ring-1 ring-white/10 z-10 flex flex-col transform transition-transform duration-700 ease-out hover:scale-[1.01]">
         
         {/* Lock Screen Overlay */}
         <AnimatePresence>
           {stage === 'locked' && (
             <LockScreen onUnlock={handleUnlock} currentTime={currentTime} />
           )}
         </AnimatePresence>

         {/* Home Screen (after unlock) */}
         <AnimatePresence>
           {stage === 'home' && (
             <HomeScreen
               currentTime={currentTime}
               onOpenWrapped={() => setStage('boot')}
             />
           )}
         </AnimatePresence>

         {/* Boot / Loading Screen */}
         <AnimatePresence>
           {stage === 'boot' && (
             <BootScreen onDone={startWrapped} />
           )}
         </AnimatePresence>
         
         {/* Status Bar */}
         <div className="absolute top-0 left-0 right-0 h-14 z-50 px-8 flex justify-between items-end pb-3 text-white font-medium text-[13px] pointer-events-none select-none">
            <span>{currentTime}</span>
            <div className="flex items-center gap-1.5">
                <Signal size={14} fill="currentColor" />
                <Wifi size={14} />
                <Battery size={18} fill="currentColor" />
            </div>
         </div>

         {/* Dynamic Island */}
         <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black z-[60] rounded-[20px] flex items-center justify-center pointer-events-none shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
            <div className="absolute left-[22px] top-1/2 -translate-y-1/2 w-[12px] h-[12px] rounded-full bg-[#1a1a1a] flex items-center justify-center">
               <div className="w-[8px] h-[8px] rounded-full bg-[#0d0d0d] border border-[#2a2a2a]"></div>
            </div>
         </div>

         {/* Screen Content Container */}
         <div
           ref={scrollRef}
           className={`w-full h-full overflow-y-auto no-scrollbar bg-spotify-dark relative text-white snap-y snap-mandatory scroll-smooth phone-scroll-container ${
             stage === 'wrapped' ? '' : 'pointer-events-none select-none opacity-60'
           }`}
         >
            
            {/* Mobile Navbar (Absolute within Phone) */}
            {stage === 'wrapped' && (
              <nav className="absolute top-14 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                    <div className="w-8 h-8 bg-gradient-to-br from-basf-blue to-spotify-green rounded-full flex items-center justify-center shadow-lg">
                        <Music2 size={16} className="text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight drop-shadow-md">BASF <span className="text-spotify-green">x</span> Microsoft</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-spotify-green flex items-center justify-center shadow-lg ring-2 ring-black pointer-events-auto overflow-hidden">
                  <img src="/Michael.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
              </nav>
            )}

            {/* --- HERO SECTION --- */}
            <header data-snap-page className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden snap-start snap-always shrink-0">
              <div className="absolute inset-0 opacity-60">
                <HeroScene />
              </div>
              
              <div className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-12 pointer-events-none">
                 <div className="inline-block mb-4 px-3 py-1 rounded-full border border-spotify-green/50 bg-spotify-green/10 text-spotify-green text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
                    Chemistry Meets Digital
                 </div>
                 
                 <h1 className="text-6xl font-black mb-2 tracking-tighter mix-blend-overlay opacity-30 absolute scale-[2] select-none">
                    2025
                 </h1>
                 
                 <h1 className="text-5xl font-black mb-4 tracking-tighter z-20 leading-none drop-shadow-2xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green via-basf-neonBlue to-basf-neonPurple">2025</span><br/>
                    WRAPPED
                 </h1>

                 <p className="text-sm text-spotify-light max-w-xs font-medium z-20 mb-8 leading-relaxed">
                    A year of catalyzing innovation, bonding over challenges, and orchestrating success.
                 </p>

                 <button 
                   onClick={togglePlay}
                   className="pointer-events-auto group relative inline-flex items-center justify-center gap-2 bg-spotify-green text-black px-8 py-3 rounded-full font-bold text-base transition-transform hover:scale-105 active:scale-95 z-20 shadow-[0_0_20px_rgba(29,185,84,0.4)]"
                 >
                    {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" />}
                    <span>{isPlaying ? 'Playing Review' : 'Play Review'}</span>
                 </button>
              </div>

              {/* Progress Bar Visual */}
              <div className="absolute bottom-20 left-6 right-6 h-1 bg-white/20 rounded-full overflow-hidden z-20">
                  <div 
                      className="h-full bg-spotify-green transition-all duration-100 ease-linear shadow-[0_0_10px_#1DB954]"
                      style={{ width: `${progress}%` }}
                  ></div>
              </div>
            </header>

            <main className="contents">
              
              {/* Section 1: The Vibe */}
              <section data-snap-page className="h-full w-full py-16 px-6 bg-gradient-to-b from-spotify-dark to-[#0a0a0a] snap-start snap-always flex flex-col justify-center shrink-0 box-border overflow-hidden">
                  <h3 className="text-spotify-green font-bold text-sm mb-2">Your Top Genre</h3>
                  <h2 className="text-4xl font-black mb-6 leading-tight">
                      Digital<br/>Alchemy
                  </h2>
                  <div className="relative aspect-square w-full mb-8 max-h-[40vh]">
                      <WrappedSummary />
                  </div>
                  <p className="text-sm text-spotify-light leading-relaxed">
                      You mixed <strong>Azure Cloud</strong> stability with <strong>AI</strong> volatility. The reaction was intense, but the results were undeniable.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                      {['#CoPilot', '#ChemistryAI', '#OneMicrosoft', '#crisiseverywhere'].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-spotify-grey/50 text-white text-[10px] font-bold border border-white/10">
                              {tag}
                          </span>
                      ))}
                  </div>
              </section>

              {/* Section 2: Top Tracks */}
              <section data-snap-page id="top-hits" className="h-full w-full py-16 px-6 bg-black relative overflow-hidden snap-start snap-always flex flex-col justify-center shrink-0 box-border">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-basf-neonPurple/20 rounded-full blur-[80px] pointer-events-none"></div>
                   <div className="relative z-10">
                      <h2 className="text-3xl font-black mb-2">Top Tracks</h2>
                      <p className="text-spotify-light text-sm mb-6">The hits that defined 2025.</p>
                      
                      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/5 shadow-2xl">
                          <Playlist />
                      </div>
                   </div>
              </section>

              {/* Section 3: The Formula */}
              <section data-snap-page id="stats" className="h-full w-full py-16 px-6 bg-spotify-dark relative snap-start snap-always flex flex-col justify-center shrink-0 box-border overflow-hidden">
                   <div className="absolute inset-0 z-0 opacity-40">
                       <WaveScene />
                   </div>
                   
                   <div className="relative z-10 flex flex-col h-full justify-center">
                      <h2 className="text-3xl font-black mb-8 text-center">The Formula</h2>
                      <div className="flex flex-col gap-5 flex-1 max-h-[500px]">
                          <div className="flex-1">
                            <StatCard 
                                title="Teams Minutes" 
                                value="525k" 
                                subtitle="A year of seasons" 
                                color="from-green-400 to-blue-500"
                                icon="teams"
                            />
                          </div>
                          <div className="flex-1">
                            <StatCard 
                                title="Copilot Seats" 
                                value="38k+" 
                                subtitle="AI-powered productivity" 
                                color="from-purple-500 to-pink-500"
                                icon="copilot"
                            />
                          </div>
                          <div className="flex-1">
                            <StatCard 
                                title="ACR" 
                                value="~5M$" 
                                subtitle="per month" 
                                color="from-yellow-400 to-orange-500"
                                icon="dollar"
                            />
                          </div>
                      </div>
                   </div>
              </section>

                {/* Section 4: Status of OKRs (Placeholder) */}
                <section data-snap-page id="okrs" className="h-full w-full py-16 px-6 bg-gradient-to-b from-spotify-dark to-black snap-start snap-always flex flex-col justify-center shrink-0 box-border relative overflow-hidden">
                  <div className="absolute -top-20 -left-20 w-72 h-72 bg-basf-neonBlue/20 rounded-full blur-[90px] pointer-events-none"></div>
                  <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-basf-neonPurple/20 rounded-full blur-[90px] pointer-events-none"></div>

                  <div className="relative z-10 flex flex-col items-center text-center">
                      <h2 className="text-2xl font-black mb-2">Status of OKRs</h2>
                      <p className="text-spotify-light text-xs mb-6 max-w-sm leading-relaxed">
                        Core priorities are moving in the right direction — overall status: <span className="text-spotify-green font-semibold">on track</span>.
                      </p>

                      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4">
                        <div className="flex items-center justify-between mb-4 px-1">
                          <div className="text-[9px] font-bold uppercase tracking-widest text-white/70">FY26 H2 Snapshot</div>
                          <div className="flex items-center gap-2 text-[9px] font-semibold">
                            <span className="text-spotify-green">{okrCounts.onTrack} on track</span>
                            <span className="text-yellow-300">{okrCounts.attention} watch</span>
                            <span className="text-orange-300">{okrCounts.critical} critical</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {okrs.map((okr) => {
                            const meta =
                              okr.status === 'onTrack'
                                ? { label: 'On track', dot: 'bg-spotify-green', text: 'text-spotify-green', bar: 'bg-spotify-green/90', glow: 'shadow-[0_0_10px_rgba(29,185,84,0.45)]', accent: 'from-spotify-green/20' }
                                : okr.status === 'attention'
                                ? { label: 'Watch', dot: 'bg-yellow-400', text: 'text-yellow-300', bar: 'bg-yellow-400/90', glow: 'shadow-[0_0_10px_rgba(250,204,21,0.35)]', accent: 'from-yellow-400/15' }
                                : { label: 'Critical', dot: 'bg-orange-500', text: 'text-orange-300', bar: 'bg-orange-500/90', glow: 'shadow-[0_0_10px_rgba(249,115,22,0.35)]', accent: 'from-orange-500/15' };

                              const hoverAnim =
                                okr.status === 'critical'
                                  ? { scale: 1.02, x: [0, -1, 1, -1, 0] }
                                  : okr.status === 'attention'
                                  ? { scale: 1.03 }
                                  : { scale: 1.02 };

                            return (
                                <motion.div
                                  key={okr.title}
                                  whileHover={hoverAnim}
                                  whileTap={hoverAnim}
                                  whileFocus={hoverAnim}
                                  transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                                  tabIndex={0}
                                  role="button"
                                  aria-label={`${okr.title} OKR status: ${meta.label}`}
                                  className="relative rounded-2xl border border-white/10 bg-black/25 p-2.5 text-left overflow-hidden cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20"
                                >
                                  <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${meta.accent} to-transparent opacity-80`} />
                                  <div className={`pointer-events-none absolute -top-5 -right-5 w-16 h-16 rounded-full ${meta.dot} opacity-20 blur-[2px]`} />

                                <div className="relative">
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div className="text-white font-bold text-[11px] leading-tight whitespace-normal break-words">{okr.title}</div>
                                        <div className="text-spotify-light text-[9px] mt-1 leading-snug whitespace-normal break-words">{okr.subtitle}</div>
                                    </div>
                                    <div className="shrink-0 flex items-center gap-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${meta.glow}`}></span>
                                        <span className={`${meta.text} text-[8px] font-bold uppercase tracking-wider`}>{meta.label}</span>
                                    </div>
                                  </div>

                                  <div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                                    <div className={`h-full ${meta.bar}`} style={{ width: `${okr.progress}%` }} />
                                  </div>
                                </div>
                                </motion.div>
                            );
                          })}
                        </div>
                      </div>
                  </div>
                </section>

              {/* Section 4: Outtakes */}
              <section data-snap-page id="outtakes" className="h-full w-full py-16 px-6 bg-gradient-to-t from-black to-spotify-dark snap-start snap-always flex flex-col justify-center shrink-0 box-border overflow-hidden">
                  <div className="flex items-center gap-3 mb-8">
                       <div className="w-10 h-10 bg-spotify-green rounded-full flex items-center justify-center">
                          <Heart size={18} fill="black" className="text-black" />
                       </div>
                       <h2 className="text-3xl font-black">Outtakes</h2>
                  </div>
                  <ImageGrid />
                  <p className="mt-8 text-xl font-serif italic text-spotify-light text-center">"Chemistry happens offline."</p>
              </section>

              {/* Section 5: Farewell Susana (Metallica Theme) */}
              <section data-snap-page id="farewell" className="h-full w-full py-16 px-6 bg-[#101010] snap-start snap-always flex flex-col justify-center relative overflow-hidden shrink-0 box-border">
                   {/* Grit Overlay */}
                   <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                   
                   <div className="relative z-10 flex flex-col items-center w-full">
                        <div className="text-xs font-bold tracking-[0.3em] text-gray-400 mb-6 uppercase animate-pulse">Special Tribute</div>
                        <MetallicaCard />
                   </div>
              </section>

              {/* Section 6: Artist */}
                <section data-snap-page className="h-full w-full py-16 px-6 bg-black text-center snap-start snap-always flex flex-col justify-center shrink-0 box-border overflow-hidden">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-basf-neonPurple to-basf-neonBlue rounded-full mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(140,55,216,0.4)]">
                      <span className="text-4xl font-black">TM</span>
                  </div>
                  <h2 className="text-3xl font-black mb-2">Artist of the Year</h2>
                  <h3 className="text-lg text-spotify-green font-bold mb-6">Microsoft Account Team</h3>
                  <p className="text-sm text-spotify-light mb-6">Wishing everyone a Merry X-Mas.</p>
                  <button className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                    <Share2 size={18} /> See you in 2026
                  </button>
                  <div className="mt-8 flex flex-col items-center">
                  <Heart size={56} className="text-red-500" fill="#ef4444" />
                  <div className="mt-3 text-white font-black tracking-widest">THANK YOU</div>
                  </div>
                  <div className="h-20"></div> {/* Spacer for bottom player */}
              </section>

            </main>
         </div>

         {/* --- PLAYER BAR (Floating Overlay) --- */}
         {stage === 'wrapped' && (
         <div className="absolute bottom-6 left-4 right-4 bg-[#282828] rounded-xl p-2 pr-4 flex items-center justify-between shadow-2xl border border-white/5 z-40 backdrop-blur-md bg-opacity-95">
             <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-md flex-shrink-0 flex items-center justify-center">
                    <Music2 size={16} className="text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-white truncate">Best of BASF x MSFT</span>
                    <span className="text-[10px] text-spotify-green truncate">Playing now • 2025</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                 <Heart size={20} className="text-spotify-green" fill="#1DB954" />
                 <div onClick={togglePlay} className="cursor-pointer">
                    {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
                 </div>
             </div>
             {/* Progress bar specific to this mini player */}
             <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-white w-1/3 animate-pulse"></div>
             </div>
           </div>
           )}

         {/* Home Indicator */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default App;
