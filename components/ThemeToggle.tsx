"use client"

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // localStorage can throw on iOS Safari (e.g. "Block All Cookies"), so read it safely
        let saved: string | null = null;
        try {
            saved = localStorage.getItem("theme");
        } catch {
            // ignore
        }

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const shouldBeDark = saved === "dark" || (!saved && prefersDark);

        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle("dark", shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        document.documentElement.classList.toggle("dark", newIsDark);
        try {
            localStorage.setItem("theme", newIsDark ? "dark" : "light");
        } catch {
            // ignore
        }
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="w-9 h-9 flex items-center justify-center border border-black dark:border-white/30 rounded-full"
        >
            {isDark ? "☀️" : "🌙"}
        </button>
    );
}
