/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { HeroScene, WaveScene } from './components/QuantumScene';
import { StatCard, Playlist, WrappedSummary, ImageGrid, MetallicaCard } from './components/Diagrams';
import { Play, Pause, Heart, Music2, Battery, Wifi, Signal, Share2, Lock, Delete } from 'lucide-react';
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

const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set volume when audio loads
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // Very low volume
    }
  }, []);

  // Toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.15;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle unlock - start music automatically
  const handleUnlock = () => {
    setIsLocked(false);
    if (audioRef.current) {
      audioRef.current.volume = 0.15;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => (p + 0.5) % 100);
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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
      <div className="relative w-full max-w-[430px] h-[920px] bg-black rounded-[55px] shadow-[0_0_0_12px_#1f1f1f,0_0_0_14px_#3f3f3f,0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden border-[8px] border-black ring-1 ring-white/10 z-10 flex flex-col transform transition-transform duration-700 ease-out hover:scale-[1.01]">
         
         {/* Lock Screen Overlay */}
         <AnimatePresence>
           {isLocked && (
             <LockScreen onUnlock={handleUnlock} currentTime={currentTime} />
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
         <div className="w-full h-full overflow-y-auto no-scrollbar bg-spotify-dark relative text-white snap-y snap-mandatory scroll-smooth phone-scroll-container">
            
            {/* Mobile Navbar (Absolute within Phone) */}
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

            {/* --- HERO SECTION --- */}
            <header className="relative min-h-[calc(920px-100px)] w-full flex flex-col items-center justify-center overflow-hidden snap-start snap-always shrink-0">
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

            <main className="relative z-10 w-full">
              
              {/* Section 1: The Vibe */}
              <section className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-gradient-to-b from-spotify-dark to-[#0a0a0a] snap-start snap-always flex flex-col justify-center shrink-0 box-border">
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
                      {['#CoPilot', '#ChemistryAI', '#Sustainability'].map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-full bg-spotify-grey/50 text-white text-[10px] font-bold border border-white/10">
                              {tag}
                          </span>
                      ))}
                  </div>
              </section>

              {/* Section 2: Top Tracks */}
              <section id="top-hits" className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-black relative overflow-hidden snap-start snap-always flex flex-col justify-center shrink-0 box-border">
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
              <section id="stats" className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-spotify-dark relative snap-start snap-always flex flex-col justify-center shrink-0 box-border">
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

              {/* Section 4: Outtakes */}
              <section id="outtakes" className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-gradient-to-t from-black to-spotify-dark snap-start snap-always flex flex-col justify-center shrink-0 box-border">
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
              <section id="farewell" className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-[#101010] snap-start snap-always flex flex-col justify-center relative overflow-hidden shrink-0 box-border">
                   {/* Grit Overlay */}
                   <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
                   
                   <div className="relative z-10 flex flex-col items-center w-full">
                        <div className="text-xs font-bold tracking-[0.3em] text-gray-400 mb-6 uppercase animate-pulse">Special Tribute</div>
                        <MetallicaCard />
                   </div>
              </section>

              {/* Section 6: Artist */}
              <section className="min-h-[calc(920px-100px)] w-full py-16 px-6 bg-black text-center snap-start snap-always flex flex-col justify-center shrink-0 box-border">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-basf-neonPurple to-basf-neonBlue rounded-full mb-6 flex items-center justify-center shadow-[0_0_30px_rgba(140,55,216,0.4)]">
                      <span className="text-4xl font-black">TM</span>
                  </div>
                  <h2 className="text-3xl font-black mb-2">Artist of the Year</h2>
                  <h3 className="text-lg text-spotify-green font-bold mb-6">Microsoft Account Team</h3>
                  <button className="flex items-center justify-center w-full gap-2 px-6 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors">
                      <Share2 size={18} /> Share Wrapped
                  </button>
                  <div className="h-20"></div> {/* Spacer for bottom player */}
              </section>

            </main>
         </div>

         {/* --- PLAYER BAR (Floating Overlay) --- */}
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

         {/* Home Indicator */}
         <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[120px] h-[5px] bg-white/40 rounded-full z-50 pointer-events-none"></div>

      </div>
    </div>
  );
};

export default App;
