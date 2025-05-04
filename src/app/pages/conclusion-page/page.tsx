'use client';

import { useFan } from "@/context/FanContext";
import { enviarFanData } from "@/services/fansService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SummaryAndSubmit() {
  const { fanData } = useFan();
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('fanData atual:', fanData);
  }, [fanData]);
  
  const handleSubmit = async () => {
    setLoading(true);
    setSubmitted(true);

    try {
      const payload = {
        name: fanData.name,
        cpf: fanData.cpf,
        address: fanData.address,
        email: fanData.email,
        events: fanData.events,
        products: fanData.products,
        games: fanData.games || [],
        socials: fanData.socials || {},
        gamingProfiles: (fanData.gamingProfiles || []).map(link => ({
            link,
            platform: "Desconhecido"
          })),
      };
  
      await enviarFanData(payload);

      setTimeout(() => {
        router.push("/pages/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar os dados. Tente novamente.");
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white p-6">
      <div className="w-full max-w-md lg:max-w-lg mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
          Resumo do seu perfil de fã
        </h1>

        {!submitted ? (
          <>
            <section className="bg-white text-black p-4 rounded-md shadow mb-4">
              <h2 className="font-semibold mb-2 text-lg sm:text-xl">Informações pessoais</h2>
              <p><strong>Nome:</strong> {fanData.name || "Não informado"}</p>
              <p><strong>CPF:</strong> {fanData.cpf || "Não informado"}</p>
              <p><strong>Documento:</strong> {fanData.cpf ? "Validado ✅" : "Não validado ❌"}</p>
            </section>

            <section className="bg-white text-black p-4 rounded-md shadow mb-4">
              <h2 className="font-semibold mb-2 text-lg sm:text-xl">Redes sociais vinculadas</h2>
              <ul className="list-disc pl-5 text-sm sm:text-base">
                {fanData.socials && Object.entries(fanData.socials).length > 0 ? (
                  Object.entries(fanData.socials).map(([key, value]) => (
                    <li key={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </li>
                  ))
                ) : (
                  <li>Nenhuma vinculada</li>
                )}
              </ul>
            </section>

            <section className="bg-white text-black p-4 rounded-md shadow mb-4">
              <h2 className="font-semibold mb-2 text-lg sm:text-xl">Perfis analisados</h2>
              <ul className="list-disc pl-5 text-sm sm:text-base">
                {fanData.gamingProfiles && fanData.gamingProfiles.length > 0 ? (
                  fanData.gamingProfiles.map((link, index) => (
                    <li key={index}>{link}</li>
                  ))
                ) : (
                  <li>Nenhum perfil fornecido</li>
                )}
              </ul>
            </section>

            <button
              className="bg-blue-600 text-white text-base sm:text-lg py-3 rounded-md w-full mt-4 hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar meus dados"}
            </button>
          </>
        ) : (
          <div className="bg-green-100 text-green-900 text-lg font-semibold p-6 rounded-md text-center shadow">
            Obrigado, fã! Prepare-se para experiências exclusivas no mundo dos e-sports. 🎮🚀
          </div>
        )}
      </div>
    </main>
  );
}
