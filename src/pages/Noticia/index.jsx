import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

const API_URL = "https://apijornal.onrender.com/show-news";

// Função de parse do body para JSX
function parseBodyToJSX(body, noticia) {
  if (!body) return null;

  const lines = body.split("\n");
  let imageIndex = 1;
  const elements = [];
  let currentList = [];
  let key = 0;

  lines.forEach((line) => {
    line = line.trim();

    // Títulos
    if (line.startsWith("###")) {
      elements.push(
        <h3
          key={`h3-${key++}`}
          style={{
            color: "var(--titulo)",
            fontFamily: "Playfair Display",
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            fontWeight: "bold",
            marginTop: "1.5rem",
            marginBottom: "1rem",
          }}
        >
          {line.slice(3).trim()}
        </h3>
      );
      return;
    }
    if (line.startsWith("##")) {
      elements.push(
        <h2
          key={`h2-${key++}`}
          style={{
            color: "var(--titulo)",
            fontFamily: "Playfair Display",
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
        >
          {line.slice(2).trim()}
        </h2>
      );
      return;
    }
    if (line.startsWith("#")) {
      elements.push(
        <h1
          key={`h1-${key++}`}
          style={{
            color: "var(--titulo)",
            fontFamily: "Playfair Display",
            fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
            fontWeight: "bold",
            marginTop: "2rem",
            marginBottom: "1rem",
          }}
        >
          {line.slice(1).trim()}
        </h1>
      );
      return;
    }

    // Listas
    if (line.startsWith("-")) {
      currentList.push(line.slice(1).trim());
      return;
    } else if (currentList.length) {
      elements.push(
        <ul
          key={`ul-${key++}`}
          style={{
            color: "var(--text)",
            fontFamily: "Libre Baskerville",
            marginLeft: "clamp(1.5rem, 5vw, 3rem)",
            marginTop: "1rem",
            marginBottom: "1rem",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.8",
          }}
        >
          {currentList.map((item, i) => (
            <li key={i} style={{ marginBottom: "0.5rem" }}>
              {item}
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }

    // Imagens
    if (line === "/imagem") {
      const imgUrl = noticia[`image${imageIndex}`];
      imageIndex++;
      if (imgUrl) {
        elements.push(
          <img
            key={`img-${key++}`}
            src={imgUrl}
            alt={`imagem${imageIndex - 1}`}
            style={{
              maxWidth: "100%",
              width: "100%",
              height: "auto",
              marginTop: "1.5rem",
              marginBottom: "1.5rem",
              borderRadius: "15px",
              objectFit: "cover",
            }}
            loading="lazy"
          />
        );
      }
      return;
    }

    // Parágrafos
    if (line !== "") {
      elements.push(
        <p
          key={`p-${key++}`}
          style={{
            color: "var(--text)",
            fontFamily: "Libre Baskerville",
            marginTop: "1rem",
            marginBottom: "1rem",
            lineHeight: "1.8",
            fontSize: "clamp(1rem, 2vw, 1rem)",
            textAlign: "justify",
          }}
        >
          {line}
        </p>
      );
    }
  });

  // Lista final se houver
  if (currentList.length) {
    elements.push(
      <ul
        key={`ul-${key++}`}
        style={{
          color: "var(--text)",
          fontFamily: "Libre Baskerville",
          marginLeft: "clamp(1.5rem, 5vw, 3rem)",
          marginTop: "1rem",
          marginBottom: "1rem",
          fontSize: "clamp(0.9rem, 2vw, 1rem)",
          lineHeight: "1.8",
        }}
      >
        {currentList.map((item, i) => (
          <li key={i} style={{ marginBottom: "0.5rem" }}>
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return elements;
}

export default function Noticia() {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get("title") || "Título de Exemplo";

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setNews(Array.isArray(data) ? data : data.news);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = news.filter(
    (item) => item.title.toLowerCase() === title?.toLowerCase()
  );

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
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />

      {filteredNews.length > 0 ? (
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
              padding: "clamp(1.5rem, 4vw, 3rem)",
              maxWidth: "min(90vw, 70rem)",
              width: "100%",
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
                fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                fontWeight: "bold",
                marginBottom: "clamp(1rem, 3vw, 1.5rem)",
                lineHeight: "1.3",
              }}
            >
              {filteredNews[0].title}
            </h1>

            <p
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(1rem, 2.5vw, 1.1rem)",
                lineHeight: "1.8",
                marginBottom: "clamp(1rem, 3vw, 2rem)",
                textAlign: "justify",
              }}
            >
              {filteredNews[0].summary}
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {parseBodyToJSX(filteredNews[0].body, filteredNews[0])}
            </div>

            <em
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                marginTop: "clamp(1rem, 3vw, 2rem)",
                paddingTop: "clamp(0.75rem, 2vw, 1rem)",
                borderTop: "1px solid var(--bordas)",
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
              }}
            >
              <strong>Autor:</strong> {filteredNews[0].author}
            </em>
          </article>
        </main>
      ) : (
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
            Nenhuma notícia encontrada com esse título.
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
}
