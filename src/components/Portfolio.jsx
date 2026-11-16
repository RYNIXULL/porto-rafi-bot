import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  FolderGit2,
  Award,
  Cpu,
  ExternalLink,
  Github,
  Eye,
  Calendar,
  ShieldCheck,
  Layers,
  ChevronRight,
  Code,
  Layout,
  Server,
  Wrench,
  FileText,
  PlusCircle,
} from "lucide-react";
import {
  projectsData,
  certificatesData,
  techStackData,
} from "../data/portfolioData";
import ProjectModal from "./ProjectModal";

const TECH_GROUPS = [
  {
    key: "frontend",
    title: "Frontend Architecture",
    subtitle: "Framework modern & bahasa inti client-side",
    icon: Layout,
    barClass: "from-sky-400 to-sky-600",
    accentText: "text-sky-700 dark:text-sky-300",
  },
  {
    key: "stylingAnimation",
    title: "Styling & Creative Motion",
    subtitle: "Desain visual, transisi halus & micro-interactions",
    icon: Layers,
    barClass: "from-cyan-400 to-sky-500",
    accentText: "text-cyan-700 dark:text-cyan-300",
  },
  {
    key: "backendDatabase",
    title: "Backend & Database",
    subtitle: "REST API, asynchronous server logic & database",
    icon: Server,
    barClass: "from-blue-500 to-indigo-500",
    accentText: "text-blue-700 dark:text-blue-300",
  },
  {
    key: "toolsDevOps",
    title: "Tools & Workflow",
    subtitle: "Version control, bundler, testing & deployment",
    icon: Wrench,
    barClass: "from-emerald-400 to-sky-500",
    accentText: "text-emerald-700 dark:text-emerald-300",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projectCategory, setProjectCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const categories = ["All", "Web Apps", "Fullstack", "AI & Tools", "UI/UX"];

  const filteredProjects =
    projectCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === projectCategory);

  const mainTabs = [
    { id: "projects", label: "Projects", count: projectsData.length, icon: FolderGit2 },
    { id: "certificates", label: "Certificates", count: certificatesData.length, icon: Award },
    { id: "techstack", label: "Tech Stack", count: "22+", icon: Cpu },
  ];

  return (
    <section id="portfolio" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono mb-3">
          <FolderGit2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>PORTFOLIO &amp; SKILLS EXHIBIT</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          Karya &amp; <span className="text-gradient-sky">Kompetensi</span>
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Koleksi proyek pilihan yang telah saya selesaikan, lisensi sertifikasi profesional, serta keahlian teknologi pendukung yang saya kuasai.
        </p>
      </div>

      {/* Main Tab Switcher */}
      <div className="flex justify-center mb-10">
        <div
          role="tablist"
          aria-label="Kategori Karya dan Kompetensi"
          className="clay-card p-1.5 rounded-full flex flex-wrap items-center justify-center gap-1.5"
        >
          {mainTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`min-h-[42px] px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "clay-btn-primary text-white"
                    : "text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-300"
                }`}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-300"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB CONTENT */}
      <AnimatePresence mode="wait">
        {activeTab === "projects" && (
          <motion.div
            key="projects-view"
            role="tabpanel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {categories.map((cat) => {
                const selected = projectCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setProjectCategory(cat)}
                    className={`min-h-[38px] px-4 py-1.5 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer ${
                      selected
                        ? "clay-btn-primary text-white"
                        : "clay-btn-secondary text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.length === 0 ? (
                <div className="col-span-full clay-card py-14 px-6 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 clay-icon-box flex items-center justify-center mb-4">
                    <FolderGit2 className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <p className="text-base font-bold text-slate-800 dark:text-slate-100">
                    Belum ada proyek di kategori "{projectCategory}"
                  </p>
                  <button
                    type="button"
                    onClick={() => setProjectCategory("All")}
                    className="mt-4 px-5 min-h-[40px] rounded-full clay-btn-primary text-xs cursor-pointer"
                  >
                    Kembali ke Semua Proyek
                  </button>
                </div>
              ) : (
                filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className="clay-card flex flex-col overflow-hidden group relative"
                  >
                    <span className="specular-sweep" aria-hidden="true" />

                    {/* Thumbnail */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"
                        aria-hidden="true"
                      />

                      <div className="absolute top-3.5 left-3.5">
                        <span className="clay-badge px-3 py-1 text-[11px] font-mono">
                          {project.badge}
                        </span>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 bg-slate-900/45 backdrop-blur-xs">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="min-h-[42px] px-4 py-2 rounded-full clay-btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Lihat Detail</span>
                        </button>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <div className="text-[11px] font-mono font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                          {project.category}
                        </div>
                        <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 border border-sky-200/70 dark:border-slate-700 text-[11px] font-mono text-sky-700 dark:text-sky-300"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                              +{project.tags.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/70 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="min-h-[40px] px-2 text-xs sm:text-sm text-sky-700 dark:text-sky-300 hover:text-sky-500 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <span>Detail Proyek</span>
                          <ChevronRight className="w-4 h-4" aria-hidden="true" />
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Lihat source code ${project.title} di GitHub`}
                            title="Lihat Source Code"
                            className="w-10 h-10 rounded-xl clay-btn-secondary flex items-center justify-center cursor-pointer"
                          >
                            <Github className="w-4 h-4" aria-hidden="true" />
                          </a>
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Buka demo live ${project.title}`}
                            title="Buka Demo Live"
                            className="w-10 h-10 rounded-xl clay-btn-primary flex items-center justify-center cursor-pointer"
                          >
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}

              {projectCategory === "All" && filteredProjects.length < 3 && (
                <div className="clay-card p-6 border-dashed border-sky-300/80 dark:border-slate-700 flex flex-col items-center justify-center text-center min-h-[340px]">
                  <div className="w-12 h-12 clay-icon-box flex items-center justify-center mb-3">
                    <PlusCircle className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h4 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100">
                    Proyek Berikutnya
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-xs">
                    Inovasi dan proyek open-source lainnya sedang dibangun di lab coding.
                  </p>
                  <span className="clay-badge mt-4 px-3 py-1 text-[10px] font-mono">
                    UNDER DEVELOPMENT
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: CERTIFICATES */}
        {activeTab === "certificates" && (
          <motion.div
            key="certificates-view"
            role="tabpanel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certificatesData.map((cert) => (
              <article
                key={cert.id}
                className="clay-card p-6 flex flex-col justify-between group relative overflow-hidden"
              >
                <span className="specular-sweep" aria-hidden="true" />

                <div>
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="w-12 h-12 clay-icon-box flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-6 group-hover:scale-110">
                      {cert.icon === "Code" ? (
                        <Code className="w-6 h-6" aria-hidden="true" />
                      ) : (
                        <Award className="w-6 h-6" aria-hidden="true" />
                      )}
                    </div>
                    <span className="clay-badge px-3 py-1 text-[10px] font-mono">
                      ID: {cert.credentialId.slice(0, 10)}...
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {cert.title}
                  </h3>

                  <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mt-1.5 flex items-center gap-1.5">
                    <span>{cert.issuer}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                  </p>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                    <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Diterbitkan: {cert.issueDate}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-sky-50 dark:bg-slate-800 border border-sky-200/70 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-700/70 flex flex-col gap-2.5">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[42px] px-4 rounded-2xl clay-btn-primary text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                    <span>Verifikasi di Credly</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>

                  {cert.pdfUrl && (
                    <a
                      href={cert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[40px] px-4 rounded-2xl clay-btn-secondary text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                      <span>Lihat Dokumen PDF Asli</span>
                    </a>
                  )}
                </div>
              </article>
            ))}

            {certificatesData.length < 3 && (
              <div className="clay-card p-6 border-dashed border-sky-300/80 dark:border-slate-700 flex flex-col items-center justify-center text-center min-h-[280px]">
                <div className="w-12 h-12 clay-icon-box flex items-center justify-center mb-3">
                  <PlusCircle className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="font-heading text-base font-bold text-slate-800 dark:text-slate-100">
                  Sertifikasi Berikutnya
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 max-w-xs">
                  Sertifikat dan pencapaian lainnya akan segera ditambahkan ke galeri ini.
                </p>
                <span className="clay-badge mt-4 px-3 py-1 text-[10px] font-mono">
                  IN PROGRESS
                </span>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB CONTENT: TECH STACK */}
        {activeTab === "techstack" && (
          <motion.div
            key="techstack-view"
            role="tabpanel"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -14 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {TECH_GROUPS.map((group) => {
              const Icon = group.icon;
              const items = techStackData[group.key] || [];
              return (
                <div key={group.key} className="clay-card p-6 sm:p-8 relative overflow-hidden group">
                  <span className="specular-sweep" aria-hidden="true" />

                  <div className="flex items-center gap-3.5 mb-6">
                    <div className="w-11 h-11 clay-icon-box flex items-center justify-center">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                        {group.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{group.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-800 dark:text-slate-100">
                              {item.name}
                            </span>
                            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                              ({item.experience})
                            </span>
                          </div>
                          <span className={`text-xs font-mono font-bold ${group.accentText}`}>
                            {item.level}%
                          </span>
                        </div>
                        <div
                          role="progressbar"
                          aria-label={`${item.name} tingkat penguasaan ${item.level}%`}
                          aria-valuenow={item.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          className="w-full h-2.5 rounded-full bg-slate-200/80 dark:bg-slate-800 overflow-hidden p-0.5"
                        >
                          <motion.div
                            initial={shouldReduceMotion ? { width: `${item.level}%` } : { width: 0 }}
                            whileInView={{ width: `${item.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-gradient-to-r ${group.barClass}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
