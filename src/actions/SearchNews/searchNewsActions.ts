import { API_MAIN_ROUTE } from "@/constants/apiRoute";

async function searchNewsActions(id: string) {
  const response = await fetch(API_MAIN_ROUTE + `/news/search-news/${id}`);

  if (!response.ok) {
    throw new Error("Falha ao buscar notícias");
  }

  return await response.json();
}

export { searchNewsActions };
