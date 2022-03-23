<script>
  import ImageLoader from "../Image/ImageLoader.svelte";

  export let post = {};

  import { writable } from 'svelte/store';
  import { savePost, unSavePost, isSaved } from './post.utils';

  const saved = writable(isSaved(post.id))

</script>

<article>
  <h2>{post.title}</h2>
  <ImageLoader src="{post.img}" alt="" />
  <p>
    {@html post.description}
  </p>
  <section class="button-wrapper">
    {#if $saved}
      <button on:click="{()=> {
        unSavePost(post.id);
        saved.set(false);
        }
      }">
        <i class="ri-heart-3-fill"></i>
      </button>
    {:else}  
    <button on:click="{()=> {
      savePost(post.id);
      saved.set(true);
      }
    }">
        <i class="ri-heart-3-line"></i>
      </button>
    {/if}
    <a href={`/posts/${post.id}`}>Részletek &#8594</a>
  </section>
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
    border-bottom: 1px solid #ccc;
  }

  h2 {
    font-size: 1.125rem;
  }

  p {
    font-size: 0.875rem;
  }

  a {
    text-decoration: none;
    color: #444;
    display: inline;
    align-items: center;
  }

  section.button-wrapper > button {
    border: none;
    background-color: transparent;
  }

  section.button-wrapper > button > i {
    font-size: 1.5rem;
  }

</style>