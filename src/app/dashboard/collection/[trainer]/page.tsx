"use client";
import { notFound, useParams } from "next/navigation";
import { fixedTrainers } from "@/app/dashboard/trainers/page";
import { usePokemon } from "@/hooks/use-pokemon";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function TrainerCollectionPage() {
  const params = useParams();
  const trainer =
    typeof params.trainer === "string"
      ? params.trainer
      : Array.isArray(params.trainer)
      ? params.trainer[0]
      : "";
  const { pokemon, isLoading } = usePokemon();
  const trainerData = fixedTrainers.find((t) => t.nickname === trainer);
  const [trainerCollection, setTrainerCollection] = useState<any[]>([]);

  useEffect(() => {
    if (!trainerData || pokemon.length === 0) return;
    const collectionCount = trainerData.collectionCount;
    const storageKey = `trainer-collection-${trainerData.nickname}`;
    let collectionIds: number[] = [];
    // Tenta recuperar do localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            collectionIds = parsed
              .map((id) => Number(id))
              .filter((id) => !isNaN(id));
          }
        } catch {}
      }
    }
    // Se não existe, gera, salva e usa
    if (!collectionIds || collectionIds.length !== collectionCount) {
      const shuffled = [...pokemon].sort(() => 0.5 - Math.random());
      collectionIds = shuffled
        .slice(0, collectionCount)
        .map((p) => Number(p.id));
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(collectionIds));
      }
    }
    // Monta a coleção ordenada por id
    const collection = collectionIds
      .map((id) => pokemon.find((p) => Number(p.id) === id))
      .filter((p): p is (typeof pokemon)[0] => !!p)
      .sort((a, b) => (a && b ? Number(a.id) - Number(b.id) : 0));
    setTrainerCollection(collection);
  }, [pokemon, trainerData]);

  if (!trainerData) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-2">
        Coleção de {trainerData.nickname}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trainerCollection.map((poke) => (
          <div
            key={poke.id}
            className="flex flex-col items-center border rounded-lg bg-blue-50 p-4 shadow-md"
          >
            <div className="relative h-24 w-24 mb-2">
              <Image
                src={
                  poke.sprites.other["official-artwork"].front_default ||
                  "/placeholder.svg?height=96&width=96"
                }
                alt={poke.name}
                fill
                className="object-contain rounded-full bg-white"
              />
            </div>
            <div className="font-semibold text-blue-900 text-lg capitalize mb-1">
              {poke.name}
            </div>
            <div className="text-blue-700 text-sm">
              #{poke.id.toString().padStart(3, "0")}
            </div>
          </div>
        ))}
        {trainerCollection.length === 0 && (
          <div className="col-span-full text-center text-blue-700">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
}
