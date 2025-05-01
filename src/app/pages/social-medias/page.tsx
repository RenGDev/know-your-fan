'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SocialMedias() {
  const { data: session } = useSession();


  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Conecte suas redes sociais</h1>

      {!session ? (
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="bg-white border border-gray-300 py-2 px-6 rounded shadow hover:bg-gray-50"
        >
          Conectar com Google
        </button>
      ) : (
        <>
          <p className="mb-4">Olá, {session.user?.name}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600"
          >
            Sair
          </button>
        </>
      )}
    </main>
  );
}
