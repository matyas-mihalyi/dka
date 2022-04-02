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
    }
  }) 

</script>
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


<style lang="less">
  @import './Image.less';
</style>
