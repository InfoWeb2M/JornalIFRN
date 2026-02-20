"use client";

import { lazy, Suspense } from "react";
import { News } from "@/types/NewsType";

const CardNews = lazy(() => import("@/components/ui/cards/CardNews/page"));

const FeaturedNews = lazy(() => import("../ui/cards/featuredNews/page"));

export default function NewsClient({ initialNews }: { initialNews: News[] }) {
  return (
    <section className="cards-container">
      {initialNews.map((noticia, index) => (
        <Suspense
          key={noticia.id}
          fallback={
            <div className="h-64 animate-pulse rounded-lg bg-zinc-200" />
          }
        >
          {index === 0 ? (
            <FeaturedNews
              type={noticia.newstype ?? "geral"}
              title={noticia.title}
              desc={noticia.summary ?? ""}
              author={noticia.author ?? "Anônimo"}
              imgUrl={noticia.arquivos?.[0]?.image1 ?? ""}
              newsUrl={`/news/${noticia.id}`}
            />
          ) : (
            <CardNews
              type={noticia.newstype ?? "geral"}
              title={noticia.title}
              desc={noticia.summary ?? ""}
              author={noticia.author ?? "Anônimo"}
              imgUrl={noticia.arquivos?.[0]?.image1 ?? ""}
              newsUrl={`/news/${noticia.id}`}
            />
          )}
        </Suspense>
      ))}
    </section>
  );
}
