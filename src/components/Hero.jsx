import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Code2,
  Terminal,
  Cpu,
  Globe,
  ChevronDown,
  Layers,
} from "lucide-react";
import { personalData, certificatesData, projectsData } from "../data/portfolioData";
import wavingHandIcon from "../assets/icons/Waving-Hand--Streamline-Core.svg";
import galaxyIcon from "../assets/icons/Galaxy-1--Streamline-Core.svg";
import desktopCodeIcon from "../assets/icons/Desktop-Code--Streamline-Core.svg";
import layersIcon from "../assets/icons/Layers-1--Streamline-Core.svg";
import ResumeModal from "./ResumeModal";

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [resumeOpen, setResumeOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(personalData.roles[0]);
      return undefined;
    }

    const fullText = personalData.roles[currentRoleIndex];
    let pauseTimer = null;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(95 - Math.random() * 25);

        if (currentText.length + 1 === fullText.length) {
          pauseTimer = setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(48);

        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % personalData.roles.length);
          setTypingSpeed(280);
        }
      }
    }, typingSpeed);

    return () => {
      clearTimeout(timer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed, shouldReduceMotion]);

  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center z-10">
        {/* Left Column: Intro & Value Proposition */}
        <motion.div
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Status Pill */}
          <div className="clay-badge inline-flex items-center gap-2.5 px-4 py-1.5 text-xs font-mono mb-6">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span>{personalData.status}</span>
          </div>

          {/* Clean Greeting */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-semibold tracking-wide flex items-center gap-2">
            <span>Halo, perkenalkan saya</span>
          </p>

          {/* Display Name */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mt-2.5 text-slate-900 dark:text-white leading-[1.08]">
            <span className="block">{personalData.name.split(" ")[0]}</span>
            <span className="text-gradient-sky">
              {personalData.name.split(" ").slice(1).join(" ")}
            </span>
          </h1>

          {/* Role Typewriter */}
          <div className="mt-4 flex items-center gap-2 text-lg sm:text-2xl font-mono min-h-[40px]">
            <span className="text-sky-600 dark:text-sky-400 font-bold" aria-hidden="true">
              &gt;
            </span>
            <span className="text-sky-700 dark:text-sky-300 font-semibold">
              {currentText}
            </span>
            {!shouldReduceMotion && (
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.9 }}
                className="inline-block w-2 h-6 bg-sky-500 rounded-sm ml-0.5"
              />
            )}
          </div>

          {/* Bio */}
          <p className="mt-5 text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xl">
            {personalData.bio}
          </p>

          {/* Primary Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
            <button
              type="button"
              onClick={scrollToPortfolio}
              className="group min-h-[48px] px-6 py-3 clay-btn-primary text-sm flex items-center gap-2.5 cursor-pointer"
            >
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>Jelajahi Portfolio</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={scrollToContact}
              className="min-h-[48px] px-6 py-3 clay-btn-secondary text-sm flex items-center gap-2 cursor-pointer"
            >
              <span>Hubungi Saya</span>
            </button>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-label="Lihat dan Unduh Curriculum Vitae"
              title="Lihat & Unduh Curriculum Vitae (CV)"
              className="min-h-[48px] px-4 py-3 clay-btn-secondary text-sm flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>CV</span>
            </button>
          </div>

          {/* Key Highlights Row */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-700/70 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>{projectsData.length}</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">
                  {projectsData.length > 1 ? "+" : ""}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Proyek Selesai
              </p>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>{certificatesData.length}</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">+</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Sertifikasi
              </p>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>100</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Dedikasi Belajar
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Interactive Developer Code Hub */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-full max-w-md flex items-center justify-center py-6">
            {/* Subtle background ambient glow */}
            <div className="absolute w-64 h-64 rounded-full bg-sky-400/20 dark:bg-sky-500/15 blur-3xl -z-10 pointer-events-none" />

            {/* Subtle Ambient Orbit Ring */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full border border-dashed border-sky-300/40 dark:border-sky-500/20 pointer-events-none"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 clay-icon-box flex items-center justify-center">
                <Code2 className="w-3.5 h-3.5 text-sky-500" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 clay-icon-box flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-sky-500" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Central Modern Developer Code Terminal */}
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="w-full clay-card rounded-3xl overflow-hidden border-2 border-white/90 dark:border-slate-700/80 shadow-2xl relative z-10"
            >
              {/* Terminal Window Header Bar */}
              <div className="px-4 py-3 bg-gradient-to-r from-sky-50/90 via-white to-sky-100/80 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-b border-sky-100 dark:border-slate-700/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400/90 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-sm" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-sm" />
                  <span className="ml-2 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-sky-500" />
                    <span>rafi.config.ts</span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>v2.6 • Active</span>
                </div>
              </div>

              {/* Code Snippet Editor Body */}
              <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed bg-white/95 dark:bg-slate-950/90 text-slate-800 dark:text-slate-200 overflow-x-auto select-none">
                <div className="flex items-start gap-3">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">1</span>
                  <p className="text-slate-400 dark:text-slate-500 italic">
                    // 🚀 Passionate Junior Web Developer
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">2</span>
                  <p>
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">const</span>{" "}
                    <span className="text-sky-600 dark:text-sky-300 font-semibold">developer</span>{" "}
                    <span className="text-slate-500 dark:text-slate-400">=</span>{" "}
                    <span className="text-slate-600 dark:text-slate-300">&#123;</span>
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1 pl-4">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">3</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">name:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      &quot;Rafi Diandra Ardi Agusta&quot;</span>,
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1 pl-4">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">4</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">role:</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      &quot;Junior Developer&quot;</span>,
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1 pl-4">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">5</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">stack:</span>{" "}
                    <span className="text-slate-500 dark:text-slate-300">[</span>
                    <span className="text-amber-600 dark:text-amber-300">&quot;React&quot;</span>,{" "}
                    <span className="text-amber-600 dark:text-amber-300">&quot;Tailwind&quot;</span>,{" "}
                    <span className="text-amber-600 dark:text-amber-300">&quot;AI&quot;</span>
                    <span className="text-slate-500 dark:text-slate-300">]</span>,
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1 pl-4">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">6</span>
                  <p>
                    <span className="text-slate-600 dark:text-slate-400">readyForHire:</span>{" "}
                    <span className="text-sky-600 dark:text-sky-400 font-bold">true</span>
                  </p>
                </div>

                <div className="flex items-start gap-3 mt-1">
                  <span className="text-slate-400/70 select-none text-right w-4 shrink-0">7</span>
                  <p className="text-slate-600 dark:text-slate-300">&#125;;</p>
                </div>

                {/* Mini interactive prompt line */}
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="text-sky-500 font-bold">&gt;</span>
                  <span>ready to build modern web solutions</span>
                  <span className="w-1.5 h-3.5 bg-sky-500 animate-pulse ml-0.5" />
                </div>
              </div>
            </motion.div>

            {/* Floating Info Badge Top-Right */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 sm:-right-4 px-3.5 py-2.5 clay-card rounded-2xl flex items-center gap-2.5 shadow-lg z-20"
            >
              <div className="keep-light w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                <img src={galaxyIcon} alt="" className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  Clean Architecture
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Best Practices
                </p>
              </div>
            </motion.div>

            {/* Floating Info Badge Bottom-Left */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [5, -5, 5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute -bottom-3 -left-2 sm:-left-4 px-3.5 py-2.5 clay-card rounded-2xl flex items-center gap-2.5 shadow-lg z-20"
            >
              <div className="keep-light w-8 h-8 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                <img src={layersIcon} alt="" className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                  React &amp; Tailwind
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Liquid Glass UI
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Control */}
      <button
        type="button"
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        aria-label="Gulir ke bagian Tentang Saya"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 px-4 py-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">
          Scroll Down
        </span>
        <ChevronDown className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
      </button>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}
