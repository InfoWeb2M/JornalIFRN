import { API_MAIN_ROUTE } from "@/constants/apiRoute";

export async function loginAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    throw new Error("Email e Senha são obrigatórios");
  }

  const response = await fetch(API_MAIN_ROUTE + "/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error("Login Falhou " + (data.message || response.statusText));
  }
  return await response.json();
}
