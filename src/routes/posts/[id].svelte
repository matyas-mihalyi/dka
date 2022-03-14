<script context="module">
  
  
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
  import { savePost, deleteSavedPost, saved, updateStore } from '../posts/utils';  
  import { writable } from "svelte/store";
  
  export let post;

  onMount(()=> {
      updateStore();
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

<article>
    
  <header>
    <h1>{post.title}</h1>
    <a href="/" title="Vissza a főoldalra"><i class="ri-arrow-left-s-line"></i></a>
  </header>

  <img src={post.img} alt={`${post.title} kép`}>
  <p>{@html post.description}</p>

  <span class="divider" aria-hidden="true"></span>
  
  <section class="button-wrapper">
    
    <!-- save button -->
    {#if $isSaved}
    <button on:click="{del(post.id)}">
      <i class="ri-heart-3-fill"></i>
    </button>
    {:else}  
    <button on:click="{save(post.id)}">
      <i class="ri-heart-3-line"></i>
    </button>
    {/if}
    
    <button >
      <i class="ri-whatsapp-line"></i>
    </button>
    <button >
      <i class="ri-twitter-line"></i>
    </button>
    <button >
      <i class="ri-more-fill"></i>
    </button>
    
  </section>
  
  <span class="divider" aria-hidden="true"></span>
  
  
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
    <a href={`/posts/${post.related.id}`}>{post.related.title}</a>
  </section>
  
  <a href={post.originalUrl}>Megtekintés a DKA oldalán</a>
  <span class="divider" aria-hidden="true"></span>
  

</article>

<style>
article {
    width: 100%;
    padding: 1em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
  }

  section {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  section > p {
    font-weight: 500;
  }

  section.button-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 0.75em;
  }
  
  section.button-wrapper > button {
    border: none;
    background-color: transparent;
  }

  section.button-wrapper > button > i {
    font-size: 1.5rem;
  }
  
  h1 {
    font-size: 1.125rem;
    text-align: center;
    flex-grow: 1;
  }

  header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  header > a {
    text-decoration: none;
    margin-right: 0.25em;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  header > a > i {
    font-size: 1.5rem;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    border-radius: 0.075em;
  }

  p {
    font-size: 0.8125rem;
  }
  
  a {
    font-size: 0.8125rem;
    color: #444;
    display: inline;
    align-items: center;
  }

  span.divider{
    width: 100%;
    border-bottom: 1px solid #ccc;
  }


</style>