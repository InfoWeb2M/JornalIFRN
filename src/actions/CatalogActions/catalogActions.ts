import { API_MAIN_ROUTE } from "@/constants/apiRoute";

async function catalogActions() {
  //Pode comentar o use cache e cache life em ambiente de teste

  /*   "use cache"

  cacheLife("days") */

  const response = await fetch(API_MAIN_ROUTE + "/news/show-news");

  if (!response.ok) {
    const data = await response.json();
    throw new Error(
      "Falha ao mostrar notícias " + (data.message || response.statusText),
    );
  }

  return await response.json();
}

export { catalogActions };
