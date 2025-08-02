"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Settings } from "lucide-react";

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div style={{ position: "relative", zIndex: 100 }}>
      <button
        aria-label="Abrir configuración"
        className="p-2 rounded-full hover:bg-accent transition-colors"
        onClick={() => setOpen((o) => !o)}
      >
        <Settings className="w-6 h-6" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-background border rounded-lg shadow-lg p-2 flex flex-col gap-2">
          <button
            className="flex items-center gap-2 p-2 rounded hover:bg-accent transition-colors"
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-5 h-5" /> Modo claro
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" /> Modo oscuro
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}