import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  ChevronDown,
  Layers,
} from "lucide-react";
import { personalData, certificatesData, projectsData } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { BlackHoleHeroSection } from "@/components/ui/blackhole-hero-section";
import ResumeModal from "./ResumeModal";

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(110);
  const [resumeOpen, setResumeOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center z-10">
        {/* Left Column: Intro & Value Proposition */}
        <motion.div
          className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left"
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

        {/* Right Column: Interactive 3D Schwarzschild Black Hole */}
        <motion.div
          className="lg:col-span-6 flex justify-center items-center relative"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [-8, 8, -8],
                  }
            }
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full max-w-[360px] sm:max-w-[490px] md:max-w-[540px] lg:max-w-[600px] xl:max-w-[640px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing"
          >
            {/* Soft Ambient Halo Behind the Black Hole */}
            <motion.div
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: [0.92, 1.08, 0.92],
                      opacity: [0.35, 0.65, 0.35],
                    }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-8 rounded-full bg-sky-400/25 dark:bg-sky-500/25 blur-3xl -z-10 pointer-events-none"
            />

            <BlackHoleHeroSection
              transparent
              interactive3D
              focus={[0.5, 0.5]}
              scrim="none"
              vignette={0}
              distance={17.5}
              elevation={-11}
              orbitSpeed={3.5}
              roll={-16}
              fov={50}
              spinSpeed={0.16}
              grain={0.56}
              doppler={0.55}
              starBrightness={0}
              hotColor={isDark ? "#F0F9FF" : "#BAE6FD"}
              midColor={isDark ? "#38BDF8" : "#0284C7"}
              coolColor={isDark ? "#1D4ED8" : "#0F172A"}
              brightness={isDark ? 1.2 : 1.35}
              glow={isDark ? 1.25 : 0.95}
              exposure={isDark ? 0.98 : 1.08}
              steps={230}
              resolution={0.78}
            />
          </motion.div>
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
