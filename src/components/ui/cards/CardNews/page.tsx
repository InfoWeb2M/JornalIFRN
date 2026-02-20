"use client"

import { CardNewsProps } from "@/types/CardNewsProps"
import Link from "next/link"


export default function CardNews({
  type = "notícia",
  title,
  desc,
  author,
  imgUrl,
  newsUrl,
}: CardNewsProps) {
  return (
    <div className="card">
      <div className="card__glow" />

      <div className="card__content">
        <div className="card__badge">{type}</div>

        <div
          className="card__image"
          style={
            imgUrl
              ? { backgroundImage: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }
              : undefined
          }
        />

        <div className="card__text">
          <p className="card__title">{title}</p>
          <p className="card__description text-clamp">
            {desc}
          </p>
        </div>

        <div className="card__footer">
          {author && (
            <span className="text-xs max-w-28 opacity-70">
              {author}
            </span>
          )}

          <div className="card__button">
            <Link href={newsUrl}>
              Ver mais
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
