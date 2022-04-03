<script>
  export let src
  export let alt
  export let link

  import { onMount } from 'svelte'

  $: loaded = false
  let thisImage

  onMount(() => {
    thisImage.onload = () => {
      console.log("loaded")
      loaded = true
    };
    
    if (thisImage.naturalWidth !== 0) {
      loaded = true
    };
  }) 

</script>

<style lang="less">
  @import './Image.less';
</style>

{#if !loaded} 
  <div class="placeholder"></div>
{/if}
{#if link}
<a href="{link}" target="_blank">
  <img {src} {alt} title="{alt}" class:loaded bind:this={thisImage} loading="lazy"/>
</a>
{:else}
  <img {src} {alt} title="{alt}" class:loaded bind:this={thisImage} loading="lazy"/>
{/if}


