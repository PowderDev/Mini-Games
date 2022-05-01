<script lang="ts">
  import { WordleStore } from "../../stores/wordle"
  import dictionary from "../../assets/Wordle/dictionary.json"
  import { onDestroy, onMount } from "svelte";
  import { WordleTile, TileStates } from "../../types/Wordle";
  import gsap from "gsap"
  import { notifications } from "../../lib/toast/notification";
  import { getClearTiles, getTargetWord } from "../../lib/Wordle";
  import Modal from "../shared/Modal.svelte";
  import { fly } from "svelte/transition"

  type ModalData = { win: boolean, targetWord: string }

  const WORD_LENGTH = 5;
  const FLIP_ANIMATION_DURATION = 500;
  const DANCE_ANIMATION_DURATION =  500

  let isOpen = false
  let modalData = {} as ModalData

  let tiles: WordleTile[] = getClearTiles()

  onMount(() => {
    console.log("Correct Word:", $WordleStore.targetWord);
    startInteraction()
  })

  onDestroy(async () => {
    isOpen = false
    stopInteraction()
  })

  const startInteraction = () => {
    document.addEventListener("click", handleMouseClick);
    document.addEventListener("keydown", handleKeyPress);
  }

  const stopInteraction = () => {
    document.removeEventListener("click", handleMouseClick);
    document.removeEventListener("keydown", handleKeyPress);
  }

  const handleMouseClick = (e: any) => {
    if (e.target.matches("[data-key]")) {
      pressKey(e.target.dataset.key!);
      return;
    }

    if (e.target.matches("[data-enter]")) {
      submitGuess();
      return;
    }

    if (e.target.matches("[data-delete]")) {
      deleteKey();
      return;
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      submitGuess();
      return;
    }

    if (e.key === "Backspace" || e.key === "Delete") {
      deleteKey();
      return;
    }

    if (e.key.match(/^[a-z]$/)) {
      pressKey(e.key);
      return;
    }
  }

  const submitGuess = () => {
    stopInteraction();
    const activeTiles = getActiveTiles();
    if (activeTiles.length !== WORD_LENGTH) {
      notifications.danger("Not enough letters", 500)
      shakeTiles(`[data-state=${TileStates.Active}]`)
      startInteraction();
      return;
    }

    const guess = activeTiles.reduce((word, tile) => word + tile.value.toLowerCase(), "");
    

    if (!dictionary.includes(guess)) {
      notifications.danger("Not in the game dictionary", 500)
      shakeTiles(`[data-state=${TileStates.Active}]`)
      startInteraction();
      return;
    }

    activeTiles.forEach((...params) => flipTile(...params, guess));
  }

  const shakeTiles = (tiles: string) => {
    const tl = gsap.timeline({  defaults: { duration: .07  }})
      tl.to(tiles, { x: "-20%" })
      tl.to(tiles, { x: "20%" })
      tl.to(tiles, { x: "-15%" })
      tl.to(tiles, { x: "15%" })
      tl.to(tiles, { x: 0 })
  }

  const getActiveTiles = () => {
    return tiles.filter(t => t.state === TileStates.Active);
  }

  const flipTile = (tile: WordleTile, index: number, array: WordleTile[], guess: string) => {
    const keyboard = document.querySelector<HTMLDivElement>("#keyboard")!;
    const key = keyboard.querySelector(`[data-key="${tile.value}"i]`)!;
    const idx = getTileIdx(tile)

    setTimeout(async () => {
      await gsap.to(`[data-tile-idx="${idx}"]`, { rotateX: 360, duration: .5})
      
      if ($WordleStore.targetWord.at(index) == tile.value.toLowerCase()) {
        tiles[idx].state = TileStates.Correct;
        key.classList.add("correct");
      } else if ($WordleStore.targetWord.includes(tile.value.toLowerCase())) {
        tiles[idx].state = TileStates.WrongLocation;
        key.classList.add("wrong-location");
      } else {
        tiles[idx].state = TileStates.Wrong;
        key.classList.add("wrong");
      }

      if (index === array.length - 1) {
        checkWinLose(guess, array);
        startInteraction();
        WordleStore.update((val) => ({...val, step: val.step + 1}))
      }
    }, (index * FLIP_ANIMATION_DURATION) / 2);
  }

  const pressKey = (key: string) => {
    const activeTiles = getActiveTiles();
    if (activeTiles.length >= WORD_LENGTH) return;
    const nextTileIdx = getNextTileIdx(activeTiles.at(-1))
    tiles[nextTileIdx].value = key.toUpperCase()
    tiles[nextTileIdx].state = TileStates.Active
  }

  const getNextTileIdx = (prev: WordleTile) => {
    if (!prev) return 5 * ($WordleStore.step - 1)
    return tiles.findIndex(t => t.id === prev.id) + 1
  }

  const getTileIdx = (tile: WordleTile) => {
    if (!tile) return
    return tiles.findIndex(t => t.id === tile.id)
  }

  const deleteKey = () => {
    const activeTiles = getActiveTiles();
    const lastTileIdx = getTileIdx(activeTiles.at(-1));
    if (tiles[lastTileIdx] == null) return;
    tiles[lastTileIdx].value = "";
    tiles[lastTileIdx].state = TileStates.NotUsed
  }

  const danceTiles = (tiles: WordleTile[]) => {
    return new Promise((resolve => {
      tiles.forEach((tile, i) => {
        setTimeout(async () => {
          const idx = getTileIdx(tile)
          await gsap.to(`[data-tile-idx="${idx}"]`, { y: -15, duration: .2 })
          await gsap.to(`[data-tile-idx="${idx}"]`, { y: 0, duration: .2 })

          if (i === WORD_LENGTH - 1) {
            resolve(true)
          }
        }, (i * DANCE_ANIMATION_DURATION) / 5);
      });
    }))
  }

  const checkWinLose = async (guess: string, activeTiles: WordleTile[]) => {
    if (guess === $WordleStore.targetWord) {
      stopInteraction();
      await danceTiles(activeTiles);
      setModalOpen(true)
    } else if (guess !== $WordleStore.targetWord && $WordleStore.step === 6) {
      stopInteraction();
      setModalOpen(false)
    }
  }

  const setModalOpen = (win: boolean) => {
    isOpen = true
    modalData = { win, targetWord: $WordleStore.targetWord.toUpperCase() }
  }

  const playAgain = () => {
    const keyboard = document.querySelector<HTMLDivElement>("#keyboard")!;
    const keys = keyboard.querySelectorAll(`[data-key]`)!;
    const tileNodes = document.querySelectorAll(`[data-tile-idx]`)!;

    keys.forEach(key => {
      key.classList.remove("correct")
      key.classList.remove("wrong")
      key.classList.remove("wrong-location")
    })
    tileNodes.forEach(tile => gsap.to(tile, { rotateX: 0, duration: .4}))

    tiles = getClearTiles()
    isOpen = false
    const targetWord = getTargetWord()
    WordleStore.update((val) => ({...val, step: 1, targetWord}))
    console.log("Correct word:", targetWord);
    startInteraction()
  }
  
</script>

<div class="guess-grid" id="guess-grid" 
  in:fly="{{duration: 1000, x: 300, opacity: 0 }}" 
>
  {#each tiles as tile, index }
    <div class="tile" data-tile-idx="{index}" data-state="{tile.state}" >{tile.value}</div>
  {/each}
</div>

<Modal {isOpen} >
  <div class="wordle-modal">
    <h2 style="color: {modalData.win ? "hsl(115, 29%, 43%)" : "hsl(18, 84%, 40%)"}" >
      {modalData.win ? "You Won!" : "You Lost("}
    </h2>
    <div>
      {#each modalData.targetWord as letter}
        <span>{letter}</span>
      {/each}
    </div>
    <button on:click={playAgain} >Play Again <span class="material-icons"> replay </span> </button>
  </div>
</Modal>

<style>
.guess-grid {
  display: grid;
  justify-content: center;
  align-content: center;
  flex-grow: 1;
  grid-template-columns: repeat(5, 4em);
  grid-template-rows: repeat(6, 4em);
  gap: 0.25em;
  margin-bottom: 1em;
} 
  
.tile {
  color: hsl(240, 2%, 23%);
  border: 0.05em solid hsl(240, 2%, 23%);
  font-size: 2em;
  text-transform: uppercase;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  transition: transform 250ms linear;
}

.tile[data-state="active"] {
  border-color: hsl(200, 1%, 34%);
}

.tile[data-state="wrong"] {
  border: none;
  background-color: hsl(0, 0%, 56%);
}

.tile[data-state="wrong-location"] {
  border: none;
  background-color: hsl(49, 51%, 47%);
}

.tile[data-state="correct"] {
  border: none;
  background-color: hsl(115, 29%, 43%);
}
</style>