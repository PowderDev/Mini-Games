<script lang="ts">
  import { canMoveDown, canMoveLeft, canMoveRight, canMoveUp, checkWin, detectSwipe, slideTiles } from "../../lib/2048";
  import { onDestroy, onMount } from "svelte";
  import { GameGrid } from "../../lib/2048/Classes";
  import Tile from "./Tile.svelte";
  import gsap from "gsap"
  import Modal from "../shared/Modal.svelte";

  let gameGrid = new GameGrid()
  $: cells = gameGrid.cells
  $: count = cells.reduce((acc, cell) => acc + (cell?.tile?.value || 0), 0)

  let isModalOpen = false
  let win = false

  onMount(async () => {
    const tl = gsap.timeline()
    tl.fromTo("#game", { y: "-100%" }, { y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" })
    detectSwipe("#game", (dir) => handleInput({}, dir))
    startIntegration()
  })

  onDestroy(() => {
    stopIntegration()
  })

  const startIntegration = () => {
    document.addEventListener("keydown", handleInput, { once: true })
  }

  const stopIntegration = () => {
    document.removeEventListener("keydown", handleInput)
  }

  const handleInput = async (e?: any, swipeDir?: string) => {
    stopIntegration()

    if (e.key == "ArrowUp" || swipeDir == "up") {
      if (!canMoveUp(gameGrid)) {
          startIntegration()
          return
        }
        await slideTiles(gameGrid.cellsByColumn)
    } else if (e.key == "ArrowDown" || swipeDir == "down") {
      if (!canMoveDown(gameGrid)) {
          startIntegration()
          return
        }
        await slideTiles(gameGrid.cellsByColumn.map(c => [...c].reverse()))
    } else if (e.key == "ArrowRight" || swipeDir == "right") {
      if (!canMoveRight(gameGrid)) {
          startIntegration()
          return
        }
        await slideTiles(gameGrid.cellsByRow.map(c => [...c].reverse()))
    } else if (e.key == "ArrowLeft" || swipeDir == "left") {
      if (!canMoveLeft(gameGrid)) {
          startIntegration()
          return
        }
        await slideTiles(gameGrid.cellsByRow)
    } else {
      startIntegration()
      return
    }
  
    gameGrid.cells = gameGrid.cells.map(cell => {
      cell.mergeTiles()
      return cell
    })
    const newTile = gameGrid.newRandomTile()

    if (!canMoveRight(gameGrid) 
    && !canMoveLeft(gameGrid) 
    && !canMoveDown(gameGrid) 
    && !canMoveUp(gameGrid)) {
      newTile.waitForTransition().then(() => {
        win = false        
        isModalOpen = true
      })
      return
    }

    if (checkWin(cells)) {
      newTile.waitForTransition().then(() => {
        win = true
        isModalOpen = true
      })
      return
    }
    
    startIntegration()
  }

  const playAgain = () => {
    gameGrid = new GameGrid()
    startIntegration()
  }
  
</script>

<main>
  <div id="game">
    <h4>Total Count: {count}</h4>
    <div id="game-board" >
        {#each cells as cell (cell)}
          <div class="cell"></div>
        {/each}
        {#each cells.filter(c => c.tile).map(c => c.tile) as tile (tile)}
          <Tile {tile} />
        {/each}
    </div>
  </div>
</main>
<Modal isOpen={isModalOpen} on:onClose={() => (isModalOpen = false)} >
  <div class="game-modal">
    <h2 class:win={win} class:loss={!win} >{win ? "You Won!" : "You Lost("}</h2>
    <div class="total-count">
      <figure>Total Count:</figure>
      <span>{count}</span>
    </div>
    <button on:click={playAgain} >
      Play Again 
      <span class="material-icons"> replay </span> 
    </button>
  </div>
</Modal>

<style>
  main {
    background-color: hsl(0, 3%, 93%);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 7.5vmin;
  }

  #game-board {
    background-color: rgb(190, 189, 189);
    display: grid;
    grid-template-columns: repeat(4, 19vmin);
    grid-template-rows: repeat(4, 19vmin);
    gap: 2vmin;
    border: 1vmin;
    padding: 2vmin;
    position: relative;
  }

  .cell {
    background-color: rgb(139, 138, 138);
    border-radius: 1vmin;
  }

  .game-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-height: 19rem;
    min-width: 25rem;
    padding: 2rem 4rem;
    background: rgb(181, 167, 193);
    border-radius: 2rem;
  }

  .game-modal > h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .game-modal > h2.win {
    color: rgb(18, 116, 18);
  }

  .game-modal > h2.loss {
    color: rgb(151, 28, 28);
  }

  .total-count {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .total-count > figure {
    font-size: 1.5rem;
    color: rgb(77, 77, 136);
  }

  .total-count > span {
    font-size: 6rem;
    font-weight: bold;
  }

  .game-modal > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 2rem;
    width: 100%;
    padding: .6em .3em;
    background: hsl(142, 87%, 81%);
    color: hsl(0, 0%, 31%);
    border: none;
    font-size: 1.2em;
    cursor: pointer;
  }

  .game-modal > button:active {
    transform: scale(0.97);
  }
</style>