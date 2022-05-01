import { createTile } from ".";

export class Tile {
  public x: number;
  public y: number;

  constructor(private _value: number, public power: number) {}

  set value(v: number) {
    this._value = v;
    this.power = Math.log2(v);
  }

  get value() {
    return this._value;
  }

  waitForTransition() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 100);
    });
  }
}

export class Cell {
  private _tile: Tile;
  private _mergeTile: Tile;
  constructor(private _x: number, private _y: number) {}

  set tile(v: Tile) {
    this._tile = v;
    if (v == null) return;
    this._tile.x = this.x;
    this._tile.y = this.y;
  }

  get tile() {
    return this._tile;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  get mergeTile() {
    return this._mergeTile;
  }

  set mergeTile(v: Tile) {
    this._mergeTile = v;
    if (v == null) return;
    this._mergeTile.x = this.x;
    this._mergeTile.y = this.y;
  }

  canAccept(tile: Tile) {
    return this.tile == null || (this.mergeTile == null && this.tile.value === tile.value);
  }

  mergeTiles() {
    if (this.tile == null || this.mergeTile == null) return;
    this.tile.value = this.tile.value + this.mergeTile.value;
    this.mergeTile = null;
  }
}

export class GameGrid {
  public cells: Cell[];

  constructor() {
    this.cells = Array.from({ length: 16 }).map((_, i) => new Cell(i % 4, Math.floor(i / 4)));
    this.cells.at(Math.floor(Math.random() * 16)).tile = createTile();
    this.cells.at(Math.floor(Math.random() * 16)).tile = createTile();
  }

  get cellsByColumn(): Cell[][] {
    return this.cells.reduce((acc, cell) => {
      acc[cell.x] = acc[cell.x] || [];
      acc[cell.x][cell.y] = cell;
      return acc;
    }, []);
  }

  get cellsByRow(): Cell[][] {
    return this.cells.reduce((acc, cell) => {
      acc[cell.y] = acc[cell.y] || [];
      acc[cell.y][cell.x] = cell;
      return acc;
    }, []);
  }

  get emptyCells() {
    return this.cells.filter((c) => c.tile == null);
  }

  newRandomTile() {
    const emptyCells = this.emptyCells;
    if (emptyCells.length >= 1) {
      const cell = emptyCells.at(Math.floor(Math.random() * emptyCells.length));
      cell.tile = createTile();
      return cell.tile;
    }
  }
}
