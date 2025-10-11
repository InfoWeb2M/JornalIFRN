import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NewsCard from "../CardNews";

const API_BASE = "https://apijornal.onrender.com";

export default function NewsGrid() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function onSaibaMais(noticia) {
    if (noticia.newstype === "noticia" || noticia.newstype === "tirinha") {
      navigate(`/noticia?title=${noticia.title}`);
    } else {
      const params = new URLSearchParams({
        title: noticia.title,
        author: noticia.author,
        body: noticia.body,
        image: noticia.image1,
      });

      navigate(`/cronica?${params.toString()}`);
    }
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
          <NewsCard
            title={featuredNews.title}
            summary={featuredNews.summary}
            author={featuredNews.author}
            image={getImageUrl(featuredNews.image1)}
            newstype={featuredNews.newstype}
            body={
              featuredNews.body ??
              featuredNews.text ??
              featuredNews.content ??
              featuredNews.corpo ??
              featuredNews.fulltext ??
              featuredNews.article ??
              ""
            }
            onClick={() => onSaibaMais(featuredNews)}
            isFeatured={true}
          />
        )}

        {/* Grid de Notícias Normais */}
        {regularNews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map((item, index) => (
              <NewsCard
                key={index}
                title={item.title}
                summary={item.summary}
                author={item.author}
                image={getImageUrl(item.image1)}
                newstype={item.newstype}
                body={
                  item.body ??
                  item.text ??
                  item.content ??
                  item.corpo ??
                  item.fulltext ??
                  item.article ??
                  ""
                }
                onClick={() => onSaibaMais(item)}
                isFeatured={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
