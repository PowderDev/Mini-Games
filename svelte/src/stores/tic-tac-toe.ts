import { getTargetWord } from "../lib/Wordle";
import { writable } from "svelte/store";
import { getClearCells } from "../lib/Tic-Tac-Toe";

export const TicTacToeCells = writable(getClearCells());
