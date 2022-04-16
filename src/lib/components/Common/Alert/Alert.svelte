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

<style lang="less">
  @import './Alert';
</style>

{#if $open}
<span class="alert-modal" transition:slide>
  <p>{$alertText}</p>
</span>
{/if}

