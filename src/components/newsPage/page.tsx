import Image from "next/image";
import { parseBodyToJSX } from "@/lib/parseToJSX/parseToJSX";
import { News } from "@/types/NewsPanel";
import Header from "../ui/header/page";
import { LikeButton } from "../ui/likeButton/page";

interface NewsDetailProps {
  news: News;
}

function NewsDetail({ news }: NewsDetailProps) {
  const mainImage = news.arquivos?.[0]?.image1;

  console.log("Rendering NewsDetail for news ID:", news);

  return (
    <div>
      <Header />
      <article className="min-h-screen bg-(--background) py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Conteúdo Principal */}
            <div className="lg:col-span-2">
              {/* Imagem Principal */}
              {mainImage && (
                <div className="relative w-full h-100 md:h-125 mb-8 rounded-lg overflow-hidden shadow-(--shadow)">
                  <Image
                    src={mainImage}
                    alt={news.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              {/* Título */}
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--titulo)] mb-4 leading-tight">
                {news.title}
              </h1>
              {/* Autor e Metadata */}
              <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-[var(--bordas)]">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--botoes)] flex items-center justify-center">
                    <span className="text-[var(--background)] font-semibold text-lg">
                      {news.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-[var(--text)] font-medium">
                      {news.author}
                    </p>
                    <p className="text-[var(--botoes)] text-sm capitalize">
                      {news.newstype}
                    </p>
                  </div>
                </div>
              </div>
              {/* Corpo da Notícia */}
              <div
                className="prose prose-lg max-w-none text-[var(--text)]
                prose-headings:text-[var(--titulo)]
                prose-p:text-[var(--text)]
                prose-p:leading-relaxed
                prose-a:text-[var(--links)]
                prose-a:no-underline
                hover:prose-a:underline
                prose-strong:text-[var(--titulo)]
                prose-ul:text-[var(--text)]
                prose-ol:text-[var(--text)]
                prose-blockquote:border-l-[var(--botoes)]
                prose-blockquote:text-[var(--botoes)]
                prose-img:rounded-lg
                prose-img:shadow-[var(--shadow)]"
              >
                {parseBodyToJSX(news.body, news)}
              </div>
            </div>
            {/* Sidebar - Resumo */}
            <div className="lg:col-span-1 order-first lg:order-2">
              <div className="sticky top-28">
                <div className="bg-[var(--cards)] rounded-lg p-6 shadow-[var(--shadow)] border border-[var(--bordas)] space-y-6">
                  {/* Cabeçalho */}
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-2xl font-bold text-[var(--titulo)]">
                      Resumo
                    </h2>

                    <span className="inline-flex items-center bg-[var(--botoes)] text-[var(--background)] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {news.newstype}
                    </span>
                  </div>

                  {/* Conteúdo */}
                  <p className="text-[var(--text)] leading-relaxed">
                    {news.summary}
                  </p>

                  {/* Footer */}
                  <div className="pt-6 border-t border-[var(--bordas)] flex items-center justify-between gap-4 flex-wrap">
                    <LikeButton
                      newsId={news.id}
                      curtidas={news.curtidas || 0}
                    />

                    <span className="text-sm text-[var(--text)] opacity-70">
                      Publicado por <strong>{news.author}</strong>
                    </span>
                  </div>
                </div>

                {/* Imagens Adicionais (se existirem) */}
                {news.arquivos?.[0] && (
                  <div className="mt-6 space-y-4">
                    {news.arquivos[0].image2 && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-[var(--shadow)] hidden lg:block">
                        <Image
                          src={news.arquivos[0].image2}
                          alt="Imagem adicional 2"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    {news.arquivos[0].image3 && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-[var(--shadow)] hidden lg:block">
                        <Image
                          src={news.arquivos[0].image3}
                          alt="Imagem adicional 3"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;
