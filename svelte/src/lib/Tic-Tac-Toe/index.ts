import type { Cell } from "../../types/Tic-Tac-Toe";

export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const getClearCells = (): Cell[] => {
  return Array.from({ length: 9 }).map(() => ({ value: "", id: Math.random().toFixed(4) }));
};
