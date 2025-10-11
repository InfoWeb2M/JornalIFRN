import { useState, useEffect } from "react";
import jornalclaro from "./assets/jornalclaro.png";
import jornalescuro from "./assets/jornalescuro.png";
import Header from "./pages/Header";
import NewsGrid from "./pages/News";
import Footer from "./pages/Footer";

export default function App() {
  const [tema] = useState(() => {
    try {
      return localStorage.getItem("tema") || "claro";
    } catch {
      return "claro";
    }
  });

  // efeito que atualiza o localStorage e força refresh da página
  useEffect(() => {
    try {
      localStorage.setItem("tema", tema);
      // força re-render completo se necessário
      document.documentElement.setAttribute("data-tema", tema);
    } catch {
      console.log("só pra não ficar vermelho");
    }
  }, [tema]);

  return (
    <div className="bg-[var(--background)] mt-28 w-screen min-h-[200vh] transition-all duration-300">
      <Header />
      <div className="grow">
        <section id="inicio" className="lg:my-0 my-56">
          <img
            src={tema === "claro" ? jornalclaro : jornalescuro}
            alt="ImagemPrincipal"
            className="lg:w-[60vw] w-full mx-auto"
          />
          <p className="text-[var(--links)] text-center mt-10 lg:mt-0 mb-20 lg:mb-10">
            Um Jornal de Alunos para Alunos !
          </p>
          <hr className="text-[var(--links)] lg:max-w-3xl w-[70%] mb-16 mx-auto" />
        </section>
        <section id="noticias">
          <NewsGrid />
        </section>
      </div>
      <Footer/>
    </div>
  );
}
