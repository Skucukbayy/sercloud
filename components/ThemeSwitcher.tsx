"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";

export default function ThemeSwitcher() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 glass rounded-xl text-slate-400 hover:text-blue-400 transition-all border border-white/5 hover:border-blue-500/20"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
    );
}
