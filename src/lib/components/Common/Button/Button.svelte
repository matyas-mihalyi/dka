<script>
  export let text;
  export let href;
  export let icon;

</script>


<button on:click>
  {#if href}
  <a href="{href}">
    {#if icon}
      <i class="{icon}"></i>
    {/if}
    {text}
  </a>
  {:else}  
    {#if icon}
      <i class="{icon}"></i>
    {/if}
    {text}
  {/if}
</button>

<style lang="less">
 @import './Button';
</style>