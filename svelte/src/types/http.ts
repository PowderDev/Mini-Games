export interface AuthResponse {
  accessToken: string;
}

export enum GAMES {
  GAME2048 = "GAME2048",
  TIC_TAC_TOE = "TIC_TAC_TOE",
  WORDLE = "WORDLE",
}

export interface GameRecord {
  id: number;
  userId: number;
  wins: number;
  losses: number;
  topScore: number;
  matchCount: number;
}

export interface User {
  id: number;
  nickname: number;
  email: number;
  photoURL: number;
}
