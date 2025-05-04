'use client';
import { Form } from '@/components/Form';

export default function Register() {
  return (
    <main className="flex flex-col p-6 gap-6 max-w-md mx-auto lg:max-w-full lg:p-12 bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center lg:text-left mb-6">
        Seja bem-vindo, fã de e-sports!
      </h1>
      
      <p className="text-lg sm:text-xl text-center lg:text-left text-gray-300 mb-8 lg:max-w-2xl">
        Preencha o formulário abaixo e faça parte da nossa comunidade de fãs de e-sports. Vamos te conhecer melhor!
      </p>

      <Form />
    </main>
  );
}
