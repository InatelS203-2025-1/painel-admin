"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Pokemon } from "@/types/pokemon"

interface PokemonModalProps {
  pokemon: Pokemon
  mode: "view" | "edit" | "delete"
  onClose: () => void
}

export function PokemonModal({ pokemon, mode, onClose }: PokemonModalProps) {
  const [formData, setFormData] = useState({
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Em uma aplicação real, você enviaria esses dados para o backend
    onClose()
  }

  const handleDelete = () => {
    // Em uma aplicação real, você enviaria uma solicitação de exclusão para o backend
    onClose()
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

  return (
    <Dialog open onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" && `Ver ${pokemon.name}`}
            {mode === "edit" && `Editar ${pokemon.name}`}
            {mode === "delete" && `Excluir ${pokemon.name}`}
          </DialogTitle>
          {mode === "delete" && (
            <DialogDescription className="text-red-500">
              Tem certeza que deseja excluir este Pokémon? Esta ação não pode ser desfeita.
            </DialogDescription>
          )}
        </DialogHeader>

        {mode === "delete" ? (
          <div className="flex items-center justify-center py-4">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="relative h-24 w-24 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src={pokemon.sprites.front_default || "/placeholder.svg?height=96&width=96"}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="mt-2 text-lg font-bold capitalize text-blue-900">{pokemon.name}</h3>
              <p className="text-sm text-blue-700">#{pokemon.id.toString().padStart(3, "0")}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src={pokemon.sprites.front_default || "/placeholder.svg?height=96&width=96"}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                />
              </div>
              {mode === "view" ? (
                <>
                  <h3 className="text-lg font-bold capitalize text-blue-900">{pokemon.name}</h3>
                  <p className="text-sm text-blue-700">#{pokemon.id.toString().padStart(3, "0")}</p>
                </>
              ) : (
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={mode === "view"}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Altura (dm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        value={formData.height}
                        onChange={handleChange}
                        disabled={mode === "view"}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (hg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        value={formData.weight}
                        onChange={handleChange}
                        disabled={mode === "view"}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {mode === "view" && (
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium text-blue-800">Tipos</h4>
                  <div className="flex flex-wrap gap-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className="rounded-full bg-blue-100 px-2 py-1 text-xs capitalize text-blue-800"
                      >
                        {translateType(type.type.name)}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-medium text-blue-800">Habilidades</h4>
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
                <div>
                  <h4 className="mb-2 text-sm font-medium text-blue-800">Estatísticas Base</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name} className="flex justify-between">
                        <span className="text-xs capitalize text-blue-700">{translateStat(stat.stat.name)}:</span>
                        <span className="text-xs font-medium text-blue-900">{stat.base_stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        )}

        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          {mode === "edit" && (
            <Button type="submit" onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              Salvar Alterações
            </Button>
          )}
          {mode === "delete" && (
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
