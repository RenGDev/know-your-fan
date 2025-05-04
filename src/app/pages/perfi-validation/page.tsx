'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFan } from "@/context/FanContext";

export default function ProfileValidation() {
  const router = useRouter();
  const [profileLink, setProfileLink] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setFanData } = useFan();

  const handleAnalyze = () => {
    if (!profileLink.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setResult("Este perfil contém jogos compatíveis com seu perfil.\nPertence ao usuário? ✓");

      setFanData({
        gamingProfiles: [profileLink]
      });

      setLoading(false);
    }, 1500);
  };

  const handleNext = () => {
    router.push("/pages/conclusion-page");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
          Mostre seus perfis de fã
        </h1>

        <label className="flex flex-col gap-2 mb-4">
          <span className="font-medium">Cole o link do seu perfil Steam, Twitch ou Faceit</span>
          <input
            type="text"
            placeholder="https://..."
            value={profileLink}
            onChange={(e) => setProfileLink(e.target.value)}
            className="border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </label>

        <button
          onClick={handleAnalyze}
          disabled={!profileLink || loading}
          className="bg-blue-600 text-white w-full py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Analisando..." : "Analisar Perfil"}
        </button>

        {result && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md whitespace-pre-line mt-4 text-sm">
            {result}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!result}
          className="bg-blue-600 text-white py-3 px-4 rounded w-full mt-6 hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          Avançar
        </button>
      </div>
    </main>
  );
}
