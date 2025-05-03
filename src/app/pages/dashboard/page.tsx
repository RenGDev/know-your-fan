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
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          Olá, {fanData.name || 'Fã'}! 👋
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-semibold text-lg sm:text-xl mb-4">Seus destaques</h2>
          <ul className="list-disc pl-5 text-sm sm:text-base space-y-2">
            <li><strong>Jogos:</strong> {fanData.games?.join(', ') || 'Nenhum selecionado'}</li>
            <li><strong>Eventos:</strong> {fanData.events || 'Nenhum informado'}</li>
            <li><strong>Produtos:</strong> {fanData.products || 'Nenhum informado'}</li>
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
