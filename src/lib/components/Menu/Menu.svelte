<script>
  import { onMount } from 'svelte';
  import {slide} from 'svelte/transition';
  import { menuItems } from './menuItems';
  import { PROJECT_NAME } from '$lib/config/general';
  import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher.svelte';
  import MenuLink from './MenuLink/MenuLink.svelte';
  import Icon from '$lib/components/Common/Icon/Icon.svelte';
  
  let isOpen = false;
  let isMobile = true;

  function toggleMenu () {
    isOpen = !isOpen;
  };

  function checkScreenWidth () {
    if (window.innerWidth > 600) {
      isMobile = false;
      isOpen = true;
    } else {
      isMobile = true;
      isOpen = false;
    }
  }


  let hidden = false;
  
  let y = 0;
  let lastY = 0;

  onMount(()=> {
    checkScreenWidth();

    window.onscroll = () => {
      let y = window.scrollY;
      if(y < lastY) {
        hidden = false;
      } else if (!isOpen) {
        hidden = true;
      }
      lastY = y;
    };

    window.onresize = () => checkScreenWidth();
  });

  function closeMenu () {
    if (isMobile) {
      toggleMenu();
    }
  }

</script>

<style lang="less">
  @import './Menu';
</style>

<svelte:window bind:scrollY="{y}"/>

<header class:hidden>
  <div role="navigation">
  
    <a class="logo" href="/" on:click="{isOpen ? closeMenu() : null}">
      <Icon 
        width={isMobile ? "1.5rem" : "2rem"}
        height={isMobile ? "1.5rem" : "2rem"}  
      />
      <span>
        {PROJECT_NAME}
      </span>
    </a>
    
    <ThemeSwitcher />

    <button on:click="{toggleMenu}">
      {#if isOpen}
      <i class="ri-close-line"></i>
      {:else}
      <i class="ri-menu-line"></i>
    {/if}
    </button>

    {#if isOpen}
    <nav transition:slide>
      <ul role="menubar">
        {#each menuItems as menuItem}
          <MenuLink {menuItem} on:click={()=> closeMenu()}/>
        {/each}
      </ul>
    </nav>
    {/if}

    
  
  </div>
</header>
