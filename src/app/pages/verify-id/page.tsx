'use client';

import { useFan } from "@/context/FanContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function VerifyID() {
  const { fanData, setFanData } = useFan();
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [validationResult, setValidationResult] = useState<{
    cpf: string;
    status: "Válido" | "Inválido" | null;
  }>({ cpf: "", status: null });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const validateDocument = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const { data } = await Tesseract.recognize(file, "por", {
        logger: (m) => console.log(m),
      });

      const text = data.text;
      const cpfRegex = /(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2})/;
      const cpfMatch = text.match(cpfRegex);
      const formattedCPF = cpfMatch?.[0]
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

      const stopwords = [
        "REPÚBLICA", "FEDERATIVA", "BRASIL", "SECRETARIA", "SEGURANÇA", "PÚBLICA", "RG", "CPF",
        "MATRÍCULA", "IDENTIFICAÇÃO", "CIVIL", "NASCIMENTO", "EMISSÃO", "FILIAÇÃO", "DATA", "SEXO",
        "ÓRGÃO", "EXPEDIDOR", "CARTEIRA", "PROFISSIONAL", "ELEITOR", "UF", "ESTADO", "REGISTRO", "GERAL"
      ];

      const possibleNames = text
        .split("\n")
        .map(line => line.trim())
        .filter(line =>
          /^[A-Z\s]{10,}$/.test(line) &&
          !stopwords.some(sw => line.includes(sw)) &&
          line.split(" ").length >= 2
        )
        .sort((a, b) => b.length - a.length);

      const nameLine = possibleNames[0] || "Nome não identificado";

      setValidationResult({
        cpf: formattedCPF || "CPF não encontrado",
        status: formattedCPF ? "Válido" : "Inválido",
      });

      setFanData({
        ...fanData,
        nomeDetectado: nameLine.trim(),
        cpf: formattedCPF || "",
        documentoValidado: !!formattedCPF,
      });
    } catch (err) {
      console.error("Erro no OCR:", err);
      setValidationResult({
        cpf: "",
        status: "Inválido",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    router.push("/pages/social-medias");
  };

  return (
    <main className="flex flex-col gap-6 justify-center md:w-full p-6 sm:p-8 mx-auto min-h-screen bg-gradient-to-br from-black via-neutral-900 to-zinc-800 text-white">
      <h1 className="text-2xl md:text-4xl sm:text-4xl font-bold mb-4 text-center">
        Verifique sua identidade
      </h1>

      {previewUrl && (
        <img
          className="rounded-md w-full md:w-96 m-auto mt-0 max-h-[400px] object-contain border mb-4"
          src={previewUrl}
          alt="Preview do documento"
        />
      )}

      <label
        htmlFor="id"
        className="py-4 border-2 border-dashed  md:m-auto md:my-0 text-center md:w-96 rounded-md cursor-pointer bg-white text-black text-sm font-medium hover:bg-gray-50 transition"
      >
        Selecionar arquivo
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          name="id"
          id="id"
          className="hidden"
        />
      </label>

      <button
        className="bg-blue-600 text-white font-semibold md:m-auto md:w-96 md:my-0 py-3 rounded-md w-full mt-4 hover:bg-blue-700 transition"
        onClick={validateDocument}
        disabled={!file || loading}
      >
        {loading ? "Validando..." : "Validar documento"}
      </button>

      {validationResult.status && (
        <div className={`bg-${validationResult.status === 'Válido' ? 'green' : 'red'}-100 p-4 text-black md:w-96 md:m-auto rounded-md mt-6`}>
          <h2 className="font-bold mb-2">Resultado da validação</h2>
          <p><strong>CPF detectado:</strong> {validationResult.cpf}</p>
          <p><strong>Status:</strong> {validationResult.status}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={validationResult.status !== "Válido"}
        className="bg-green-600 text-white font-semibold md:m-auto md:w-96 md:my-0 py-3 rounded-md w-full mt-4 hover:bg-green-700 transition disabled:opacity-50"
      >
        Avançar
      </button>
    </main>
  );
}
