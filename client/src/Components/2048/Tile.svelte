<script lang="ts">
import { onMount } from "svelte";

  import type { Tile } from "../../lib/2048/Classes";

  export let tile: Tile
  let firstTime = true
  $: lightness = 100 - tile.power * 9

  onMount(() => {
    console.log("das");
    setTimeout(() => {
      firstTime = false
    }, 200)
  })

</script>

<div 
  class="tile {firstTime ? "show" : ""}" 
  style=" --x: {tile.x};
          --y: {tile.y};
          --bg-lightness: {lightness}%;
          --text-lightness: {lightness <= 50 ? 90 : 10}%"
  data-tile-coords="{tile.x}-{tile.y}"
>
  {tile.value}
</div>

<style>
  .tile {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19vmin;
    height: 19vmin;
    border-radius: 1vmin;
    top: calc(var(--y) * (19vmin + 2vmin) + 2vmin);
    left: calc(var(--x) * (19vmin + 2vmin) + 2vmin);
    font-weight: bold;
    background-color: hsl(200, 50%, var(--bg-lightness));
    color: hsl(200, 25%, var(--text-lightness));
    transition: 100ms ease-in-out;
  }

  .show {
    animation: show 200ms ease-in;
  }

  @keyframes show {
    0% {
      opacity: .5;
      transform: scale(0);
    }
  }
</style>