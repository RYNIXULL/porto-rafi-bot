import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Sparkles, Layers, Tag } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#02040a]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-[#070d22] border border-[#2c67ed]/50 rounded-3xl shadow-[0_0_50px_rgba(44,103,237,0.4)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Image */}
          <div className="relative h-56 sm:h-64 w-full overflow-hidden shrink-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070d22] via-[#070d22]/40 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-space-950/80 border border-blue-500/40 text-slate-300 hover:text-white shadow-lg hover:border-[#2c67ed] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges on image */}
            <div className="absolute bottom-4 left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#2c67ed] text-white text-xs font-bold shadow-[0_0_12px_rgba(44,103,237,0.8)]">
                {project.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-space-950/80 border border-blue-500/30 text-blue-300 text-xs font-mono">
                {project.category}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Key Highlights */}
            {project.highlights && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00e5ff]" />
                  <span>Sorotan Fitur & Tantangan</span>
                </h4>
                <div className="space-y-2">
                  {project.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-[#2c67ed] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-2.5 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-[#2c67ed]" />
                <span>Teknologi yang Digunakan</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-[#0e1738] border border-blue-500/30 text-xs font-mono text-blue-300 shadow-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-blue-900/40 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-[#2c67ed] to-[#1d4ed8] hover:from-[#3d77f8] hover:to-[#2c67ed] shadow-[0_0_20px_rgba(44,103,237,0.5)] transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Lihat Demo Live</span>
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-[#0e1738] hover:bg-[#152355] border border-blue-500/30 hover:border-blue-400 transition-all flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Repository GitHub</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="text-xs text-slate-400 hover:text-white px-3 py-2"
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

