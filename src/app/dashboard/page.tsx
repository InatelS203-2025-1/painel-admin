import { redirect } from "next/navigation";
import { PokemonDashboard } from "@/components/pokemon-dashboard";
import { getSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return <PokemonDashboard />;
}
