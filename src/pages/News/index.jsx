import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://apijornal.onrender.com";

export default function NewsGrid() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function onSaibaMais(noticia) {
    navigate(`/noticia?title=${noticia.title}`);
  }

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`${API_BASE}/show-news`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data = await res.json();
        const newsArray = Array.isArray(data) ? data : data.news;

        if (!Array.isArray(newsArray)) {
          throw new Error("Formato de dados inesperado");
        }

        // Ordenar do mais recente para o mais antigo
        newsArray.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setNews(newsArray);
      } catch (err) {
        setError(err.message);
        setTimeout(() => setError(null), 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    return imageUrl.startsWith("http") ? imageUrl : `${API_BASE}${imageUrl}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"
          style={{ borderColor: "var(--botões)" }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
          ⚠️ Erro ao buscar notícias: {error}
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div
        className="flex items-center justify-center min-h-screen p-4"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="text-center max-w-md">
          <div className="mb-6">
            <svg
              className="mx-auto h-24 w-24 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: "var(--destaques)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
          <h2
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ color: "var(--titulo)" }}
          >
            Nenhuma notícia disponível
          </h2>
          <p
            className="text-base md:text-lg mb-6"
            style={{ color: "var(--text)" }}
          >
            No momento não há notícias para exibir. Volte mais tarde para
            conferir as últimas atualizações!
          </p>
          <div className="animate-pulse flex justify-center space-x-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--botões)" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--botões)" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--botões)" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  const featuredNews = news[0];
  const regularNews = news.slice(1);

  return (
    <div
      className="min-h-screen p-4 md:p-8 lg:p-12"
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Notícia em Destaque */}
        {featuredNews && (
          <article
            className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02]"
            style={{
              backgroundColor: "var(--cards)",
              boxShadow: "var(--shadow)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Imagem da notícia destaque */}
              {featuredNews.image1 && (
                <div className="w-full h-64 lg:h-full self-center overflow-hidden">
                  <img
                    src={encodeURI(getImageUrl(featuredNews.image1))}
                    alt={featuredNews.title || "Imagem da notícia"}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
                  />
                </div>
              )}

              {/* Conteúdo da notícia destaque */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
                <h1
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
                  style={{ color: "var(--titulo)" }}
                >
                  {featuredNews.title}
                </h1>
                <p
                  className="text-base md:text-lg mb-4 leading-relaxed"
                  style={{ color: "var(--text)" }}
                >
                  {featuredNews.summary}
                </p>
                <pre
                  className="text-sm md:text-base mb-6 font-sans italic"
                  style={{ color: "var(--text)" }}
                >
                  - {featuredNews.author}
                </pre>
                <button
                  onClick={() => onSaibaMais(featuredNews)}
                  className="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105 self-center"
                  style={{
                    backgroundColor: "var(--botões)",
                    color: "var(--cards)",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "var(--hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "var(--botões)")
                  }
                >
                  Saiba Mais!
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Grid de Notícias Normais */}
        {regularNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item, index) => (
              <article
                key={index}
                className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
                style={{
                  backgroundColor: "var(--cards)",
                  boxShadow: "var(--shadow)",
                }}
              >
                {/* Imagem da notícia */}
                {item.image1 && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={encodeURI(getImageUrl(item.image1))}
                      alt={item.title || "Imagem da notícia"}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                )}

                {/* Conteúdo da notícia */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2
                    className="text-lg md:text-xl font-bold mb-3 leading-tight"
                    style={{ color: "var(--titulo)" }}
                  >
                    {item.title}
                  </h2>
                  <p
                    className="text-sm md:text-base mb-3 leading-relaxed flex-grow"
                    style={{ color: "var(--text)" }}
                  >
                    {item.summary}
                  </p>
                  <pre
                    className="text-xs md:text-sm mb-4 font-sans italic"
                    style={{ color: "var(--text)" }}
                  >
                    - {item.author}
                  </pre>
                  <button
                    onClick={() => onSaibaMais(item)}
                    className="w-full px-4 py-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:scale-105"
                    style={{
                      backgroundColor: "var(--botões)",
                      color: "var(--cards)",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "var(--hover)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "var(--botões)")
                    }
                  >
                    Saiba Mais!
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
