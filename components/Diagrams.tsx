/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, Zap, Music, MoreHorizontal, Clock, Hash, Skull, DollarSign } from 'lucide-react';

// --- WRAPPED SUMMARY CARD (Top Genre Style) ---
export const WrappedSummary: React.FC = () => {
  const [coverSrc, setCoverSrc] = useState<string>('/headwinds-everywhere.jpg');

  const fallbackCoverSrc = useMemo(() => '/Michael.jpg', []);

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative w-full h-full bg-gradient-to-br from-basf-neonPurple via-basf-neonBlue to-spotify-green p-1 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
        <div className="w-full h-full bg-black/20 rounded-[20px] p-8 flex flex-col justify-between relative overflow-hidden border border-white/20">
            {/* Album cover photo */}
            <img
                src={coverSrc}
                alt="Album cover"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                onError={() => {
                    if (coverSrc !== fallbackCoverSrc) setCoverSrc(fallbackCoverSrc);
                }}
            />

            {/* Legibility overlay */}
            <div className="absolute inset-0 bg-black/35" />

            {/* Decorative shapes */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-spotify-green rounded-full blur-[80px] opacity-60 mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-basf-neonPurple rounded-full blur-[60px] opacity-60 mix-blend-screen"></div>

            <div className="relative z-10">
                <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-2">BASF x Microsoft</div>
                <div className="text-3xl font-black text-white leading-tight">
                    2025: <br />Headwinds Everywhere
                </div>
            </div>

            <div className="relative z-10 self-center">
                  <div className="w-48 h-48 bg-white/5 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-sm shadow-2xl animate-spin-slow">
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
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
    <div className="group flex items-center gap-3 p-2 rounded-md hover:bg-white/10 transition-colors cursor-default">
        <div className="w-5 text-center text-spotify-light text-xs font-mono group-hover:hidden">{index}</div>
        <div className="w-5 hidden group-hover:flex justify-center text-white"><Play size={12} fill="white"/></div>
        
        <div className="flex-1 min-w-0">
            <div className="font-bold text-white text-sm leading-tight">{title}</div>
            <div className="text-xs text-spotify-light leading-tight mt-0.5">{artist}</div>
        </div>
        
        <div className="text-xs text-spotify-light font-medium text-right w-20">{plays}</div>
        <div className="text-xs text-spotify-light font-mono w-8 text-right">{duration}</div>
    </div>
);

export const Playlist: React.FC = () => {
    const tracks = [
        { title: "Copilot Adoption", artist: "Success • Everyday AI", plays: "High", duration: "Q1" },
        { title: "Market Place Success", artist: "Commercial Excellence • Foundation", plays: "Grow", duration: "Q2" },
        { title: "Exchange with the Business", artist: "Coatings • AP • ECMS", plays: "Critical", duration: "Q3" },
        { title: "Agentic Transformation", artist: "First-of-a-kind", plays: "Fantastic", duration: "Q3" },
        { title: "Global Footprint", artist: "Global Presence", plays: "Critical", duration: "Q4" },
    ];

    return (
        <div className="w-full">
            <div className="flex items-center gap-3 text-[10px] font-bold text-spotify-light uppercase tracking-wider border-b border-white/10 pb-2 mb-2 px-2">
                <div className="w-5 text-center"><Hash size={10} className="inline"/></div>
                <div className="flex-1">Title</div>
                <div className="w-20 text-right">Impact Level</div>
                <div className="w-8 text-right"><Clock size={10} className="inline"/></div>
            </div>
            <div className="flex flex-col">
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
            whileHover={{ scale: 1.02 }}
            className={`p-[2px] rounded-2xl bg-gradient-to-r ${color} h-full`}
        >
            <div className="bg-[#181818] h-full rounded-[14px] p-5 flex items-center gap-5 relative overflow-hidden">
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    {icon === 'teams' && <Users size={28} className="text-white" />}
                    {icon === 'copilot' && <Zap size={28} className="text-white" />}
                    {icon === 'coffee' && <Music size={28} className="text-white" />}
                    {icon === 'dollar' && <DollarSign size={28} className="text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-spotify-light font-semibold text-sm uppercase tracking-wide mb-1">{title}</div>
                    <div className="text-4xl font-black text-white leading-none">{value}</div>
                    <div className="text-sm text-spotify-light mt-2">{subtitle}</div>
                </div>
            </div>
        </motion.div>
    );
};

// --- IMAGE GRID (Outtakes) ---
export const ImageGrid: React.FC = () => {
    const images = [
        { src: "/Dietrich.jpg", caption: "AI Tour in Frankfurt" },
        { src: "/Martin.jpg", caption: "Generalgenosse Martin" },
        { src: "/EBC.jpg", caption: "EBC @ Redmond" },
        { src: "/Weinheim.jpg", caption: "Team Fun in Weinheim" },
    ];

    return (
        <div className="grid grid-cols-2 gap-3">
            {images.map((item, i) => (
                <div key={i} className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer shadow-lg">
                    <img 
                        src={item.src} 
                        alt={item.caption}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    
                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                        <p className="font-bold text-xs text-white drop-shadow-lg">{item.caption}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};