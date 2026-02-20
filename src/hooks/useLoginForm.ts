"use client";

import { loginAction } from "@/actions/LoginActions/loginActions";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";

export function useLoginForm() {
    const [loading, setLoading] = useState(false);

    async function submit(formData: FormData) {
        if (loading) return false;

        try {
            setLoading(true);
            await loginAction(formData);
            toastSuccess("Login realizado com sucesso. Redirecionando...");
            return true;
        } catch (err) {
            toastError("Email ou senha inválidos " + (err instanceof Error ? `(${err.message})` : ""));
            return false;
        } finally {
            setLoading(false);
        }
    }

    return { submit, loading };
}
