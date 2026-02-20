import { API_MAIN_ROUTE } from "@/constants/apiRoute";

async function registerActions(formdata: FormData) {
  const firstName = formdata.get("firstName");
  const lastName = formdata.get("lastName");
  const email = formdata.get("email");
  const password = formdata.get("password");
  const birthDate = formdata.get("dob");
  const gender = formdata.get("gender");

  if (!firstName || !lastName || !email || !password || !birthDate || !gender) {
    throw new Error("Por favor preencha todos os campos do formulário!");
  }

  const res = await fetch(API_MAIN_ROUTE + "/user/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password, birthDate }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error("Cadastro Falhou: " + (data.message || res.statusText));
  }
    setTimeout(() => {
    window.location.href = "/sign-in";
  }, 5000);

  return await res.json();
}
export { registerActions };
