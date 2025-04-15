import { redirect } from "next/navigation";
import { UserCollection } from "@/components/user-collection";
import { getSession } from "@/lib/auth";

export default async function CollectionPage() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800">Coleção</h1>
      <UserCollection />
    </div>
  );
}
