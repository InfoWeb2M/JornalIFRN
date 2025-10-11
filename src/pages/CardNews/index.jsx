import { useState } from "react";

export default function NewsCard({
  title,
  summary,
  author,
  image,
  newstype,
  body, // <--- passe isto a partir do NewsGrid
  onClick,
  isFeatured = false,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const normalizeType = (t) =>
    (t || "").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const isPoemaOrCronica = ["poema", "cronica"].includes(normalizeType(newstype));

  const stripHtml = (s) => (s ? s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() : "");

  const truncateSmart = (text, max = 180) => {
    if (!text) return null;
    const cleaned = text.trim();
    if (cleaned.length <= max) return cleaned;
    const slice = cleaned.slice(0, max);
    const lastSpace = slice.lastIndexOf(" ");
    if (lastSpace > Math.floor(max * 0.3)) {
      return slice.slice(0, lastSpace) + "...";
    }
    return slice + "...";
  };

  const getPreviewText = () => {
    if (isPoemaOrCronica) {
      const candidate = stripHtml(body) || stripHtml(summary);
      const preview = truncateSmart(candidate, isFeatured ? 300 : 160);
      return preview || "Sem conteúdo disponível...";
    }
    return summary || "Sem resumo disponível...";
  };

  const previewText = getPreviewText();

  // ---------- CARD EM DESTAQUE ----------
  if (isFeatured) {
    return (
      <article
        className="rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02]"
        style={{
          backgroundColor: "var(--cards)",
          boxShadow: "var(--shadow)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {image && (
            <div className="w-full h-64 lg:h-full self-center overflow-hidden relative">
              <img
                src={image}
                alt={title || "Imagem da notícia"}
                className="w-full h-full object-cover rounded-xl transition-transform duration-500 hover:scale-110"
              />
              {newstype && (
                <div
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-white font-semibold text-sm shadow-xl"
                  style={{
                    backgroundColor: "var(--links)",
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  {newstype}
                </div>
              )}
            </div>
          )}

          <div className="p-6 md:p-8 lg:p-10 flex flex-col items-center justify-center">
            <h1
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
              style={{ color: "var(--titulo)" }}
            >
              {title}
            </h1>
            <p
              className="text-base md:text-lg mb-4 leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              {previewText}
            </p>
            <pre
              className="text-sm md:text-base mb-6 font-sans italic"
              style={{ color: "var(--text)" }}
            >
              - {author}
            </pre>
            <button
              onClick={onClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="px-8 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:scale-105 self-center"
              style={{
                backgroundColor: isHovered ? "var(--hover)" : "var(--botões)",
                color: "var(--cards)",
              }}
            >
              Saiba Mais!
            </button>
          </div>
        </div>
      </article>
    );
  }

  // ---------- CARD NORMAL ----------
  return (
    <article
      className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col"
      style={{
        backgroundColor: "var(--cards)",
        boxShadow: "var(--shadow)",
      }}
    >
      {image && (
        <div className="w-full h-48 overflow-hidden relative">
          <img
            src={image}
            alt={title || "Imagem da notícia"}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {newstype && (
            <div
              className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-white font-semibold text-xs shadow-xl"
              style={{
                backgroundColor: "var(--links)",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)",
              }}
            >
              {newstype}
            </div>
          )}
        </div>
      )}

      <div className="p-5 flex flex-col flex-grow">
        <h2
          className="text-lg md:text-xl font-bold mb-3 leading-tight"
          style={{ color: "var(--titulo)" }}
        >
          {title}
        </h2>

        {/* --- Limita o tamanho do resumo com 3 pontinhos --- */}
        <p
          className="text-sm md:text-base mb-3 leading-relaxed flex-grow"
          style={{
            color: "var(--text)",
            display: "-webkit-box",
            WebkitLineClamp: 4, // número de linhas visíveis
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: "6rem", // altura máxima aproximada
          }}
        >
          {previewText}
        </p>

        <pre
          className="text-xs md:text-sm mb-4 font-sans italic"
          style={{ color: "var(--text)" }}
        >
          - {author}
        </pre>

        <button
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="w-full px-4 py-2 rounded-lg cursor-pointer font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: isHovered ? "var(--hover)" : "var(--botões)",
            color: "var(--cards)",
          }}
        >
          Saiba Mais!
        </button>
      </div>
    </article>
  );
}
