import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Download, 
  Sparkles, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Compass, 
  ChevronDown 
} from 'lucide-react';
import { personalData, certificatesData, projectsData } from '../data/portfolioData';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  // Typewriter effect
  useEffect(() => {
    const fullText = personalData.roles[currentRoleIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100 - Math.random() * 30); // natural typing jitter

        if (currentText.length + 1 === fullText.length) {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting backward
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personalData.roles.length);
          setTypingSpeed(300);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Column: Intro & Typing Name */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d1636]/80 border border-[#2c67ed]/40 text-blue-300 text-xs font-mono shadow-[0_0_15px_rgba(44,103,237,0.35)] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2c67ed]"></span>
            </span>
            <span>TRANSMISSION ONLINE • ORBIT STABLE</span>
          </motion.div>

          {/* Subheading greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 font-medium tracking-wide flex items-center gap-2"
          >
            <span>Halo semua!</span>
            <span className="inline-block animate-wave">👋</span>
            <span>Saya</span>
          </motion.p>

          {/* Big Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mt-2 text-white"
          >
            <span className="block drop-shadow-[0_0_35px_rgba(44,103,237,0.35)]">
              {personalData.name.split(' ')[0]}
            </span>
            <span className="text-gradient-cosmic drop-shadow-[0_0_40px_rgba(44,103,237,0.6)]">
              {personalData.name.split(' ').slice(1).join(' ')}
            </span>
          </motion.h1>

          {/* Typewriter text line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-mono min-h-[44px]"
          >
            <span className="text-blue-400/80 font-bold">&gt;</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-[#5388ff] to-[#00e5ff] font-semibold">
              {currentText}
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-7 sm:h-8 bg-[#2c67ed] shadow-[0_0_12px_#2c67ed] rounded-sm ml-0.5"
            />
          </motion.div>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-slate-300/90 text-sm sm:text-base leading-relaxed max-w-xl"
          >
            {personalData.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4"
          >
            <button
              onClick={scrollToPortfolio}
              className="group relative px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#2c67ed] via-[#2154cb] to-[#1a44a6] hover:from-[#3f76f4] hover:to-[#2c67ed] shadow-[0_0_25px_rgba(44,103,237,0.6)] hover:shadow-[0_0_35px_rgba(44,103,237,0.85)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-blue-200" />
              <span>Jelajahi Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={scrollToContact}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-[#090f24]/80 hover:bg-[#14224f]/90 border border-[#2c67ed]/40 hover:border-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.2)] hover:shadow-[0_0_25px_rgba(44,103,237,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-95 flex items-center gap-2"
            >
              <span>Hubungi Saya</span>
            </button>

            <a
              href="#resume"
              onClick={(e) => {
                e.preventDefault();
                alert(`Mempersiapkan unduhan resume ${personalData.name}...`);
              }}
              className="p-3.5 rounded-xl text-slate-300 hover:text-white bg-[#090f24]/60 hover:bg-[#14224f] border border-blue-900/40 hover:border-blue-500/50 transition-all duration-200 hover:scale-105"
              title="Unduh Curriculum Vitae (CV)"
            >
              <Download className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Highlights Mini Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-10 pt-6 border-t border-blue-950/60 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center justify-center lg:justify-start">
                <span>{projectsData.length}</span><span className="text-[#2c67ed]">{projectsData.length > 1 ? '+' : ''}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Proyek Selesai</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center justify-center lg:justify-start">
                <span>{certificatesData.length}</span><span className="text-[#00e5ff]">{certificatesData.length > 1 ? '+' : ''}</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Sertifikasi</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center justify-center lg:justify-start">
                <span>100</span><span className="text-[#38bdf8]">%</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Dedikasi Belajar</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Cosmic Planet / Hologram Core Graphic */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main Visual Vessel / Orbit System */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
            
            {/* Outer Orbit Ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-[#2c67ed]/35"
            >
              {/* Satellite Node: React */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-space-900 border border-[#2c67ed] shadow-[0_0_15px_#2c67ed] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-blue-400" />
              </div>
              {/* Satellite Node: Terminal */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-space-900 border border-[#00e5ff] shadow-[0_0_15px_#00e5ff] flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#00e5ff]" />
              </div>
            </motion.div>

            {/* Inner Orbit Ring 2 (Reversed) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 sm:inset-10 rounded-full border border-blue-500/20"
            >
              {/* Satellite Node: Chip */}
              <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-7 h-7 rounded-full bg-space-900 border border-purple-500 shadow-[0_0_12px_#a855f7] flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
              </div>
              {/* Satellite Node: Globe */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-7 h-7 rounded-full bg-space-900 border border-blue-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-sky-300" />
              </div>
            </motion.div>

            {/* Glowing Celestial Cosmic Core */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1 bg-gradient-to-tr from-[#2c67ed] via-[#00e5ff] to-[#7c3aed] shadow-[0_0_60px_rgba(44,103,237,0.7)] animate-pulse-glow flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#050914] overflow-hidden relative flex flex-col items-center justify-center p-4">
                {/* Internal galaxy swirl texture */}
                <div 
                  className="absolute inset-0 opacity-40 animate-spin-slow"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(44,103,237,0.8) 0%, rgba(5,9,20,0) 70%)'
                  }}
                />

                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  <span className="text-4xl sm:text-5xl">👨‍🚀</span>
                  <span className="text-xs font-mono font-bold tracking-wider text-blue-300 mt-2">
                    ASTRO.CODE
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    ONLINE • READY
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Floating Info Tag 1 */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 -right-2 sm:right-2 px-3 py-2 rounded-xl bg-space-900/90 border border-blue-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(44,103,237,0.4)] flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">Clean Architecture</p>
                <p className="text-[9px] text-blue-300/80 font-mono">Best Practices</p>
              </div>
            </motion.div>

            {/* Floating Info Tag 2 */}
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-4 sm:left-0 px-3.5 py-2 rounded-xl bg-space-900/90 border border-[#00e5ff]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center gap-2.5"
            >
              <div className="p-1 rounded bg-[#2c67ed]/20 text-[#00e5ff]">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-white leading-tight">React & Tailwind CSS</p>
                <p className="text-[9px] text-cyan-300/80 font-mono">Modern UI Ecosystem</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-slate-400 hover:text-blue-300 transition-colors"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
        <ChevronDown className="w-4 h-4 text-[#2c67ed]" />
      </motion.div>
    </section>
  );
}

