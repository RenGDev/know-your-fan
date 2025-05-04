'use client';

import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useFan } from "@/context/FanContext";

export default function SocialMedia() {
  const [conexoes, setConexoes] = useState<string[]>([]);
  const router = useRouter();
  const { fanData, setFanData } = useFan();

  const conectar = (rede: string) => {
    setConexoes((prev) => [...prev, `Conectado com ${rede}`]);

    const socials = { ...fanData.socials };

    switch (rede) {
      case 'Google':
        socials.google = 'lorenzo@gmail.com';
        break;
      case 'Twitter':
        socials.twitter = 'https://twitter.com/lorenzo';
        break;
      case 'Instagram':
        socials.instagram = 'https://instagram.com/lorenzo';
        break;
    }

    setFanData({ ...fanData, socials });
  };

  const handleNext = () => {
    router.push("/pages/perfi-validation");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
          Conecte suas redes sociais
        </h1>

        <div className="space-y-4">
          <button
            onClick={() => conectar('Google')}
            className="w-full bg-white border text-black border-gray-300 py-3 px-4 rounded shadow hover:bg-gray-50 transition-colors"
          >
            Conectar com Google
          </button>

          <button
            onClick={() => conectar('Twitter')}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded shadow hover:bg-blue-600 transition-colors"
          >
            Conectar com Twitter
          </button>

          <button
            onClick={() => conectar('Instagram')}
            className="w-full bg-pink-500 text-white py-3 px-4 rounded shadow hover:bg-pink-600 transition-colors"
          >
            Conectar com Instagram
          </button>
        </div>

        <div className="mt-8 bg-white rounded shadow p-4">
          <h2 className="font-semibold mb-2 text-xl text-black">Atividades</h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
            {conexoes.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
            <li>@lorenzo segue FURIA no Instagram</li>
            <li>Curtiu evento CBLOL 2024 no YouTube</li>
          </ul>
        </div>

        <button
          className="mt-6 w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors"
          onClick={handleNext}
        >
          Avançar
        </button>
      </div>
    </main>
  );
}
