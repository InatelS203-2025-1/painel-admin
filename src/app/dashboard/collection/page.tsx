import { redirect, useRouter } from "next/navigation";
import { getSession } from "@/lib/auth";
import { fixedTrainers } from "@/app/dashboard/trainers/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

export default async function CollectionPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">
        Coleção de Treinadores
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {fixedTrainers.map((trainer, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center border rounded-lg bg-blue-50 p-4 shadow-md"
          >
            <Avatar className="h-14 w-14 mb-2 border-2 border-blue-400 bg-white">
              <AvatarFallback className="text-2xl">
                <User className="h-8 w-8 text-blue-600" />
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold text-blue-900 mb-2 text-center truncate w-full">
              {trainer.nickname}
            </div>
            <a
              href={`/dashboard/collection/${encodeURIComponent(
                trainer.nickname
              )}`}
              className="mt-2 px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              Ver coleção
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
