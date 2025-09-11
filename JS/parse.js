function parseBodyToHTML(body, noticia) {
  if (!body) return "";
  const lines = body.split("\n");
  let imageIndex = 1;
  const finalHTML = [];
  let currentList = [];

  lines.forEach((line) => {
    line = line.trim();
    if (line.startsWith("###")) {
      finalHTML.push(`<h3>${line.slice(3).trim()}</h3>`);
      return;
    }
    if (line.startsWith("##")) {
      finalHTML.push(`<h2>${line.slice(2).trim()}</h2>`);
      return;
    }
    if (line.startsWith("#")) {
      finalHTML.push(`<h1>${line.slice(1).trim()}</h1>`);
      return;
    }
    if (line.startsWith("-")) {
      currentList.push(line.slice(1).trim());
      return;
    } else if (currentList.length) {
      finalHTML.push(
        `<ul>${currentList.map((i) => `<li>${i}</li>`).join("")}</ul>`
      );
      currentList = [];
    }
    if (line === "/imagem") {
      const imgUrl = noticia[`image${imageIndex}`];
      imageIndex++;
      if (imgUrl)
        finalHTML.push(
          `<img src="${imgUrl}" alt="imagem${
            imageIndex - 1
          }" style="max-width:100%; height:auto;" loading="lazy">`
        );
      return;
    }
    if (line !== "") finalHTML.push(`<p>${line}</p>`);
  });

  if (currentList.length) {
    finalHTML.push(
      `<ul>${currentList.map((i) => `<li>${i}</li>`).join("")}</ul>`
    );
  }

  return finalHTML.join("\n");
}

const article = document.querySelector(".news");
const noticiaId = article.dataset.id;

async function carregarNoticia() {
  try {
    const res = await fetch("https://apijornal.onrender.com/show-news");
    if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);

    const noticias = await res.json();
    const noticia = noticias.find(n => String(n.id) === noticiaId);


    if (!noticia) throw new Error("Notícia não encontrada");

    article.innerHTML = `
      <h1>${noticia.title}</h1>
      <p>${noticia.summary}</p>
      ${parseBodyToHTML(noticia.body, noticia)}
      <em><strong>Autor:</strong> ${noticia.author}</em>
    `;
  } catch (err) {
    article.innerHTML = `<p>❌ Erro ao carregar notícia.</p>`;
    console.error(err);
  }
}

carregarNoticia();