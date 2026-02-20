"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PARTICLES } from "@/constants/particles";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {

    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 4000);

    return () => clearInterval(glitchInterval);
  }, [error]);

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-[(--background)] transition-colors duration-300">
      {/* Estilos globais para animações */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.3; }
          50% { transform: translateY(-100vh) rotate(360deg); opacity: 0.2; }
          90% { opacity: 0.1; }
        }
        @keyframes swing {
          0%, 100% { transform: rotate(-8deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          50% { transform: scale(1.2); opacity: 0; }
          100% { transform: scale(0.8); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float { animation: float var(--duration) ease-in-out var(--delay) infinite; }
        .animate-swing { animation: swing 3s ease-in-out infinite; }
        .animate-swing-delayed { animation: swing 2.5s ease-in-out 0.5s infinite; }
        .animate-glitch { animation: glitch 0.3s ease-in-out; }
        .animate-pulse-ring-1 { animation: pulse-ring 3s ease-out infinite; }
        .animate-pulse-ring-2 { animation: pulse-ring 3s ease-out 1.5s infinite; }
        .animate-fadeInDown { animation: fadeInDown 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out 0.4s forwards; }
        .animate-zoomIn { animation: zoomIn 0.7s ease-out 0.2s forwards; }
        .animate-fadeIn-1 { animation: fadeIn 0.6s ease-out 0.6s forwards, swing 3s ease-in-out 1s infinite; }
        .animate-fadeIn-2 { animation: fadeIn 0.6s ease-out 0.7s forwards, swing 2.5s ease-in-out 1.2s infinite; }
        .animate-fadeIn-3 { animation: fadeIn 0.6s ease-out 0.8s forwards; }
        .animate-fadeIn-4 { animation: fadeIn 0.6s ease-out 0.9s forwards; }
        .animate-fadeIn-5 { animation: fadeIn 0.6s ease-out 1s forwards; }
      `,
        }}
      />

      {/* Partículas flutuantes */}
      {PARTICLES.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-20 animate-float"
          style={
            {
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              backgroundColor: "var(--foreground)",
              bottom: "-20px",
              "--duration": `${particle.duration}s`,
              "--delay": `${particle.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="max-w-4xl w-full relative z-10">
        {/* Grid decorativo */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="text-center relative">
          {/* Placa de manutenção */}
          <div className="inline-block mb-6 opacity-0 animate-fadeInDown">
            <div className="bg-[(--destaques)] text-[(--background)] px-8 py-3 rounded-lg font-bold text-lg shadow-[(--shadow)] border-4 border-[(--foreground)] transform -rotate-2">
              ⚠️ ÁREA EM MANUTENÇÃO ⚠️
            </div>
          </div>

          {/* Container do cachorro */}
          <div className="relative inline-block mb-8">
            {/* Anéis pulsantes */}
            <div className="absolute inset-0 -z-10">
              <div
                className="absolute inset-0 rounded-full animate-pulse-ring-1"
                style={{
                  backgroundColor: "var(--foreground)",
                  width: "130%",
                  height: "130%",
                  left: "-15%",
                  top: "-15%",
                }}
              />
              <div
                className="absolute inset-0 rounded-full animate-pulse-ring-2"
                style={{
                  backgroundColor: "var(--foreground)",
                  width: "130%",
                  height: "130%",
                  left: "-15%",
                  top: "-15%",
                }}
              />
            </div>

            {/* Círculo principal */}
            <div
              className="absolute inset-0 -z-20 rounded-full opacity-25"
              style={{
                backgroundColor: "var(--foreground)",
                width: "120%",
                height: "120%",
                left: "-10%",
                top: "-10%",
                boxShadow: "0 0 60px var(--foreground)",
              }}
            />

            {/* Imagem */}
            <div
              className={`relative w-72 h-72 mx-auto opacity-0 animate-zoomIn ${
                glitchActive ? "animate-glitch" : ""
              }`}
            >
              <Image
                src="/teresa_engenheira.png"
                alt="Cachorro engenheiro investigando"
                width={288}
                height={288}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Ferramentas */}
            <div
              className="absolute -left-12 top-20 text-5xl opacity-0 animate-fadeIn-1"
              style={{ transformOrigin: "top center" }}
            >
              🔧
            </div>
            <div
              className="absolute -right-12 top-32 text-4xl opacity-0 animate-fadeIn-2"
              style={{ transformOrigin: "top center" }}
            >
              🔨
            </div>
            <div className="absolute left-8 -top-8 text-4xl opacity-0 animate-fadeIn-3">
              ⚙️
            </div>
            <div className="absolute right-16 -top-4 text-3xl opacity-0 animate-fadeIn-4">
              🛠️
            </div>
          </div>

          {/* Conteúdo */}
          <div className="space-y-6 opacity-0 animate-fadeInUp">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-black text-(--titulo)] mb-2 tracking-tight relative z-10">
                ERRO INTERNO
              </h1>
              <div className="absolute inset-0 bg-(--destaques)] opacity-20 blur-xl -z-10 transform scale-110" />
            </div>

            <p className="text-xl md:text-2xl text-(--text)] font-semibold px-4 max-w-2xl mx-auto">
              Estamos passando por problemas nos nossos servidores
            </p>

            <p className="text-base md:text-lg text-(--text)] opacity-80 px-4 max-w-xl mx-auto">
              A teresa engenheira está trabalhando duro para consertar isso.
              Enquanto isso, que tal uma pausa para o café? ☕
            </p>

            {/* Card de status */}
            <div className="bg-(--cards)] border-2 border-(--bordas)] rounded-xl p-6 shadow-(--shadow)] max-w-lg mx-auto my-8 hover:border-(--destaques)] transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-(--text)] font-semibold">
                  Status do Sistema:
                </span>
                <span className="flex items-center gap-2 text-(--destaques)]">
                  <span className="w-3 h-3 bg-(--destaques)] rounded-full animate-pulse" />
                  Em Reparo
                </span>
              </div>
              <div className="w-full bg-(--input)] rounded-full h-3 overflow-hidden">
                <div
                  className="bg-(--botoes)] h-full rounded-full animate-pulse"
                  style={{ width: "65%" }}
                />
              </div>
              <p className="text-sm text-(--text)] opacity-60 mt-3 text-center">
                Progresso estimado: 65%
              </p>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <button
                onClick={reset}
                className="group px-10 py-4 bg-(--botoes)] text-white rounded-xl font-bold text-lg hover:bg-(--hover)] transition-all duration-300 shadow-(--shadow)] hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-(--destaques)] focus:ring-offset-2 w-full sm:w-auto relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🔄 Tentar Novamente
                </span>
                <div className="absolute inset-0 bg-(--hover)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button
                onClick={() => router.push("/")}
                className="px-10 py-4 bg-(--cards)] text-(--text)] rounded-xl font-bold text-lg border-3 border-(--bordas)] hover:border-(--botoes)] hover:bg-(--input)] transition-all duration-300 shadow-(--shadow)] hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-(--destaques)] focus:ring-offset-2 w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  🏠 Voltar para Casa
                </span>
              </button>
            </div>
          </div>

          {/* Info técnica */}
          <div className="mt-12 opacity-0 animate-fadeIn-5">
            <div className="inline-flex items-center gap-3 bg-(--cards)] px-6 py-3 rounded-full border border-(--bordas)] shadow-lg">
              <span className="text-(--destaques)] font-mono text-sm">
                Error ID: {error.digest?.slice(0, 8) || "UNKNOWN"}
              </span>
              <span className="w-1.5 h-1.5 bg-(--destaques)] rounded-full animate-pulse" />
              <span className="text-(--text)] opacity-60 text-sm">
                {new Date().toLocaleTimeString("pt-BR")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
