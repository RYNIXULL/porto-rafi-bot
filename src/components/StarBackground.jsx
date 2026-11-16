import React, { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

export default function StarBackground() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let reduceMotion = !!mq?.matches;

    let animationFrameId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const STAR_COUNT = Math.min(Math.floor((width * height) / 6500), 140);
    let stars = [];

    const darkColors = [
      "rgba(241, 245, 249, ",
      "rgba(125, 211, 252, ",
      "rgba(56, 189, 248, ",
      "rgba(186, 230, 253, ",
    ];

    const lightColors = [
      "rgba(14, 165, 233, ",
      "rgba(2, 132, 199, ",
      "rgba(56, 189, 248, ",
      "rgba(100, 116, 139, ",
    ];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4 + 0.5,
          alpha: Math.random() * 0.55 + 0.2,
          twinkleSpeed: Math.random() * 0.012 + 0.004,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          colorIdx: i % 4,
        });
      }
    }

    initStars();

    const drawFrame = (animate) => {
      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === "dark";
      const palette = isDark ? darkColors : lightColors;
      const alphaScale = isDark ? 0.72 : 0.24;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (animate) {
          star.alpha += star.twinkleSpeed * star.twinkleDir;
          if (star.alpha > 0.85) {
            star.alpha = 0.85;
            star.twinkleDir = -1;
          } else if (star.alpha < 0.18) {
            star.alpha = 0.18;
            star.twinkleDir = 1;
          }
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = palette[star.colorIdx] + (star.alpha * alphaScale).toFixed(3) + ")";
        ctx.fill();
      }
    };

    const render = () => {
      drawFrame(!reduceMotion);
      if (!reduceMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
      if (reduceMotion) drawFrame(false);
    };

    const handleMotionChange = (e) => {
      reduceMotion = e.matches;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = 0;
      render();
    };

    window.addEventListener("resize", handleResize);
    mq?.addEventListener?.("change", handleMotionChange);
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      mq?.removeEventListener?.("change", handleMotionChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (canvas && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
