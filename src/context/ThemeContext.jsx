import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";

const ThemeContext = createContext(undefined);

function applyThemeToDocument(mode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", mode === "dark");
  root.style.colorScheme = mode;
}

export function ThemeProvider({ children, storageKey = "app_theme_mode" }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const themeRef = useRef("light");
  const transitionIdRef = useRef(0);
  const fallbackTimerRef = useRef(null);
  const activeAnimationRef = useRef(null);
  const activeIconElRef = useRef(null);

  const clearActiveIconTransitionName = useCallback(() => {
    if (activeIconElRef.current) {
      activeIconElRef.current.style.viewTransitionName = "";
      activeIconElRef.current = null;
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "dark" || saved === "light") {
        themeRef.current = saved;
        setThemeState(saved);
        applyThemeToDocument(saved);
        return;
      }
      const initial = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
      themeRef.current = initial;
      setThemeState(initial);
      applyThemeToDocument(initial);
    } catch {
      themeRef.current = "light";
      applyThemeToDocument("light");
    }
  }, [storageKey]);

  const applyThemeAnimated = useCallback(
    (next, origin) => {
      if (next === themeRef.current) return;
      themeRef.current = next;
      const currentId = ++transitionIdRef.current;

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
      if (activeAnimationRef.current) {
        activeAnimationRef.current.cancel();
        activeAnimationRef.current = null;
      }
      clearActiveIconTransitionName();

      const persist = (mode) => {
        try {
          window.localStorage.setItem(storageKey, mode);
        } catch {
          // Ignore storage errors
        }
      };

      const root = document.documentElement;
      const prefersReducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        !prefersReducedMotion &&
        typeof document.startViewTransition === "function"
      ) {
        root.classList.remove("theme-transitioning");
        root.classList.add("theme-view-transition");
        setIsTransitioning(true);

        const iconEl = origin?.iconElement;
        if (iconEl && iconEl.isConnected) {
          iconEl.style.viewTransitionName = "theme-toggle-icon";
          activeIconElRef.current = iconEl;
        }

        const x =
          typeof origin?.x === "number" && Number.isFinite(origin.x)
            ? origin.x
            : window.innerWidth / 2;
        const y =
          typeof origin?.y === "number" && Number.isFinite(origin.y)
            ? origin.y
            : window.innerHeight / 2;
        const endRadius =
          Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
          ) + 2;

        try {
          const transition = document.startViewTransition(() => {
            flushSync(() => {
              setThemeState(next);
            });
            applyThemeToDocument(next);
            persist(next);
          });

          transition.ready
            .then(() => {
              if (transitionIdRef.current !== currentId) return;
              activeAnimationRef.current = root.animate(
                {
                  clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${endRadius}px at ${x}px ${y}px)`,
                  ],
                },
                {
                  duration: 580,
                  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
                  fill: "both",
                  pseudoElement: "::view-transition-new(root)",
                }
              );
            })
            .catch(() => {});

          transition.finished
            .catch(() => {})
            .finally(() => {
              if (transitionIdRef.current === currentId) {
                activeAnimationRef.current?.cancel();
                activeAnimationRef.current = null;
                clearActiveIconTransitionName();
                root.classList.remove("theme-view-transition");
                setIsTransitioning(false);
              }
            });

          return;
        } catch {
          clearActiveIconTransitionName();
          root.classList.remove("theme-view-transition");
        }
      }

      root.classList.remove("theme-view-transition");
      if (!prefersReducedMotion) {
        root.classList.add("theme-transitioning");
        setIsTransitioning(true);
        fallbackTimerRef.current = window.setTimeout(() => {
          if (transitionIdRef.current === currentId) {
            root.classList.remove("theme-transitioning");
            setIsTransitioning(false);
            fallbackTimerRef.current = null;
          }
        }, 520);
      }

      setThemeState(next);
      applyThemeToDocument(next);
      persist(next);
    },
    [clearActiveIconTransitionName, storageKey]
  );

  const setTheme = useCallback(
    (next, origin) => applyThemeAnimated(next, origin),
    [applyThemeAnimated]
  );

  const toggleTheme = useCallback(
    (origin) =>
      applyThemeAnimated(themeRef.current === "dark" ? "light" : "dark", origin),
    [applyThemeAnimated]
  );

  return (
    <ThemeContext.Provider
      value={{ theme, mounted, isTransitioning, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}

export function ThemeToggle({ compact = true }) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isDark = mounted && theme === "dark";
  const iconStageRef = useRef(null);

  return (
    <button
      type="button"
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const hasCoords = e.clientX !== 0 || e.clientY !== 0;
        toggleTheme({
          x: hasCoords ? e.clientX : rect.left + rect.width / 2,
          y: hasCoords ? e.clientY : rect.top + rect.height / 2,
          iconElement: iconStageRef.current,
        });
      }}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={isDark}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      className={`group shrink-0 inline-flex items-center justify-center rounded-full bg-white/75 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700/90 hover:border-sky-300/80 dark:hover:border-sky-400/50 backdrop-blur-md border border-white/80 dark:border-slate-700/80 shadow-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-95 cursor-pointer ${
        compact ? "w-10 h-10" : "px-3.5 h-10 gap-2"
      }`}
    >
      <span
        ref={iconStageRef}
        className="relative inline-flex items-center justify-center w-4 h-4 shrink-0"
      >
        <Sun
          className={`w-4 h-4 text-amber-400 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isDark
              ? "opacity-100 rotate-0 scale-100 group-hover:rotate-45 group-hover:scale-110"
              : "opacity-0 -rotate-90 scale-50 pointer-events-none"
          }`}
          aria-hidden="true"
        />
        <Moon
          className={`w-4 h-4 text-[#0284C7] absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isDark
              ? "opacity-0 rotate-90 scale-50 pointer-events-none"
              : "opacity-100 rotate-0 scale-100 group-hover:-rotate-12 group-hover:scale-110"
          }`}
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
