<script context="module">
  import { INITIAL_POSTS } from '$lib/config/homefeed';
  
  export async function load ({fetch}) {
    const apiRequestBody = JSON.stringify({number_of_posts: INITIAL_POSTS})

    const res = await fetch(`/api/posts.json`, { method: 'POST', body: apiRequestBody});
    const {posts, ids} = await res.json();

    return {
      props: {
        posts,
        ids
      }
    }
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import Post from '$lib/components/Post.svelte';
  import { feed, loadedPostIds } from '$lib/components/stores/posts';
  import { LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, MAX_STORED_POSTS, MAX_POSTS } from '$lib/config/homefeed';

  export let posts;
  export let ids;

  feed.set(posts);
  
  loadedPostIds.set(ids);
  
  console.log("feed is at beginning ")
  console.log($feed.length)
  
  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    return MAX_POSTS <= $feed.length;
  };
  
  //intersection obs
  
  onMount(() => {
    if (browser && document.querySelector('article')) {
      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (limitReached()) {
            console.log("Limit reached");
            observer.unobserve(entry.target);
          }
          showMorePosts();
        });
      };
      const options = { threshold: 0.25, rootMargin: '-100% 0% 100%' };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(document.querySelector('article:last-of-type'));
    }
  });

  $: showMorePosts;
  async function showMorePosts() {
    try {
      const newLimit = limit + LIMIT_STEP;

      if (newLimit <= $feed.length) {
        // load more images from store
        console.log('loaded posts from store')
        limit = newLimit;
      } else {
        const newPosts = await loadPosts(ADDITONAL_POSTS_TO_FETCH);
        console.log('fetched new posts')
        feed.set([...$feed, ...newPosts.posts]);
        console.log($feed.length)
        
        limit = newLimit;
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  async function loadNewPosts () {
    window.document.body.scrollTop = 0; // For Safari
    window.document.documentElement.scrollTop = 0;
    
    try {
      await fetch('/clear-posts', {method: 'DELETE'}); //delete ids cookie
      feed.set([]);
      loadedPostIds.set([]);
      const newPosts = await loadPosts(INITIAL_POSTS);
      feed.set(newPosts.posts);
      loadedPostIds.set(newPosts.ids);
      limit = INITIAL_POSTS;
    } catch (error) {
      console.error(error);
    }
  };


  async function loadPosts (numberOfPosts = ADDITONAL_POSTS_TO_FETCH) {
    const data = {
          number_of_posts: numberOfPosts,
          loaded_posts: $loadedPostIds.splice($loadedPostIds.length - MAX_STORED_POSTS, $loadedPostIds.length)
        };
    const requestBody = JSON.stringify(data)
    const response = await fetch('/api/posts.json', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody
    });
    const newPosts = await response.json();

    return newPosts;
  }
</script>

<style>
  main {
    min-height: 100vh;
  }

  main > button {
    display: block;
    padding: 1em;
    border-radius: 0.25em;
    border: none;
    box-shadow: inset 0 0 0 0.0625em #ddd;
    background-color: #eeeeee;
    margin: 1em auto;
    display: flex;
    align-items: center;
  }

  main > button > i {
    font-size: 1.5rem;
    margin-right: 0.5em;
  }
</style>

<main class="container">
  {#each $feed?.slice(0, limit) as post}
    <Post post={post} />
  {/each}
  {#if limitReached()}
  <button on:click={loadNewPosts}>
    <i class="ri-refresh-line"></i>
    Új posztok betöltése
  </button>
  {/if}
</main>

