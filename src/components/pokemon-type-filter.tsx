"use client"

import { Check, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PokemonTypeFilterProps {
  onSelectType: (type: string | null) => void
  selectedType: string | null
}

export function PokemonTypeFilter({ onSelectType, selectedType }: PokemonTypeFilterProps) {
  const pokemonTypes = [
    { name: "normal", translation: "Normal" },
    { name: "fire", translation: "Fogo" },
    { name: "water", translation: "Água" },
    { name: "electric", translation: "Elétrico" },
    { name: "grass", translation: "Planta" },
    { name: "ice", translation: "Gelo" },
    { name: "fighting", translation: "Lutador" },
    { name: "poison", translation: "Venenoso" },
    { name: "ground", translation: "Terra" },
    { name: "flying", translation: "Voador" },
    { name: "psychic", translation: "Psíquico" },
    { name: "bug", translation: "Inseto" },
    { name: "rock", translation: "Pedra" },
    { name: "ghost", translation: "Fantasma" },
    { name: "dragon", translation: "Dragão" },
    { name: "dark", translation: "Sombrio" },
    { name: "steel", translation: "Metálico" },
    { name: "fairy", translation: "Fada" },
  ]

  const getSelectedTypeTranslation = () => {
    if (!selectedType) return null
    const type = pokemonTypes.find((t) => t.name === selectedType)
    return type ? type.translation : selectedType
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="border-blue-200">
            {selectedType ? (
              <span className="capitalize">{getSelectedTypeTranslation()}</span>
            ) : (
              <span>Filtrar por Tipo</span>
            )}
            <Filter className="ml-2 h-4 w-4 text-blue-500" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={() => onSelectType(null)}>
              <span>Todos os Tipos</span>
              {!selectedType && <Check className="ml-auto h-4 w-4 text-blue-500" />}
            </DropdownMenuItem>
            {pokemonTypes.map((type) => (
              <DropdownMenuItem className="cursor-pointer" key={type.name} onClick={() => onSelectType(type.name)}>
                <span>{type.translation}</span>
                {selectedType === type.name && <Check className="ml-auto h-4 w-4 text-blue-500" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedType && (
        <Button variant="ghost" size="sm" onClick={() => onSelectType(null)} className="text-blue-600">
          Limpar
        </Button>
      )}
    </div>
  )
}
