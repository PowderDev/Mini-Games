<script lang="ts">
  import Wordle from "./Components/Wordle/Wordle.svelte";
  import Router, { push } from "svelte-spa-router"
  import Game2048 from "./Components/2048/Game2048.svelte";
  import TicTacToe from "./Components/Tic-Tac-Toe/Game.svelte"
  import Main from "./Components/Main/Main.svelte";
</script>

<Router routes={{
  "/": Main,
  "/wordle": Wordle,
  "/tic-tac-toe": TicTacToe,
  "/2048": Game2048
}} />