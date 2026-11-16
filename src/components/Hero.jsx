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
import ResumeModal from "./ResumeModal";
import RotatingGalaxy from "./RotatingGalaxy";

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
            <span>Hi, I'm</span>
          </p>

          {/* Display Name */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter mt-2.5 text-slate-900 dark:text-white leading-[1.04]">
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
              <span>Explore Portfolio</span>
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
              <span>Contact Me</span>
            </button>

            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-label="View and Download Curriculum Vitae"
              title="View & Download Curriculum Vitae (CV)"
              className="min-h-[48px] px-4 py-3 clay-btn-secondary text-sm flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>CV</span>
            </button>
          </div>

          {/* Key Highlights Row */}
          <div className="mt-10 pt-6 border-t border-slate-200/80 dark:border-slate-700/70 grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-lg">
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>{projectsData.length}</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">
                  {projectsData.length > 1 ? "+" : ""}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Projects Completed
              </p>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>{certificatesData.length}</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">+</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Certifications
              </p>
            </div>
            <div>
              <div className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white flex items-center justify-center lg:justify-start">
                <span>100</span>
                <span className="text-sky-600 dark:text-sky-400 ml-0.5">%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                Learning Dedication
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Tactile Clay + Liquid Glass Orbital Core with Rafi's Portrait */}
        <motion.div
          className="lg:col-span-5 flex justify-center items-center relative"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 flex items-center justify-center">
            {/* Subtle background ambient glow */}
            <div className="absolute w-72 h-72 rounded-full bg-sky-400/20 dark:bg-sky-500/15 blur-3xl -z-10 pointer-events-none" />

            {/* Outer Orbit Ring with Lucide icons */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-sky-400/40 dark:border-sky-400/25 pointer-events-none"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 clay-icon-box flex items-center justify-center shadow-md">
                <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-9 h-9 clay-icon-box flex items-center justify-center shadow-md">
                <Terminal className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Inner Orbit Ring */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              className="absolute inset-9 sm:inset-11 rounded-full border border-sky-300/50 dark:border-sky-500/20 pointer-events-none"
            >
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 clay-icon-box flex items-center justify-center shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 clay-icon-box flex items-center justify-center shadow-sm">
                <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              </div>
            </motion.div>

            {/* Center Rotating Cosmic Galaxy Core */}
            <motion.div
              initial={shouldReduceMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex items-center justify-center"
            >
              <RotatingGalaxy size={224} />
            </motion.div>

            {/* Floating Info Badge Top-Right */}
            <motion.div
              animate={shouldReduceMotion ? undefined : { y: [-5, 5, -5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 sm:-right-4 px-3.5 py-2.5 clay-card rounded-2xl flex items-center gap-2.5 shadow-lg z-20"
            >
              <div className="w-7 h-7 rounded-xl bg-sky-100 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 flex items-center justify-center shrink-0">
                <Code2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
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
              <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
                <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
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
