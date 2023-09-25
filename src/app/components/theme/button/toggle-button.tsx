"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // prevent hydration error
  if (!mounted) {
    return null;
  }

  return (
    <button
      className={`w-fit p-2 rounded-md hover:scale-110 active:scale-100 duration-200  dark:bg-[#212933]`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? "🔦" : "🌙"}
    </button>
  );
};
