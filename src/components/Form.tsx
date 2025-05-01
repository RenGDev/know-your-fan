import { useFan } from "@/context/FanContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Form(){
    const { setFanData } = useFan();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        cpf: "",
        address: "",
        email: "",
        games: [] as string[],
        events: "",
        products: "",
    })

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const toggleGame = (game: string) => {
        setForm((prev) => ({
            ...prev,
            games: prev.games.includes(game)
            ? prev.games.filter((g) => g !== game)
            : [...prev.games, game]
        }))
    }

    const handleSubmit= (e: React.FormEvent) =>{
        e.preventDefault()
        setFanData(form)
        router.push("/pages/verify-id")
    }

    const gamesDisp = ["CS:GO", "Valorant", "LoL", "Free Fire", "Outro"]

    return(
        <form className="flex flex-col gap-3">
            <input name="nome" placeholder="Nome completo" onChange={handleChange} className="w-full p-2 border" />
            <input name="cpf" placeholder="CPF" onChange={handleChange} className="w-full p-2 border" />
            <input name="endereco" placeholder="Endereço" onChange={handleChange} className="w-full p-2 border" />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />

            <div>
              <p className="font-medium">Quais jogos você acompanha?</p>
              {gamesDisp.map((game) => (
                <label key={game} className="block">
                  <input
                    type="checkbox"
                    checked={form.games.includes(game)}
                    onChange={() => toggleGame(game)}
                    className="mr-2"
                  />
                  {game}
                </label>
              ))}
            </div>
          
            <input name="eventos" placeholder="Eventos que participou no último ano" onChange={handleChange} className="w-full p-2 border" />
            <input name="produtos" placeholder="Produtos de e-sports comprados" onChange={handleChange} className="w-full p-2 border" />
          
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded">
              Avançar
            </button>

            
        </form>
    )
}