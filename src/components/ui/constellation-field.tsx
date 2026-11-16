"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type NeuformMode = "dark" | "light";
type NeuformModePreference = NeuformMode | "auto";

export type ConstellationFieldProps = {
  mode?: NeuformModePreference;
  speed?: number;
  size?: number;
  gap?: number;
  length?: number;
  density?: number;
  strokeWidth?: number;
  opacity?: number;
  hue?: number;
  saturation?: number;
  brightness?: number;
  className?: string;
  style?: CSSProperties;
};

const DEFAULTS = {
  mode: "dark" as NeuformMode,
  speed: 1,
  size: 1,
  gap: 2,
  length: 1,
  density: 1,
  strokeWidth: 1,
  opacity: 1,
  hue: 0,
  saturation: 1,
  brightness: 1,
} as const;

/* Web theme adapted palette: Cosmic Blue #2c67ed and Soft Paper */
const LIGHT_PAPER = "#f0f4fc";
const DARK_SPACE = "#02040a";

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function scaleCount(base: number, density: number, minimum = 1) {
  return Math.max(minimum, Math.round(base * density));
}

function resolveMode(
  mode: NeuformMode | number | string | undefined,
  fallback: NeuformMode = "dark",
): NeuformMode {
  if (mode === undefined || mode === null) return fallback;
  if (mode === "light" || mode === 1 || mode === "1") return "light";
  return "dark";
}

function readAutomaticMode(): NeuformMode {
  if (typeof document === "undefined" || typeof window === "undefined")
    return "dark";
  const root = document.documentElement;
  const declared = root.dataset.scheme ?? root.dataset.theme;
  if (declared === "light" || declared === "dark") return declared;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useAutomaticMode(enabled: boolean) {
  const [mode, setMode] = useState<NeuformMode>(readAutomaticMode);

  useEffect(() => {
    if (
      !enabled ||
      typeof document === "undefined" ||
      typeof window === "undefined"
    )
      return undefined;
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setMode(readAutomaticMode());
    const observer = new MutationObserver(update);
    observer.observe(root, {
      attributes: true,
      attributeFilter: ["data-scheme", "data-theme", "class"],
    });
    media.addEventListener("change", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
    };
  }, [enabled]);

  return mode;
}

function resolveBackground(mode: NeuformMode) {
  return mode === "light" ? LIGHT_PAPER : DARK_SPACE;
}

/** Verbatim source of src/shaders/neuform-isolated/sources/constellation-field.html (MengTo/threeui, MIT), themed to #2c67ed cosmic blue. */
const CONSTELLATION_FIELD_SOURCE = String.raw`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cosmic Constellation Field</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
    <!-- GSAP for Masked Reveal -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
</head>

<body class="relative min-h-screen overflow-x-hidden flex flex-col font-sans text-[#F2F4FB] bg-[#02040a] selection:bg-[#2c67ed]/30 selection:text-[#38bdf8]">

    <!-- WebGL Constellation Canvas Shell & Depth Overlay -->
    <div class="fixed inset-0 -z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#091436_0%,_#02040a_100%)]"></div>
    <div class="fixed inset-0 -z-10 pointer-events-none">
        <canvas id="constellationCanvas" class="w-full h-full"></canvas>
    </div>
    <div class="fixed inset-0 -z-10 pointer-events-none bg-gradient-to-b from-transparent via-[#091436]/40 to-[#02040a] opacity-80"></div>

    <!-- Header (Elevated Glassy UI) -->
    <nav class="w-full relative z-20 bg-[#070d24]/50 backdrop-blur-md border-b border-[#14224f] shadow-[0_2px_12px_rgba(44,103,237,0.25)]">
        <div class="flex justify-between items-center py-5 px-6 md:px-12 max-w-[90rem] mx-auto">
            
            <!-- Brand -->
            <div class="flex items-center gap-2 text-[#F2F4FB]">
                <div class="relative h-8 w-8 bg-transparent border border-[#2c67ed]/50 flex items-center justify-center rounded-md" style="box-shadow: 0 0 12px rgba(44,103,237,0.4);">
                    <span class="h-2 w-2 rounded-full bg-[#38bdf8]" style="box-shadow: 0 0 12px rgba(56,189,248,0.8);"></span>
                </div>
                <span class="text-xl font-thin tracking-tight uppercase ml-1">Cosmic Orbit</span>
            </div>

            <div class="hidden md:flex items-center gap-10 text-xs font-normal uppercase text-[#9AA3BC] tracking-widest">
                <a href="#" class="hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]">Features</a>
                <a href="#" class="hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]">Constellations</a>
                <a href="#" class="hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]">Portfolio</a>
                <a href="#" class="hover:text-[#F2F4FB] transition-colors hover:shadow-[0_0_8px_rgba(56,189,248,0.4)]">Connect</a>
            </div>

            <!-- Gradient Border Shell CTA -->
            <div class="p-[1px] rounded-full bg-gradient-to-br from-[#2c67ed] to-[#38bdf8]/40">
                <a href="#" class="block bg-[#050914]/90 backdrop-blur-sm text-[#38bdf8] px-6 py-2.5 rounded-full text-xs font-normal uppercase tracking-widest hover:bg-[#2c67ed] hover:text-white transition-all shadow-[0_0_15px_rgba(44,103,237,0.5)]">
                    Explore
                </a>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow flex flex-col items-center justify-center relative z-10 px-6 pt-24 pb-28 md:pt-32 lg:pt-40">
        <div class="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
            <!-- Headline -->
            <h1 class="masked-reveal text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight text-[#F2F4FB] text-center leading-tight max-w-5xl cursor-default">
                Connected in the Cosmos<br />Intelligent Design
            </h1>

            <p class="masked-reveal mt-8 text-lg md:text-xl text-[#9AA3BC] max-w-2xl font-normal leading-relaxed">
                Interconnecting digital nodes with cosmic elegance and fluid liquid glass physics.
            </p>
        </div>
    </main>

    <script>
        // WebGL Drifting Nodes & Network Logic (Themed to Cosmic Blue #2c67ed and Cyan #38bdf8)
        const canvas = document.getElementById('constellationCanvas');
        const ctx = canvas.getContext('2d');
        let width, height;
        let nodes = [];
        const LINK = 160; 
        const MAX_NODES = window.innerWidth < 768 ? 40 : 85;
        let pointer = { x: -1000, y: -1000 };

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.max(1, Math.floor(width * dpr));
            canvas.height = Math.max(1, Math.floor(height * dpr));
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = false;
        }
        
        window.addEventListener('resize', () => {
            resize();
            initNodes();
        });
        resize();

        function initNodes() {
            nodes = [];
            for(let i=0; i<MAX_NODES; i++) {
                nodes.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    radius: Math.random() * 2.4 + 1.8
                });
            }
        }
        initNodes();

        // Pointer gravity tracker
        document.addEventListener('mousemove', e => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        });

        // Clear pointer on leave
        document.addEventListener('mouseleave', () => {
            pointer.x = -1000;
            pointer.y = -1000;
        });

        function dist(a, b) {
            return Math.hypot(a.x - b.x, a.y - b.y);
        }

        // Render Loop
        function animateCanvas() {
            ctx.clearRect(0, 0, width, height);
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            
            // Draw Links first so nodes sit crisp on top
            ctx.strokeStyle = '#2c67ed';
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const d = dist(nodes[i], nodes[j]);
                    if (d < LINK) {
                        ctx.globalAlpha = 0.22 + (1 - d/LINK) * 0.55;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;
                
                // Bounce off edges
                if(node.x < 0 || node.x > width) node.vx *= -1;
                if(node.y < 0 || node.y > height) node.vy *= -1;

                // Gentle Pointer gravity
                const pd = dist(node, pointer);
                if(pd < 220) {
                    node.x -= (node.x - pointer.x) * 0.005;
                    node.y -= (node.y - pointer.y) * 0.005;
                }
                
                // Draw Node (Cosmic Blue & Cyan) — core + soft halo
                const pulse = 0.78 + Math.sin(Date.now() * 0.001 + node.x) * 0.22;
                ctx.fillStyle = '#38bdf8';
                ctx.globalAlpha = pulse * 0.28;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * 2.4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = pulse;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(animateCanvas);
        }
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            animateCanvas();
        }
    </script>
</body>
</html>`;

function patchConstellationField(
  source: string,
  {
    size,
    length,
    density,
    strokeWidth,
    mode,
  }: {
    size: number;
    length: number;
    density: number;
    strokeWidth: number;
    mode: NeuformMode;
  },
) {
  let next = source
    .replace("const LINK = 160;", `const LINK = ${Math.round(160 * length)};`)
    .replace(
      "const MAX_NODES = window.innerWidth < 768 ? 40 : 85;",
      `const MAX_NODES = window.innerWidth < 768 ? ${scaleCount(40, density, 8)} : ${scaleCount(85, density, 12)};`,
    )
    .replace(
      "radius: Math.random() * 2.4 + 1.8",
      `radius: (Math.random() * 2.4 + 1.8) * ${size}`,
    )
    .replace(
      "ctx.lineWidth = 1;",
      `ctx.lineWidth = ${Number(Math.max(0.25, strokeWidth).toFixed(2))};`,
    )
    .replace(
      "node.x += node.vx;",
      "node.x += node.vx * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
    )
    .replace(
      "node.y += node.vy;",
      "node.y += node.vy * ((window.__SF_CONTROLS&&window.__SF_CONTROLS.speed)||1);",
    );
  if (mode === "light") {
    next = next
      .replace("ctx.strokeStyle = '#2c67ed';", "ctx.strokeStyle = '#0284c7';")
      .replace("ctx.fillStyle = '#38bdf8';", "ctx.fillStyle = '#0284c7';");
  }
  return next;
}

function buildFocusedDocument(knobs: {
  mode: NeuformMode;
  speed: number;
  size: number;
  gap: number;
  length: number;
  density: number;
  strokeWidth: number;
  opacity: number;
}) {
  const { mode } = knobs;
  const background = resolveBackground(mode);
  const targetJson = JSON.stringify([
    { selector: "#constellationCanvas", role: "background" },
  ]).replace(/</g, "\\u003c");
  const controlsJson = JSON.stringify({
    mode,
    speed: knobs.speed,
    size: knobs.size,
    gap: knobs.gap,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    opacity: knobs.opacity,
  }).replace(/</g, "\\u003c");
  const patchedSource = patchConstellationField(CONSTELLATION_FIELD_SOURCE, {
    size: knobs.size,
    length: knobs.length,
    density: knobs.density,
    strokeWidth: knobs.strokeWidth,
    mode,
  });
  const focusStyle = `<style data-threeui-focus>
html, body { width: 100% !important; height: 100% !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: ${background} !important; }
body { position: relative !important; display: flex !important; align-items: center !important; justify-content: center !important; }
body > * { visibility: hidden !important; }
body[data-threeui-ready] > [data-threeui-role] { visibility: visible !important; }
[data-threeui-residual] { display: none !important; }
[data-threeui-role="background"] { position: fixed !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; max-height: none !important; z-index: 0 !important; opacity: 1 !important; pointer-events: none !important; }
[data-threeui-role="ui"] { position: relative !important; z-index: 1 !important; width: min(calc(100% - 32px), var(--threeui-target-width, 1040px)) !important; max-width: none !important; max-height: calc(100% - 32px) !important; margin: auto !important; overflow: auto !important; opacity: 1 !important; transform: none !important; filter: none !important; flex: none !important; box-sizing: border-box !important; }
</style>`;
  const controlScript = `<script data-threeui-controls>
(function () {
  var controls = ${controlsJson};
  window.__SF_CONTROLS = controls;
  var origin = performance.now();
  var virtual = 0;
  var last = origin;
  var performanceNow = performance.now.bind(performance);
  var dateNow = Date.now.bind(Date);
  var dateOrigin = dateNow();
  performance.now = function () {
    var real = performanceNow();
    virtual += (real - last) * (controls.speed || 1);
    last = real;
    return origin + virtual;
  };
  Date.now = function () {
    return dateOrigin + (performance.now() - origin);
  };
  var raf = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = function (callback) {
    return raf(function () {
      callback(performance.now());
    });
  };
  function applyVisual() {
    var opacity = controls.opacity == null ? 1 : controls.opacity;
    var size = controls.size == null ? 1 : controls.size;
    Array.prototype.forEach.call(document.querySelectorAll('[data-threeui-role]'), function (element) {
      element.style.opacity = String(opacity);
      if (element.getAttribute('data-threeui-role') === 'ui') {
        element.style.transform = 'scale(' + size + ')';
        element.style.transformOrigin = 'center center';
      }
    });
  }
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'threeui-controls') return;
    var next = event.data.controls || {};
    Object.keys(next).forEach(function (key) { controls[key] = next[key]; });
    applyVisual();
  });
  window.__SF_APPLY_CONTROLS = applyVisual;
})();
</script>`;
  const focusScript = `<script data-threeui-focus>
(function () {
  var isolated = false;
  function isolate() {
    if (isolated) return;
    var specs = ${targetJson};
    var roots = [];
    specs.forEach(function (spec) {
      var element = document.querySelector(spec.selector);
      if (!element) return;
      element.setAttribute('data-threeui-role', spec.role);
      if (spec.width) element.style.setProperty('--threeui-target-width', spec.width);
      if (!roots.some(function (root) { return root.contains(element); })) roots.push(element);
    });
    if (!roots.length) return;
    isolated = true;
    roots.forEach(function (root) { document.body.appendChild(root); });
    Array.from(document.body.children).forEach(function (element) {
      if (roots.indexOf(element) !== -1) return;
      element.setAttribute('data-threeui-residual', '');
      element.setAttribute('aria-hidden', 'true');
      if ('inert' in element) element.inert = true;
    });
    document.body.setAttribute('data-threeui-ready', '');
    if (window.__SF_APPLY_CONTROLS) window.__SF_APPLY_CONTROLS();
    requestAnimationFrame(function () { window.dispatchEvent(new Event('resize')); });
  }
  function scheduleIsolation() { setTimeout(isolate, 100); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleIsolation, { once: true });
  else scheduleIsolation();
  window.addEventListener('load', isolate, { once: true });
})();
</script>`;
  return patchedSource
    .replace(/<head([^>]*)>/i, `<head$1>${controlScript}${focusStyle}`)
    .replace(/<\/body>/i, `${focusScript}</body>`);
}

export default function ConstellationField({
  mode,
  speed = DEFAULTS.speed,
  size = DEFAULTS.size,
  gap = DEFAULTS.gap,
  length = DEFAULTS.length,
  density = DEFAULTS.density,
  strokeWidth = DEFAULTS.strokeWidth,
  opacity = DEFAULTS.opacity,
  hue = DEFAULTS.hue,
  saturation = DEFAULTS.saturation,
  brightness = DEFAULTS.brightness,
  className,
  style,
}: ConstellationFieldProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const requestedMode = mode ?? DEFAULTS.mode;
  const automaticMode = useAutomaticMode(requestedMode === "auto");
  const resolvedMode =
    requestedMode === "auto"
      ? automaticMode
      : resolveMode(requestedMode, DEFAULTS.mode);
  const background = resolveBackground(resolvedMode);
  const safeSpeed = clamp(speed, 0, 3);
  const safeSize = clamp(size, 0.05, 200);
  const safeGap = clamp(gap, 0, 64);
  const safeLength = clamp(length, 0.35, 2.5);
  const safeDensity = clamp(density, 0.25, 2.5);
  const safeStrokeWidth = clamp(strokeWidth, 0.25, 8);
  const safeOpacity = clamp(opacity, 0.05, 1);
  const safeHue = clamp(hue, -180, 180);
  const safeSaturation = clamp(saturation, 0, 2);
  const safeBrightness = clamp(brightness, 0.35, 1.65);

  // Rebuild when baked geometry/mode knobs change. Speed/opacity stay live via postMessage + time wrap.
  const source = useMemo(
    () =>
      buildFocusedDocument({
        mode: resolvedMode,
        speed: DEFAULTS.speed,
        size: safeSize,
        gap: safeGap,
        length: safeLength,
        density: safeDensity,
        strokeWidth: safeStrokeWidth,
        opacity: DEFAULTS.opacity,
      }),
    [resolvedMode, safeDensity, safeGap, safeLength, safeSize, safeStrokeWidth],
  );

  useEffect(() => {
    const frame = iframeRef.current?.contentWindow;
    if (!frame) return;
    frame.postMessage(
      {
        type: "threeui-controls",
        controls: {
          mode: resolvedMode,
          speed: safeSpeed,
          size: safeSize,
          gap: safeGap,
          length: safeLength,
          density: safeDensity,
          strokeWidth: safeStrokeWidth,
          opacity: safeOpacity,
        },
      },
      "*",
    );
  }, [
    resolvedMode,
    safeDensity,
    safeGap,
    safeLength,
    safeOpacity,
    safeSize,
    safeSpeed,
    safeStrokeWidth,
    source,
  ]);

  const filter =
    safeHue === 0 && safeSaturation === 1 && safeBrightness === 1
      ? undefined
      : `hue-rotate(${safeHue}deg) saturate(${safeSaturation}) brightness(${safeBrightness})`;

  return (
    <iframe
      ref={iframeRef}
      className={className}
      title="Constellation Field"
      srcDoc={source}
      sandbox="allow-scripts"
      loading="eager"
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        border: 0,
        background,
        filter,
        ...style,
      }}
    />
  );
}
