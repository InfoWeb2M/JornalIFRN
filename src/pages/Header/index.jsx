import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import BotaoTema from "../BotaoTema";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const [tema, setTema] = useState(() => {
    try {
      return localStorage.getItem("tema") || "claro";
    } catch {
      return "claro";
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    localStorage.setItem("tema", tema);
  }, [tema]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="fixed top-0 left-0 w-full bg-[var(--background)] shadow-[var(--shadow)] rounded-b-xl transition-transform duration-300 z-40">
      <nav className="max-w-screen mx-auto px-6 lg:px-28 sm:px-1 h-24 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          className="flex items-center hover:opacity-60 transition-opacity duration-300"
        >
          <div className="flex flex-col">
            <span
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--titulo)" }}
            >
              Jornal Teresa
            </span>
            <span
              className="text-xs tracking-wider uppercase"
              style={{ color: "var(--links)" }}
            >
              Informação de qualidade
            </span>
          </div>
        </a>

        {/* Botão Hambúrguer (Mobile) */}
        <button
          className="bg-[var(--botões)] p-2 rounded-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{ color: "var(--cards)" }}
          aria-label="Menu"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menu Mobile com transições suaves */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[var(--background)] shadow-[var(--shadow)] px-6 lg:px-28 py-4 space-y-4 rounded-b-xl">
          <div className="bg-[var(--cards)] rounded p-4 space-y-3">
            <a
              href="/"
              style={{ color: "var(--links)" }}
              className="block text-lg font-medium hover:opacity-70 transition-all duration-300 hover:translate-x-2"
            >
              Início
            </a>
            <a
              href="/cronicas"
              style={{ color: "var(--links)" }}
              className="block text-lg font-medium hover:opacity-70 transition-all duration-300 hover:translate-x-2"
            >
              Crônicas
            </a>
            <a
              href="/ilustracoes"
              style={{ color: "var(--links)" }}
              className="block text-lg font-medium hover:opacity-70 transition-all duration-300 hover:translate-x-2"
            >
              Ilustrações
            </a>
            <a
              href="/contato"
              style={{ color: "var(--links)" }}
              className="block text-lg font-medium hover:opacity-70 transition-all duration-300 hover:translate-x-2"
            >
              Contato
            </a>
            <BotaoTema tema={tema} setTema={setTema} />
          </div>
        </div>
      </div>
    </header>
  );
}
