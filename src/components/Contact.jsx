import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Send,
  MapPin,
  Check,
  Copy,
  MessageSquare,
  Github,
  Linkedin,
  Instagram,
  Clock,
  Share2,
} from "lucide-react";
import { personalData } from "../data/portfolioData";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const shouldReduceMotion = useReducedMotion();

  const socialIconMap = {
    Github,
    Linkedin,
    Instagram,
    MessageSquare,
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopiedEmail(true);
      toast.success("Email Disalin", `${personalData.email} siap ditempel ke aplikasi email Anda.`);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      toast.error("Gagal Menyalin", "Browser memblokir akses clipboard. Silakan salin alamat secara manual.");
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Nama lengkap wajib diisi.";
    if (!formData.email.trim()) {
      nextErrors.email = "Alamat email wajib diisi.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      nextErrors.email = "Format email tidak valid.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = "Isi pesan minimal 10 karakter.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Periksa Formulir", "Mohon lengkapi kolom wajib sebelum mengirim pesan.");
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      toast.success(
        "Transmisi Berhasil Terkirim",
        "Terima kasih atas pesannya. Saya akan segera merespons dalam < 12 jam."
      );
    }, 900);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="clay-badge inline-flex items-center gap-2 px-4 py-1.5 text-xs font-mono mb-3">
          <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
          <span>TRANSMIT SIGNAL</span>
        </div>

        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter">
          Hubungi <span className="text-gradient-sky">Saya.</span>
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Punya ide proyek, tawaran kolaborasi, atau sekadar ingin berdiskusi seputar web development? Sinyal komunikasi selalu terbuka.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Direct Info & Social Cards */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Email Card */}
          <div className="clay-card p-6 relative overflow-hidden group">
            <span className="specular-sweep" aria-hidden="true" />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 clay-icon-box flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    Direct Transmission
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">
                    {personalData.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Salin alamat email"
                title="Salin alamat email"
                className="w-11 h-11 rounded-2xl clay-btn-secondary flex items-center justify-center shrink-0 cursor-pointer"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <Copy className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          {/* Location & Response Time */}
          <div className="clay-card p-6 space-y-4 relative overflow-hidden group">
            <span className="specular-sweep" aria-hidden="true" />
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 clay-icon-box flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Lokasi Operasi
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {personalData.location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 clay-icon-box flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Waktu Respons Rata-rata
                </p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                  &lt; 12 Jam (WIB)
                </p>
              </div>
            </div>
          </div>

          {/* Social Links Card */}
          <div className="clay-card p-6 relative overflow-hidden">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-4 flex items-center gap-2 font-semibold">
              <Share2 className="w-4 h-4" aria-hidden="true" />
              <span>Jejaring &amp; Media Sosial</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalData.socials.map((social) => {
                const IconComponent = socialIconMap[social.icon] || Github;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-2xl clay-btn-secondary flex items-center gap-3 group cursor-pointer"
                  >
                    <div className="w-9 h-9 clay-icon-box flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                        {social.name}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                        {social.username}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Contact Form */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <div className="clay-card p-6 sm:p-10 relative overflow-hidden">
            <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-2">
              <span className="w-9 h-9 clay-icon-box flex items-center justify-center">
                <Send className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>Kirim Transmisi Pesan</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6">
              Isi formulir di bawah ini untuk mengirimkan pesan langsung ke kotak masuk saya.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Nama Lengkap <span className="text-sky-600 dark:text-sky-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    placeholder="e.g. Budi Santoso"
                    className="w-full px-4 py-3 clay-inset text-sm placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  {errors.name && (
                    <p id="contact-name-error" className="text-xs text-rose-600 dark:text-rose-400 mt-1.5">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                  >
                    Alamat Email <span className="text-sky-600 dark:text-sky-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder="e.g. budi@example.com"
                    className="w-full px-4 py-3 clay-inset text-sm placeholder-slate-400 dark:placeholder-slate-500"
                  />
                  {errors.email && (
                    <p id="contact-email-error" className="text-xs text-rose-600 dark:text-rose-400 mt-1.5">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Subjek / Topik Diskusi
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Tawaran Magang Frontend / Kolaborasi Proyek Web"
                  className="w-full px-4 py-3 clay-inset text-sm placeholder-slate-400 dark:placeholder-slate-500"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Isi Pesan <span className="text-sky-600 dark:text-sky-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : undefined}
                  placeholder="Ceritakan detail proyek atau pertanyaan Anda di sini..."
                  className="w-full px-4 py-3 clay-inset text-sm placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                />
                {errors.message && (
                  <p id="contact-message-error" className="text-xs text-rose-600 dark:text-rose-400 mt-1.5">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-2xl clay-btn-primary text-sm flex items-center justify-center gap-2.5 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                      aria-hidden="true"
                    />
                    <span>Mengirim Pesan...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Luncurkan Transmisi</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
