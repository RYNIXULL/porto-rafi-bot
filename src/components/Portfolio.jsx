import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Award, 
  Cpu, 
  ExternalLink, 
  Github, 
  Eye, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  ChevronRight,
  Code,
  Layout,
  Server,
  Wrench,
  Flame,
  Globe,
  Database,
  FileText,
  PlusCircle
} from 'lucide-react';
import { 
  projectsData, 
  certificatesData, 
  techStackData 
} from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' | 'certificates' | 'techstack'
  const [projectCategory, setProjectCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web Apps', 'Fullstack', 'AI & Tools', 'UI/UX'];

  const filteredProjects = projectCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === projectCategory);

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1636]/80 border border-[#2c67ed]/40 text-blue-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(44,103,237,0.3)]"
        >
          <FolderGit2 className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>PORTFOLIO & SKILLS EXHIBIT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Karya & <span className="text-gradient-cosmic">Kompetensi</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl"
        >
          Koleksi proyek pilihan yang telah saya selesaikan, lisensi sertifikasi profesional, serta keahlian teknologi pendukung yang saya kuasai.
        </motion.p>
      </div>

      {/* Main Tab Navigation with Blue Glow */}
      <div className="flex justify-center mb-12">
        <div className="relative p-1.5 rounded-full bg-[#050914]/90 border border-[#2c67ed]/40 shadow-[0_0_30px_rgba(44,103,237,0.35)] flex items-center gap-1 sm:gap-2">
          
          {/* Tab 1: Projects */}
          <button
            onClick={() => setActiveTab('projects')}
            className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'projects' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            {activeTab === 'projects' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.8)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Projects</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {projectsData.length}
              </span>
            </span>
          </button>

          {/* Tab 2: Certificates */}
          <button
            onClick={() => setActiveTab('certificates')}
            className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'certificates' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            {activeTab === 'certificates' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.8)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Certificates</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                {certificatesData.length}
              </span>
            </span>
          </button>

          {/* Tab 3: Tech Stack */}
          <button
            onClick={() => setActiveTab('techstack')}
            className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2
              ${activeTab === 'techstack' ? 'text-white' : 'text-slate-400 hover:text-slate-200'}
            `}
          >
            {activeTab === 'techstack' && (
              <motion.div
                layoutId="portfolioActiveTab"
                className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.8)]"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Tech Stack</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
                22+
              </span>
            </span>
          </button>

        </div>
      </div>

      {/* TAB CONTENT: PROJECTS */}
      <AnimatePresence mode="wait">
        {activeTab === 'projects' && (
          <motion.div
            key="projects-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setProjectCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200
                    ${projectCategory === cat
                      ? 'bg-blue-600/30 text-white border border-[#2c67ed] shadow-[0_0_12px_rgba(44,103,237,0.4)]'
                      : 'bg-[#050914] text-slate-400 border border-blue-900/40 hover:text-slate-200 hover:border-blue-700/50'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center">
                  <div className="p-4 rounded-2xl bg-[#090f28] border border-blue-500/20 text-blue-400 mb-3">
                    <FolderGit2 className="w-8 h-8" />
                  </div>
                  <p className="text-sm font-semibold text-white">Belum ada proyek di kategori "{projectCategory}"</p>
                  <button onClick={() => setProjectCategory('All')} className="mt-3 text-xs text-[#2c67ed] hover:underline cursor-pointer">
                    Kembali ke Semua Proyek
                  </button>
                </div>
              ) : (
                filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ y: -6 }}
                    className="rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/20 hover:border-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.15)] hover:shadow-[0_0_35px_rgba(44,103,237,0.35)] transition-all duration-300 flex flex-col overflow-hidden group"
                  >
                    {/* Image Preview with Hover Reveal */}
                    <div className="relative h-48 w-full overflow-hidden bg-space-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050914] via-transparent to-transparent opacity-80" />
                      
                      {/* Badge */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-full bg-[#2c67ed]/90 text-white text-[11px] font-bold shadow-[0_0_10px_rgba(44,103,237,0.7)]">
                          {project.badge}
                        </span>
                      </div>

                      {/* Quick Preview trigger button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-space-950/60 backdrop-blur-xs">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="px-4 py-2 rounded-xl bg-[#2c67ed] text-white text-xs font-semibold shadow-[0_0_15px_rgba(44,103,237,0.8)] flex items-center gap-1.5 hover:scale-105 transition-transform"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Lihat Detail</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="text-[11px] font-mono text-[#00e5ff] uppercase tracking-wider mb-1">
                          {project.category}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300/80 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-[#090f24] border border-blue-500/20 text-[10px] font-mono text-blue-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-[#090f24] text-[10px] font-mono text-slate-400">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="mt-6 pt-4 border-t border-blue-900/30 flex items-center justify-between">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="text-xs text-blue-400 hover:text-white font-medium flex items-center gap-1 transition-colors"
                        >
                          <span>Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#0e1738] border border-blue-500/30 text-slate-300 hover:text-white hover:border-[#2c67ed] transition-colors"
                            title="Lihat Source Code"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-[#2c67ed] text-white shadow-[0_0_12px_rgba(44,103,237,0.5)] hover:scale-105 transition-all"
                            title="Buka Demo Live"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}

              {/* Placeholder card for upcoming projects when count is small */}
              {projectCategory === 'All' && filteredProjects.length < 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="p-6 rounded-3xl bg-[#050914]/40 border-2 border-dashed border-blue-900/40 hover:border-[#2c67ed]/40 transition-colors flex flex-col items-center justify-center text-center min-h-[340px]"
                >
                  <div className="p-3 rounded-2xl bg-space-900 border border-blue-900/50 text-blue-400/60 mb-3">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-slate-300">Proyek Berikutnya</h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Inovasi dan proyek open-source lainnya sedang dibangun di lab coding.
                  </p>
                  <span className="mt-3 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-900/40 text-[10px] font-mono text-blue-400/70">
                    UNDER DEVELOPMENT
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <motion.div
            key="certificates-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificatesData.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/20 hover:border-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.15)] hover:shadow-[0_0_30px_rgba(44,103,237,0.35)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-[#090f28] border border-blue-500/30 text-[#00e5ff] shadow-[0_0_12px_rgba(0,229,255,0.25)] group-hover:scale-110 transition-transform">
                      {cert.icon === 'Code' ? (
                        <Code className="w-6 h-6 text-[#00e5ff]" />
                      ) : (
                        <Award className="w-6 h-6 text-[#2c67ed]" />
                      )}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#0e193d] border border-blue-500/30 text-[10px] font-mono text-blue-300">
                      ID: {cert.credentialId.slice(0, 12)}...
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-[#5388ff] mt-1 flex items-center gap-1.5">
                    <span>{cert.issuer}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Diterbitkan: {cert.issueDate}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded bg-[#090f24] border border-blue-900/40 text-[10px] text-slate-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-blue-950/60 flex flex-col gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#090f24] hover:bg-[#2c67ed] border border-blue-500/30 hover:border-transparent text-xs font-semibold text-slate-200 hover:text-white transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-[0_0_10px_rgba(44,103,237,0.15)] hover:shadow-[0_0_20px_rgba(44,103,237,0.6)]"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#00e5ff] group-hover/btn:text-white" />
                    <span>Verifikasi di Credly</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-white" />
                  </a>

                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 rounded-xl bg-[#060c20] hover:bg-[#0e193d] border border-blue-900/40 hover:border-blue-500/40 text-[11px] font-medium text-slate-300 hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                      <span>Lihat Dokumen PDF Asli</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Placeholder card for upcoming certificates */}
            {certificatesData.length < 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="p-6 rounded-3xl bg-[#050914]/40 border-2 border-dashed border-blue-900/40 hover:border-[#2c67ed]/40 transition-colors flex flex-col items-center justify-center text-center min-h-[280px]"
              >
                <div className="p-3 rounded-2xl bg-space-900 border border-blue-900/50 text-blue-400/60 mb-3">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-semibold text-slate-300">Sertifikasi Berikutnya</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Sertifikat dan pencapaian lainnya akan segera ditambahkan ke galeri orbit ini.
                </p>
                <span className="mt-3 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-900/40 text-[10px] font-mono text-blue-400/70">
                  IN PROGRESS • STAY TUNED
                </span>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TAB CONTENT: TECH STACK */}
        {activeTab === 'techstack' && (
          <motion.div
            key="techstack-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* 1. Frontend & Core */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/25 shadow-[0_0_25px_rgba(44,103,237,0.2)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#0d1636] border border-blue-500/40 text-[#2c67ed]">
                  <Layout className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Frontend Architecture</h3>
                  <p className="text-xs text-slate-400">Framework modern & bahasa inti client-side</p>
                </div>
              </div>

              <div className="space-y-4">
                {techStackData.frontend.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({item.experience})</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#5388ff]">{item.level}%</span>
                    </div>
                    {/* Progress Bar with Glow */}
                    <div className="w-full h-2 rounded-full bg-[#0d1636] overflow-hidden p-0.5 border border-blue-950">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#2c67ed] to-[#00e5ff] shadow-[0_0_10px_#2c67ed]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Styling & Animation */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/25 shadow-[0_0_25px_rgba(44,103,237,0.2)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#0d1636] border border-blue-500/40 text-[#00e5ff]">
                  <Sparkles className="w-5 h-5 text-[#00e5ff]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Styling & Creative Motion</h3>
                  <p className="text-xs text-slate-400">Desain visual, transisi halus & micro-interactions</p>
                </div>
              </div>

              <div className="space-y-4">
                {techStackData.stylingAnimation.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({item.experience})</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-[#00e5ff]">{item.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#0d1636] overflow-hidden p-0.5 border border-blue-950">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#00e5ff] to-[#2c67ed] shadow-[0_0_10px_#00e5ff]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Backend & Database */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/25 shadow-[0_0_25px_rgba(44,103,237,0.2)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#0d1636] border border-blue-500/40 text-purple-400">
                  <Server className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Backend & Database</h3>
                  <p className="text-xs text-slate-400">REST API, asynchronous server logic & database</p>
                </div>
              </div>

              <div className="space-y-4">
                {techStackData.backendDatabase.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({item.experience})</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-purple-400">{item.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#0d1636] overflow-hidden p-0.5 border border-blue-950">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#7c3aed] to-[#2c67ed] shadow-[0_0_10px_#7c3aed]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Tools & DevOps */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#050914]/80 backdrop-blur-md border border-blue-500/25 shadow-[0_0_25px_rgba(44,103,237,0.2)]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#0d1636] border border-blue-500/40 text-emerald-400">
                  <Wrench className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Tools & Workflow</h3>
                  <p className="text-xs text-slate-400">Version control, bundler, testing & deployment</p>
                </div>
              </div>

              <div className="space-y-4">
                {techStackData.toolsDevOps.map((item) => (
                  <div key={item.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-200">{item.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">({item.experience})</span>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">{item.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#0d1636] overflow-hidden p-0.5 border border-blue-950">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-[#2c67ed] shadow-[0_0_10px_#10b981]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
}

