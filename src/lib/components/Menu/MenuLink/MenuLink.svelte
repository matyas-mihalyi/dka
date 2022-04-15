<script>
  import { page } from "$app/stores";
  import { derived } from "svelte/store";

  export let menuItem;

  const active = derived(
	  page,
    ($page, set) => {
      if ($page.url.pathname === menuItem.href) {
        set(true)
      } else {
        set(false)
      } 
	  }, false
  );

</script>

<style lang="less">
  @import './MenuLink';
</style>

<li role="none" on:click>
  <a role="menuitem" href="{menuItem.href}" class:active={$active}>
    {menuItem.text}
  </a>
</li>
