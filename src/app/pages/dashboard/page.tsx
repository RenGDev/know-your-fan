'use client';

import { useFan } from '@/context/FanContext';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { fanData } = useFan();
  const router = useRouter();

  const handleEdit = () => {
    router.push('/pages/register');
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-800 via-neutral-900 to-zinc-700 text-white p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          Olá, {fanData.name || 'Fã'}! 👋
        </h1>

        <div className="bg-white rounded-lg  text-black shadow p-6 mb-6">
          <h2 className="font-semibold text-lg sm:text-xl mb-4">Seus destaques</h2>
          <ul className="list-disc pl-5 text-sm sm:text-base space-y-2">
            <li>
              <strong>Jogos:</strong> 
              {fanData.games?.length ? (
                fanData.games.join(', ')
              ) : (
                <span className="text-gray-400">Nenhum selecionado</span>
              )}
            </li>
            <li>
              <strong>Eventos:</strong> 
              {fanData.events ? (
                fanData.events
              ) : (
                <span className="text-gray-400">Nenhum informado</span>
              )}
            </li>
            <li>
              <strong>Produtos:</strong> 
              {fanData.products ? (
                fanData.products
              ) : (
                <span className="text-gray-400">Nenhum informado</span>
              )}
            </li>
          </ul>
        </div>

        <button
          onClick={handleEdit}
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Editar meu perfil
        </button>
      </div>
    </main>
  );
}
