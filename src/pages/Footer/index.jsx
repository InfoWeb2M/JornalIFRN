export default function Footer() {
  return (
    <footer className="bg-[var(--cards)] shadow-[var(--shadow)] mt-auto rounded-t-xl">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Nome do Jornal */}
        <div className="text-center md:text-left">
          <h2
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--titulo)" }}
          >
            Jornal Tereza
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--links)" }}
          >
            Informação de qualidade, sempre com você.
          </p>
        </div>

        {/* Links de navegação (só aparecem em telas grandes) */}
        <div className="hidden lg:flex gap-8">
          <a
            href="/"
            style={{ color: "var(--links)" }}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 hover:-translate-y-1"
          >
            Início
          </a>
          <a
            href="/noticias"
            style={{ color: "var(--links)" }}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 hover:-translate-y-1"
          >
            Notícias
          </a>
          <a
            href="/cronicas"
            style={{ color: "var(--links)" }}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 hover:-translate-y-1"
          >
            Crônicas e Poemas
          </a>
          <a
            href="/ilustracoes"
            style={{ color: "var(--links)" }}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 hover:-translate-y-1"
          >
            Ilustrações
          </a>
          <a
            href="/contato"
            style={{ color: "var(--links)" }}
            className="text-lg font-medium hover:opacity-70 transition-all duration-300 hover:-translate-y-1"
          >
            Contato
          </a>
        </div>

        {/* Redes sociais */}
        <div className="flex items-center gap-6">
          <a
            href="https://www.instagram.com/jornal_teresa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            style={{ color: "var(--links)" }}
          >
            {/* Ícone Instagram */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 
              114.9s51.3 114.9 114.9 114.9S339 319.5 
              339 255.9 287.7 141 224.1 141zm0 
              190.6c-41.8 0-75.7-33.9-75.7-75.7s33.9-75.7 
              75.7-75.7 75.7 33.9 75.7 75.7-33.9 
              75.7-75.7 75.7zm146.4-194.3c0 
              14.9-12 26.9-26.9 26.9s-26.9-12-26.9-26.9 
              12-26.9 26.9-26.9 26.9 12 
              26.9 26.9zm76.1 27.2c-1.7-35.7-9.9-67.3-36.2-93.5
              -26.2-26.2-57.8-34.4-93.5-36.2
              -37-2.1-147.9-2.1-184.9 0
              -35.7 1.7-67.3 9.9-93.5 36.2
              s-34.4 57.8-36.2 93.5c-2.1 37-2.1 
              147.9 0 184.9 1.7 35.7 9.9 67.3 
              36.2 93.5s57.8 34.4 93.5 36.2
              c37 2.1 147.9 2.1 184.9 0
              35.7-1.7 67.3-9.9 93.5-36.2
              26.2-26.2 34.4-57.8 36.2-93.5
              2.1-37 2.1-147.8 0-184.8zM398.8 
              388c-7.8 19.6-22.9 34.7-42.6 
              42.6-29.5 11.7-99.5 9-132.1 
              9s-102.7 2.6-132.1-9c-19.6-7.8
              -34.7-22.9-42.6-42.6-11.7-29.5-9
              -99.5-9-132.1s-2.6-102.7 9-132.1
              c7.8-19.6 22.9-34.7 42.6-42.6
              29.5-11.7 99.5-9 132.1-9s102.7
              -2.6 132.1 9c19.6 7.8 34.7 22.9 
              42.6 42.6 11.7 29.5 9 99.5 
              9 132.1s2.7 102.7-9 132.1z"/>
            </svg>
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-[var(--bordas)] py-4">
        <p
          className="text-center text-xs"
          style={{ color: "var(--links)" }}
        >
          © {new Date().getFullYear()} Jornal Tereza — Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
