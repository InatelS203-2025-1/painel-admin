"use client";

import { useMemo } from "react";
import {
  RefreshCcw,
  Users,
  Flame,
  Sparkles,
  WalletCardsIcon as Cards,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserCardStore } from "@/lib/store";
import type { Pokemon } from "@/types/pokemon";

interface DashboardCardsProps {
  pokemon: Pokemon[];
  isLoading: boolean;
}

export function DashboardCards({ pokemon, isLoading }: DashboardCardsProps) {
  const {
    cards,
    collection,
    getCardCount,
    getTotalUniqueCards,
    getCardsByType,
  } = useUserCardStore();

  const stats = useMemo(() => {
    if (pokemon.length === 0) return null;

    // Contagem total de Pokémon
    const totalPokemon = pokemon.length;

    // Contagem por tipo
    const typeCount: Record<string, number> = {};
    pokemon.forEach((p) => {
      p.types.forEach((t) => {
        const type = t.type.name;
        typeCount[type] = (typeCount[type] || 0) + 1;
      });
    });

    // Tipos mais comuns
    const topTypes = Object.entries(typeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => ({ type, count }));

    // Pokémon mais forte (baseado na soma das estatísticas)
    const strongestPokemon = [...pokemon].sort((a, b) => {
      const sumA = a.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      const sumB = b.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
      return sumB - sumA;
    })[0];

    // Pokémon com mais HP
    const highestHpPokemon = [...pokemon].sort((a, b) => {
      const hpA = a.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
      const hpB = b.stats.find((s) => s.stat.name === "hp")?.base_stat || 0;
      return hpB - hpA;
    })[0];

    // Pokémon com mais ataque
    const highestAttackPokemon = [...pokemon].sort((a, b) => {
      const attackA =
        a.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
      const attackB =
        b.stats.find((s) => s.stat.name === "attack")?.base_stat || 0;
      return attackB - attackA;
    })[0];

    return {
      totalPokemon,
      topTypes,
      strongestPokemon,
      highestHpPokemon,
      highestAttackPokemon,
    };
  }, [pokemon]);

  // Calcular estatísticas da coleção do usuário
  const userStats = useMemo(() => {
    // Tipos mais comuns na coleção do usuário
    const typeCount: Record<string, number> = {};

    Object.values(collection).forEach((pokemon) => {
      pokemon.types.forEach((t) => {
        const type = t.type.name;
        const count = getCardsByType(type).count;
        if (count > 0) {
          typeCount[type] = (typeCount[type] || 0) + count;
        }
      });
    });

    const topUserTypes = Object.entries(typeCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([type, count]) => ({ type, count }));

    return {
      totalCards: getCardCount(),
      uniqueCards: getTotalUniqueCards(),
      topUserTypes,
    };
  }, [collection, getCardCount, getTotalUniqueCards, getCardsByType]);

  if (isLoading) {
    return (
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full border-blue-200 shadow-md">
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-36" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-16 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const translateType = (type: string) => {
    const typeTranslations: Record<string, string> = {
      normal: "Normal",
      fire: "Fogo",
      water: "Água",
      electric: "Elétrico",
      grass: "Planta",
      ice: "Gelo",
      fighting: "Lutador",
      poison: "Venenoso",
      ground: "Terra",
      flying: "Voador",
      psychic: "Psíquico",
      bug: "Inseto",
      rock: "Pedra",
      ghost: "Fantasma",
      dragon: "Dragão",
      dark: "Sombrio",
      steel: "Metálico",
      fairy: "Fada",
    };

    return typeTranslations[type] || type;
  };

  const getTypeColor = (type: string) => {
    const typeColors: Record<string, string> = {
      normal: "bg-gray-500",
      fire: "bg-red-500",
      water: "bg-blue-500",
      electric: "bg-yellow-500",
      grass: "bg-green-500",
      ice: "bg-blue-300",
      fighting: "bg-red-700",
      poison: "bg-purple-500",
      ground: "bg-yellow-700",
      flying: "bg-indigo-300",
      psychic: "bg-pink-500",
      bug: "bg-green-600",
      rock: "bg-yellow-800",
      ghost: "bg-purple-700",
      dragon: "bg-indigo-700",
      dark: "bg-gray-800",
      steel: "bg-gray-400",
      fairy: "bg-pink-300",
    };

    return typeColors[type] || "bg-gray-500";
  };

  return (
    <div className="flex w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="w-full border-blue-200 shadow-md">
        <CardHeader className="pb-2">
          <CardDescription>Treinadores Totais</CardDescription>
          <CardTitle className="text-2xl">
            {userStats.totalCards} Treinadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Users className="mt-3 mb-3 h-12 w-12 text-blue-400" />
            <div className="text-center">
              <p className="text-sm text-blue-600">Treinadores Online:</p>
              <p className="text-xl font-bold text-blue-700">0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-blue-200 shadow-md">
        <CardHeader className="pb-2">
          <CardDescription>Cartas Totais</CardDescription>
          <CardTitle className="text-2xl">
            {stats.totalPokemon} Cartas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Cards className="mb-3 h-12 w-12 text-blue-400" />
            <div className="text-center">
              <p className="text-sm text-blue-600">Cartas Registradas:</p>
              <p className="text-xl font-bold text-blue-700">0</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full border-blue-200 shadow-md">
        <CardHeader className="pb-2">
          <CardDescription>Trocas</CardDescription>
          <CardTitle className="text-2xl capitalize">0 Trocas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <RefreshCcw className="mt-4 mb-3 h-12 w-12 text-blue-400" />
            <div className="text-center">
              <p className="text-sm text-blue-600">Trocas Em Aberto:</p>
              <p className="text-xl font-bold text-blue-700">0</p>
              <div className="mt-1 flex justify-center gap-1"></div>
              <p className="mt-1 text-xs text-blue-500"></p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
