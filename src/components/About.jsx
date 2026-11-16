import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, 
  Briefcase, 
  BarChart3, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  Award, 
  Rocket, 
  GitCommit, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  personalData, 
  educationData, 
  experienceData, 
  statsData 
} from '../data/portfolioData';

export default function About() {
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' | 'education' | 'stats'

  const statIcons = {
    Rocket: Rocket,
    GitCommit: GitCommit,
    Award: Award,
    ShieldCheck: ShieldCheck
  };

  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1636]/80 border border-[#2c67ed]/40 text-blue-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(44,103,237,0.3)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>EXPLORING MY BACKGROUND</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Tentang <span className="text-gradient-cosmic">Diri Saya</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl"
        >
          Mengenal lebih dekat perjalanan saya di dunia teknologi, riwayat pendidikan akademis, pengalaman profesional, serta dedikasi dalam membangun produk digital.
        </motion.p>
      </div>

      {/* Top Profile Card & Core Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        
        {/* Profile Avatar Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 rounded-3xl p-6 sm:p-8 bg-[#050914]/80 backdrop-blur-xl border border-[#2c67ed]/30 shadow-[0_0_30px_rgba(44,103,237,0.25)] flex flex-col items-center text-center relative overflow-hidden group"
        >
          {/* Cosmic background glow inside card */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#2c67ed]/20 blur-3xl pointer-events-none group-hover:bg-[#2c67ed]/35 transition-all duration-500" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-[#00e5ff]/15 blur-3xl pointer-events-none" />

          {/* Avatar with Animated Orbit Ring */}
          <div className="relative mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3.5 rounded-full border-2 border-dashed border-[#2c67ed]/60"
            />
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#2c67ed] via-[#38bdf8] to-[#7c3aed] shadow-[0_0_30px_rgba(44,103,237,0.6)]">
              <img
                src={personalData.avatarUrl}
                alt={personalData.name}
                className="w-full h-full object-cover object-[center_18%] rounded-full hover:scale-105 transition-all duration-500"
              />
            </div>
            
            {/* Status Pill Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-space-950 border border-emerald-500/50 text-[11px] font-medium text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Hire</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white mt-2">{personalData.name}</h3>
          <p className="text-sm text-blue-400 font-mono mt-1">Junior Developer & Tech Enthusiast</p>

          <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mt-4 max-w-sm">
            "Fokus saya adalah menciptakan pengalaman web yang tidak hanya indah secara visual, namun juga teruji secara performa, aksesibilitas, dan skalabilitas."
          </p>

          <div className="w-full pt-6 mt-6 border-t border-blue-900/30 flex flex-col gap-2.5 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-400" /> Domisili:
              </span>
              <span className="font-medium text-slate-200">Jakarta, Indonesia</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-400" /> Pendidikan Terakhir:
              </span>
              <span className="font-medium text-slate-200">S1 Teknik Informatika (Ongoing)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" /> Minat Utama:
              </span>
              <span className="font-medium text-blue-300">Frontend, Fullstack, AI Integration</span>
            </div>
          </div>
        </motion.div>

        {/* Right Info: Project Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-between gap-6"
        >
          {/* Quick Intro Banner */}
          <div className="p-6 rounded-3xl bg-[#070c20]/80 border border-[#2c67ed]/30 shadow-[0_0_20px_rgba(44,103,237,0.2)]">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <Rocket className="w-5 h-5 text-[#2c67ed]" />
              <span>Visi & Filosofi Kerja</span>
            </h4>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Sebagai junior developer, saya memandang setiap baris kode sebagai pondasi sistem yang kokoh. Saya senantiasa mengadopsi teknologi terbaru, berdisiplin tinggi dalam penulisan kode bersih (clean code), dan haus belajar hal-hal baru untuk memecahkan masalah nyata.
            </p>
          </div>

          {/* 4 Key Statistics Cards */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-300/80 mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#2c67ed]" />
              <span>Statistik & Metrik Proyek</span>
            </h4>

            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat, idx) => {
                const IconComponent = statIcons[stat.icon] || Rocket;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="p-5 rounded-2xl bg-[#050914]/80 border border-blue-500/20 hover:border-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.15)] hover:shadow-[0_0_25px_rgba(44,103,237,0.4)] transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[#2c67ed]/10 rounded-bl-full pointer-events-none group-hover:bg-[#2c67ed]/20 transition-all" />
                    
                    <div className="p-2.5 w-fit rounded-xl bg-[#0e193d] border border-blue-500/30 text-[#5388ff] mb-3 group-hover:scale-110 group-hover:text-white transition-all">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight text-gradient-cosmic">
                      {stat.value}
                    </div>

                    <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                      {stat.label}
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">
                      {stat.description}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Sub-Navigation for Timelines: Experience vs Education */}
      <div className="mt-8">
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('experience')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'experience'
                ? 'bg-[#2c67ed] text-white shadow-[0_0_20px_rgba(44,103,237,0.6)] scale-105'
                : 'bg-space-900/80 text-slate-400 hover:text-white border border-blue-900/40 hover:border-blue-500/30'
              }
            `}
          >
            <Briefcase className="w-4 h-4" />
            <span>Pengalaman (Experience)</span>
          </button>

          <button
            onClick={() => setActiveTab('education')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'education'
                ? 'bg-[#2c67ed] text-white shadow-[0_0_20px_rgba(44,103,237,0.6)] scale-105'
                : 'bg-space-900/80 text-slate-400 hover:text-white border border-blue-900/40 hover:border-blue-500/30'
              }
            `}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Riwayat Pendidikan (Education)</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <AnimatePresence mode="wait">
          {activeTab === 'experience' ? (
            <motion.div
              key="experience-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {experienceData.map((exp, idx) => (
                <div
                  key={exp.role + exp.company}
                  className="relative pl-6 sm:pl-8 pb-8 border-l-2 border-[#2c67ed]/40 last:border-transparent last:pb-0 group"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-space-950 border-2 border-[#2c67ed] shadow-[0_0_12px_#2c67ed] group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl bg-[#050914]/80 border border-blue-500/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.15)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-medium text-[#5388ff]">
                          {exp.company} • <span className="text-slate-400 text-xs font-normal">{exp.type}</span>
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e193d] border border-blue-500/30 text-xs text-blue-300 font-mono self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-[#2c67ed]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300/90 leading-relaxed mt-3">
                      {exp.description}
                    </p>

                    {/* Contributions list */}
                    <div className="mt-4 space-y-2">
                      {exp.contributions.map((item, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#00e5ff] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Badges */}
                    <div className="mt-4 pt-4 border-t border-blue-900/30 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-0.5 rounded-md bg-[#090f24] border border-blue-500/20 text-[11px] font-mono text-blue-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {educationData.map((edu, idx) => (
                <div
                  key={edu.institution}
                  className="relative pl-6 sm:pl-8 pb-8 border-l-2 border-[#2c67ed]/40 last:border-transparent last:pb-0 group"
                >
                  {/* Glowing Node Dot */}
                  <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-space-950 border-2 border-[#00e5ff] shadow-[0_0_12px_#00e5ff] group-hover:scale-125 transition-transform" />

                  <div className="p-6 rounded-2xl bg-[#050914]/80 border border-blue-500/20 hover:border-[#2c67ed]/60 shadow-[0_0_20px_rgba(44,103,237,0.15)] transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {edu.degree}
                        </h4>
                        <p className="text-sm font-medium text-[#5388ff]">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e193d] border border-blue-500/30 text-xs text-blue-300 font-mono self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-[#00e5ff]" />
                        <span>{edu.period}</span>
                      </div>
                    </div>

                    <div className="inline-block my-2 px-2.5 py-0.5 rounded bg-blue-950/70 border border-blue-500/30 text-xs font-semibold text-blue-300 font-mono">
                      {edu.gpa}
                    </div>

                    <p className="text-sm text-slate-300/90 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-3 space-y-1.5">
                        {edu.achievements.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}

