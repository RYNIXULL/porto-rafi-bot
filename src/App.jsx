import React from "react";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import StarBackground from "./components/StarBackground";
import CosmicOrbs from "./components/CosmicOrbs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <div className="relative min-h-screen bg-[#F0F5FA] dark:bg-[#090F1D] text-[#1E293B] dark:text-[#F1F5F9] overflow-x-hidden selection:bg-[#0EA5E9] selection:text-white transition-colors duration-300">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:px-4 focus:py-2.5 focus:rounded-full focus:clay-btn-primary focus:text-xs"
            >
              Langsung ke konten utama
            </a>

            <StarBackground />
            <CosmicOrbs />
            <Navbar />

            <main id="main-content" className="relative z-10">
              <Hero />
              <About />
              <Portfolio />
              <Contact />
            </main>

            <Footer />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
