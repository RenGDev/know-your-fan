import { useFan } from "@/context/FanContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Form() {
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleGame = (game: string) => {
    setForm((prev) => ({
      ...prev,
      games: prev.games.includes(game)
        ? prev.games.filter((g) => g !== game)
        : [...prev.games, game],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFanData(form);
    router.push("/pages/verify-id");
  };

  const gamesDisp = ["CS:GO", "Valorant", "LoL", "Free Fire", "Outro"];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-base">
      <input
        name="name"
        placeholder="Nome completo"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />
      <input
        name="cpf"
        placeholder="CPF"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />
      <input
        name="address"
        placeholder="Endereço"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />

      <div>
        <p className="font-medium mb-2">Quais jogos você acompanha?</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gamesDisp.map((game) => (
            <label key={game} className="flex items-center">
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
      </div>

      <input
        name="events"
        placeholder="Eventos que participou no último ano"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />
      <input
        name="products"
        placeholder="Produtos de e-sports comprados"
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-md text-lg hover:bg-blue-700 transition-all"
      >
        Avançar
      </button>
    </form>
  );
}
