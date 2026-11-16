import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BarChart3,
  Calendar,
  MapPin,
  Award,
  FolderCheck,
  GitCommit,
  ShieldCheck,
  Target,
  User,
  Code2,
  Trophy,
} from "lucide-react";
import {
  personalData,
  educationData,
  statsData,
} from "../data/portfolioData";

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  const statIcons = {
    FolderCheck,
    GitCommit,
    Award,
    ShieldCheck,
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono mb-3">
          <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>EXPLORING MY BACKGROUND</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Tentang <span className="text-gradient-sky">Diri Saya</span>
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Mengenal lebih dekat perjalanan saya di dunia teknologi, riwayat pendidikan akademis, pengalaman profesional, serta dedikasi dalam membangun produk digital.
        </p>
      </div>

      {/* Top Profile Card & Core Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        {/* Profile Avatar Card */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 clay-card p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden group"
        >
          <span className="specular-sweep" aria-hidden="true" />

          {/* Avatar with Orbit Ring */}
          <div className="relative mb-6">
            <motion.div
              animate={shouldReduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-3 rounded-full border-2 border-dashed border-sky-400/50 dark:border-sky-400/35"
              aria-hidden="true"
            />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-sky-400 via-sky-500 to-cyan-400 shadow-[0_14px_30px_-6px_rgba(14,165,233,0.45)]">
              <img
                src={personalData.avatarUrl}
                alt={personalData.name}
                className="w-full h-full object-cover object-[center_18%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
            </div>

            <div className="clay-badge absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
              <span className="text-emerald-700 dark:text-emerald-400">Available for Hire</span>
            </div>
          </div>

          <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white mt-2">
            {personalData.name}
          </h3>
          <p className="text-sm text-sky-600 dark:text-sky-400 font-mono font-semibold mt-1">
            Junior Developer &amp; Tech Enthusiast
          </p>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-4 max-w-sm">
            "Fokus saya adalah menciptakan pengalaman web yang tidak hanya indah secara visual, namun juga teruji secara performa, aksesibilitas, dan skalabilitas."
          </p>

          <div className="w-full pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-700/70 flex flex-col gap-3 text-xs sm:text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                Domisili:
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                Lampung, Indonesia
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                Pendidikan:
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">
                D3 Manajemen Informatika - Polinela
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                Minat Utama:
              </span>
              <span className="font-semibold text-sky-700 dark:text-sky-300">
                Frontend, Fullstack, AI
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Info: Vision & 4 Metrics */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 flex flex-col justify-between gap-6"
        >
          {/* Vision Card */}
          <div className="clay-card p-6 sm:p-7 relative overflow-hidden group">
            <span className="specular-sweep" aria-hidden="true" />
            <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <span className="w-9 h-9 clay-icon-box flex items-center justify-center">
                <Target className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>Visi &amp; Filosofi Kerja</span>
            </h4>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Sebagai junior developer, saya memandang setiap baris kode sebagai pondasi sistem yang kokoh. Saya senantiasa mengadopsi teknologi terbaru, berdisiplin tinggi dalam penulisan kode bersih (clean code), dan haus belajar hal-hal baru untuk memecahkan masalah nyata.
            </p>
          </div>

          {/* 4 Key Statistics Cards */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3.5 flex items-center gap-2 font-semibold">
              <BarChart3 className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
              <span>Statistik &amp; Metrik Proyek</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {statsData.map((stat) => {
                const IconComponent = statIcons[stat.icon] || FolderCheck;
                return (
                  <div
                    key={stat.label}
                    className="clay-card p-5 relative overflow-hidden group"
                  >
                    <span className="specular-sweep" aria-hidden="true" />

                    <div className="w-11 h-11 clay-icon-box flex items-center justify-center mb-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <div className="font-heading text-3xl font-bold tracking-tight text-gradient-sky">
                      {stat.value}
                    </div>

                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">
                      {stat.label}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-snug">
                      {stat.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Education Timeline */}
      <div className="mt-12">
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="clay-badge inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-bold font-mono">
            <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
            <span>Riwayat Pendidikan (Education)</span>
          </div>
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-3">
            Latar Belakang Akademis
          </h3>
        </div>

        {/* Education Timeline Display */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {educationData.map((edu) => (
            <div
              key={edu.institution}
              className="relative pl-6 sm:pl-8 pb-8 border-l-2 border-sky-300 dark:border-sky-700/60 last:border-transparent last:pb-0 group"
            >
              <div
                className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-sky-500 shadow-[0_0_0_4px_rgba(56,189,248,0.2)] transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              />

              <div className="clay-card p-6 relative overflow-hidden">
                <span className="specular-sweep" aria-hidden="true" />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="clay-badge inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <div className="inline-block my-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-500/15 border border-sky-200 dark:border-sky-500/30 text-xs font-semibold text-sky-700 dark:text-sky-300 font-mono">
                  {edu.gpa}
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>

                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {edu.achievements.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <Trophy
                          className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
