import React from 'react';
import { motion } from 'framer-motion';

export default function CosmicOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Deep Blue Nebula top-left */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] md:w-[750px] md:h-[750px] rounded-full blur-[140px] bg-gradient-to-br from-[#2c67ed]/40 via-[#1d4ed8]/20 to-transparent"
      />

      {/* Cyan/Electric Blue Nebula center-right */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.95, 1],
          opacity: [0.25, 0.45, 0.25],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[35%] -right-[15%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-[150px] bg-gradient-to-tl from-[#00d2ff]/25 via-[#2c67ed]/30 to-transparent"
      />

      {/* Deep Violet Cosmic Glow bottom-center */}
      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.2, 0.4, 0.2],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="absolute bottom-[-10%] left-[25%] w-[600px] h-[600px] rounded-full blur-[160px] bg-gradient-to-t from-[#2c67ed]/30 via-[#4f46e5]/20 to-transparent"
      />

      {/* Subtle Space Grid Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(rgba(44, 103, 237, 0.6) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
}

