import { Tile, Cell, GameGrid } from "./Classes";

export const randomEmptyCell = (emptyCells: Cell[]) => {
  emptyCells.at(Math.floor(Math.random() * emptyCells.length));
};

export const createTile = () => {
  const value = Math.random() > 0.5 ? 2 : 4;
  const power = Math.log2(value);
  return new Tile(value, power);
};

export const slideTiles = (cells: Cell[][]) => {
  return Promise.all(
    cells.flatMap((group) => {
      const promises = [];
      for (let i = 1; i < group.length; i++) {
        const cell = group[i];
        if (cell.tile == null) continue;
        let lastValidCell;

        for (let j = i - 1; j >= 0; j--) {
          const moveToCell = group[j];
          if (!moveToCell.canAccept(cell.tile)) break;
          lastValidCell = moveToCell;
        }

        if (lastValidCell != null) {
          promises.push(cell.tile.waitForTransition());
          if (lastValidCell.tile != null) {
            lastValidCell.mergeTile = cell.tile;
          } else {
            lastValidCell.tile = cell.tile;
          }
          cell.tile = null;
        }
      }
      return promises;
    })
  );
};

export const canMove = (cells: Cell[][]) => {
  return cells.some((group) => {
    return group.some((cell, index) => {
      if (index === 0) return false;
      if (cell.tile == null) return false;
      const moveToCell = group[index - 1];
      return moveToCell.canAccept(cell.tile);
    });
  });
};

export const canMoveUp = (gameGrid: GameGrid) => {
  return canMove(gameGrid.cellsByColumn);
};

export const canMoveDown = (gameGrid: GameGrid) => {
  return canMove(gameGrid.cellsByColumn.map((c) => [...c].reverse()));
};

export const canMoveLeft = (gameGrid: GameGrid) => {
  return canMove(gameGrid.cellsByRow);
};

export const canMoveRight = (gameGrid: GameGrid) => {
  return canMove(gameGrid.cellsByRow.map((c) => [...c].reverse()));
};

export const checkWin = (cells: Cell[]) => {
  return !!cells.find((c) => {
    if (!c?.tile?.value) return false;
    else return c.tile.value === 2048;
  });
};

export const detectSwipe = (el: string, func: (dir: string) => void) => {
  let swipe_det = {
    sX: 0,
    sY: 0,
    eX: 0,
    eY: 0,
  };
  const min_x = 20; //min x swipe for horizontal swipe
  const max_x = 40; //max x difference for vertical swipe
  const min_y = 40; //min y swipe for vertical swipe
  const max_y = 50; //max y difference for horizontal swipe
  var dir = "";
  const ele = document.querySelector<HTMLDivElement>(el)!;

  ele.addEventListener(
    "touchstart",
    function (e) {
      var t = e.touches[0];
      swipe_det.sX = t.screenX;
      swipe_det.sY = t.screenY;
    },
    false
  );

  ele.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
      var t = e.touches[0];
      swipe_det.eX = t.screenX;
      swipe_det.eY = t.screenY;
    },
    false
  );

  ele.addEventListener(
    "touchend",
    function (e) {
      //horizontal detection
      if (
        (swipe_det.eX - min_x > swipe_det.sX || swipe_det.eX + min_x < swipe_det.sX) &&
        swipe_det.eY < swipe_det.sY + max_y &&
        swipe_det.sY > swipe_det.eY - max_y
      ) {
        if (swipe_det.eX > swipe_det.sX) dir = "right";
        else dir = "left";
      }
      //vertical detection
      if (
        (swipe_det.eY - min_y > swipe_det.sY || swipe_det.eY + min_y < swipe_det.sY) &&
        swipe_det.eX < swipe_det.sX + max_x &&
        swipe_det.sX > swipe_det.eX - max_x
      ) {
        if (swipe_det.eY > swipe_det.sY) dir = "down";
        else dir = "up";
      }

      if (dir != "") {
        if (typeof func == "function") func(dir);
      }
      dir = "";
    },
    false
  );
};
