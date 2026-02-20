import { API_MAIN_ROUTE } from "@/constants/apiRoute";

async function createNewsActions(formData: FormData) {
  // Validação mínima de sanidade
  if (!(formData instanceof FormData)) {
    throw new Error("Payload inválido");
  }

  const response = await fetch(
    API_MAIN_ROUTE + "/news/create-news",
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  );

  if (!response.ok) {
    let message = "Falha ao criar notícia";

    try {
      const data = await response.json();
      message += data.message ? `: ${data.message}` : "";
    } catch {
      // resposta não é JSON
    }

    throw new Error(message);
  }

  return response.json();
}

export { createNewsActions };
