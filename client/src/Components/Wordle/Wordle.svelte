<script lang="ts">
  import GuessGrid from "./GuessGrid.svelte";
  import Keyboard from "./Keyboard.svelte";
  import Toast from "./../shared/Toast.svelte";
</script>

<main >
  <GuessGrid />
  <Keyboard />
  <Toast />
</main>


<style global >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

main {
  background: hsl(0, 3%, 93%);
  display: flex;
  flex-direction: column;
  padding: 1em;
  font-size: clamp(0.5rem, 2.5vmin, 1.5rem);
}

.wordle-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  min-width: 20em;
  min-height: 15em;
  padding: 2rem;
  background-color: white;
  border-radius: 2rem;
}

.wordle-modal > h2 {
  font-size: 2em;
}

.wordle-modal > div {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wordle-modal > div span {
  font-size: 2.5em;
  font-weight: bold;
}

.wordle-modal > button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border-radius: 2rem;
  width: 100%;
  padding: .6em .3em;
  background: hsl(142, 59%, 31%);
  color: hsl(0, 0%, 92%);
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.wordle-modal > button:active {
  transform: scale(0.97);
}

.wordle-modal > button span {
  font-size: 1.5em;
}

.key.wrong {
  --lightness: 23%;
}

.key.wrong-location {
  --hue: 49;
  --saturation: 51%;
  --lightness: 47%;
}

.key.correct {
  --hue: 115;
  --saturation: 29%;
  --lightness: 43%;
}

svg {
  pointer-events: none;
}

</style>