<script lang="ts">
  import { notifications } from "../../lib/toast/notification";
  import { getClearCells } from "../../lib/Tic-Tac-Toe";
  import Toast from "../shared/Toast.svelte";
  import Modal from "../shared/Modal.svelte";
  import Board from "./Board.svelte";
  import { TicTacToeCells } from "../../stores/tic-tac-toe";
import ScoreBar from "./ScoreBar.svelte";

  let turn: "o" | "x" = "x"
  let isModalOpen = false
  let isDraw = false

  const playAgain = () => {
    TicTacToeCells.update(() => getClearCells())
    isDraw = false
  }

</script>


<main>
  <ScoreBar />
  <Board on:draw={() => (isDraw = true)} on:modal={() => (isModalOpen = true)} {turn} on:turn={({detail}) => (turn = detail)} />
</main>
<Toast />
<Modal isOpen={isModalOpen} on:onClose={() => (isModalOpen = false)} >
  <div class="game-modal">
    <h1>{ isDraw ? "Draw" : "You Lost (" } </h1> 
    <button on:click={playAgain} >
      Play Again 
      <span class="material-icons"> replay </span> 
    </button>
  </div>
</Modal>


<style>
  main {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    gap: 3rem;
    height: 100vh;
  }

  .game-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-height: 19rem;
    padding: 4rem 6rem;
    background: rgb(182, 182, 211);
    border-radius: 2rem;
  }

  .game-modal > h1 {
    font-size: 3.5em;
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