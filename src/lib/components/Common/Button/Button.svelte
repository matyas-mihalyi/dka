<script>
  export let buttonData;

  const {text, href, icon} = buttonData;
</script>


<button>
  <a href="{href}">
    {#if icon}
      <i class="{icon}"></i>
    {/if}
    {text}
  </a>
</button>

<style lang="less">
 @import './Button';
</style>