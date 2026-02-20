"use client";

import { toastSuccess, toastError } from "@/lib/toast/toast";
import { registerActions } from "@/actions/RegisterActions/registerActions";
import { useState } from "react";

function useRegisterForm() {
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    if (loading) return;

    try {
      setLoading(true);
      await registerActions(formData);
      toastSuccess(
        "Cadastro realizado com sucesso, redirecionando para o login...",
      );
    } catch (err) {
      toastError(
        "Dados inválidos " + (err instanceof Error ? `(${err.message})` : ""),
      );
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading };
}
export { useRegisterForm };
