"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Toast = {
  id: number;
  title: string;
  description?: string;
};

type ToastContextValue = {
  addToast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
    setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-lg border border-[color:var(--neutral-alpha-weak)] bg-[color:var(--surface-background)] px-4 py-2 text-sm shadow-lg"
          >
            <div className="font-semibold">{toast.title}</div>
            {toast.description && (
              <div className="text-[color:var(--neutral-on-background-weak)]">{toast.description}</div>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

type ThemeContextValue = {
  theme: string;
  setTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("data-theme") || "system";
    setThemeState(savedTheme);
  }, []);

  const setTheme = (nextTheme: string) => {
    setThemeState(nextTheme);
    localStorage.setItem("data-theme", nextTheme);
    const resolvedTheme =
      nextTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : nextTheme;
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
