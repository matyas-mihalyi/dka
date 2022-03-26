<script>
  import { onMount } from 'svelte';
  import {slide} from 'svelte/transition';
  import { menuItems } from './menuItems';
  import MenuLink from './MenuLink/MenuLink.svelte';
  import Icon from '$lib/components/Common/Icon/Icon.svelte'
  import { PROJECT_NAME } from '$lib/config/general';
  
  let isOpen = false;

  function toggleMenu () {
    isOpen = !isOpen;
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
  });

</script>

<svelte:window bind:scrollY="{y}"/>

<div role="navigation" class:hidden={hidden}>

  <div class="top-navbar">
    <a class="logo" href="/">
      <Icon 
        name={"dark"} 
        width={"1.5rem"}
        height={"1.5rem"}  
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
  </div>
  
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

<style>
  div[role="navigation"] {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-content: flex-end;
    background-color: #fff;
    transition: .3s;

    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);
  }

  div.top-navbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  button {
    border-radius: 0.125em;
    border: none;
    padding: 1em;
    display: block;
    background-color: transparent;
  }
  
  button > i {
    font-size: 1.5rem;
  }

  nav {
    width: 100%;
  }
  
  ul {
    display: flex;
    flex-direction: column;
    padding: 1em 1.5em;
  }

  .hidden {
    transform: translateY(calc(-100% - 5px));
  }

  a.logo {
    padding-left: 1em;
    display: flex;
    align-items: center;
    gap: 0.5em;
    text-decoration: none;
  }

  a.logo > span {
    /* font-size: large; */
    font-weight: 700;
    color: #000;
  }

</style>