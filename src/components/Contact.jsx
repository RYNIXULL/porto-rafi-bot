import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Send, 
  MapPin, 
  Check, 
  Copy, 
  Sparkles, 
  MessageSquare, 
  Github, 
  Linkedin, 
  Instagram, 
  Rocket, 
  Clock, 
  CheckCircle2 
} from 'lucide-react';
import { personalData } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const socialIconMap = {
    Github: Github,
    Linkedin: Linkedin,
    Instagram: Instagram,
    MessageSquare: MessageSquare
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);

    // Simulate sending transmission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d1636]/80 border border-[#2c67ed]/40 text-blue-400 text-xs font-mono mb-3 shadow-[0_0_15px_rgba(44,103,237,0.3)]"
        >
          <Mail className="w-3.5 h-3.5 text-[#00e5ff]" />
          <span>TRANSMIT SIGNAL</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
        >
          Hubungi <span className="text-gradient-cosmic">Saya</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-400 text-sm sm:text-base max-w-2xl"
        >
          Punya ide proyek revolusioner, tawaran kesempatan kerja, atau sekadar ingin menyapa dan berdiskusi seputar web development? Sinyal komunikasi selalu terbuka!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Direct Info & Social Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-5 space-y-6"
        >
          {/* Quick Email Card */}
          <div className="p-6 rounded-3xl bg-[#050914]/85 backdrop-blur-md border border-blue-500/25 shadow-[0_0_20px_rgba(44,103,237,0.2)] relative overflow-hidden group">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#0e1738] border border-blue-500/30 text-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.3)]">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400">Direct Transmission</p>
                  <p className="text-sm font-semibold text-white">{personalData.email}</p>
                </div>
              </div>

              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-space-900 border border-blue-500/30 text-slate-300 hover:text-white hover:border-[#2c67ed] transition-colors"
                title="Salin alamat email"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {copiedEmail && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-emerald-400 font-mono mt-3 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Alamat email berhasil disalin ke clipboard!</span>
              </motion.p>
            )}
          </div>

          {/* Location & Response Time */}
          <div className="p-6 rounded-3xl bg-[#050914]/85 backdrop-blur-md border border-blue-500/25 shadow-[0_0_20px_rgba(44,103,237,0.2)] space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="p-2.5 rounded-xl bg-[#0e1738] border border-blue-500/30 text-[#00e5ff]">
                <MapPin className="w-4 h-4 text-[#00e5ff]" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Lokasi Operasi</p>
                <p className="text-sm font-medium text-white">{personalData.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-slate-300">
              <div className="p-2.5 rounded-xl bg-[#0e1738] border border-blue-500/30 text-emerald-400">
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-mono">Waktu Respons Rata-rata</p>
                <p className="text-sm font-medium text-white">&lt; 12 Jam (WIB)</p>
              </div>
            </div>
          </div>

          {/* Social Links Cards */}
          <div className="p-6 rounded-3xl bg-[#050914]/85 backdrop-blur-md border border-blue-500/25 shadow-[0_0_20px_rgba(44,103,237,0.2)]">
            <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00e5ff]" />
              <span>Jejaring & Media Sosial</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {personalData.socials.map((social) => {
                const IconComponent = socialIconMap[social.icon] || Github;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3.5 rounded-2xl bg-[#090f24] border border-blue-500/20 hover:border-[#2c67ed] shadow-sm hover:shadow-[0_0_20px_rgba(44,103,237,0.35)] transition-all flex items-center gap-3 group"
                  >
                    <div 
                      className="p-2 rounded-xl bg-[#050914] border border-blue-500/20 group-hover:border-[#2c67ed] transition-colors"
                      style={{ color: social.color }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                        {social.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">
                        {social.username}
                      </p>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

        </motion.div>

        {/* Right Column: Cosmic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-7"
        >
          <div className="p-6 sm:p-10 rounded-3xl bg-[#050914]/85 backdrop-blur-md border border-[#2c67ed]/40 shadow-[0_0_35px_rgba(44,103,237,0.25)] relative">
            
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <Send className="w-5 h-5 text-[#2c67ed]" />
              <span>Kirim Transmisi Pesan</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              Isi formulir di bawah ini untuk mengirimkan pesan langsung ke orbit saya.
            </p>

            {/* Success Feedback Alert */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Rocket className="w-5 h-5 text-emerald-400 shrink-0 animate-bounce" />
                  <div>
                    <p className="font-bold">Transmisi Berhasil Terkirim! 🚀</p>
                    <p className="text-emerald-300/80 text-xs mt-0.5">Terima kasih atas pesannya. Saya akan segera merespons secepat kilat.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Nama Lengkap <span className="text-[#2c67ed]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Budi Santoso"
                    className="w-full px-4 py-3 rounded-xl bg-[#080e22] border border-blue-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/40 transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Alamat Email <span className="text-[#2c67ed]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. budi@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#080e22] border border-blue-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/40 transition-all"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subjek / Topik Diskusi
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Tawaran Magang Frontend / Kolaborasi Proyek Web"
                  className="w-full px-4 py-3 rounded-xl bg-[#080e22] border border-blue-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/40 transition-all"
                />
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Isi Pesan <span className="text-[#2c67ed]">*</span>
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ceritakan detail proyek atau pertanyaan Anda di sini..."
                  className="w-full px-4 py-3 rounded-xl bg-[#080e22] border border-blue-500/30 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#2c67ed] focus:ring-2 focus:ring-[#2c67ed]/40 transition-all resize-none"
                />
              </div>

              {/* Submit Button with Rocket Launch Animation */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#2c67ed] via-[#245ce0] to-[#1a44a6] hover:from-[#3e78fb] hover:to-[#2c67ed] shadow-[0_0_25px_rgba(44,103,237,0.6)] hover:shadow-[0_0_35px_rgba(44,103,237,0.85)] transition-all duration-300 hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2.5 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>Mentransmisikan ke Ruang Angkasa...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-4 h-4 text-blue-200" />
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

