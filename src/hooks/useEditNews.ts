"use client";

import { toastSuccess, toastError } from "@/lib/toast/toast";
import { editNewsActions } from "@/actions/EditNews/editNewsActions";
import { useState } from "react";

export function useEditNews() {
  const [editLoading, setEditLoading] = useState<boolean>(false);

  async function submit(data: any, id: string) {
    if (editLoading) return;

    try {
      setEditLoading(true);
      await editNewsActions(data, id);
      toastSuccess("Notícia editada com sucesso!");
    } catch (err) {
      toastError(
        "Erro ao editar notícia " +
          (err instanceof Error ? `(${err.message})` : ""),
      );
    } finally {
      setEditLoading(false);
    }
  }

  return { submit, editLoading };
}
export default useEditNews;
