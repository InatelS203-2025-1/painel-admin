import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function MarketplacePage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Mercado de Trocas</h1>
      <p className="text-blue-600">
        Aqui você poderá ver as cartas disponíveis para troca, proposta de troca
        e histórico de trocas de Pokémon.
      </p>
    </div>
  );
}
