<script>
  export let src
  export let alt
  export let href = { target: "_self"}

  import { onMount } from 'svelte'

  $: loaded = false
  let thisImage

  onMount(() => {
    thisImage.onload = () => {
      loaded = true
    };
    
    if (thisImage.naturalWidth !== 0) {
      loaded = true
    };
  });

</script>

<style lang="less">
  @import './Image.less';
</style>

{#if !loaded} 
  <div class="placeholder"></div>
{/if}
{#if href.url}
<a href="{href.url}" target="{href.target}" class="image-wrapper">
  <img {src} {alt} title="{alt}" class:loaded bind:this={thisImage} loading="lazy"/>
</a>
{:else}
  <img {src} {alt} title="{alt}" class:loaded bind:this={thisImage} loading="lazy"/>
{/if}


