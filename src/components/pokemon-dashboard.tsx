"use client"

import { useState } from "react"
import { PokemonList } from "@/components/pokemon-list"
import { PokemonSearch } from "@/components/pokemon-search"
import { PokemonStats } from "@/components/pokemon-stats"
import { PokemonTypeFilter } from "@/components/pokemon-type-filter"
import { DashboardCards } from "@/components/dashboard-cards"
import { usePokemon } from "@/hooks/use-pokemon"

export function PokemonDashboard() {
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const { pokemon, isLoading, error } = usePokemon()

  const filteredPokemon = pokemon.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType ? p.types.some((type) => type.type.name === selectedType) : true
    return matchesSearch && matchesType
  })

  return (
    <div className="space-y-6">
      {/* Dashboard Cards */}
      <DashboardCards pokemon={pokemon} isLoading={isLoading} />

      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PokemonSearch onSearch={setSearchQuery} />
        <PokemonTypeFilter onSelectType={setSelectedType} selectedType={selectedType} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className={`${selectedPokemon ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <PokemonList
            pokemon={filteredPokemon}
            isLoading={isLoading}
            error={error}
            onSelectPokemon={setSelectedPokemon}
            selectedPokemon={selectedPokemon}
          />
        </div>
        {selectedPokemon && (
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <PokemonStats pokemonId={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
