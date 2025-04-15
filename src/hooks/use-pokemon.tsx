"use client"

import { useEffect, useState } from "react"
import type { Pokemon } from "@/types/pokemon"

export function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setIsLoading(true)
        // Buscar os primeiros 150 Pokémon
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        if (!response.ok) {
          throw new Error("Falha ao buscar lista de Pokémon")
        }

        const data = await response.json()

        // Buscar detalhes para cada Pokémon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon: { url: string }) => {
            const detailResponse = await fetch(pokemon.url)
            if (!detailResponse.ok) {
              throw new Error(`Falha ao buscar detalhes para ${pokemon.url}`)
            }
            return detailResponse.json()
          }),
        )

        setPokemon(pokemonDetails)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Ocorreu um erro desconhecido"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  return { pokemon, isLoading, error }
}
