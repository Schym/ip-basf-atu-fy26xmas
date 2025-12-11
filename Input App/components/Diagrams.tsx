/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, Zap, Music, MoreHorizontal, Clock, Hash, Skull } from 'lucide-react';

// --- WRAPPED SUMMARY CARD (Top Genre Style) ---
export const WrappedSummary: React.FC = () => {
  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative w-full h-full bg-gradient-to-br from-basf-neonPurple via-basf-neonBlue to-spotify-green p-1 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
        <div className="w-full h-full bg-black/20 backdrop-blur-sm rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden border border-white/20">
            {/* Decorative shapes */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-spotify-green rounded-full blur-[80px] opacity-60 mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-basf-neonPurple rounded-full blur-[60px] opacity-60 mix-blend-screen"></div>

            <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">BASF x Microsoft</div>
                <div className="text-4xl font-black text-white leading-none">2025<br/>WRAPPED</div>
            </div>

            <div className="relative z-10 self-center">
                 <div className="w-48 h-48 bg-white/10 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-md shadow-2xl animate-spin-slow">
                    <div className="w-16 h-16 bg-white rounded-full"></div>
                    <div className="absolute inset-0 rounded-full border-t-4 border-spotify-green"></div>
                 </div>
            </div>

            <div className="relative z-10 mt-8">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-sm font-medium text-white/80">Top Vibe</div>
                        <div className="text-2xl font-bold text-white">Digital Alchemy</div>
                    </div>
                    <div className="text-5xl">⚗️</div>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

// --- METALLICA CARD (Farewell) ---
export const MetallicaCard: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="w-full aspect-square bg-neutral-900 rounded-lg overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.8)] border border-white/10 group"
        >
             {/* Album Art Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black z-0"></div>
             
             {/* "Texture" */}
             <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #111 25%, #111 75%, #000 75%, #000)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px'}}></div>

             <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                 {/* Band Name Style */}
                 <div className="mb-4">
                     <h2 className="text-4xl font-extrabold text-white tracking-widest" style={{ fontFamily: 'serif', transform: 'scaleY(1.5)' }}>SUSANA</h2>
                     <div className="w-full h-[2px] bg-white/50 mt-1"></div>
                 </div>

                 {/* Graphic Centerpiece */}
                 <div className="w-32 h-32 mb-6 relative">
                     <div className="absolute inset-0 border-[6px] border-white/20 rotate-45 transform skew-x-12"></div>
                     <div className="absolute inset-0 border-[2px] border-white/60 -rotate-12 flex items-center justify-center">
                        <Skull size={48} className="text-white/80" strokeWidth={1.5} />
                     </div>
                 </div>

                 {/* Song Title */}
                 <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide font-serif leading-none">Goodbye<br/>& Farewell</h3>
                 
                 {/* Subtitle / Artist */}
                 <p className="text-xs text-spotify-green uppercase tracking-[0.2em] font-bold mt-2">Good Luck with Siemens</p>
                 
                 {/* Explicit Tag */}
                 <div className="absolute bottom-4 right-4 border border-white/30 px-1 py-0.5 rounded-[2px]">
                     <span className="text-[8px] font-bold text-white/50 block leading-tight">PARENTAL<br/>ADVISORY</span>
                 </div>
             </div>
             
             {/* Play Overlay */}
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center pl-1 cursor-pointer hover:scale-105 transition-transform">
                     <Play size={24} fill="black" className="text-black" />
                 </div>
             </div>
        </motion.div>
    )
}

// --- PLAYLIST COMPONENT ---
interface TrackProps {
    index: number;
    title: string;
    artist: string;
    plays: string;
    duration: string;
}

const Track: React.FC<TrackProps> = ({ index, title, artist, plays, duration }) => (
    <div className="group flex items-center gap-4 p-3 rounded-md hover:bg-white/10 transition-colors cursor-default">
        <div className="w-6 text-center text-spotify-light text-sm font-mono group-hover:hidden">{index}</div>
        <div className="w-6 hidden group-hover:flex justify-center text-white"><Play size={14} fill="white"/></div>
        
        <div className="flex-1 min-w-0">
            <div className="font-bold text-white truncate text-base">{title}</div>
            <div className="text-sm text-spotify-light truncate">{artist}</div>
        </div>
        
        <div className="hidden md:block text-sm text-spotify-light font-medium">{plays}</div>
        <div className="text-sm text-spotify-light font-mono w-12 text-right">{duration}</div>
    </div>
);

export const Playlist: React.FC = () => {
    const tracks = [
        { title: "Project ChemAI", artist: "Optimization & Logistics • Feat. Azure OpenAI", plays: "High Impact", duration: "Q1" },
        { title: "Verbund Data Lake", artist: "Infrastructure • The Foundation", plays: "Scale", duration: "Q2" },
        { title: "Supply Chain Symphony", artist: "Dynamics 365 • Real-time beats", plays: "Efficiency", duration: "Q2" },
        { title: "Sustainability Dashboard", artist: "ESG • Green Energy Mix", plays: "Future Ready", duration: "Q3" },
        { title: "Co-Pilot Rollout", artist: "Productivity • The Global Tour", plays: "Viral", duration: "Q4" },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-4 text-xs font-bold text-spotify-light uppercase tracking-widest border-b border-white/10 pb-2 mb-2 px-3">
                <div className="w-6 text-center">#</div>
                <div className="flex-1">Title</div>
                <div className="hidden md:block">Impact Level</div>
                <div className="w-12 text-right"><Clock size={14} className="inline"/></div>
            </div>
            <div className="flex flex-col gap-1">
                {tracks.map((track, i) => (
                    <Track key={i} index={i + 1} {...track} />
                ))}
            </div>
        </div>
    );
};

// --- STAT CARD ---
export const StatCard: React.FC<{title: string, value: string, subtitle: string, color: string, icon: string}> = ({ title, value, subtitle, color, icon }) => {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className={`p-1 rounded-2xl bg-gradient-to-br ${color} h-full`}
        >
            <div className="bg-[#181818] h-full rounded-xl p-6 flex flex-col items-center text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 z-10">
                    {icon === 'teams' && <Users className="text-white" />}
                    {icon === 'copilot' && <Zap className="text-white" />}
                    {icon === 'coffee' && <Music className="text-white" />}
                </div>

                <div className="text-spotify-light font-bold text-sm tracking-widest uppercase mb-2 z-10">{title}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-4 z-10">{value}</div>
                <p className="text-sm text-spotify-light z-10">{subtitle}</p>
            </div>
        </motion.div>
    );
};

// --- IMAGE GRID (Outtakes) ---
export const ImageGrid: React.FC = () => {
    // Placeholders for user to swap later
    const placeholders = [
        { color: "bg-pink-500", caption: "Team Dinner @ Redmond" },
        { color: "bg-blue-500", caption: "Hackathon Winning Moment" },
        { color: "bg-green-500", caption: "Site Visit Ludwigshafen" },
        { color: "bg-yellow-500", caption: "Coffee Break Brainstorm" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {placeholders.map((item, i) => (
                <div key={i} className={`relative group aspect-square rounded-md overflow-hidden ${item.color} cursor-pointer`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl opacity-50 rotate-12">📷</span>
                    </div>
                    
                    {/* Caption Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                        <p className="font-bold text-sm">{item.caption}</p>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-2 right-2">
                        <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                            <Hash size={14} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};