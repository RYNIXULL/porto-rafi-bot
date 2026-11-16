import React from 'react';
import StarBackground from './components/StarBackground';
import CosmicOrbs from './components/CosmicOrbs';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 overflow-x-hidden selection:bg-[#2c67ed] selection:text-white">
      {/* 1. Deep Space Dynamic Animations */}
      <StarBackground />
      <CosmicOrbs />

      {/* 2. Floating Top-Center Navbar with Blue Glow */}
      <Navbar />

      {/* 3. Main Hero Section */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* 4. Cosmic Footer */}
      <Footer />
    </div>
  );
}

