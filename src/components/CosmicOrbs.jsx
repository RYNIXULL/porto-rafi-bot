import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function CosmicOrbs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Primary Sky / Cyan Ambient Orb Top-Left */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.14, 1],
                opacity: [0.45, 0.65, 0.45],
                x: [0, 32, 0],
                y: [0, -24, 0],
              }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-[18%] -left-[12%] w-[520px] h-[520px] md:w-[760px] md:h-[760px] rounded-full blur-[120px] bg-gradient-to-br from-sky-300/45 via-sky-200/30 to-transparent dark:from-sky-500/20 dark:via-blue-600/15 dark:to-transparent"
      />

      {/* Secondary Sky Mesh Center-Right */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 0.96, 1],
                opacity: [0.35, 0.55, 0.35],
                x: [0, -36, 0],
                y: [0, 28, 0],
              }
        }
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute top-[30%] -right-[14%] w-[480px] h-[480px] md:w-[700px] md:h-[700px] rounded-full blur-[130px] bg-gradient-to-tl from-cyan-300/40 via-sky-300/25 to-transparent dark:from-cyan-400/15 dark:via-sky-600/20 dark:to-transparent"
      />

      {/* Bottom Soft Glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [0.95, 1.1, 0.95],
                opacity: [0.3, 0.48, 0.3],
                y: [0, -28, 0],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-[-14%] left-[22%] w-[560px] h-[560px] rounded-full blur-[140px] bg-gradient-to-t from-sky-200/50 via-blue-200/25 to-transparent dark:from-sky-700/20 dark:via-indigo-700/15 dark:to-transparent"
      />

      {/* Subtle Tactical Dot Grid */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage: `radial-gradient(rgba(14, 165, 233, 0.16) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />
    </div>
  );
}
