"use client";

import { useLoginForm } from "@/hooks/useLoginForm";
import { delay } from "@/lib/delay/delay";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import Spinner from "../ui/loaders/Spinner/page";
import "./login.css";

function LoginForm() {
    const { submit, loading } = useLoginForm();
    const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

    async function handlesubmit(e: FormEvent<HTMLFormElement>) {
        const success = await submit(new FormData(e.currentTarget));

        if (success) {
            await delay(1000);
            window.location.href = "/";
        }
    }

    function toggleShowingPassword() {
        setIsShowingPassword(!isShowingPassword);
    }

    return (
        <div
            className=" login-form
        w-lg rounded-2xl shadow-(--shadow) h-auto p-10
        bg-(--cards) relative overflow-hidden
      "
        >
            <div className="form-header flex justify-center items-center space-y-2">
                <div className="relative w-30 h-30">
                    <Image src="/logo_teresa.png" alt="Logo teresa" fill style={{ backgroundColor: "transparent" }} />
                </div>
                <hr className="border mr-4.5 rotate-90 w-10 border-(--bordas)" />
                <div>
                    <h2 className="text-4xl font-medium text-(--titulo)">Entrar</h2>
                    <p className="text-lg text-(--text)">Insira as credenciais abaixo.</p>
                </div>
            </div>

            <form
                onSubmit={e => {
                    e.preventDefault();
                    handlesubmit(e);
                }}
                className="w-full mt-8 space-y-6"
            >
                <div>
                    <label htmlFor="email" className="font-semibold text-sm text-(--titulo) pb-1 block">
                        Email
                    </label>
                    <input
                        className="
                outline-none border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus:border-(--links)
              "
                        placeholder="Email"
                        id="email"
                        name="email"
                        type="email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="font-semibold text-sm text-(--titulo) pb-1 block">
                        Senha
                    </label>
                    <div
                        className="
                password-input outline-none
                border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus-within:border-(--links)"
                    >
                        <input
                            id="password"
                            name="password"
                            className="outline-none max-w-full"
                            type={isShowingPassword ? "text" : "password"}
                            placeholder="Digite sua senha"
                        />
                        {isShowingPassword ? (
                            <IconEye onClick={toggleShowingPassword} />
                        ) : (
                            <IconEyeOff onClick={toggleShowingPassword} />
                        )}
                    </div>
                </div>

                <button
                    className={`
    relative
    w-full py-3 rounded-lg text-lg font-medium
    bg-(--botoes) text-(--background)
    hover:bg-(--hover)
    ring-2 ring-(--bordas)
    transition-colors
    disabled:opacity-60 disabled:cursor-not-allowed
    cursor-pointer
  `}
                    id="login"
                    name="login"
                    type="submit"
                    disabled={loading}
                    aria-busy={loading}
                    aria-disabled={loading}
                >
                    <span className={loading ? "opacity-0" : "opacity-100"}>Entrar</span>

                    {loading && (
                        <span
                            role="status"
                            aria-live="polite"
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <Spinner />
                            <span className="sr-only">Carregando...</span>
                        </span>
                    )}
                </button>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b border-(--bordas)" />
                    <Link href="/sign-up" className="text-[15px] text-(--links) hover:underline text-center">
                        Não tem uma conta? Crie uma!
                    </Link>
                    <span className="w-1/5 border-b border-(--bordas)" />
                </div>
            </form>
        </div>
    );
}

export { LoginForm };
