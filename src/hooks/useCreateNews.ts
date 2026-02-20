"use client";

import { toastSuccess, toastError } from "@/lib/toast/toast";
import { useState } from "react";
import { createNewsActions } from "@/actions/CreateNews/createNewsActions";

export function useCreateNews() {
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    if (loading) return;

    try {
      setLoading(true);
      await createNewsActions(formData);
    } catch (err) {
      toastError(
        "Email ou senha inválidos " +
          (err instanceof Error ? `(${err.message})` : ""),
      );
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading };
}
export default useCreateNews;
