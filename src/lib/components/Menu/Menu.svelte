<script>
  import { menuItems } from './menuItems';
  import MenuLink from './MenuLink/MenuLink.svelte';
  
  let isOpen = false;

  function toggleMenu () {
    isOpen = !isOpen;
  }

</script>

<span role="navigation" >
  
  {#if isOpen}
  <nav>
    <ul role="menubar">
      {#each menuItems as menuItem}
        <MenuLink {menuItem} />
      {/each}
    </ul>
  </nav>
  {/if}

  <button on:click="{toggleMenu}">
    {#if isOpen}
      <i class="ri-close-line"></i>
    {:else}
      <i class="ri-menu-line"></i>
    {/if}
  </button>

</span>

<style>
  span {
    position: fixed;
    bottom: 2em;
    right: 2em;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    box-shadow: -2px 2px 2px #ddd;

    border-radius: 0.125em;
  }
  
  button {
    border-radius: 0.125em;
    background-color: #fff;
    border: none;
    padding: 1em;
    display: block;
    align-self: flex-end;
  }

  ul {
    padding-top: 2.5em;
    display: flex;
    flex-direction: column;
  }

</style>