import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function AddPokemonPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Adicionar Pokémon</h1>
      <p className="text-blue-600">
        Esta página está em desenvolvimento. Aqui você poderá adicionar novos Pokémon à sua coleção.
      </p>
    </div>
  )
}
