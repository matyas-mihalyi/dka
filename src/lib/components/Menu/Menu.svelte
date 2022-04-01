<script>
  import { onMount } from 'svelte';
  import {slide} from 'svelte/transition';
  import { menuItems } from './menuItems';
  import MenuLink from './MenuLink/MenuLink.svelte';
  import Icon from '$lib/components/Common/Icon/Icon.svelte'
  import { PROJECT_NAME } from '$lib/config/general';
  
  let isOpen = false;
  let isMobile = true;

  function toggleMenu () {
    isOpen = !isOpen;
  };

  function checkScreenWidth () {
    if (window.innerWidth > 600) {
      isMobile = false;
      isOpen = true;
    }
  }


  let hidden = false;
  
  let y = 0;
  let lastY = 0;

  onMount(()=> {
    window.onscroll = () => {
      let y = window.scrollY;
      if(y < lastY) {
        hidden = false;
      } else {
        hidden = true;
      }
      lastY = y;
    }; 
    checkScreenWidth();
  });
  
</script>

<style lang="less">
  @import './Menu';
</style>

<svelte:window bind:scrollY="{y}"/>

<header>
  <div role="navigation" class:hidden={hidden}>
  
    <a class="logo" href="/">
      <Icon 
        name={"dark"} 
        width={isMobile ? "1.5rem" : "2.5rem"}
        height={isMobile ? "1.5rem" : "2.5rem"}  
      />
      <span>
        {PROJECT_NAME}
      </span>
    </a>
    
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
          <MenuLink {menuItem} />
        {/each}
      </ul>
    </nav>
    {/if}
  
  </div>
</header>
