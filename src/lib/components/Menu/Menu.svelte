<script>
  import { menuItems } from './menuItems';
  import MenuLink from './MenuLink/MenuLink.svelte';
  import {fly} from 'svelte/transition';
  
  let isOpen = false;

  function toggleMenu () {
    console.log("clicked");
    isOpen = !isOpen
  }

</script>

<span role="navigation">
  
  <button on:click="{toggleMenu}">
    {#if isOpen}
      close
    {:else}
      open
    {/if}
  </button>

  {#if isOpen}
    <nav transition:fly="{{ y: 200, duration: 2000 }}">
      <ul role="menubar">
        {#each menuItems as menuItem}
          <MenuLink {menuItem} />
        {/each}
      </ul>
    </nav>
  {/if}
</span>