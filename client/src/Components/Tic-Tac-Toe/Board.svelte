<script lang="ts">
  import { WINNING_COMBINATIONS } from "../../lib/Tic-Tac-Toe";
  import type { Cell } from "../../types/Tic-Tac-Toe";
  import { createEventDispatcher } from "svelte";
  import { TicTacToeCells } from "../../stores/tic-tac-toe";

  export let turn: "o" | "x";
  $: boardClass = "game-board" + " " + turn
  const dispatch = createEventDispatcher()

  const handleClick = (cell: Cell) => {
    if (cell.value) return;

    placeMark(cell)
    const win = checkWin()
    if (win) {
      dispatch("modal", true)
    } else {
      if (checkDraw()) {
        dispatch("draw", true)
        dispatch("modal", true)
      } else {
        dispatch("turn", turn === "x" ? "o" : "x")
      }
    }
  }

  const placeMark = (cell: Cell) => {
    const idx = $TicTacToeCells.findIndex(c => c.id === cell.id)
    TicTacToeCells.update((cells) => {
      cells[idx].value = turn
      return cells
    })
  }

  const checkWin = () => {
    return WINNING_COMBINATIONS.some(combination => {
      return combination.every(index => {
        return $TicTacToeCells[index].value === turn
      })
    })
  }

  const checkDraw = () => {
    return $TicTacToeCells.every(c => !!c.value)
  }

</script>


<h3>{turn === "x" ? "Your" : "Opponent's"} turn</h3>
<div id="game-board" class={boardClass}>
  {#each $TicTacToeCells as cell (cell.id) }
    <div class="cell" 
      class:x={cell.value === "x"} 
      class:o={cell.value === "o"} 
      data-cell 
      on:click={() => handleClick(cell)}
    />
  {/each}
  
</div>

<style  >
  .game-board {
    display: grid;
    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(3, auto);
  }

  h2 {
    font-weight: bold;
  }

  .cell.x::before,
  .cell.x::after,
  .game-board.x .cell:not(.x):not(.o):hover::before,
  .game-board.x .cell:not(.x):not(.o):hover::after {
    content: "";
    width: calc(90px * .15);
    height: 90px;
    background: #000;
    position: absolute;
  }

  .cell.o::before,
  .cell.o::after,
  .game-board.o .cell:not(.x):not(.o):hover::before,
  .game-board.o .cell:not(.x):not(.o):hover::after  {
    content: "";
    border-radius: 50%;
    position: absolute;
  }

  .cell.o::before,
  .game-board.o .cell:not(.x):not(.o):hover::before {
    width: 90px;
    height: 90px;
    background: #000;
  }

  .cell.o::after,
  .game-board.o .cell:not(.x):not(.o):hover::after {
    width: calc(90px * .7);
    height: calc(90px * .7);
    background: hsl(0, 3%, 93%);
  }

  .game-board.x .cell:not(.x):not(.o):hover::before,
  .game-board.x .cell:not(.x):not(.o):hover::after,
  .game-board.o .cell:not(.x):not(.o):hover::before {
    background: lightgrey;
  }

  .cell {
    width: 100px;
    height: 100px;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }

  .cell.x,
  .cell.o {
    cursor: not-allowed;
  }

  .cell:first-child,
  .cell:nth-child(2),
  .cell:nth-child(3) {
    border-top: none;
  }

  .cell:nth-child(3n + 1) {
    border-left: none;
  }

  .cell:nth-child(3n + 3) {
    border-right: none;
  }

  .cell:last-child,
  .cell:nth-child(7),
  .cell:nth-child(8) {
    border-bottom: none;
  }

  .cell.x::before,
  .game-board.x .cell:not(.x):not(.o):hover::before {
    transform: rotate(45deg);
  }

  .cell.x::after,
  .game-board.x .cell:not(.x):not(.o):hover::after  {
    transform: rotate(-45deg);
  }
</style>