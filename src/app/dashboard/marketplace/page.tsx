import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"

export default async function MarketplacePage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Marketplace</h1>
      <p className="text-blue-600">Esta página está em desenvolvimento. Aqui você poderá comprar e vender Pokémon.</p>
    </div>
  )
}
