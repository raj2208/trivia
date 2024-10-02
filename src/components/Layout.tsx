import React from "react";
import { useTheme } from "../ThemeContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Trivia Game</h1>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
        >
          Toggle Theme
        </button>
      </header>
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
