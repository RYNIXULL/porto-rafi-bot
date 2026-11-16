import React from "react";
import { ArrowUp, Code2 } from "lucide-react";
import { personalData } from "../data/portfolioData";
import rapibotLogo from "../assets/icons/RAPIBOT.svg";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/65 dark:bg-slate-950/65 backdrop-blur-xl z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Summary */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5">
              <div className="keep-light w-9 h-9 rounded-2xl bg-gradient-to-br from-white to-sky-50 border border-white shadow-sm flex items-center justify-center p-1.5">
                <img src={rapibotLogo} alt="" className="w-full h-full object-contain" aria-hidden="true" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 dark:text-white tracking-tight">
                RAFI<span className="text-sky-600 dark:text-sky-400">.DEV</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 max-w-sm leading-relaxed">
              Membangun pengalaman web modern dengan kode bersih, desain Liquid Glass yang presisi, dan aksesibilitas prima.
            </p>
          </div>

          {/* Operational Status Badge */}
          <div className="clay-badge px-4 py-1.5 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
            <span>STATUS: OPERATIONAL</span>
          </div>

          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas halaman"
            title="Kembali ke atas"
            className="group min-h-[44px] px-4 py-2.5 rounded-2xl clay-btn-secondary text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <span>Ke Atas</span>
            <ArrowUp
              className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {personalData.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>Built with</span>
            <span className="text-sky-700 dark:text-sky-300 font-semibold">
              React + Tailwind CSS + Liquid Glass UI
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
