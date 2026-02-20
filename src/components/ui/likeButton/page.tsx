"use client";

import { API_MAIN_ROUTE } from "@/constants/apiRoute";
import { toastError } from "@/lib/toast/toast";
import { Heart } from "lucide-react";
import { useState, useTransition, useEffect } from "react";

interface LikeButtonProps {
  newsId: string;
  curtidas: number;
}

// Chave do localStorage para armazenar curtidas
const LIKES_STORAGE_KEY = "news_likes";

// Função para obter curtidas do localStorage
const getLikedNews = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(LIKES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Função para salvar curtida no localStorage
const saveLikedNews = (newsId: string, isLiked: boolean) => {
  if (typeof window === "undefined") return;
  try {
    const likedNews = getLikedNews();
    if (isLiked) {
      // Adiciona se não existir
      if (!likedNews.includes(newsId)) {
        likedNews.push(newsId);
      }
    } else {
      // Remove se existir
      const index = likedNews.indexOf(newsId);
      if (index > -1) {
        likedNews.splice(index, 1);
      }
    }
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedNews));
  } catch (error) {
    console.error("Erro ao salvar no localStorage:", error);
  }
};

export function LikeButton({ newsId, curtidas }: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(curtidas);
  const [isPending, startTransition] = useTransition();
  const [isAnimating, setIsAnimating] = useState(false);

  // Verifica no localStorage se o usuário já curtiu ao montar o componente
  useEffect(() => {
    const likedNews = getLikedNews();
    setIsLiked(likedNews.includes(newsId));
  }, [newsId]);

  const handleLike = () => {
    if (isPending) return;

    const willLike = !isLiked;

    // otimista
    setIsLiked(willLike);
    setLikeCount((prev) => Math.max(0, willLike ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        const res = await fetch(`${API_MAIN_ROUTE}/news/like-news/${newsId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            action: willLike ? "like" : "unlike",
          }),
        });

        if (res.status === 401) {
          throw new Error(
            "É necessário estar em uma conta para curtir notícias",
          );
        }

        if (!res.ok) throw new Error("Erro no backend");

        const data = await res.json();
        console.log("Resposta do like:", data);

        // Salva no localStorage
        saveLikedNews(newsId, willLike);

        // Animação de curtida
        if (willLike) {
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 1000);
        }

        // Atualiza o contador com o valor do backend para garantir consistência

        setLikeCount(data.body.curtidas);
      } catch (err: unknown) {
        // rollback
        toastError(err instanceof Error ? err.message : "Tente novamente");
        setIsLiked(!willLike);
        setLikeCount((prev) => Math.max(0, willLike ? prev - 1 : prev + 1));
        console.error(err);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      disabled={isPending}
      className={`
        group relative inline-flex items-center h-9 gap-2.5 px-5 py-2.5 rounded-full
        font-medium text-sm transition-all duration-300 ease-out
        border-2
        ${
          isLiked
            ? "bg-[var(--botoes)] border-[var(--botoes)] text-[var(--background)] shadow-[0_4px_12px_rgba(54,74,58,0.4)] hover:bg-[var(--hover)] hover:border-[var(--hover)] hover:shadow-[0_6px_16px_rgba(54,74,58,0.5)] hover:scale-105"
            : "bg-transparent border-[var(--bordas)] text-[var(--text)] hover:bg-[var(--destaques)] hover:bg-opacity-20 hover:border-[var(--destaques)] hover:scale-105"
        }
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        focus:outline-none focus:ring-2 focus:ring-[var(--links)] focus:ring-offset-2 focus:ring-offset-[var(--background)]
      `}
      aria-label={isLiked ? "Remover curtida" : "Curtir"}
      aria-pressed={isLiked}
    >
      {/* Efeito de ondas ao curtir */}
      {isAnimating && isLiked && (
        <>
          <span className="absolute inset-0 rounded-full bg-[var(--botoes)] animate-ping opacity-40" />
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce opacity-0 animate-fade-up">
            💚
          </span>
        </>
      )}

      {/* Ícone do coração com animação */}
      <Heart
        className={`
          relative z-10 transition-all duration-300
          ${isLiked ? "fill-current scale-110" : "group-hover:scale-110"}
          ${isAnimating && isLiked ? "animate-[bounce_0.6s_ease-in-out]" : ""}
          ${isPending ? "animate-pulse" : ""}
        `}
        size={20}
        strokeWidth={2.5}
      />

      {/* Contador com animação */}
      <span
        className={`
          relative z-10 font-semibold tabular-nums min-w-[2ch] text-center
          transition-all duration-300
          ${isAnimating ? "scale-125" : ""}
        `}
      >
        {likeCount.toLocaleString("pt-BR")}
      </span>

      {/* Brilho sutil ao passar o mouse */}
      <span
        className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 
          transition-opacity duration-300
          ${isLiked ? "bg-[var(--background)]" : "bg-[var(--botoes)]"}
        `}
      />

      {/* Partículas decorativas ao curtir */}
      {isAnimating && isLiked && (
        <>
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--destaques)] animate-ping" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[var(--destaques)] animate-ping delay-100" />
        </>
      )}
    </button>
  );
}
