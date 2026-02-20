import Spinner from "../Spinner/page";
import './loadingFeatured.css'

export function LoadingFeaturedCard() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--destaques) 0%, var(--botoes) 100%)",
      }}
      className="loading-featured-news animate-pulse featuredEffects flex justify-center items-center rounded-3xl border border-(--bordas)
"
    >
      <div className="card__shine" />
      <div className="card__glow" />
      <div className="flex flex-col justify-center items-center">
        <div>
          <Spinner size={50} />
        </div>
        <p className="text-(--cards) text-center mt-4 text-2xl">
          Carregando notícias...
        </p>
      </div>
    </div>
  );
}
