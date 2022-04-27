export enum TileStates {
  NotUsed = "notUsed",
  Active = "active",
  Correct = "correct",
  Wrong = "wrong",
  WrongLocation = "wrong-location",
}

export interface WordleTile {
  id: number;
  value: string;
  state: TileStates;
}
