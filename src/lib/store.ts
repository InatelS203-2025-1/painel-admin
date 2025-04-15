import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Pokemon } from "@/types/pokemon"

interface UserCard {
  id: string
  pokemonId: string
  quantity: number
  dateAdded: string
  favorite: boolean
}

interface UserCardStore {
  cards: UserCard[]
  collection: Record<string, Pokemon>
  addCard: (pokemon: Pokemon) => void
  removeCard: (cardId: string) => void
  incrementQuantity: (cardId: string) => void
  decrementQuantity: (cardId: string) => void
  toggleFavorite: (cardId: string) => void
  getCardCount: () => number
  getTotalUniqueCards: () => number
  getCardsByType: (type: string) => { count: number; cards: UserCard[] }
  clearCollection: () => void
}

export const useUserCardStore = create<UserCardStore>()(
  persist(
    (set, get) => ({
      cards: [],
      collection: {},

      addCard: (pokemon) => {
        const existingCard = get().cards.find((card) => card.pokemonId === pokemon.id)

        if (existingCard) {
          set((state) => ({
            cards: state.cards.map((card) =>
              card.id === existingCard.id ? { ...card, quantity: card.quantity + 1 } : card,
            ),
          }))
        } else {
          const newCard: UserCard = {
            id: `card_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            pokemonId: pokemon.id,
            quantity: 1,
            dateAdded: new Date().toISOString(),
            favorite: false,
          }

          set((state) => ({
            cards: [...state.cards, newCard],
            collection: { ...state.collection, [pokemon.id]: pokemon },
          }))
        }
      },

      removeCard: (cardId) => {
        const card = get().cards.find((c) => c.id === cardId)

        set((state) => ({
          cards: state.cards.filter((card) => card.id !== cardId),
        }))

        // Remover o Pokémon da coleção se não houver mais cartas dele
        if (card) {
          const hasOtherCards = get().cards.some((c) => c.id !== cardId && c.pokemonId === card.pokemonId)

          if (!hasOtherCards) {
            set((state) => {
              const newCollection = { ...state.collection }
              delete newCollection[card.pokemonId]
              return { collection: newCollection }
            })
          }
        }
      },

      incrementQuantity: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) => (card.id === cardId ? { ...card, quantity: card.quantity + 1 } : card)),
        }))
      },

      decrementQuantity: (cardId) => {
        const card = get().cards.find((c) => c.id === cardId)

        if (card && card.quantity > 1) {
          set((state) => ({
            cards: state.cards.map((c) => (c.id === cardId ? { ...c, quantity: c.quantity - 1 } : c)),
          }))
        } else if (card) {
          get().removeCard(cardId)
        }
      },

      toggleFavorite: (cardId) => {
        set((state) => ({
          cards: state.cards.map((card) => (card.id === cardId ? { ...card, favorite: !card.favorite } : card)),
        }))
      },

      getCardCount: () => {
        return get().cards.reduce((total, card) => total + card.quantity, 0)
      },

      getTotalUniqueCards: () => {
        return Object.keys(get().collection).length
      },

      getCardsByType: (type) => {
        const cards = get().cards.filter((card) => {
          const pokemon = get().collection[card.pokemonId]
          return pokemon && pokemon.types.some((t) => t.type.name === type)
        })

        const count = cards.reduce((total, card) => total + card.quantity, 0)

        return { count, cards }
      },

      clearCollection: () => {
        set({ cards: [], collection: {} })
      },
    }),
    {
      name: "pokemon-user-cards",
    },
  ),
)
