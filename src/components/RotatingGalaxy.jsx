import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function RotatingGalaxy({ size = 220 }) {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const hoverRef = useRef(false);
  hoverRef.current = isHovered;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvasWidth = size * dpr;
    const canvasHeight = size * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const maxRadius = (canvasWidth / 2) * 0.88;

    // Generate Spiral Galaxy Stars
    const STAR_COUNT = 320;
    const ARMS = 3;
    const stars = [];

    const starPalettesDark = [
      "rgba(255, 255, 255, ",
      "rgba(186, 230, 253, ", // sky-200
      "rgba(56, 189, 248, ",  // sky-400
      "rgba(96, 165, 250, ",  // blue-400
      "rgba(167, 139, 250, ", // violet-400
    ];

    const starPalettesLight = [
      "rgba(2, 132, 199, ",   // sky-600
      "rgba(14, 165, 233, ",  // sky-500
      "rgba(37, 99, 235, ",   // blue-600
      "rgba(124, 58, 237, ",  // violet-600
      "rgba(15, 23, 42, ",    // slate-900
    ];

    for (let i = 0; i < STAR_COUNT; i++) {
      const armIndex = i % ARMS;
      const armAngle = (armIndex * 2 * Math.PI) / ARMS;
      // Exponential distribution towards center
      const dist = Math.pow(Math.random(), 1.35) * maxRadius;
      // Logarithmic spiral angle + jitter
      const spiralAngle = armAngle + (dist / maxRadius) * 3.4;
      const jitter = (Math.random() - 0.5) * (0.42 * (dist / maxRadius) + 0.12);
      const angle = spiralAngle + jitter;
      const radius = dist + (Math.random() - 0.5) * (maxRadius * 0.08);

      stars.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        baseRadius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.65 + 0.35,
        twinkleSpeed: Math.random() * 0.02 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
        colorIdx: Math.floor(Math.random() * starPalettesDark.length),
      });
    }

    // Ambient background stars
    const ambientStars = [];
    for (let i = 0; i < 40; i++) {
      const dist = Math.random() * maxRadius * 0.95;
      const angle = Math.random() * Math.PI * 2;
      ambientStars.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        radius: Math.random() * 1.0 + 0.4,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let currentRotation = 0;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      const isDark = themeRef.current === "dark";
      const palette = isDark ? starPalettesDark : starPalettesLight;

      // Rotation speed (accelerates gently on hover)
      const baseSpeed = shouldReduceMotion ? 0.0004 : 0.0035;
      const targetSpeed = hoverRef.current ? baseSpeed * 1.8 : baseSpeed;
      currentRotation += targetSpeed;
      time += 0.025;

      const cos = Math.cos(currentRotation);
      const sin = Math.sin(currentRotation);

      // 1. Draw Central Glowing Galactic Core (Bulge)
      const coreRadius = maxRadius * 0.42;
      const coreGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        coreRadius
      );

      if (isDark) {
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        coreGrad.addColorStop(0.18, "rgba(186, 230, 253, 0.75)");
        coreGrad.addColorStop(0.45, "rgba(56, 189, 248, 0.38)");
        coreGrad.addColorStop(0.75, "rgba(37, 99, 235, 0.12)");
        coreGrad.addColorStop(1, "rgba(2, 6, 23, 0)");
      } else {
        coreGrad.addColorStop(0, "rgba(14, 165, 233, 0.85)");
        coreGrad.addColorStop(0.25, "rgba(56, 189, 248, 0.65)");
        coreGrad.addColorStop(0.55, "rgba(125, 211, 252, 0.35)");
        coreGrad.addColorStop(0.85, "rgba(224, 242, 254, 0.15)");
        coreGrad.addColorStop(1, "rgba(240, 249, 255, 0)");
      }

      ctx.save();
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Cosmic Nebula Cloud Arms (additive blending)
      ctx.save();
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";

      // 3. Draw Ambient Star Field
      ambientStars.forEach((star) => {
        const pulse = Math.sin(time + star.x) * 0.25;
        const finalAlpha = Math.max(0.1, Math.min(1, star.alpha + pulse));
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${finalAlpha * 0.7})`
          : `rgba(14, 165, 233, ${finalAlpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(centerX + star.x, centerY + star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Draw Rotating Spiral Galaxy Stars
      stars.forEach((star) => {
        // Rotate star coordinates
        const rx = star.x * cos - star.y * sin;
        const ry = star.x * sin + star.y * cos;

        // Twinkle effect
        const twinkle = Math.sin(time * 2 + star.twinkleOffset) * 0.2;
        const finalAlpha = Math.max(0.15, Math.min(1, star.alpha + twinkle));

        ctx.fillStyle = `${palette[star.colorIdx]}${finalAlpha})`;
        ctx.beginPath();
        ctx.arc(centerX + rx, centerY + ry, star.baseRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();

      // 5. Bright Core Star Cross Flare
      ctx.save();
      ctx.globalCompositeOperation = isDark ? "lighter" : "source-over";
      const flareSize = maxRadius * 0.28;
      const flareGradH = ctx.createLinearGradient(
        centerX - flareSize,
        centerY,
        centerX + flareSize,
        centerY
      );
      const flareColorCenter = isDark
        ? "rgba(255, 255, 255, 0.9)"
        : "rgba(14, 165, 233, 0.8)";
      const flareColorEdge = isDark
        ? "rgba(56, 189, 248, 0)"
        : "rgba(14, 165, 233, 0)";

      flareGradH.addColorStop(0, flareColorEdge);
      flareGradH.addColorStop(0.5, flareColorCenter);
      flareGradH.addColorStop(1, flareColorEdge);

      ctx.fillStyle = flareGradH;
      ctx.fillRect(centerX - flareSize, centerY - 1, flareSize * 2, 2);

      const flareGradV = ctx.createLinearGradient(
        centerX,
        centerY - flareSize,
        centerX,
        centerY + flareSize
      );
      flareGradV.addColorStop(0, flareColorEdge);
      flareGradV.addColorStop(0.5, flareColorCenter);
      flareGradV.addColorStop(1, flareColorEdge);

      ctx.fillStyle = flareGradV;
      ctx.fillRect(centerX - 1, centerY - flareSize, 2, flareSize * 2);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [size, shouldReduceMotion]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-full flex items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-[1.03] group"
      style={{ width: size, height: size }}
    >
      {/* Outer Cosmic Ambient Halo */}
      <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-sky-500/25 via-cyan-400/20 to-blue-600/25 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Tactile Liquid Glass Orbital Frame */}
      <div className="relative w-full h-full rounded-full overflow-hidden p-1.5 clay-card border-2 border-white/90 dark:border-sky-400/40 shadow-2xl bg-white/80 dark:bg-slate-950/90 backdrop-blur-xl flex items-center justify-center">
        <span className="specular-sweep" aria-hidden="true" />

        {/* Deep Space Viewport */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-b from-slate-950 via-[#070b19] to-slate-950 dark:from-black dark:via-[#030712] dark:to-black flex items-center justify-center shadow-inner">
          <canvas
            ref={canvasRef}
            style={{ width: size, height: size }}
            className="block w-full h-full pointer-events-none"
          />

          {/* Liquid Glass Dome Lens Reflection */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/30 pointer-events-none" />
          <div className="absolute top-1 left-3 right-3 h-1/3 rounded-full bg-gradient-to-b from-white/25 to-transparent blur-[1px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
