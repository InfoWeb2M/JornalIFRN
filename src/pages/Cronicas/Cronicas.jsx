import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

function CronicaCard({ item, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isPoema = item.newstype === "poema";

  return (
    <article
      style={{
        backgroundColor: "var(--cards)",
        borderRadius: "15px",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        height: "100%",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
    >
      {/* Badge de tipo */}
      <div
        style={{
          position: "absolute",
          top: "15px",
          right: "15px",
          backgroundColor: isPoema ? "var(--links)" : "var(--links)",
          border: "var(--bordas)",
          color: "white",
          padding: "0.4rem 0.9rem",
          borderRadius: "20px",
          fontFamily: "Libre Baskerville",
          fontSize: "0.75rem",
          fontWeight: "bold",
          zIndex: 10,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isPoema ? "Poema" : "Crônica"}
      </div>

      {/* Imagem */}
      <div
        style={{
          width: "100%",
          height: "clamp(200px, 30vw, 250px)",
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
              fontSize: "0.9rem",
            }}
          >
            Carregando...
          </div>
        )}
        <img
          src={item.image1}
          alt={item.title}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.style.display = "none";
            setImageLoaded(true);
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: imageLoaded ? "block" : "none",
          }}
        />
      </div>

      {/* Conteúdo */}
      <div
        style={{
          padding: "clamp(1rem, 3vw, 1.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.5rem, 2vw, 1rem)",
          flex: 1,
        }}
      >
        <h2
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
            fontWeight: "bold",
            lineHeight: "1.3",
            margin: 0,
          }}
        >
          {item.title}
        </h2>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--destaques)",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Por {item.author}
        </p>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--text)",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            lineHeight: "1.6",
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.body}
        </p>

        <button
          onClick={() => onClick(item)}
          style={{
            backgroundColor: "var(--botões)",
            color: "var(--background)",
            border: "none",
            borderRadius: "20px",
            padding: "clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)",
            fontFamily: "Libre Baskerville",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "auto",
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
          Ler {isPoema ? "Poema" : "Crônica"} Completa
        </button>
      </div>
    </article>
  );
}

export default function Cronicas() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://apijornal-w0o9.onrender.com/show-news");
      
      if (!response.ok) {
        throw new Error("Erro ao carregar os dados");
      }

      const data = await response.json();
      
      // Filtrar apenas crônicas e poemas
      const filtered = data.filter(
        (item) => item.newstype === "cronica" || item.newstype === "poema"
      );
      
      setItems(filtered);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (item) => {
    const params = new URLSearchParams({
      title: item.title,
      author: item.author,
      body: item.body,
      image: item.image1,
      type: item.newstype,
    });

    window.location.href = `/cronica?${params.toString()}`;
    // Ou com React Router:
    // navigate(`/cronica?${params.toString()}`);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      <Header />

      <main
        style={{
          padding: "clamp(1rem, 3vw, 2rem)",
          marginTop: "clamp(5rem, 10vw, 7rem)",
          maxWidth: "1400px",
          margin: "clamp(5rem, 10vw, 7rem) auto 2rem",
        }}
      >
        <h1
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            textAlign: "center",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "bold",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          Crônicas & Poemas
        </h1>

        {/* Estado de carregamento */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <p
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textAlign: "center",
              }}
            >
              Carregando...
            </p>
          </div>
        )}

        {/* Estado de erro */}
        {error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <p
              style={{
                color: "#EF4444",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textAlign: "center",
              }}
            >
              Erro ao carregar: {error}
            </p>
          </div>
        )}

        {/* Grid de Crônicas e Poemas */}
        {!loading && !error && items.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
              padding: "0 clamp(0.5rem, 2vw, 1rem)",
            }}
          >
            {items.map((item) => (
              <CronicaCard
                key={item.id}
                item={item}
                onClick={handleItemClick}
              />
            ))}
          </div>
        )}

        {/* Mensagem caso não haja itens */}
        {!loading && !error && items.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <p
              style={{
                color: "var(--text)",
                fontFamily: "Libre Baskerville",
                fontSize: "clamp(1rem, 3vw, 1.2rem)",
                textAlign: "center",
              }}
            >
              Nenhuma crônica ou poema disponível no momento.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}