"use client";

import { useState } from "react";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import Link from "next/link";
import Spinner from "../ui/loaders/Spinner/page";
import Image from "next/image";
import './signup.css'
import { IconEyeOff, IconEye } from '@tabler/icons-react'

function SignupForm() {
  const { submit, loading } = useRegisterForm();
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false);

  function toggleShowingPassword() {
    setIsShowingPassword(!isShowingPassword);
  }

  return (
    <div
      className="sign-up-form
        w-160 rounded-2xl shadow-(--shadow) h-auto p-10
        bg-(--cards) relative overflow-hidden
      "
    >
      <div className="form-header flex justify-center items-center space-y-4">
        <div className="relative w-30 h-30">
          <Image src={"/logo_teresa.png"} fill alt="logo teresa" />
        </div>
        <hr className="border mr-4.5 rotate-90 w-10 border-(--bordas)" />
        <div>
          <h2 className="text-4xl font-medium text-(--titulo)">Registrar</h2>
          <p className="text-lg text-(--text)">Crie sua conta abaixo.</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(new FormData(e.currentTarget));
        }}
        className="w-full mt-8 space-y-6"
      >
        {/* Nome e Sobrenome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="font-semibold text-sm text-(--titulo) pb-1 block"
            >
              Nome
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className="
                outline-none border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus:border-(--links)
              "
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="font-semibold text-sm text-(--titulo) pb-1 block"
            >
              Sobrenome
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className="
                outline-none border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus:border-(--links)
              "
              placeholder="Digite seu sobrenome"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="font-semibold text-sm text-(--titulo) pb-1 block"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="
              outline-none border-2 border-(--bordas) rounded-lg
              px-4 py-3 w-full text-lg
              bg-(--input) text-(--text)
              focus:border-(--links)
            "
            placeholder="seu@email.com"
          />
        </div>

        {/* Senha */}
        <div>
          <label
            htmlFor="password"
            className="font-semibold text-sm text-(--titulo) pb-1 block"
          >
            Senha
          </label>
          <div className="
                password-input outline-none
                border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus-within:border-(--links)">
            <input
              id="password"
              name="password"
              className='outline-none max-w-full'
              type={isShowingPassword ? 'text' : 'password'}
              placeholder="Digite sua senha"
            />
            {
              isShowingPassword ? <IconEye onClick={toggleShowingPassword}/> : <IconEyeOff onClick={toggleShowingPassword}/>
            }
          </div>
        </div>

        {/* Data de Nascimento e Gênero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="dob"
              className="font-semibold text-sm text-(--titulo) pb-1 block"
            >
              Nascimento
            </label>
            <input
              id="dob"
              name="dob"
              type="date"
              className="
                outline-none border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus:border-(--links)
              "
            />
          </div>

          <div className='gender-div'>
            <label
              htmlFor="gender"
              className="font-semibold text-sm text-(--titulo) pb-1 block"
            >
              Gênero
            </label>
            <select
              defaultValue={''}
              id="gender"
              name="gender"
              className=" gender-select
                outline-none border-2 border-(--bordas) rounded-lg
                px-4 py-3 w-full text-lg
                bg-(--input) text-(--text)
                focus:border-(--links)
              "
            >
              <option value="" disabled>- Selecionar -</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </div>
        </div>

        {/* Botão de Registro */}
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
          <span className={loading ? "opacity-0" : "opacity-100"}>
            Registrar
          </span>

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

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b border-(--bordas)" />
          <Link
            href="/sign-in"
            className="text-md text-(--links) hover:underline text-center"
          >
            Já tem uma conta? Entre
          </Link>
          <span className="w-1/5 border-b border-(--bordas)" />
        </div>
      </form>
    </div>
  );
}

export { SignupForm };
