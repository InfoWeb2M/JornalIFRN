import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function CronicaDetalhada() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title");
  const author = urlParams.get("author");
  const body = urlParams.get("body");
  const image = urlParams.get("image");

  const [imageLoaded, setImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const decodedTitle = title
    ? decodeURIComponent(title)
    : "Título não encontrado";
  const decodedAuthor = author
    ? decodeURIComponent(author)
    : "Autor desconhecido";
  const decodedBody = body ? decodeURIComponent(body) : "";
  const decodedImage = image ? decodeURIComponent(image) : "";

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(2rem, 5vw, 3rem)",
            minHeight: "50vh",
          }}
        >
          <p
            style={{
              color: "var(--text)",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              fontFamily: "Libre Baskerville",
            }}
          >
            Carregando crônica...
          </p>
        </div>
      </div>
    );
  }

  if (!title) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "clamp(2rem, 5vw, 3rem)",
            minHeight: "50vh",
          }}
        >
          <p
            style={{
              color: "var(--text)",
              fontSize: "clamp(1rem, 3vw, 1.2rem)",
              fontFamily: "Libre Baskerville",
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            Crônica não encontrada. Verifique o link e tente novamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />

      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "clamp(1rem, 3vw, 2rem)",
          marginTop: "clamp(5rem, 10vw, 7rem)",
        }}
      >
        <article
          style={{
            backgroundColor: "var(--cards)",
            borderRadius: "15px",
            boxShadow: "var(--shadow)",
            padding: "0",
            maxWidth: "min(90vw, 55rem)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Imagem de Destaque */}
          {decodedImage && (
            <div
              style={{
                width: "100%",
                height: "clamp(250px, 40vw, 400px)",
                backgroundColor: "var(--destaques)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {!imageLoaded && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "var(--text)",
                    fontFamily: "Libre Baskerville",
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                  }}
                >
                  Carregando imagem...
                </div>
              )}
              <img
                src={decodedImage}
                alt={decodedTitle}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: imageLoaded ? "block" : "none",
                }}
              />
            </div>
          )}

          {/* Conteúdo da Crônica */}
          <div
            style={{
              padding: "clamp(1.5rem, 4vw, 3rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(0.5rem, 2vw, 1rem)",
            }}
          >
            <h1
              style={{
                fontFamily: "Playfair Display",
                color: "var(--titulo)",
                textAlign: "center",
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: "bold",
                marginBottom: "clamp(0.5rem, 2vw, 1rem)",
                lineHeight: "1.2",
              }}
            >
              {decodedTitle}
            </h1>

            <p
              style={{
                fontFamily: "Libre Baskerville",
                color: "var(--destaques)",
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                fontStyle: "italic",
                textAlign: "center",
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                borderBottom: "2px solid var(--bordas)",
                paddingBottom: "clamp(1rem, 2vw, 1.5rem)",
              }}
            >
              Por {decodedAuthor}
            </p>

            {/* Corpo inteiro em um só parágrafo */}
            <p
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                lineHeight: "1.9",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                textAlign: "justify",
                textIndent: "2rem",
                whiteSpace: "pre-line",
              }}
            >
              {decodedBody}
            </p>

            <div
              style={{
                marginTop: "clamp(2rem, 4vw, 3rem)",
                paddingTop: "clamp(1rem, 2vw, 1.5rem)",
                borderTop: "1px solid var(--bordas)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <em
                style={{
                  color: "var(--text)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                }}
              >
                <strong>Autor:</strong> {decodedAuthor}
              </em>

              <button
                onClick={() => window.history.back()}
                style={{
                  backgroundColor: "var(--botões)",
                  color: "var(--background)",
                  border: "none",
                  borderRadius: "20px",
                  padding:
                    "clamp(0.6rem, 2vw, 0.8rem) clamp(1.2rem, 3vw, 1.5rem)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--hover)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--botões)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.95)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
              >
                ← Voltar
              </button>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
