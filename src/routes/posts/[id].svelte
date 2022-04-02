<script context="module">

  export const router = false;
  
  export async function load ({fetch, params}) {
    const { id } = params;
    const res = await fetch(`/api/posts/${id}.json`);
    const post = await res.json();
    return {
      props: {
        post
      }
    };
  }
  
  
</script>

<script>
  import { onMount } from 'svelte';
  import { savePost, deleteSavedPost, saved, updateStore, sharePost } from '../posts/utils';  
  import { writable } from "svelte/store";
  import Image from '$lib/components/Image/Image.svelte';
  
  export let post;

  let shareData
  onMount(()=> {
    updateStore();
    shareData = {
      title: `${post.title}`,
      text: `${post.title}`,
      url: `${window.location}`
    };
  });
  
  const isSaved = writable(saved(post.id));
  
  function save (id="") {
    savePost(id)
    isSaved.set(true);
  };
  
  function del (id="") {
    deleteSavedPost(id);
    isSaved.set(false);
  };
  
</script>

<style lang="less">
  @import './Post';
</style>

<main class="container">
    
  <header>
    <h1>{post.title}</h1>
    <a href="/" title="Vissza a főoldalra">
      <i class="ri-arrow-left-line"></i>
    </a>
  </header>

  <Image src={post.img} alt={`${post.title}`} link={post.largeImg}/>

  {#if post.description}
    <p>{@html post.description}</p>
  {/if}

  
  <section class="button-wrapper">
    
    <!-- save button -->
    {#if $isSaved}
    <button on:click="{del(post.id)}">
      <i class="ri-heart-3-fill"></i>
      <span>Mentve</span>
    </button>
    {:else}  
    <button on:click="{save(post.id)}">
      <i class="ri-heart-3-line"></i>
      <span>Mentés</span>
    </button>
    {/if}
    
    <button on:click="{()=> sharePost(shareData)}">
      <i class="ri-share-line"></i>
      <span>Megosztás</span>
    </button>
    
  </section>  
  
  <section>
    <p>Forrás</p>
    {#if post.srcUrl}
      <a href={post.srcUrl} target="_blank">{post.src}</a>
    {:else}
      <p>{post.src}</p> 
    {/if}
  </section>

  <section>
    <p>Kapcsolódó</p>
    <div class="link-wrapper">
      {#each post.related as post}
        <a href={`/posts/${post.id}`}>{post.title}</a>
      {/each}
    </div>
  </section>
  
  <a href={post.originalUrl}>Megtekintés a DKA oldalán <i class="ri-external-link-line"></i> </a>
  

</main>
