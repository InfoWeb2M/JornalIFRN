export default function BotaoTema({ tema, setTema }) {
  const lua = "M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z";

  const alternarTema = () => {
    const novoTema = tema === "claro" ? "escuro" : "claro";
    setTema(novoTema);
    // Atualiza o localStorage
    localStorage.setItem("tema", novoTema);
    // Força refresh da página
    window.location.reload();
  };

  return (
    <button
      id="toggle-tema"
      aria-pressed={tema === "escuro"}
      aria-label="Alternar tema"
      onClick={alternarTema}
      className="flex items-center gap-2 px-1 py-2 rounded transition-all duration-200 text-[var(--background)] cursor-pointer hover:opacity-60"
    >
      <span className="text-[var(--text)] select-none">tema:</span>

      <svg
        className="w-6 h-6 text-[var(--text)] hover:size-6"
        viewBox="0 0 24 24"
        role="img"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {tema === "claro" ? (
          <>
            <circle cx="12" cy="12" r="5" fill="currentColor" />
            <path
              d="M12 1 L12 4 M12 20 L12 23 
                 M4.22 4.22 L6.34 6.34 
                 M17.66 17.66 L19.78 19.78 
                 M1 12 L4 12 
                 M20 12 L23 12 
                 M4.22 19.78 L6.34 17.66 
                 M17.66 6.34 L19.78 4.22"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </>
        ) : (
          <path d={lua} fill="currentColor" />
        )}
      </svg>
    </button>
  );
}
