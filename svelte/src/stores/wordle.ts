import { getTargetWord } from "../lib/Wordle";
import { writable } from "svelte/store";

export const WordleStore = writable({
  targetWord: getTargetWord(),
  step: 1,
});
