export interface Cell {
  x: number;
  y: number;
  tile: Tile;
}

export interface Tile {
  x: number;
  y: number;
  value: number;
  power: number;
}
