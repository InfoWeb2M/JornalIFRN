import { API_MAIN_ROUTE } from "@/constants/apiRoute";

async function deleteNewsActions(id: string) {

    const response = await fetch(
        API_MAIN_ROUTE + `/news/delete-news/${id}`,
        {
            headers: {
                'Content-type': 'application/json'
            },
            method: "DELETE",
            credentials: "include",
        }
    );

    console.log(response)
    // Se der certo
    if (response.ok) return response.json();

    // Em caso de erro
    let message = "Falha ao deletar notícia";
    try {
        const data = await response.json();
        message += data.message ? `: ${data.message}` : "";
    } catch {
        // resposta não é JSON
    }

    throw new Error(message);

}

export { deleteNewsActions };
