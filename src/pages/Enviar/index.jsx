import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function EnviarSugestoes() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    texto: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/mdkdyeeb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ nome: "", email: "", texto: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Erro ao enviar formulário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--background)" }}
    >
      <Header />

      <main
        className="flex-1 flex flex-col justify-center items-center px-4 py-8"
        style={{
          marginTop: "clamp(5rem, 10vw, 7rem)",
          minHeight: "calc(100vh - 15rem)",
        }}
      >
        <h2
          className="text-center mb-8"
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
          }}
        >
          Enviar Sugestões
        </h2>

        <article
          style={{
            backgroundColor: "var(--cards)",
            borderRadius: "15px",
            boxShadow: "var(--shadow)",
            padding: "clamp(1.5rem, 4vw, 3rem)",
            maxWidth: "min(90vw, 35rem)",
            width: "100%",
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Nome */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="nome"
                style={{
                  fontFamily: "Libre Baskerville",
                  color: "var(--text)",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  fontWeight: "bold",
                }}
              >
                Insira seu nome
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome..."
                required
                style={{
                  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                  borderRadius: "20px",
                  border: "2px solid var(--bordas)",
                  backgroundColor: "var(--input)",
                  color: "var(--text)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  outline: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "inset var(--shadow)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--botões)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--bordas)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                style={{
                  fontFamily: "Libre Baskerville",
                  color: "var(--text)",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  fontWeight: "bold",
                }}
              >
                Insira seu email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemplo@exemplo.com"
                required
                style={{
                  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                  borderRadius: "20px",
                  border: "2px solid var(--bordas)",
                  backgroundColor: "var(--input)",
                  color: "var(--text)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  outline: "none",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  boxShadow: "inset var(--shadow)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--botões)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--bordas)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            {/* Texto */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="texto"
                style={{
                  fontFamily: "Libre Baskerville",
                  color: "var(--text)",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  fontWeight: "bold",
                }}
              >
                Resuma suas principais ideias
              </label>
              <textarea
                name="texto"
                id="texto"
                value={formData.texto}
                onChange={handleChange}
                rows="10"
                placeholder="Digite sua mensagem aqui..."
                required
                style={{
                  padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                  borderRadius: "20px",
                  border: "2px solid var(--bordas)",
                  backgroundColor: "var(--input)",
                  color: "var(--text)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  outline: "none",
                  textAlign: "left",
                  resize: "vertical",
                  minHeight: "150px",
                  transition: "all 0.3s ease",
                  boxShadow: "inset var(--shadow)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--botões)";
                  e.target.style.transform = "scale(1.02)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--bordas)";
                  e.target.style.transform = "scale(1)";
                }}
              />
            </div>

            {/* Botão Submit */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                !formData.nome ||
                !formData.email ||
                !formData.texto
              }
              style={{
                backgroundColor: isSubmitting
                  ? "var(--destaques)"
                  : "var(--botões)",
                color: "var(--background)",
                border: "none",
                borderRadius: "20px",
                padding: "clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                fontWeight: "bold",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                marginTop: "1rem",
                opacity:
                  isSubmitting ||
                  !formData.nome ||
                  !formData.email ||
                  !formData.texto
                    ? 0.7
                    : 1,
              }}
              onMouseEnter={(e) => {
                if (
                  !isSubmitting &&
                  formData.nome &&
                  formData.email &&
                  formData.texto
                ) {
                  e.currentTarget.style.backgroundColor = "var(--hover)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "var(--botões)";
                  e.currentTarget.style.transform = "scale(1)";
                }
              }}
              onMouseDown={(e) => {
                if (
                  !isSubmitting &&
                  formData.nome &&
                  formData.email &&
                  formData.texto
                ) {
                  e.currentTarget.style.transform = "scale(0.95)";
                }
              }}
              onMouseUp={(e) => {
                if (
                  !isSubmitting &&
                  formData.nome &&
                  formData.email &&
                  formData.texto
                ) {
                  e.currentTarget.style.transform = "scale(1.05)";
                }
              }}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>

            {/* Mensagem de Status */}
            {submitStatus === "success" && (
              <div
                className="text-center p-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(75, 181, 67, 0.1)",
                  border: "2px solid rgba(75, 181, 67, 0.3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Libre Baskerville",
                    color: "#4BB543",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Sugestão enviada com sucesso!
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div
                className="text-center p-4 rounded-lg"
                style={{
                  backgroundColor: "rgba(220, 53, 69, 0.1)",
                  border: "2px solid rgba(220, 53, 69, 0.3)",
                }}
              >
                <p
                  style={{
                    fontFamily: "Libre Baskerville",
                    color: "#dc3545",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    fontWeight: "bold",
                  }}
                >
                  ✗ Erro ao enviar. Tente novamente.
                </p>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
