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
  import { onMount } from 'svelte/internal';
  import { savePost, deleteSavedPost, saved, updateStore, sharePost, } from '../posts/utils';  
  import { writable } from "svelte/store";
  import Image from '$lib/components/Image/Image.svelte';
  import { page } from '$app/stores';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import { truncateDesc } from '$lib/utils';

  onMount(()=> updateStore())

  export let post;

  const shareData = {
    title: `${post.title}`,
    text: `${post.title}`,
    url: `${$page.url.href}`
  };
  
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

  <Image src={post.img} alt={`${post.title}`} href={{ url: post.largeImg, target: '_blank'}}/>

  {#if post.description}
    <p>{@html post.description}</p>
  {/if}
  
  {#if post.topics}
  <section class="topics">
    {#each post.topics as topic}
      <a href={"/topic/" + topic}>#{topic}</a>
    {/each}
  </section>
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
  
  <!-- forrás -->
  {#if post.src}
  <section>
    <h5>Forrás</h5>
    {#if post.srcUrl}
    <a href={post.srcUrl} target="_blank">{post.src}</a>
    {:else}
    <p>{post.src}</p> 
    {/if}
  </section>
  {/if}
  
  <!-- kapcsolódó -->
  {#if post.related}
  <section>
    <h5>Kapcsolódó</h5>
    <div class="link-wrapper">
      {#each post.related as post}
      {#if post.external}
      <a href={post.url} target="_blank">
        {post.title}
        <i class="ri-external-link-line"></i>
      </a>
      {:else}
      <a href={post.url}>{post.title}</a>
      {/if}
      {/each}
    </div>
  </section>
  {/if}
  
  <!-- originals -->
  {#if post.originals}
  <section class="original-data">
    <h5>Eredeti adatok</h5>
    <dl>
      {#each post.originals as field}
        <dt>{field.title}</dt>      
        <dd>{field.text}</dd>      
      {/each}
    </dl>
  </section>
  {/if}
  
  <a href={post.originalUrl}>Megtekintés a DKA oldalán <i class="ri-external-link-line"></i> </a>
  
</main>

<Seo
  title={post.title}
  description={truncateDesc(post.description)}
  url={$page.url.href}
  contentType={'article'}
  image={{ url: post.img, alt: post.title}}
/>
