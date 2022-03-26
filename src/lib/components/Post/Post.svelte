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

    <button>
      <i class="ri-share-line"></i>
      <span>Megosztás</span>
    </button>

    <a class="button" href={`/posts/${post.id}`}>
      <i class="ri-arrow-right-line"></i>
      <span>Részletek</span>
    </a>

  </section>
</article>

<style>

  article {
    width: 100%;
    padding: 1.5em 0 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid #ccc;
  }

  article:first-child {
    padding-top: 0;
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

  section.button-wrapper {
    width:100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1em;
  }

  section.button-wrapper > button, 
  section.button-wrapper > .button {
    border: none;
    background-color: transparent;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  section.button-wrapper > button > i,
  section.button-wrapper > .button > i {
    font-size: 1.5rem;
  }
  
  section.button-wrapper > button > span,
  section.button-wrapper > .button > span {
    font-size: 0.625rem;
  }

   

</style>