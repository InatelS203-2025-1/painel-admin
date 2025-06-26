import { Avatar, AvatarFallback } from "./ui/avatar";
import { Card, CardHeader, CardContent } from "./ui/card";
import { User } from "lucide-react";
import React from "react";

interface TrainerCardProps {
  nickname: string;
  level: number;
  xp: number;
  collectionCount: number;
  victories: number;
  defeats: number;
  winRate: string;
  badges: number;
  trophies: number;
  mostUsed: string;
  playTime: string;
}

export function TrainerCard({
  nickname,
  level,
  xp,
  collectionCount,
  victories,
  defeats,
  winRate,
  badges,
  trophies,
  mostUsed,
  playTime,
}: TrainerCardProps) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg border-blue-300 bg-gradient-to-br from-blue-100 to-blue-50 w-72 min-h-[340px] flex flex-col justify-between">
      <CardHeader className="flex flex-col items-center p-4 pb-0">
        <Avatar className="h-16 w-16 mb-2 border-2 border-blue-400 bg-white">
          <AvatarFallback className="text-3xl">
            <User className="h-10 w-10 text-blue-600" />
          </AvatarFallback>
        </Avatar>
        <div className="font-bold text-lg text-blue-900 mb-1 truncate w-full text-center">
          {nickname}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2 p-4 pt-2">
        <div className="flex gap-4 text-sm text-blue-700">
          <span>
            Nível: <b>{level}</b>
          </span>
          <span>
            XP: <b>{xp}</b>
          </span>
        </div>
        <div className="text-blue-900 text-sm mb-2">
          Pokémons na coleção: <b>{collectionCount}</b>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-blue-800 w-full mt-2">
          <div>Vitórias/Derrotas:</div>
          <div className="text-right">
            {victories} / {defeats}
          </div>
          <div>Taxa de Vitória:</div>
          <div className="text-right">{winRate}</div>
          <div>Insígnias:</div>
          <div className="text-right">{badges}</div>
          <div>Troféus:</div>
          <div className="text-right">{trophies}</div>
          <div>Mais Usado:</div>
          <div className="text-right capitalize">{mostUsed}</div>
          <div>Tempo de Jogo:</div>
          <div className="text-right">{playTime}</div>
        </div>
      </CardContent>
    </Card>
  );
}
