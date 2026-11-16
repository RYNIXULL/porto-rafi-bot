import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(undefined);

const TOAST_STYLES = {
  success: {
    icon: CheckCircle2,
    iconBox:
      "bg-emerald-50 text-emerald-600 border-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/30",
    accentBar: "bg-emerald-500",
  },
  info: {
    icon: Info,
    iconBox:
      "bg-sky-50 text-sky-600 border-sky-200/80 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/30",
    accentBar: "bg-sky-500",
  },
  error: {
    icon: AlertTriangle,
    iconBox:
      "bg-rose-50 text-rose-600 border-rose-200/80 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/30",
    accentBar: "bg-rose-500",
  },
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const pushToast = useCallback(
    (type, title, message, duration = 4200) => {
      const id = ++idCounter.current;
      setToasts((prev) => [...prev.slice(-3), { id, type, title, message }]);
      if (duration > 0) {
        window.setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
      return id;
    },
    [dismissToast]
  );

  const toast = {
    success: (title, message, duration) => pushToast("success", title, message, duration),
    info: (title, message, duration) => pushToast("info", title, message, duration),
    error: (title, message, duration) => pushToast("error", title, message, duration),
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[380px] z-[80] flex flex-col gap-3 pointer-events-none"
      >
        {toasts.map((t) => {
          const cfg = TOAST_STYLES[t.type] || TOAST_STYLES.info;
          const IconComponent = cfg.icon;
          return (
            <div
              key={t.id}
              role="status"
              className="pointer-events-auto relative overflow-hidden rounded-[26px] border-[2.5px] border-white dark:border-slate-700/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 shadow-[0_20px_45px_-6px_rgba(14,165,233,0.22),inset_3px_3px_8px_#FFFFFF,inset_-2px_-2px_6px_rgba(14,165,233,0.06)] dark:shadow-[0_20px_45px_-6px_rgba(2,6,23,0.75),0_0_24px_rgba(14,165,233,0.14)] animate-slide-up flex items-start gap-3.5"
            >
              <span
                className={`absolute left-0 top-3 bottom-3 w-1 rounded-r-full ${cfg.accentBar}`}
                aria-hidden="true"
              />
              <div
                className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${cfg.iconBox}`}
              >
                <IconComponent className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                  {t.title}
                </p>
                {t.message && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {t.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Tutup notifikasi"
                className="group w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
              >
                <X
                  className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90"
                  aria-hidden="true"
                />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
