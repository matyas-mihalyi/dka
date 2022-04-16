<script>
  import { writable } from 'svelte/store';
  import { savePost, unSavePost, isSaved, sharePost } from './post.utils';
  import { onMount } from "svelte";
  import { page } from '$app/stores'
  import ImageLoader from "$lib/components/Image/ImageLoader.svelte";
  import TruncatedText from '$lib/components/Common/TruncatedText/TruncatedText.svelte';
  
  export let post = {};

  const saved = writable(isSaved(post.id));
  const postLink = `/posts/${post.id}`;

  let shareData
  onMount(()=> {
    shareData = {
      title: `${post.title}`,
      text: `${post.title}`,
      url: `${$page.url.href}posts/${post.id}`
    }
  });


</script>

<article>
  <h2>{post.title}</h2>
  <ImageLoader src="{post.img}" alt="{post.title}" href={{url: postLink}} />

  {#if post.topics}
  <section class="topics">
    {#each post.topics as topic}
      <a href={"/topic/" + topic}>#{topic}</a>
    {/each}
  </section>
  {/if}

  {#if post.description}
  <section class="description">
    <TruncatedText text={post.description} limit={140}/>
  </section>  
  {/if}


  <section class="button-wrapper">
    {#if $saved}
      <button on:click="{()=> {
        unSavePost(post.id);
        saved.set(false);
        }
      }">
        <i class="ri-heart-3-fill"></i>
        <span>Mentve</span>
      </button>
      {:else}  
      <button on:click="{()=> {
        savePost(post.id);
        saved.set(true);
      }
    }">
        <i class="ri-heart-3-line"></i>
        <span>Mentés</span>
      </button>
    {/if}

    <button on:click="{()=> sharePost(shareData)}">
      <i class="ri-share-line"></i>
      <span>Megosztás</span>
    </button>

    <a class="button" href={postLink}>
      <i class="ri-arrow-right-line"></i>
      <span>Részletek</span>
    </a>

  </section>
</article>

<style lang="less">
  @import './Post';
</style>