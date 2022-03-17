<script>
  export let src
  export let alt

  import { onMount } from 'svelte'

  $: loaded = false
  let thisImage

  onMount(() => {
    thisImage.onload = () => {
      loaded = true
    }
  }) 

</script>
{#if !loaded} 
  <div class="placeholder"></div>
{/if}
<img {src} {alt} class:loaded bind:this={thisImage} loading="lazy"/>


<style>
  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    border-radius: 0.075em;
    opacity: 0;
    transition: opacity 1200ms ease-out;   
  }
  
  img.loaded { 
    opacity: 1;
  }

  div.placeholder {
    width: 100%;
    height: calc(100vw - 2rem);
    background-color: #eeeeee;
  }
  
</style>
