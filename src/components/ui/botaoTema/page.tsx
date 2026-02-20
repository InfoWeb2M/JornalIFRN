"use client";

import { useEffect, useState } from "react";

type Tema = "claro" | "escuro";

export default function BotaoTema() {
  const [tema, setTema] = useState<Tema>(() => {
    if (typeof document === "undefined") return "claro";
    const saved = localStorage.getItem("tema");
    return saved === "escuro" ? "escuro" : "claro";
  });
  // 🔹 Aplica o tema sempre que mudar
  useEffect(() => {
    localStorage.setItem("tema", tema);
    document.documentElement.setAttribute("data-tema", tema);
  }, [tema]);

  const alternarTema = () => {
    setTema((prev) => (prev === "claro" ? "escuro" : "claro"));
  };

  return (
    <button
      id="toggle-tema"
      type="button"
      aria-pressed={tema !== "escuro"}
      aria-label="Alternar tema"
      onClick={alternarTema}
      className="
        flex items-center gap-2 px-2 py-2 rounded
        transition-all duration-200 cursor-pointer
        hover:opacity-70
      "
    >
      <span className="text-(--text) select-none">tema:</span>

      <svg
        className="w-6 h-6 text-(--text) transition-transform duration-300"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        {tema === "claro" ? (
          <>
            {/* ☀️ SOL */}
            <circle
              cx="12"
              cy="12"
              r="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41
                 M17.66 17.66l1.41 1.41M2 12h2M20 12h2
                 M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </>
        ) : (
          <>
            {/* 🌙 LUA */}
            <path
              d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
              fill="currentColor"
            />
          </>
        )}
      </svg>
    </button>
  );
}
