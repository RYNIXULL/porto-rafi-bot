import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Heart, ArrowUp, Sparkles, Terminal } from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 border-t border-blue-950/70 bg-[#030611] z-10 overflow-hidden">
      {/* Top subtle blue laser beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#2c67ed] to-transparent shadow-[0_0_12px_#2c67ed]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Quote */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2c67ed] flex items-center justify-center shadow-[0_0_15px_rgba(44,103,237,0.7)]">
                <Rocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-base text-white tracking-wider">
                RAFI<span className="text-[#2c67ed]">.DEV</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-sm">
              Menjelajahi batas tak terhingga teknologi web modern dengan kode bersih, estetika futuristik, dan performa prima.
            </p>
          </div>

          {/* Quick status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#080f28] border border-blue-500/20 text-xs font-mono text-blue-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>ORBIT STATUS: OPERATIONAL</span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group p-3 rounded-2xl bg-[#090f28] hover:bg-[#2c67ed] border border-blue-500/30 hover:border-transparent text-slate-300 hover:text-white shadow-[0_0_15px_rgba(44,103,237,0.2)] hover:shadow-[0_0_25px_rgba(44,103,237,0.6)] transition-all duration-300 flex items-center gap-2 cursor-pointer"
            title="Kembali ke atas"
          >
            <span className="text-xs font-semibold hidden sm:inline">Orbit Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-950/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <span className="text-[#2c67ed] font-semibold">React + Tailwind + Framer Motion</span>
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
          </p>
        </div>
      </div>
    </footer>
  );
}

