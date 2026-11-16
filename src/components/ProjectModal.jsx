import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, CheckCircle, Layers, Tag } from "lucide-react";

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/45 dark:bg-slate-950/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 18 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl clay-modal overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header Image */}
            <div className="relative h-52 sm:h-64 w-full overflow-hidden shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"
                aria-hidden="true"
              />

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup detail proyek"
                className="group absolute top-4 right-4 w-10 h-10 rounded-full clay-btn-secondary flex items-center justify-center cursor-pointer"
              >
                <X
                  className="w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90"
                  aria-hidden="true"
                />
              </button>

              <div className="absolute bottom-4 left-6 flex items-center gap-2">
                <span className="clay-badge px-3 py-1 text-xs font-mono">
                  {project.badge}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/75 border border-white/25 text-sky-200 text-xs font-mono">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <h3
                  id="project-modal-title"
                  className="font-heading text-2xl font-bold text-slate-900 dark:text-white"
                >
                  {project.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.highlights && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-3 flex items-center gap-1.5 font-semibold">
                    <Layers className="w-4 h-4" aria-hidden="true" />
                    <span>Sorotan Fitur &amp; Tantangan</span>
                  </h4>
                  <div className="space-y-2">
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                      >
                        <CheckCircle
                          className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2.5 flex items-center gap-1.5 font-semibold">
                  <Tag className="w-4 h-4" aria-hidden="true" />
                  <span>Teknologi yang Digunakan</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-lg bg-sky-50 dark:bg-slate-800 border border-sky-200/70 dark:border-slate-700 text-xs font-mono text-sky-700 dark:text-sky-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200/80 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-2xl clay-btn-primary text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    <span>Lihat Demo Live</span>
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 rounded-2xl clay-btn-secondary text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>Repository GitHub</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
