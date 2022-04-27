<script lang="ts">
  import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
  import { createEventDispatcher } from "svelte"

  export let isOpen = false
  const dispatch = createEventDispatcher()

  const onClose = () => {
    dispatch("onClose")
  } 
</script>

{#if isOpen}
  <div 
    in:scale="{{ easing: quintOut }}" 
    out:scale="{{ easing: quintOut }}" 
    class="modal-container"
    on:click={onClose}
    >
      <div class="modal">
        <slot />
      </div>
  </div>
{/if}

<style>
  .modal-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
  }

  .modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2rem;
    border: none;
    box-shadow: 0px 0px 50px 9px rgba(126, 199, 255, 0.24);
    min-width: 200px;
    min-height: 200px;
    z-index: 30;
  }
</style>