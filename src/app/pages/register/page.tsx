'use client';
import { Form } from '@/components/Form';

export default function Register() {
  return (
    <main className="flex flex-col p-6 gap-6 max-w-md mx-auto lg:max-w-2xl">
      <h1 className="text-3xl font-bold text-center lg:text-left">Seja bem-vindo, fã de e-sports!</h1>
      <Form />
    </main>
  );
}
