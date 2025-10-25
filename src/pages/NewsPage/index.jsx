import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";

const API_BASE = "https://apijornal-w0o9.onrender.com";

function NoticiaDestaque({ noticia, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      style={{
        backgroundColor: "var(--cards)",
        borderRadius: "20px",
        boxShadow: "var(--shadow)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
      onClick={() => onClick(noticia)}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: "#DC2626",
          color: "white",
          padding: "0.5rem 1.2rem",
          borderRadius: "25px",
          fontFamily: "Libre Baskerville",
          fontSize: "0.8rem",
          fontWeight: "bold",
          zIndex: 10,
          textTransform: "uppercase",
          letterSpacing: "1px",
          boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
        }}
      >
        ⭐ Destaque
      </div>

      <div
        style={{
          width: "100%",
          height: "clamp(300px, 40vw, 500px)",
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
              fontSize: "1rem",
            }}
          >
            Carregando...
          </div>
        )}
        <img
          src={noticia.image1}
          alt={noticia.title}
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

      <div
        style={{
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.8rem, 2vw, 1.2rem)",
        }}
      >
        <h2
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: "bold",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          {noticia.title}
        </h2>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--destaques)",
            fontSize: "clamp(0.9rem, 2vw, 1rem)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Por {noticia.author}
        </p>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--text)",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            lineHeight: "1.7",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {noticia.summary || noticia.body}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(noticia);
          }}
          style={{
            backgroundColor: "var(--botões)",
            color: "var(--background)",
            border: "none",
            borderRadius: "25px",
            padding: "clamp(1rem, 2vw, 1.2rem) clamp(2rem, 4vw, 2.5rem)",
            fontFamily: "Libre Baskerville",
            fontSize: "clamp(1rem, 2vw, 1.1rem)",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "1rem",
            alignSelf: "flex-start",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--hover)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--botões)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Ler Notícia Completa →
        </button>
      </div>
    </article>
  );
}

function NoticiaCard({ noticia, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

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
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
      onClick={() => onClick(noticia)}
    >
      <div
        style={{
          width: "100%",
          height: "clamp(180px, 25vw, 220px)",
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
              fontSize: "0.85rem",
            }}
          >
            Carregando...
          </div>
        )}
        <img
          src={noticia.image1}
          alt={noticia.title}
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

      <div
        style={{
          padding: "clamp(1rem, 3vw, 1.5rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(0.5rem, 2vw, 0.8rem)",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: "Playfair Display",
            color: "var(--titulo)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
            fontWeight: "bold",
            lineHeight: "1.3",
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {noticia.title}
        </h3>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--destaques)",
            fontSize: "clamp(0.8rem, 2vw, 0.9rem)",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          Por {noticia.author}
        </p>

        <p
          style={{
            fontFamily: "Libre Baskerville",
            color: "var(--text)",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
            lineHeight: "1.6",
            margin: 0,
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {noticia.summary || noticia.body}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick(noticia);
          }}
          style={{
            backgroundColor: "var(--botões)",
            color: "var(--background)",
            border: "none",
            borderRadius: "20px",
            padding: "clamp(0.7rem, 2vw, 0.9rem) clamp(1.2rem, 3vw, 1.5rem)",
            fontFamily: "Libre Baskerville",
            fontSize: "clamp(0.85rem, 2vw, 0.95rem)",
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
        >
          Ler Mais →
        </button>
      </div>
    </article>
  );
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNoticias();
  }, []);

  const fetchNoticias = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/show-news`);

      if (!response.ok) {
        throw new Error("Erro ao carregar as notícias");
      }

      const data = await response.json();
      const filtered = data.filter((item) => item.newstype === "noticia");
      filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setNoticias(filtered);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNoticiaClick = (noticia) => {
    window.location.href = `/noticia?title=${noticia.title}`;
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid var(--destaques)",
              borderTop: "4px solid var(--botões)",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
        </div>
        <Footer />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "60vh",
            padding: "2rem",
          }}
        >
          <div
            style={{
              backgroundColor: "var(--cards)",
              padding: "2rem",
              borderRadius: "15px",
              boxShadow: "var(--shadow)",
              textAlign: "center",
              maxWidth: "500px",
            }}
          >
            <p
              style={{
                color: "#DC2626",
                fontFamily: "Libre Baskerville",
                fontSize: "1.1rem",
              }}
            >
              ⚠️ Erro ao carregar: {error}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const noticiaDestaque = noticias[0];
  const outrasNoticias = noticias.slice(1);

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
            fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
            fontWeight: "bold",
            marginBottom: "clamp(2rem, 5vw, 3rem)",
          }}
        >
          Notícias
        </h1>

        {noticiaDestaque && (
          <div style={{ marginBottom: "clamp(2rem, 5vw, 3rem)" }}>
            <NoticiaDestaque
              noticia={noticiaDestaque}
              onClick={handleNoticiaClick}
            />
          </div>
        )}

        {outrasNoticias.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
              gap: "clamp(1.5rem, 3vw, 2rem)",
              padding: "0 clamp(0.5rem, 2vw, 1rem)",
            }}
          >
            {outrasNoticias.map((noticia) => (
              <NoticiaCard
                key={noticia.id}
                noticia={noticia}
                onClick={handleNoticiaClick}
              />
            ))}
          </div>
        )}

        {noticias.length === 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "50vh",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "var(--cards)",
                padding: "3rem 2rem",
                borderRadius: "20px",
                boxShadow: "var(--shadow)",
              }}
            >
              <p
                style={{
                  color: "var(--text)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(1rem, 3vw, 1.2rem)",
                  marginBottom: "1rem",
                }}
              >
                📰 Nenhuma notícia disponível no momento.
              </p>
              <p
                style={{
                  color: "var(--destaques)",
                  fontFamily: "Libre Baskerville",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
                }}
              >
                Volte em breve para mais atualizações!
              </p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}