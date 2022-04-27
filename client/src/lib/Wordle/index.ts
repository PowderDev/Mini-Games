import { Tile, TileStates } from "../../types/Wordle";
import targetWords from "../../assets/Wordle/targetWords.json";

export const getClearTiles = (): Tile[] => {
  return Array.from({ length: 30 }).map((v: number) => ({
    id: Math.random(),
    value: "",
    state: TileStates.NotUsed,
  }));
};

export const getTargetWord = () => targetWords.at(Math.round(Math.random() * 2000))!;
