const API_BASE = "https://apijornal.onrender.com";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const main = document.querySelector("main");
    if (!main) throw new Error("Elemento <main> não encontrado");

    const res = await fetch(`${API_BASE}/show-news`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    // Se a API retornar { news: [...] }
    const newsArray = Array.isArray(data) ? data : data.news;

    if (!newsArray) throw new Error("Formato de dados inesperado");

    newsArray.forEach((news) => {
      const root = document.documentElement;
      const cor = getComputedStyle(root).getPropertyValue("--text");

      const msg = document.querySelector("#msg");
      const article = document.createElement("article");
      const div = document.createElement("div");
      const titulo = document.createElement("h1");
      const corpo = document.createElement("p");
      const autor = document.createElement("pre");
      const botao = document.createElement("button");


      if (news.image1) {
        const url = news.image1.startsWith("http")
          ? news.image1
          : `${API_BASE}${news.image1}`; // vira https://apijornal.onrender.com/uploads/arquivo.jpg

        const img = document.createElement("img");
        img.classList.add('mostruario')
        img.src = encodeURI(url); // evita problema com espaços/caracteres especiais
        img.alt = news.title || "Imagem da notícia";
        article.appendChild(img);
        article.style.justifyContent = 'space-between'
      }else{
        article.style.justifyContent = 'center'
      }

      article.classList.add("noticia");
      div.classList.add('cadocadocadocan')
      botao.classList.add('botao')
      botao.classList.add('diferencial')
      botao.style.marginTop = '1rem'
      autor.style.color = cor;


      titulo.textContent = news.title;
      corpo.textContent = news.summary;
      autor.textContent = "-" + news.author;
      botao.textContent = "Saiba Mais!";

      div.appendChild(titulo);
      div.appendChild(corpo);
      div.appendChild(autor);
      div.appendChild(botao);
      article.appendChild(div)

      main.appendChild(article);

      botao.addEventListener('click', ()=>{
        window.location.href = `noticias/${encodeURIComponent('noticia-'+ news.title +'.html')}`
      })

    });
  } catch (err) {
    const msg = document.querySelector("#msg");
    msg.innerHTML = "⚠️ Erro ao buscar notícias: " + err.message;
    msg.style.display = "block";

    setTimeout(() => {
      msg.style.display = "none";
    }, 3000);
  }
  finally{
    const loader = document.querySelector("#loader")
    loader.style.display = 'none'
  }
});
