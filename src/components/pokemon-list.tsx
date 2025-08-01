"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  Heart,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PokemonModal } from "@/components/pokemon-modal";
import { useUserCardStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import type { Pokemon } from "@/types/pokemon";

interface PokemonListProps {
  pokemon: Pokemon[];
  isLoading: boolean;
  error: Error | null;
  onSelectPokemon: (id: string) => void;
  selectedPokemon: string | null;
}

export function PokemonList({
  pokemon,
  isLoading,
  error,
  onSelectPokemon,
  selectedPokemon,
}: PokemonListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPokemon, setModalPokemon] = useState<Pokemon | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete">(
    "view"
  );
  const { addCard, cards, collection } = useUserCardStore();
  const { toast } = useToast();

  // Refresh pagination when list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [pokemon.length]);

  const itemsPerPage = 18;
  const totalPages = Math.ceil(pokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPokemon = pokemon.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (pokemon: Pokemon, mode: "view" | "edit" | "delete") => {
    setModalPokemon(pokemon);
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleAddToCollection = (pokemon: Pokemon) => {
    addCard(pokemon);
    toast({
      title: "Carta adicionada",
      description: `${pokemon.name} foi adicionado à sua coleção.`,
      duration: 3000,
    });
  };

  const isPokemonInCollection = (pokemonId: string) => {
    return !!collection[pokemonId];
  };

  // Lista de IDs de Pokémon lendários como números
  const legendaryIds = [
    144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381,
    382, 383, 384,
    // ...adicione outros se quiser
  ];
  function isLegendary(pokemon: any) {
    return legendaryIds.includes(Number(pokemon.id));
  }
  // Animações lendário (igual user-collection)
  const cardLendarioStyles = `
  @keyframes shine {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
  @keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    50% { transform: translateY(-20px) scale(1.2); opacity: 0.7; }
    100% { transform: translateY(0) scale(1); opacity: 1; }
  }
  `;
  if (
    typeof window !== "undefined" &&
    !document.getElementById("card-lendario-animations")
  ) {
    const style = document.createElement("style");
    style.id = "card-lendario-animations";
    style.innerHTML = cardLendarioStyles;
    document.head.appendChild(style);
  }
  function CardLendario(props: any) {
    return (
      <Card
        {...props}
        className={
          "relative overflow-hidden border-4 border-yellow-600 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-900 shadow-2xl ring-4 ring-yellow-400 " +
          (props.className || "")
        }
      >
        <div className="absolute left-2 top-2 z-20 flex items-center gap-1 rounded bg-gradient-to-r from-yellow-700 to-yellow-400 px-3 py-1 text-xs font-extrabold text-white shadow-lg drop-shadow-lg animate-pulse">
          <svg
            className="h-5 w-5 text-white animate-spin-slow"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
          Lendário
        </div>
        {props.children}
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="p-0">
              <Skeleton className="h-40 w-full" />
            </CardHeader>
            <CardContent className="p-4">
              <Skeleton className="mb-2 h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <p>Erro ao carregar Pokémon: {error.message}</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="rounded-lg bg-yellow-50 p-8 text-center text-yellow-800">
        <p className="text-lg font-medium">Nenhum Pokémon encontrado</p>
        <p className="mt-2">Tente ajustar sua busca ou filtros</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {currentPokemon.map((pokemon) => {
          const CardComponent = isLegendary(pokemon) ? CardLendario : Card;
          return (
            <CardComponent
              key={pokemon.id}
              className={`group overflow-hidden transition-all hover:shadow-lg ${
                selectedPokemon === pokemon.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <CardHeader className="relative p-0">
                <div className="relative h-40 w-full bg-gradient-to-br from-blue-100 to-blue-50">
                  <Image
                    src={
                      pokemon.sprites.other["official-artwork"].front_default ||
                      "/placeholder.svg?height=160&width=160"
                    }
                    alt={pokemon.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="absolute right-2 top-2 flex gap-1">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className={`rounded-full px-2 py-1 text-xs font-medium text-white ${getTypeColor(
                        type.type.name
                      )}`}
                    >
                      {translateType(type.type.name)}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-blue-900">
                  {capitalizeFirstLetter(pokemon.name)}
                </h3>
                <p className="text-sm text-blue-700">
                  #{pokemon.id.toString().padStart(3, "0")}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-blue-50 p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onSelectPokemon(pokemon.id)}
                  className="text-blue-600 hover:bg-blue-100"
                >
                  <Eye className="mr-1 h-4 w-4" />
                  Ver Stats
                </Button>
                <div className="flex gap-1">
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAddToCollection(pokemon)}
                    className="text-green-600 hover:bg-green-100"
                    title="Adicionar à coleção"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openModal(pokemon, "edit")}
                    className="text-blue-600 hover:bg-blue-100"
                    title="editar stats"
                  >
                    <Edit className="h-4 w-4" />
                  </Button> */}
                </div>
              </CardFooter>
            </CardComponent>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-blue-800">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {isModalOpen && modalPokemon && (
        <PokemonModal
          pokemon={modalPokemon}
          mode={modalMode}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getTypeColor(type: string) {
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
}

function translateType(type: string) {
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
}
