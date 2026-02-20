import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{
        backgroundColor: "var(--background)",
        fontFamily: '"Libre Baskerville", serif',
      }}
    >
      {/* Partículas CSS (estáticas e seguras) */}
      <div className="paper" />
      <div className="paper" />
      <div className="paper" />
      <div className="paper" />
      <div className="paper" />
      <div className="paper" />

      {/* Conteúdo */}
      <div className="relative z-10 max-w-4xl w-full text-center">
        {/* Cabeçalho */}
        <div
          className="mb-8 border-b-2 pb-4"
          style={{ borderColor: "var(--bordas)" }}
        >
          <h1
            className="text-2xl md:text-3xl font-bold mb-1 tracking-widest"
            style={{
              color: "var(--titulo)",
              fontFamily: '"Playfair Display", serif',
            }}
          >
            JORNAL TERESA
          </h1>

          <p
            className="text-xs md:text-sm opacity-70"
            style={{ color: "var(--text)" }}
          >
            EDIÇÃO ESPECIAL • 2026
          </p>
        </div>

        {/* Manchete */}
        <h2
          className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 leading-none"
          style={{
            color: "var(--titulo)",
            fontFamily: '"Playfair Display", serif',
            textShadow: "4px 4px 0 var(--destaques)",
          }}
        >
          <span className="animate-shake inline-block">4</span>
          <span className="animate-shake inline-block delay-100">0</span>
          <span className="animate-shake inline-block delay-200">4</span>
        </h2>

        <p className="text-lg md:text-xl mb-10" style={{ color: "var(--text)" }}>
          A página que você procura desapareceu misteriosamente dos arquivos.
        </p>

        <Link
          href="/"
          className="inline-flex rounded-2xl items-center gap-3 px-8 py-5 text-lg font-bold uppercase tracking-widest hover:scale-105 active:scale-95"
          style={{
            backgroundColor: "var(--botoes, #000)",
            color: "var(--background)",
            border: "1px solid var(--bordas)",
            boxShadow: "var(--shadow)",
            fontFamily: '"Playfair Display", serif',
          }}
        >
          📰 Voltar para página principal
        </Link>

        <footer
          className="mt-12 pt-6 border-t-2 opacity-60"
          style={{ borderColor: "var(--bordas)", color: "var(--text)" }}
        >
          Nenhum pixel foi prejudicado na produção desta página.
        </footer>
      </div>
    </div>
  );
}
