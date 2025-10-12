import { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";

const ilustracoesExemplo = [
  { id: 1, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/cachorroquente.jpg", title: "Cachorro-Quente", artist: "Jornal Teresa" },
  { id: 2, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/calice.jpg", title: "Cálice", artist: "Jornal Teresa" },
  { id: 3, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/Charge_%20Bem%20Vindos!-20251002-WA0020.jpg", title: "Bem Vindos", artist: "Jornal Teresa" },
  { id: 4, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/pelobege.jpg", title: "Pelo Bege", artist: "Jornal Teresa" },
  { id: 5, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/reflexoes1.jpg", title: "Reflexões 01", artist: "Jornal Teresa" },
  { id: 6, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/ilustracoes/solquente1.jpg", title: "Sol Quente 01", artist: "Anny" },
  { id: 7, url: "https://ecejzvtwgbqddmqnbapx.supabase.co/storage/v1/object/public/imagens-noticias/1760287862080-a4twl4.jpeg", title: "Capitã do time de vôlei", artist: "Tata" },
];

function ImageModal({ image, onClose }) {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:opacity-70 transition-opacity z-10"
        aria-label="Fechar"
      >
        ×
      </button>

      <div
        className="relative max-w-7xl max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.url}
          alt={image.title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
        />

        <div className="mt-4 text-center bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-2xl font-bold mb-1" style={{ color: "var(--background)", fontFamily: "Playfair Display" }}>
            {image.title}
          </h3>
          <p className="text-lg italic" style={{ color: "var(--background)", fontFamily: "Libre Baskerville", opacity: 0.9 }}>
            Por {image.artist}
          </p>
        </div>
      </div>
    </div>
  );
}

function GalleryItem({ image, onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      style={{
        backgroundColor: "var(--destaques)",
        boxShadow: "var(--shadow)",
      }}
      onClick={() => onClick(image)}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-sm" style={{ color: "var(--text)", fontFamily: "Libre Baskerville" }}>
            Carregando...
          </p>
        </div>
      )}

      <img
        src={image.url}
        alt={image.title}
        onLoad={() => setImageLoaded(true)}
        className={`w-full transition-all duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"} group-hover:scale-110`}
        style={{ height: "auto", objectFit: "contain" }}
      />

      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
        <h3 className="text-lg md:text-xl font-bold mb-2 text-white" style={{ fontFamily: "Playfair Display" }}>
          {image.title}
        </h3>
        <p className="text-sm md:text-base italic text-white/90" style={{ fontFamily: "Libre Baskerville" }}>
          {image.artist}
        </p>
        <button
          className="mt-4 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300"
          style={{ backgroundColor: "var(--botões)", color: "var(--background)" }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(image);
          }}
        >
          Ver Ampliada
        </button>
      </div>
    </div>
  );
}

export default function AcervoIlustracoes() {
  const [ilustracoes] = useState(ilustracoesExemplo);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      <main className="flex-grow px-4 md:px-8 lg:px-12 pb-12" style={{ paddingTop: "clamp(7rem, 10vw, 7rem)" }}>
        <div className="max-w-7xl mx-auto mb-8 md:mb-12">
          <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: "Playfair Display", color: "var(--titulo)" }}>
            Acervo de Ilustrações
          </h1>
          <p className="text-center text-base md:text-lg max-w-2xl mx-auto" style={{ fontFamily: "Libre Baskerville", color: "var(--text)" }}>
            Explore nossa coleção de ilustrações criadas pelos artistas do Jornal Tereza
          </p>
        </div>

        {/* Galeria - Layout Dinâmico */}
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {ilustracoes.map((image) => (
            <div key={image.id} className="break-inside-avoid mb-4 md:mb-6">
              <GalleryItem image={image} onClick={setSelectedImage} />
            </div>
          ))}
        </div>

        {ilustracoes.length === 0 && (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-center text-lg md:text-xl" style={{ fontFamily: "Libre Baskerville", color: "var(--text)" }}>
              Nenhuma ilustração disponível no momento.
            </p>
          </div>
        )}
      </main>

      <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      <Footer />
    </div>
  );
}
