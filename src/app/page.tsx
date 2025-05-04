'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/pages/register');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white">
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Know Your Fan
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-300 text-center max-w-xl mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Cadastre, valide e conheça seus fãs como nunca antes. Um sistema completo para engajamento no universo dos e-sports.
      </motion.p>

      <motion.button
        onClick={handleStart}
        className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Começar Cadastro
      </motion.button>
    </main>
  );
}
