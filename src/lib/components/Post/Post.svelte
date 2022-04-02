<script>
  import ImageLoader from "../Image/ImageLoader.svelte";

  export let post = {};

  import { writable } from 'svelte/store';
  import { savePost, unSavePost, isSaved, sharePost } from './post.utils';
import { onMount } from "svelte";

  const saved = writable(isSaved(post.id));

  let shareData
  onMount(()=> {
    shareData = {
      title: `${post.title}`,
      text: `${post.title}`,
      url: `${window.location}posts/${post.id}`
    }
  });


</script>

<article>
  <h2>{post.title}</h2>
  <ImageLoader src="{post.img}" alt="{post.title}" />

  {#if post.description}
    <p>
      {@html post.description}
    </p>
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

    <a class="button" href={`/posts/${post.id}`}>
      <i class="ri-arrow-right-line"></i>
      <span>Részletek</span>
    </a>

  </section>
</article>

<style lang="less">
  @import './Post';
</style>