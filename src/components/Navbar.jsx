import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Home, User, FolderGit2, Mail } from "lucide-react";
import LiquidNavbar, { NimbusIcons } from "./LiquidNavbar";
import { ThemeToggle, useTheme } from "../context/ThemeContext";
import rapibotLogo from "../assets/icons/RAPIBOT.svg";

const SECTIONS = ["home", "about", "portfolio", "contact"];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPosition = window.scrollY + 220;
      for (const sectionId of SECTIONS) {
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const navItems = useMemo(
    () => [
      { label: "Beranda", href: "#home", icon: NimbusIcons.home, mobileIcon: Home, fx: "glow" },
      { label: "Tentang", href: "#about", icon: NimbusIcons.user, mobileIcon: User, fx: "pop" },
      { label: "Portfolio", href: "#portfolio", icon: NimbusIcons.layers, mobileIcon: FolderGit2, fx: "spin" },
      { label: "Kontak", href: "#contact", icon: NimbusIcons.plane, mobileIcon: Mail, fx: "plane" },
    ],
    []
  );

  const activeIndex = Math.max(0, SECTIONS.indexOf(activeSection));

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(targetId);
    }
  };

  return (
    <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-5 xl:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto">
        <div
          className={`pointer-events-auto clay-nav rounded-full px-3 sm:px-4 lg:px-5 py-2 flex items-center justify-between gap-2 sm:gap-3 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            scrolled ? "shadow-lg" : ""
          }`}
        >
          {/* Left: Brand Identity */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="shrink-0 flex items-center gap-2.5 group cursor-pointer rounded-full pr-1"
          >
            <div className="keep-light w-10 h-10 rounded-2xl bg-gradient-to-br from-white to-sky-50 border-2 border-white shadow-[0_6px_16px_-4px_rgba(14,165,233,0.28)] flex items-center justify-center p-1.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-rotate-3">
              <img src={rapibotLogo} alt="" className="w-full h-full object-contain" aria-hidden="true" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                RAFI<span className="text-sky-600 dark:text-sky-400">.DEV</span>
              </span>
              <span className="hidden sm:inline-block lg:hidden xl:inline-block text-[10px] font-mono tracking-wider text-slate-500 dark:text-slate-400 mt-0.5">
                DEVELOPER PORTFOLIO
              </span>
            </div>
          </a>

          {/* Center: WebGL Waterline Liquid Navbar (Desktop >= 1024px) */}
          <LiquidNavbar
            items={navItems}
            active={activeIndex}
            onChange={(idx, item) => {
              const id = item.href.replace("#", "");
              setActiveSection(id);
            }}
            tone={theme === "dark" ? "dark" : "light"}
            className="hidden lg:inline-flex shrink-0"
          />

          {/* Right: Theme Switcher, Primary CTA & Mobile Trigger */}
          <div className="shrink-0 flex items-center gap-2">
            <ThemeToggle compact />

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 h-10 rounded-full clay-btn-primary text-xs font-bold whitespace-nowrap cursor-pointer"
            >
              <span>Hubungi Saya</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-11 h-11 rounded-full clay-btn-secondary flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu (< 1024px) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              aria-label="Navigasi Mobile"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-auto lg:hidden mt-3 p-4 clay-card flex flex-col gap-1.5"
            >
              {navItems.map((item) => {
                const targetId = item.href.replace("#", "");
                const isActive = activeSection === targetId;
                const MobileIcon = item.mobileIcon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 px-4 min-h-[44px] rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "clay-btn-primary text-white"
                        : "text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    <MobileIcon className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-slate-200/80 dark:border-slate-700/70 sm:hidden">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, "#contact")}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-2xl clay-btn-primary text-sm font-bold cursor-pointer"
                >
                  <span>Mulai Kolaborasi</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
