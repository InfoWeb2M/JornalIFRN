import { API_MAIN_ROUTE } from "@/constants/apiRoute";
import { News } from "@/types/NewsPanel";

async function editNewsActions(data: any, id: string) {
    console.log(data)

    const payload: any = {
        title: data.title,
        summary: data.summary,
        body: data.body,
        newsType: data.newsType,
        author: data.author,
    }

    const response = await fetch(
        API_MAIN_ROUTE + `/news/update-news/${id}`,
        {
            headers: {
                'Content-type': 'application/json'
            },
            method: "PUT",
            credentials: "include",
            body: JSON.stringify(payload),
        }
    );

    console.log(response)
    // Se der certo
    if (response.ok) return response.json();


    // Em caso de erro
    let message = "Falha ao editar notícia";
    try {
        const data = await response.json();
        message += data.message ? `: ${data.message}` : "";
    } catch {
        // resposta não é JSON
    }

    throw new Error(message);

}

export { editNewsActions };
