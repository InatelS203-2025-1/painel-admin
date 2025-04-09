"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import type { Pokemon } from "@/types/pokemon"

interface PokemonStatsProps {
  pokemonId: string
  onClose: () => void
}

export function PokemonStats({ pokemonId, onClose }: PokemonStatsProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        if (!response.ok) {
          throw new Error("Falha ao buscar Pokémon")
        }
        const data = await response.json()
        setPokemon(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Ocorreu um erro desconhecido"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [pokemonId])

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-blue-800">Estatísticas</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-4">
            <Skeleton className="mb-4 h-24 w-24 rounded-full" />
            <Skeleton className="mb-2 h-4 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="mt-4 space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-1">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-2 w-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !pokemon) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-medium text-blue-800">Erro</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-red-600">Falha ao carregar estatísticas do Pokémon</p>
        </CardContent>
      </Card>
    )
  }

  const getStatColor = (value: number) => {
    if (value < 50) return "bg-red-500"
    if (value < 80) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getStatPercentage = (value: number) => {
    return Math.min(100, (value / 255) * 100)
  }

  const translateStat = (stat: string) => {
    const statTranslations: Record<string, string> = {
      hp: "HP",
      attack: "Ataque",
      defense: "Defesa",
      "special-attack": "Ataque Esp.",
      "special-defense": "Defesa Esp.",
      speed: "Velocidade",
    }
    return statTranslations[stat] || stat
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-blue-600 text-white">
        <CardTitle className="text-lg font-medium">Estatísticas</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-blue-700">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-100">
            <Image
              src={pokemon.sprites.front_default || "/placeholder.svg?height=96&width=96"}
              alt={pokemon.name}
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg font-bold capitalize text-blue-900">{pokemon.name}</h3>
          <p className="text-sm text-blue-700">#{pokemon.id.toString().padStart(3, "0")}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md bg-blue-50 p-2 text-center">
            <p className="text-xs text-blue-700">Altura</p>
            <p className="font-medium text-blue-900">{(pokemon.height / 10).toFixed(1)}m</p>
          </div>
          <div className="rounded-md bg-blue-50 p-2 text-center">
            <p className="text-xs text-blue-700">Peso</p>
            <p className="font-medium text-blue-900">{(pokemon.weight / 10).toFixed(1)}kg</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {pokemon.stats.map((stat) => (
            <div key={stat.stat.name} className="space-y-1">
              <div className="flex justify-between">
                <p className="text-xs font-medium capitalize text-blue-800">{translateStat(stat.stat.name)}</p>
                <p className="text-xs font-medium text-blue-900">{stat.base_stat}</p>
              </div>
              <Progress
                value={getStatPercentage(stat.base_stat)}
                className="h-2"
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="mb-2 text-xs font-medium text-blue-800">Habilidades</p>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="rounded-full bg-blue-100 px-2 py-1 text-xs capitalize text-blue-800"
              >
                {ability.ability.name.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
