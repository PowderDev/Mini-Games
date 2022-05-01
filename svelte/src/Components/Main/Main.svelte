<script lang="ts">
  import gsap from "gsap"
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  onMount(async () => {
    const tl = gsap.timeline()
    tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 })
    tl.fromTo(".card", { opacity: .5, y: "210%" }, { opacity: 1, y: 0, stagger: 0.3, duration: 1})
  })
</script> 



<main>
  <nav >
    <h1>Mini Games</h1>
  </nav>

  <div class="gamesGrid" id="gamesGrid">
    <div class="card" on:click={() => push("/wordle")} >
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.moddb.com%2Fimages%2Fgames%2F1%2F76%2F75303%2F1.png&f=1&nofb=1" alt="">
      <h2>Wordle</h2>
    </div>
    <div class="card" on:click={() => push("/2048")}>
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fplayandroid.net%2Fwp-content%2Fuploads%2F2020%2F06%2F2048-.jpg%3Ffit%3D1280%252C720%26ssl%3D1&f=1&nofb=1" alt="">
      <h2>2048</h2>
    </div>
    <div class="card" on:click={() => push("/tic-tac-toe")}>
      <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2Fbe433aec-ef24-43fd-b560-3195d965aa36.f53d12c787db86bc7108dc9c4204b1bf.jpeg&f=1&nofb=1" alt="">
      <h2>Tic-Tac-Toe</h2>
    </div>
  </div>
</main>

<style>
  main {
    background-color: hsl(0, 3%, 93%);
    height: 100vh;
    padding: 0;
  }
  
  nav {
    position: fixed;
    right: 0;
    top: 0;
    left: 0;
    height: 10vh;
    background-color: hsl(276, 11%, 54%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .gamesGrid {
    margin: 10vh;
    padding: 5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 2rem;
    overflow: hidden;
    box-shadow: inset -1px 3px 8px 5px #000000, 2px 5px 16px 0px #3e3e3e, 5px 5px 15px 5px rgba(108, 108, 108, 0);
    cursor: pointer;
  }

  .card img {
    width: 100%;
    height: 290px;
  }

  @media screen and (max-width: 982px) {
    .gamesGrid {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(3, 1fr);
    }
  }
</style>

