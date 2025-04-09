"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, HeartOff, Minus, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserCardStore } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { PokemonStats } from "@/components/pokemon-stats"

export function UserCollection() {
  const { cards, collection, removeCard, incrementQuantity, decrementQuantity, toggleFavorite } = useUserCardStore()
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const { toast } = useToast()

  const handleRemoveCard = (cardId: string, pokemonName: string) => {
    removeCard(cardId)
    toast({
      title: "Carta removida",
      description: `${pokemonName} foi removido da sua coleção.`,
      duration: 3000,
    })
  }

  const handleToggleFavorite = (cardId: string, isFavorite: boolean) => {
    toggleFavorite(cardId)
    toast({
      title: isFavorite ? "Removido dos favoritos" : "Adicionado aos favoritos",
      duration: 2000,
    })
  }

  // Agrupar cartas por tipo
  const cardsByType: Record<string, { cardId: string; pokemon: any; quantity: number; favorite: boolean }[]> = {}

  cards.forEach((card) => {
    const pokemon = collection[card.pokemonId]
    if (pokemon) {
      pokemon.types.forEach((type) => {
        const typeName = type.type.name
        if (!cardsByType[typeName]) {
          cardsByType[typeName] = []
        }
        cardsByType[typeName].push({
          cardId: card.id,
          pokemon,
          quantity: card.quantity,
          favorite: card.favorite,
        })
      })
    }
  })

  // Ordenar cartas favoritas
  const favoriteCards = cards
    .filter((card) => card.favorite)
    .map((card) => ({
      cardId: card.id,
      pokemon: collection[card.pokemonId],
      quantity: card.quantity,
      favorite: card.favorite,
    }))
    .filter((item) => item.pokemon) // Garantir que o Pokémon existe

  if (cards.length === 0) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
        <h2 className="text-lg font-medium text-blue-800">Sua coleção está vazia</h2>
        <p className="mt-2 text-blue-600">Adicione Pokémon à sua coleção a partir do Dashboard.</p>
      </div>
    )
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
    }

    return typeTranslations[type] || type
  }

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
    }

    return typeColors[type] || "bg-gray-500"
  }

  const renderPokemonCard = (
    cardId: string,
    pokemon: any,
    quantity: number,
    favorite: boolean,
    showTypeLabel = false,
    typeName?: string,
  ) => (
    <Card key={cardId} className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="relative p-0">
        <div className="relative h-40 w-full bg-gradient-to-br from-blue-100 to-blue-50">
          <Image
            src={pokemon.sprites.other["official-artwork"].front_default || "/placeholder.svg?height=160&width=160"}
            alt={pokemon.name}
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="absolute right-2 top-2 flex gap-1">
          {pokemon.types.map((type: any) => (
            <span
              key={type.type.name}
              className={`rounded-full px-2 py-1 text-xs font-medium text-white ${getTypeColor(type.type.name)}`}
            >
              {translateType(type.type.name)}
            </span>
          ))}
        </div>
        {showTypeLabel && typeName && (
          <div className="absolute left-2 top-2">
            <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${getTypeColor(typeName)}`}>
              {translateType(typeName)}
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold capitalize text-blue-900">{pokemon.name}</h3>
            <p className="text-sm text-blue-700">#{pokemon.id.toString().padStart(3, "0")}</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full p-0 text-blue-700 hover:bg-blue-200"
              onClick={() => decrementQuantity(cardId)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="text-sm font-medium text-blue-800">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-full p-0 text-blue-700 hover:bg-blue-200"
              onClick={() => incrementQuantity(cardId)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-blue-50 p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedPokemon(pokemon.id)}
          className="text-blue-600 hover:bg-blue-100"
        >
          Ver Stats
        </Button>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleToggleFavorite(cardId, favorite)}
            className={favorite ? "text-red-500 hover:bg-red-100" : "text-gray-400 hover:bg-blue-100"}
          >
            {favorite ? <Heart className="h-4 w-4 fill-current" /> : <HeartOff className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleRemoveCard(cardId, pokemon.name)}
            className="text-red-600 hover:bg-red-100"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          <TabsTrigger value="by-type">Por Tipo</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((card) => {
              const pokemon = collection[card.pokemonId]
              if (!pokemon) return null
              return renderPokemonCard(card.id, pokemon, card.quantity, card.favorite)
            })}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          {favoriteCards.length === 0 ? (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
              <h2 className="text-lg font-medium text-blue-800">Nenhum Pokémon favorito</h2>
              <p className="mt-2 text-blue-600">Marque Pokémon como favoritos para vê-los aqui.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {favoriteCards.map((item) => renderPokemonCard(item.cardId, item.pokemon, item.quantity, item.favorite))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="by-type" className="space-y-8">
          {Object.keys(cardsByType).length === 0 ? (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-8 text-center">
              <h2 className="text-lg font-medium text-blue-800">Nenhum Pokémon na coleção</h2>
              <p className="mt-2 text-blue-600">Adicione Pokémon à sua coleção para vê-los aqui.</p>
            </div>
          ) : (
            Object.entries(cardsByType)
              .sort(([typeA], [typeB]) => typeA.localeCompare(typeB))
              .map(([typeName, typeCards]) => (
                <div key={typeName} className="space-y-4">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-blue-800">
                    <span className={`inline-block h-4 w-4 rounded-full ${getTypeColor(typeName)}`}></span>
                    <span>{translateType(typeName)}</span>
                    <span className="text-sm font-normal text-blue-600">
                      ({typeCards.length} {typeCards.length === 1 ? "Pokémon" : "Pokémons"})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {typeCards.map((item) =>
                      renderPokemonCard(item.cardId, item.pokemon, item.quantity, item.favorite, false),
                    )}
                  </div>
                </div>
              ))
          )}
        </TabsContent>
      </Tabs>

      {selectedPokemon && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          <PokemonStats pokemonId={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
        </div>
      )}
    </div>
  )
}
