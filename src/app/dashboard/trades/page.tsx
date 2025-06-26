"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { RefreshCcw, ArrowRightLeft, User } from "lucide-react";
import { usePokemon } from "@/hooks/use-pokemon";
import Image from "next/image";
import React, { useMemo, useState } from "react";

// Lista fixa de 50 treinadores (mesma da aba de treinadores)
const fixedTrainers = [
  { nickname: "TrainerAsh1001" },
  { nickname: "PokemonCatcher2345" },
  { nickname: "GymLeaderMisty3456" },
  { nickname: "AceTrainerBrock4567" },
  { nickname: "PokefanDawn5678" },
  { nickname: "CollectorGary6789" },
  { nickname: "RivalPaul7890" },
  { nickname: "RocketJessie8901" },
  { nickname: "MysticJames9012" },
  { nickname: "ValorMay1023" },
  { nickname: "InstinctTracey1123" },
  { nickname: "TrainerSerena1224" },
  { nickname: "PokemonCatcherMax1325" },
  { nickname: "GymLeaderIris1426" },
  { nickname: "AceTrainerCilan1527" },
  { nickname: "PokefanBonnie1628" },
  { nickname: "CollectorClemont1729" },
  { nickname: "RivalGladion1830" },
  { nickname: "RocketJames1931" },
  { nickname: "MysticLillie2032" },
  { nickname: "ValorKiawe2133" },
  { nickname: "InstinctMallow2234" },
  { nickname: "TrainerSophocles2335" },
  { nickname: "PokemonCatcherLana2436" },
  { nickname: "GymLeaderIlima2537" },
  { nickname: "AceTrainerHau2638" },
  { nickname: "PokefanMina2739" },
  { nickname: "CollectorWicke2840" },
  { nickname: "RivalGuzma2941" },
  { nickname: "RocketPlumeria3042" },
  { nickname: "MysticFaba3143" },
  { nickname: "ValorMolayne3244" },
  { nickname: "InstinctAcerola3345" },
  { nickname: "TrainerNanu3446" },
  { nickname: "PokemonCatcherHapu3547" },
  { nickname: "GymLeaderMohn3648" },
  { nickname: "AceTrainerLusamine3749" },
  { nickname: "PokefanGladion3850" },
  { nickname: "CollectorLillie3951" },
  { nickname: "RivalKukui4052" },
  { nickname: "RocketBurnet4153" },
  { nickname: "MysticOak4254" },
  { nickname: "ValorElm4355" },
  { nickname: "InstinctBirch4456" },
  { nickname: "TrainerRowan4557" },
  { nickname: "PokemonCatcherJuniper4658" },
  { nickname: "GymLeaderSycamore4759" },
  { nickname: "AceTrainerMagnolia4860" },
  { nickname: "PokefanSonia4961" },
  { nickname: "CollectorHop5062" },
];

// Lista de nomes de pokémons das 3 primeiras gerações (até id 386)
const pokemonNamesGen1to3 = [
  "bulbasaur",
  "ivysaur",
  "venusaur",
  "charmander",
  "charmeleon",
  "charizard",
  "squirtle",
  "wartortle",
  "blastoise",
  "caterpie",
  "metapod",
  "butterfree",
  "weedle",
  "kakuna",
  "beedrill",
  "pidgey",
  "pidgeotto",
  "pidgeot",
  "rattata",
  "raticate",
  "spearow",
  "fearow",
  "ekans",
  "arbok",
  "pikachu",
  "raichu",
  "sandshrew",
  "sandslash",
  "nidoran-f",
  "nidorina",
  "nidoqueen",
  "nidoran-m",
  "nidorino",
  "nidoking",
  "clefairy",
  "clefable",
  "vulpix",
  "ninetales",
  "jigglypuff",
  "wigglytuff",
  "zubat",
  "golbat",
  "oddish",
  "gloom",
  "vileplume",
  "paras",
  "parasect",
  "venonat",
  "venomoth",
  "diglett",
  "dugtrio",
  "meowth",
  "persian",
  "psyduck",
  "golduck",
  "mankey",
  "primeape",
  "growlithe",
  "arcanine",
  "poliwag",
  "poliwhirl",
  "poliwrath",
  "abra",
  "kadabra",
  "alakazam",
  "machop",
  "machoke",
  "machamp",
  "bellsprout",
  "weepinbell",
  "victreebel",
  "tentacool",
  "tentacruel",
  "geodude",
  "graveler",
  "golem",
  "ponyta",
  "rapidash",
  "slowpoke",
  "slowbro",
  "magnemite",
  "magneton",
  "farfetchd",
  "doduo",
  "dodrio",
  "seel",
  "dewgong",
  "grimer",
  "muk",
  "shellder",
  "cloyster",
  "gastly",
  "haunter",
  "gengar",
  "onix",
  "drowzee",
  "hypno",
  "krabby",
  "kingler",
  "voltorb",
  "electrode",
  "exeggcute",
  "exeggutor",
  "cubone",
  "marowak",
  "hitmonlee",
  "hitmonchan",
  "lickitung",
  "koffing",
  "weezing",
  "rhyhorn",
  "rhydon",
  "chansey",
  "tangela",
  "kangaskhan",
  "horsea",
  "seadra",
  "goldeen",
  "seaking",
  "staryu",
  "starmie",
  "mr-mime",
  "scyther",
  "jynx",
  "electabuzz",
  "magmar",
  "pinsir",
  "tauros",
  "magikarp",
  "gyarados",
  "lapras",
  "ditto",
  "eevee",
  "vaporeon",
  "jolteon",
  "flareon",
  "porygon",
  "omanyte",
  "omastar",
  "kabuto",
  "kabutops",
  "aerodactyl",
  "snorlax",
  "articuno",
  "zapdos",
  "moltres",
  "dratini",
  "dragonair",
  "dragonite",
  "mewtwo",
  "mew",
  // Gen 2
  "chikorita",
  "bayleef",
  "meganium",
  "cyndaquil",
  "quilava",
  "typhlosion",
  "totodile",
  "croconaw",
  "feraligatr",
  "sentret",
  "furret",
  "hoothoot",
  "noctowl",
  "ledyba",
  "ledian",
  "spinarak",
  "ariados",
  "crobat",
  "chinchou",
  "lanturn",
  "pichu",
  "cleffa",
  "igglybuff",
  "togepi",
  "togetic",
  "natu",
  "xatu",
  "mareep",
  "flaaffy",
  "ampharos",
  "bellossom",
  "marill",
  "azumarill",
  "sudowoodo",
  "politoed",
  "hoppip",
  "skiploom",
  "jumpluff",
  "aipom",
  "sunkern",
  "sunflora",
  "yanma",
  "wooper",
  "quagsire",
  "espeon",
  "umbreon",
  "murkrow",
  "slowking",
  "misdreavus",
  "unown",
  "wobbuffet",
  "girafarig",
  "pineco",
  "forretress",
  "dunsparce",
  "gligar",
  "steelix",
  "snubbull",
  "granbull",
  "qwilfish",
  "scizor",
  "shuckle",
  "heracross",
  "sneasel",
  "teddiursa",
  "ursaring",
  "slugma",
  "magcargo",
  "swinub",
  "piloswine",
  "corsola",
  "remoraid",
  "octillery",
  "delibird",
  "mantine",
  "skarmory",
  "houndour",
  "houndoom",
  "kingdra",
  "phanpy",
  "donphan",
  "porygon2",
  "stantler",
  "smeargle",
  "tyrogue",
  "hitmontop",
  "smoochum",
  "elekid",
  "magby",
  "miltank",
  "blissey",
  "raikou",
  "entei",
  "suicune",
  "larvitar",
  "pupitar",
  "tyranitar",
  "lugia",
  "ho-oh",
  "celebi",
  // Gen 3
  "treecko",
  "grovyle",
  "sceptile",
  "torchic",
  "combusken",
  "blaziken",
  "mudkip",
  "marshtomp",
  "swampert",
  "poochyena",
  "mightyena",
  "zigzagoon",
  "linoone",
  "wurmple",
  "silcoon",
  "beautifly",
  "cascoon",
  "dustox",
  "lotad",
  "lombre",
  "ludicolo",
  "seedot",
  "nuzleaf",
  "shiftry",
  "taillow",
  "swellow",
  "wingull",
  "pelipper",
  "ralts",
  "kirlia",
  "gardevoir",
  "surskit",
  "masquerain",
  "shroomish",
  "breloom",
  "slakoth",
  "vigoroth",
  "slaking",
  "nincada",
  "ninjask",
  "shedinja",
  "whismur",
  "loudred",
  "exploud",
  "makuhita",
  "hariyama",
  "azurill",
  "nosepass",
  "skitty",
  "delcatty",
  "sableye",
  "mawile",
  "aron",
  "lairon",
  "aggron",
  "meditite",
  "medicham",
  "electrike",
  "manectric",
  "plusle",
  "minun",
  "volbeat",
  "illumise",
  "roselia",
  "gulpin",
  "swalot",
  "carvanha",
  "sharpedo",
  "wailmer",
  "wailord",
  "numel",
  "camerupt",
  "torkoal",
  "spoink",
  "grumpig",
  "spinda",
  "trapinch",
  "vibrava",
  "flygon",
  "cacnea",
  "cacturne",
  "swablu",
  "altaria",
  "zangoose",
  "seviper",
  "lunatone",
  "solrock",
  "barboach",
  "whiscash",
  "corphish",
  "crawdaunt",
  "baltoy",
  "claydol",
  "lileep",
  "cradily",
  "anorith",
  "armaldo",
  "feebas",
  "milotic",
  "castform",
  "kecleon",
  "shuppet",
  "banette",
  "duskull",
  "dusclops",
  "tropius",
  "chimecho",
  "absol",
  "wynaut",
  "snorunt",
  "glalie",
  "spheal",
  "sealeo",
  "walrein",
  "clamperl",
  "huntail",
  "gorebyss",
  "relicanth",
  "luvdisc",
  "bagon",
  "shelgon",
  "salamence",
  "beldum",
  "metang",
  "metagross",
  "regirock",
  "regice",
  "registeel",
  "latias",
  "latios",
  "kyogre",
  "groudon",
  "rayquaza",
  "jirachi",
  "deoxys",
];

// Categorias de pokémons (exemplos, pode expandir conforme necessário)
const legendary = [
  "articuno",
  "zapdos",
  "moltres",
  "mewtwo",
  "mew",
  "raikou",
  "entei",
  "suicune",
  "lugia",
  "ho-oh",
  "celebi",
  "regirock",
  "regice",
  "registeel",
  "latias",
  "latios",
  "kyogre",
  "groudon",
  "rayquaza",
  "jirachi",
  "deoxys",
];
const pseudoLegendary = ["dragonite", "tyranitar", "salamence", "metagross"];
const finalEvos = [
  "charizard",
  "blastoise",
  "venusaur",
  "feraligatr",
  "typhlosion",
  "meganium",
  "swampert",
  "blaziken",
  "sceptile",
  "gardevoir",
  "aggron",
  "flygon",
  "milotic",
  "walrein",
  "salamence",
  "metagross",
  "garchomp",
  "machamp",
  "alakazam",
  "gengar",
  "gyarados",
  "lapras",
  "snorlax",
  "kingdra",
  "scizor",
  "heracross",
  "houndoom",
  "umbreon",
  "espeon",
  "ampharos",
  "steelix",
  "donphan",
  "porygon2",
  "blissey",
  "tyranitar",
  "dragonite",
];
const basics = [
  "bulbasaur",
  "charmander",
  "squirtle",
  "chikorita",
  "cyndaquil",
  "totodile",
  "treecko",
  "torchic",
  "mudkip",
  "pidgey",
  "rattata",
  "zigzagoon",
  "poochyena",
  "wurmple",
  "caterpie",
  "weedle",
  "magikarp",
  "feebas",
  "ralts",
  "shroomish",
  "makuhita",
  "whismur",
  "nincada",
  "lotad",
  "seedot",
  "taillow",
  "wingull",
  "surskit",
  "skitty",
  "gulpin",
  "numel",
  "spoink",
  "spinda",
  "swablu",
  "barboach",
  "corphish",
  "carvanha",
  "baltoy",
  "lileep",
  "anorith",
  "kecleon",
  "shuppet",
  "duskull",
  "snorunt",
  "spheal",
  "clamperl",
  "bagon",
  "beldum",
];
const midEvos = [
  "ivysaur",
  "charmeleon",
  "wartortle",
  "bayleef",
  "quilava",
  "croconaw",
  "grovyle",
  "combusken",
  "marshtomp",
  "metapod",
  "kakuna",
  "pidgeotto",
  "nidorina",
  "nidorino",
  "golbat",
  "gloom",
  "weepinbell",
  "kadabra",
  "machoke",
  "haunter",
  "graveler",
  "poliwhirl",
  "gloom",
  "electabuzz",
  "magmar",
  "dragonair",
  "pupitar",
  "shelgon",
  "metang",
];

function getRandomLevel() {
  return Math.floor(Math.random() * 51);
}
function getRandomPokemonName() {
  return pokemonNamesGen1to3[
    Math.floor(Math.random() * pokemonNamesGen1to3.length)
  ];
}
function getRandomTrainerIdx() {
  return Math.floor(Math.random() * fixedTrainers.length);
}

function getRandomFrom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Trocas em aberto 100% fixas
const openTrades = [
  { trainer: "TrainerAsh1001", pokemon: "bulbasaur", level: 12 },
  { trainer: "PokemonCatcher2345", pokemon: "ivysaur", level: 18 },
  { trainer: "GymLeaderMisty3456", pokemon: "squirtle", level: 20 },
  { trainer: "AceTrainerBrock4567", pokemon: "machoke", level: 25 },
  { trainer: "PokefanDawn5678", pokemon: "eevee", level: 10 },
  { trainer: "CollectorGary6789", pokemon: "kadabra", level: 22 },
  { trainer: "RivalPaul7890", pokemon: "pidgeotto", level: 15 },
  { trainer: "RocketJessie8901", pokemon: "gloom", level: 17 },
  { trainer: "MysticJames9012", pokemon: "seadra", level: 28 },
  { trainer: "ValorMay1023", pokemon: "vigoroth", level: 30 },
];

// Trocas realizadas 100% fixas e justas
const completedTrades = [
  {
    trainerA: "TrainerAsh1001",
    pokemonA: "bulbasaur",
    levelA: 14,
    trainerB: "PokemonCatcher2345",
    pokemonB: "charmander",
    levelB: 13,
  },
  {
    trainerA: "GymLeaderMisty3456",
    pokemonA: "squirtle",
    levelA: 16,
    trainerB: "AceTrainerBrock4567",
    pokemonB: "ralts",
    levelB: 15,
  },
  {
    trainerA: "PokefanDawn5678",
    pokemonA: "ivysaur",
    levelA: 22,
    trainerB: "CollectorGary6789",
    pokemonB: "charmeleon",
    levelB: 21,
  },
  {
    trainerA: "RivalPaul7890",
    pokemonA: "wartortle",
    levelA: 20,
    trainerB: "RocketJessie8901",
    pokemonB: "kirlia",
    levelB: 19,
  },
  {
    trainerA: "MysticJames9012",
    pokemonA: "venusaur",
    levelA: 36,
    trainerB: "ValorMay1023",
    pokemonB: "blastoise",
    levelB: 35,
  },
  {
    trainerA: "InstinctTracey1123",
    pokemonA: "gardevoir",
    levelA: 34,
    trainerB: "TrainerSerena1224",
    pokemonB: "alakazam",
    levelB: 33,
  },
  {
    trainerA: "PokemonCatcherMax1325",
    pokemonA: "dragonite",
    levelA: 50,
    trainerB: "GymLeaderIris1426",
    pokemonB: "salamence",
    levelB: 49,
  },
  {
    trainerA: "AceTrainerCilan1527",
    pokemonA: "articuno",
    levelA: 45,
    trainerB: "PokefanBonnie1628",
    pokemonB: "zapdos",
    levelB: 44,
  },
  {
    trainerA: "CollectorClemont1729",
    pokemonA: "snorlax",
    levelA: 38,
    trainerB: "RivalGladion1830",
    pokemonB: "lapras",
    levelB: 37,
  },
  {
    trainerA: "RocketJames1931",
    pokemonA: "machamp",
    levelA: 32,
    trainerB: "MysticLillie2032",
    pokemonB: "gengar",
    levelB: 31,
  },
  {
    trainerA: "ValorKiawe2133",
    pokemonA: "typhlosion",
    levelA: 40,
    trainerB: "InstinctMallow2234",
    pokemonB: "feraligatr",
    levelB: 39,
  },
  {
    trainerA: "TrainerSophocles2335",
    pokemonA: "swampert",
    levelA: 42,
    trainerB: "PokemonCatcherLana2436",
    pokemonB: "blaziken",
    levelB: 41,
  },
  {
    trainerA: "GymLeaderIlima2537",
    pokemonA: "sceptile",
    levelA: 43,
    trainerB: "AceTrainerHau2638",
    pokemonB: "aggron",
    levelB: 42,
  },
  {
    trainerA: "PokefanMina2739",
    pokemonA: "flygon",
    levelA: 36,
    trainerB: "CollectorWicke2840",
    pokemonB: "milotic",
    levelB: 35,
  },
  {
    trainerA: "RivalGuzma2941",
    pokemonA: "metagross",
    levelA: 48,
    trainerB: "RocketPlumeria3042",
    pokemonB: "tyranitar",
    levelB: 47,
  },
  {
    trainerA: "MysticFaba3143",
    pokemonA: "regice",
    levelA: 46,
    trainerB: "ValorMolayne3244",
    pokemonB: "registeel",
    levelB: 45,
  },
  {
    trainerA: "InstinctAcerola3345",
    pokemonA: "latias",
    levelA: 50,
    trainerB: "TrainerNanu3446",
    pokemonB: "latios",
    levelB: 50,
  },
  {
    trainerA: "PokemonCatcherHapu3547",
    pokemonA: "entei",
    levelA: 50,
    trainerB: "GymLeaderMohn3648",
    pokemonB: "suicune",
    levelB: 50,
  },
  {
    trainerA: "AceTrainerLusamine3749",
    pokemonA: "jirachi",
    levelA: 50,
    trainerB: "PokefanGladion3850",
    pokemonB: "articuno",
    levelB: 50,
  },
  {
    trainerA: "CollectorLillie3951",
    pokemonA: "lugia",
    levelA: 50,
    trainerB: "RivalKukui4052",
    pokemonB: "ho-oh",
    levelB: 50,
  },
];

function TradeCard({
  trainer,
  pokemon,
  level,
  pokemonData,
  highlight,
}: {
  trainer: string;
  pokemon: string;
  level: number;
  pokemonData?: any;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center rounded-lg shadow-md p-3 w-72 m-2 border ${
        highlight
          ? "bg-yellow-50 border-yellow-300"
          : "bg-white border-blue-100"
      }`}
    >
      <Avatar className="h-10 w-10 mb-1 bg-blue-50">
        <AvatarFallback className="text-base">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
      <div className="text-xs font-semibold text-blue-800 mb-1 text-center truncate w-full">
        {trainer}
      </div>
      {pokemonData ? (
        <div className="flex flex-col items-center">
          <Image
            src={
              pokemonData.sprites.other["official-artwork"].front_default ||
              "/placeholder.svg?height=64&width=64"
            }
            alt={pokemonData.name}
            width={64}
            height={64}
            className="rounded-full bg-blue-100"
          />
          <span className="text-xs font-semibold text-blue-700 mt-1 capitalize">
            {pokemonData.name}{" "}
            <span className="ml-1 text-[10px] text-yellow-700 font-bold">
              Lv. {level}
            </span>
          </span>
        </div>
      ) : (
        <div className="h-16 w-16 flex items-center justify-center bg-blue-50 rounded-full animate-pulse">
          <RefreshCcw className="h-6 w-6 text-blue-300" />
        </div>
      )}
    </div>
  );
}

export default function TradesPage() {
  const { pokemon: allPokemon } = usePokemon();
  const [localCompletedTrades, setLocalCompletedTrades] =
    useState(completedTrades);

  function getPokemonData(name: string) {
    return allPokemon.find((p) => p.name.toLowerCase() === name.toLowerCase());
  }

  function handleUndoTrade(idx: number) {
    setLocalCompletedTrades((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <div className="space-y-10 p-4">
      <h1 className="text-2xl font-bold text-blue-800 mb-2">Trocas</h1>
      <section>
        <h2 className="text-lg font-semibold text-yellow-700 mb-4">
          Trocas em aberto
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {openTrades.map((trade, idx) => (
            <TradeCard
              key={idx}
              trainer={trade.trainer}
              pokemon={trade.pokemon}
              level={trade.level}
              pokemonData={getPokemonData(trade.pokemon)}
              highlight
            />
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-lg font-semibold text-green-700 mb-4">
          Trocas realizadas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {localCompletedTrades.map((trade, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center justify-center gap-2 bg-green-50 border rounded-lg p-2 relative"
            >
              <TradeCard
                trainer={trade.trainerA}
                pokemon={trade.pokemonA}
                level={trade.levelA}
                pokemonData={getPokemonData(trade.pokemonA)}
              />
              <span className="mx-2 text-blue-600 flex items-center">
                <ArrowRightLeft className="h-6 w-6" />
              </span>
              <TradeCard
                trainer={trade.trainerB}
                pokemon={trade.pokemonB}
                level={trade.levelB}
                pokemonData={getPokemonData(trade.pokemonB)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export { openTrades, completedTrades };
