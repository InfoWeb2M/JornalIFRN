"use client"

import { CardNewsProps } from "@/types/CardNewsProps"
import Link from "next/link"
import './featured.css'

export default function FeaturedNews({
  type = "destaque",
  title ,
  desc,
  author,
  imgUrl,
  newsUrl,
}: CardNewsProps) {
  return (
    <div className="featured-news">
      <div className="featured-news__glow" />

      <div className="featured-news__content">
        {/* Imagem de fundo com overlay */}
        <div
          className="featured-news__image"
          style={
            imgUrl
              ? { backgroundImage: `url(${imgUrl})` }
              : { background: "linear-gradient(135deg, var(--destaques) 0%, var(--botoes) 100%)" }
          }
        >
          <div className="featured-news__overlay" />
        </div>

        {/* Conteúdo sobreposto */}
        <div className="featured-news__body">
          <div className="featured-news__badge">
            <span>{type}</span>
          </div>

          <div className="featured-news__text">
            <h2 className="featured-news__title">{title}</h2>
            <p className="featured-news__description">{desc}</p>
          </div>

          <div className="featured-news__footer">
            {author && (
              <div className="featured-news__author">
                <svg 
                  className="featured-news__author-icon" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
                <span>{author}</span>
              </div>
            )}

            <Link href={newsUrl} className="featured-news__button text-(--destaques)">
              <span>Ler matéria completa</span>
              <svg 
                className="featured-news__button-icon" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}