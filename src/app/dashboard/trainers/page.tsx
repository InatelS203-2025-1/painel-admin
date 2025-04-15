import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";

export default async function TrainersPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Treinadores</h1>
      <p className="text-blue-600">
        Aqui você poderá ver os treinadores e suas informações.
      </p>
    </div>
  );
}
