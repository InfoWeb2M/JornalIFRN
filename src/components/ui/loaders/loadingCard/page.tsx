"use client";

import Spinner from "../Spinner/page";

export function LoadingCard() {
  return (
    <div className="loading-card card animate-pulse">
      <div className="card__shine" />
      <div className="card__glow" />

      <div className="card__content">
        {/* Imagem */}
        <div className="w-full h-35 rounded-md bg-(--foreground) flex items-center justify-center">
          <Spinner />
        </div>

        {/* Texto */}
        <div className="card__text flex flex-col gap-2">
          <div className="h-4 w-3/4 rounded-md bg-(--text)" />
          <div className="h-4 w-full rounded-md bg-(--text)" />
          <div className="h-4 w-5/6 rounded-md bg-(--text)" />
        </div>

        {/* Footer */}
        <div className="card__footer">
          <div className="h-3 w-20 rounded-md bg-(--links)" />
          <div className="card__button bg-(--destaques)">
            <span className="opacity-0">Ver mais</span>
          </div>
        </div>
      </div>
    </div>
  );
}
