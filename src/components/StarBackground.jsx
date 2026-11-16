import React, { useEffect, useRef } from 'react';

export default function StarBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    // Star collection
    const STAR_COUNT = Math.min(Math.floor((width * height) / 4500), 220);
    let stars = [];

    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(165, 218, 255, ',
      'rgba(44, 103, 237, ',
      'rgba(147, 197, 253, ',
      'rgba(224, 231, 255, '
    ];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.6 + 0.4,
          baseAlpha: Math.random() * 0.7 + 0.3,
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: Math.random() > 0.5 ? 1 : -1,
          colorPrefix: starColors[Math.floor(Math.random() * starColors.length)]
        });
      }
    }

    // Shooting stars (meteors)
    let meteors = [];

    function spawnMeteor() {
      const startX = Math.random() * (width * 1.2) - width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const length = Math.random() * 90 + 70;
      const speed = Math.random() * 8 + 9;
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees

      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01,
        color: Math.random() > 0.3 ? '#2c67ed' : '#38bdf8'
      });
    }

    initStars();

    let lastMeteorTime = Date.now();
    let meteorInterval = 3000 + Math.random() * 2500;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render static / twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha > 0.95) {
          star.alpha = 0.95;
          star.twinkleDir = -1;
        } else if (star.alpha < 0.2) {
          star.alpha = 0.2;
          star.twinkleDir = 1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.colorPrefix + star.alpha + ')';
        ctx.fill();

        // Extra subtle bloom for larger stars
        if (star.radius > 1.4) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(44, 103, 237, ' + (star.alpha * 0.25) + ')';
          ctx.fill();
        }
      }

      // Check for meteor spawn
      const now = Date.now();
      if (now - lastMeteorTime > meteorInterval) {
        spawnMeteor();
        lastMeteorTime = now;
        meteorInterval = 2500 + Math.random() * 3000;
      }

      // Render meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x < -100 || m.x > width + 100 || m.y > height + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const headX = m.x;
        const headY = m.y;
        const tailX = m.x - (m.dx / Math.hypot(m.dx, m.dy)) * m.length;
        const tailY = m.y - (m.dy / Math.hypot(m.dx, m.dy)) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
        grad.addColorStop(0, 'rgba(44, 103, 237, 0)');
        grad.addColorStop(0.7, m.color === '#2c67ed' ? `rgba(44, 103, 237, ${m.life * 0.6})` : `rgba(56, 189, 248, ${m.life * 0.7})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.life})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(headX, headY);
        ctx.stroke();

        // Meteor glowing head
        ctx.beginPath();
        ctx.arc(headX, headY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.shadowColor = '#2c67ed';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

