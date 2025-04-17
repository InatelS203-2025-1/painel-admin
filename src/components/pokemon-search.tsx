"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface PokemonSearchProps {
  onSearch: (query: string) => void
}

export function PokemonSearch({ onSearch }: PokemonSearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setQuery(newValue)
    onSearch(newValue)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
        <Input
          type="text"
          placeholder="Buscar Pokémon..."
          value={query}
          onChange={handleChange}
          className="pl-8 border-blue-200 focus-visible:ring-blue-500"
        />
      </div>
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
        Buscar
      </Button>
    </form>
  )
}
