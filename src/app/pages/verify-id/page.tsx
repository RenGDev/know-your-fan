'use client';

import { useFan } from "@/context/FanContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Tesseract from "tesseract.js";

export default function Register(){
        const { fanData, setFanData } = useFan();
        const router = useRouter();

        const [file, setFile] = useState<File | null>(null);
        const [previewUrl, setPreviewUrl] = useState<string | null>(null);
        const [loading, setLoading] = useState(false);

        const [validationResult, setValidationResult] = useState<{
          name: string
          cpf: string
          status: "Válido" | "Inválido" | null
        }>({ name: "", cpf: "", status: null })
    
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const selected = e.target.files?.[0]
          if (selected) {
            setFile(selected)
            setPreviewUrl(URL.createObjectURL(selected))
          }
        };
    
        const enhanceImage = (file: File): Promise<HTMLCanvasElement> => {
            return new Promise((resolve) => {
              const img = new Image();
              const reader = new FileReader();
          
              reader.onload = (e) => {
                img.onload = () => {
                  const canvas = document.createElement("canvas");
                  const ctx = canvas.getContext("2d")!;
                  canvas.width = img.width;
                  canvas.height = img.height;
                  ctx.drawImage(img, 0, 0);
          
                  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                  const data = imageData.data;
          
                  for (let i = 0; i < data.length; i += 4) {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    const contrast = avg > 128 ? 255 : 0;
                    data[i] = data[i + 1] = data[i + 2] = contrast; // preto e branco
                  }
          
                  ctx.putImageData(imageData, 0, 0);
                  resolve(canvas);
                };
                img.src = e.target!.result as string;
              };
          
              reader.readAsDataURL(file);
            });
          };
          
          const formatCPF = (cpf: string) => {
            return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
          };
          
          
          const validateDocument = async () => {
            if (!file) return;
            setLoading(true);
        
            try {
              const { data } = await Tesseract.recognize(file, "por", {
                logger: (m) => console.log(m),
              });
        
              const text = data.text;
              console.log("Texto detectado:", text);
        
              // Regex CPF e formatação
              const cpfRegex = /(?:\d{3}\.?\d{3}\.?\d{3}-?\d{2})/;
              const cpfMatch = text.match(cpfRegex);
              const formattedCPF = cpfMatch?.[0]
                .replace(/\D/g, "") // remove não-dígitos
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        
              // Palavras que não representam nome
              const stopwords = [
                "REPÚBLICA", "FEDERATIVA", "BRASIL", "SECRETARIA", "SEGURANÇA", "PÚBLICA", "RG", "CPF",
                "MATRÍCULA", "IDENTIFICAÇÃO", "CIVIL", "NASCIMENTO", "EMISSÃO", "FILIAÇÃO", "DATA", "SEXO",
                "ÓRGÃO", "EXPEDIDOR", "CARTEIRA", "PROFISSIONAL", "ELEITOR", "UF", "ESTADO", "REGISTRO", "GERAL"
              ];
        
              // Heurística para encontrar nome em caixa alta
              const possibleNames = text
                .split("\n")
                .map(line => line.trim())
                .filter(line =>
                  /^[A-Z\s]{10,}$/.test(line) && // tudo em maiúsculas e com tamanho relevante
                  !stopwords.some(sw => line.includes(sw)) &&
                  line.split(" ").length >= 2
                )
                .sort((a, b) => b.length - a.length);
        
              const nameLine = possibleNames[0] || "Nome não identificado";
        
              setValidationResult({
                name: nameLine.trim(),
                cpf: formattedCPF || "CPF não encontrado",
                status: formattedCPF ? "Válido" : "Inválido",
              });
        
              setFanData({
                ...fanData,
                name: nameLine.trim(),
                cpf: formattedCPF || "",
              });
            } catch (err) {
              console.error("Erro no OCR:", err);
              setValidationResult({
                name: "",
                cpf: "",
                status: "Inválido",
              });
            } finally {
              setLoading(false);
            }
          };
    
        const handleNext = () => {
          router.push("/pages/social-medias")
        }
    return(

        <main className='flex flex-col p-9 gap-4'>
            <h1 className='text-4xl text-wrap font-bold mb-5'>Verifique sua indentidade</h1>
            {previewUrl &&(
                <img className="rounded-md" src={previewUrl} alt="" />
            )}
            <label className="py-4 border-2 text-center rounded-md" htmlFor="id">
                Selecionar arquivo
                <input className="hidden" type="file" accept="image/*" onChange={handleFileChange} name="id" id="id"/>
            </label>
            <button className="bg-blue-600 text-white w-full h-11 rounded-md" onClick={validateDocument} disabled={!file || loading}>{loading ? "Validando..." : "Validar documento"}</button>
            {validationResult. status && (
                <div className="mt-5">
                    <h2 className="font-bold">Resultado da validação</h2>
                    <h2><span className="font-bold">Nome detectado: </span>{validationResult.name}</h2>
                    <h2><span className="font-bold">CPF detectado: </span>{validationResult.cpf}</h2>
                    <h2 className="font-bold">Status: {" "} {validationResult.status === "Válido" ? "Válido" : "Inválido"}</h2>
                </div>  
            )}

            <button
                onClick={handleNext}
                disabled={validationResult.status !== "Válido"}
                className="bg-blue-600 text-white py-2 px-4 rounded w-full"
            >Avançar</button>
        </main>
    )
}