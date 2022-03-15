<script context="module">

  import { getSavedPosts } from '$lib/components/stores';
  import { browser } from '$app/env';

  const savedPosts = JSON.stringify(getSavedPosts);
  
  export async function load ({fetch}) {
    if (browser) {
      const res = await fetch(`/api/saved-posts.json`, { method: 'POST', headers: {'savedPosts': savedPosts}});
      const {posts, ids} = await res.json();
  
      return {
        props: {
          posts,
          ids
        }
      }
    }

    return {
      props: {
        loading: true
      }
    }
  }
</script>

<script>
  import Post from '$lib/components/Post.svelte'
  export let posts;
  export let loading;
</script>

{#if loading}
  <p>loading</p>
{:else}
  {#each posts as post}
  <Post post={post} />
  {/each}
{/if}