import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  // Load saved theme properly
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    } else {
      setDark(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Apply theme on toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="w-12 h-6 flex items-center rounded-full p-1 transition border border-border bg-card"
    >
      <div
        className={`w-4 h-4 rounded-full shadow-md transform transition ${
          dark
            ? "translate-x-6 bg-white"
            : "translate-x-0 bg-black"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;