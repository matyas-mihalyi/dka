<script context="module">
  import { writable } from 'svelte/store';

  const open = writable(false);
  const alertText = writable("");

  export function alertModal (text = "") {
    alertText.set(text);
    open.set(true);
  }
  
  export function closeModal () {
    open.set(false);
    alertText.set("");
  }
</script>
<script>
   import {slide} from 'svelte/transition';
</script>

{#if $open}
<span class="alert-modal" transition:slide>
  <p>{$alertText}</p>
</span>
{/if}

<style>
  .alert-modal {
    position: fixed;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100vw - 4em);
    height: auto;
    background-color: #fff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
  }
  
  p {
    padding: 1.25em 1em;
    font-size: 1.25rem;
  }

</style>