import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  User, 
  Briefcase, 
  Mail, 
  Home, 
  Menu, 
  X, 
  Rocket, 
  ExternalLink 
} from 'lucide-react';

const navItems = [
  { name: 'Beranda', href: '#home', icon: Home },
  { name: 'Tentang', href: '#about', icon: User },
  { name: 'Portfolio', href: '#portfolio', icon: Briefcase },
  { name: 'Kontak', href: '#contact', icon: Mail },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'portfolio', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Floating Center Navbar */}
      <header className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-4xl">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300
            ${scrolled 
              ? 'bg-[#050914]/85 backdrop-blur-xl border border-[#2c67ed]/50 shadow-[0_0_30px_rgba(44,103,237,0.45)]' 
              : 'bg-[#050914]/70 backdrop-blur-md border border-[#2c67ed]/30 shadow-[0_0_20px_rgba(44,103,237,0.3)]'
            }
          `}
        >
          {/* Subtle cosmic outer glow beam */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent via-[#2c67ed]/40 to-transparent -z-10 blur-sm pointer-events-none" />

          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-2.5 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#2c67ed] to-[#12255c] p-[1.5px] shadow-[0_0_12px_rgba(44,103,237,0.6)] group-hover:shadow-[0_0_20px_rgba(44,103,237,0.9)] transition-all">
                <div className="w-full h-full rounded-full bg-space-950 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-[#5388ff] group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-wide text-white group-hover:text-[#5388ff] transition-colors">
                  RAFI<span className="text-[#2c67ed]">.DEV</span>
                </span>
                <span className="text-[10px] text-blue-300/60 font-mono tracking-wider -mt-1 hidden sm:block">
                  SECTOR 04 • ORBIT
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with animated indicator */}
            <div className="hidden md:flex items-center gap-1 bg-[#02040a]/50 px-2 py-1.5 rounded-full border border-blue-500/15">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                const Icon = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5
                      ${isActive ? 'text-white font-semibold' : 'text-slate-300/80 hover:text-white'}
                    `}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute inset-0 rounded-full bg-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.7)]"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Action Buttons: Status Badge & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="relative group overflow-hidden px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-[#2c67ed] to-[#1e4dc9] hover:from-[#3a75fa] hover:to-[#2c67ed] shadow-[0_0_15px_rgba(44,103,237,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Let's Connect</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-space-900 border border-[#2c67ed]/40 text-blue-300 hover:text-white shadow-[0_0_10px_rgba(44,103,237,0.3)] focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Mobile Dropdown Menu with Space Styling */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mt-3 p-4 rounded-2xl bg-[#050914]/95 backdrop-blur-2xl border border-[#2c67ed]/40 shadow-[0_10px_35px_rgba(44,103,237,0.4)] md:hidden flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all
                      ${isActive 
                        ? 'bg-[#2c67ed] text-white font-medium shadow-[0_0_15px_rgba(44,103,237,0.5)]' 
                        : 'text-slate-300 hover:bg-space-850 hover:text-white'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4 text-blue-300" />
                    <span>{item.name}</span>
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-blue-900/40">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#2c67ed] to-[#1d4ed8] text-white text-sm font-semibold shadow-[0_0_15px_rgba(44,103,237,0.4)]"
                >
                  <Sparkles className="w-4 h-4 text-blue-200" />
                  <span>Kirim Pesan / Kolaborasi</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

