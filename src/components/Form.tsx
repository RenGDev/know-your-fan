'use client';
import { useFan } from "@/context/FanContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-8 sm:gap-12 text-base bg-gradient-to-br from-black via-neutral-900 to-zinc-800 p-8 sm:p-10 shadow-2xl rounded-xl w-full sm:w-[600px] mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-6">Cadastro de Fã</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block mb-2 font-medium text-white">Nome completo</label>
          <input
            required
            name="name"
            id="name"
            placeholder="Ex: João Silva"
            onChange={handleChange}
            className="w-full p-4 bg-white text-black rounded-md"
          />
        </div>

        <div>
          <label htmlFor="cpf" className="block mb-2 font-medium text-white">CPF</label>
          <input
            type="text"
            name="cpf"
            id="cpf"
            onChange={handleChange}
            placeholder="999.999.999-99"
            className="w-full p-4 bg-white text-black rounded-md"
          />
        </div>
      </div>

      <div>
        <label htmlFor="address" className="block mb-2 font-medium text-white">Endereço</label>
        <input
          required
          name="address"
          id="address"
          placeholder="Rua dos Campeões, 123"
          onChange={handleChange}
          className="w-full p-4 bg-white text-black rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 font-medium text-white">Email</label>
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="voce@email.com"
          onChange={handleChange}
          className="w-full p-4 bg-white text-black rounded-md"
        />
      </div>

      <div>
        <p className="font-medium mb-4 text-white">Quais jogos você acompanha?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {gamesDisp.map((game) => (
            <label key={game} className="flex items-center gap-3 text-white">
              <input
                type="checkbox"
                checked={form.games.includes(game)}
                onChange={() => toggleGame(game)}
                className="text-black"
              />
              {game}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="events" className="block mb-2 font-medium text-white">Eventos que participou no último ano</label>
        <input
          name="events"
          id="events"
          placeholder="Ex: IEM Rio Major 2024"
          onChange={handleChange}
          className="w-full p-4 bg-white text-black rounded-md"
        />
      </div>

      <div>
        <label htmlFor="products" className="block mb-2 font-medium text-white">Produtos de e-sports comprados</label>
        <input
          name="products"
          id="products"
          placeholder="Ex: Camisa da FURIA, periféricos"
          onChange={handleChange}
          className="w-full p-4 bg-white text-black rounded-md"
        />
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.95 }}
        className="w-full bg-fuchsia-600 text-white py-4 rounded-md text-lg font-semibold hover:bg-fuchsia-700 transition"
      >
        Avançar
      </motion.button>
    </motion.form>
  );
}
