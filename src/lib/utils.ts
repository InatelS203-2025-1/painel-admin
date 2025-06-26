import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomTrainerNickname() {
  const prefixes = [
    "Trainer",
    "PokemonCatcher",
    "GymLeader",
    "AceTrainer",
    "Pokefan",
    "Collector",
    "Rival",
    "Rocket",
    "Mystic",
    "Valor",
    "Instinct",
  ];
  const pokemonNames = [
    "Pikachu",
    "Charizard",
    "Bulbasaur",
    "Squirtle",
    "Eevee",
    "Gengar",
    "Snorlax",
    "Lucario",
    "Dragonite",
    "Mewtwo",
    "Jigglypuff",
  ];
  const usePokemonName = Math.random() < 0.5;
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const name = usePokemonName
    ? pokemonNames[Math.floor(Math.random() * pokemonNames.length)]
    : "";
  const number = Math.floor(Math.random() * 9000) + 1000;
  return `${prefix}${name}${number}`;
}
