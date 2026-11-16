import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Printer, Mail, MapPin, GraduationCap, Award } from "lucide-react";
import { personalData, educationData, certificatesData } from "../data/portfolioData";
import { useToast } from "../context/ToastContext";

export default function ResumeModal({ isOpen, onClose }) {
  const { toast } = useToast();

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

  const handlePrint = () => {
    toast.info("Dialog Cetak Dibuka", "Pilih 'Save as PDF' untuk menyimpan salinan Curriculum Vitae.");
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
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
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl clay-modal overflow-hidden max-h-[88vh] flex flex-col"
          >
            <div className="px-6 sm:px-8 py-5 border-b border-slate-200/80 dark:border-slate-700/70 flex items-center justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-sky-600 dark:text-sky-400 font-semibold">
                  Curriculum Vitae
                </p>
                <h3
                  id="resume-modal-title"
                  className="font-heading text-xl font-bold text-slate-800 dark:text-slate-100"
                >
                  {personalData.name}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 min-h-[40px] rounded-full clay-btn-primary text-xs font-bold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Cetak / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Tutup pratinjau CV"
                  className="group w-10 h-10 rounded-full clay-btn-secondary flex items-center justify-center cursor-pointer"
                >
                  <X
                    className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                  {personalData.email}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                  Lampung, Indonesia
                </span>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-heading font-bold text-slate-800 dark:text-slate-100 mb-3">
                  <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                  <span>Riwayat Pendidikan</span>
                </h4>
                <div className="space-y-2.5">
                  {educationData.map((edu) => (
                    <div
                      key={edu.institution}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/70 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-xs sm:text-sm">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{edu.institution}</p>
                      </div>
                      <span className="text-[11px] font-mono text-sky-700 dark:text-sky-300">
                        {edu.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 font-heading font-bold text-slate-800 dark:text-slate-100 mb-2.5">
                  <Award className="w-4 h-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                  <span>Sertifikasi Terverifikasi</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {certificatesData.map((cert) => (
                    <li key={cert.id} className="flex items-center justify-between gap-2">
                      <span>{cert.title} — {cert.issuer}</span>
                      <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {cert.issueDate}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
