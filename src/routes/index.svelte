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

  // console.log("feed is at beginning ")
  // console.log($feed)

  loadedPostIds.set(ids);

  let limit = INITIAL_POSTS;

  $: limitReached = () => {
    return MAX_POSTS <= $feed.length;
  };

  //intersection obs

  onMount(() => {
    if (browser && document.querySelector('footer')) {
      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          console.log(limitReached());
          if (limitReached()) {
            observer.unobserve(entry.target);
          }
          showMorePosts();
        });
      };
      const options = { threshold: 0.25, rootMargin: '-100% 0% 100%' };
      const observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(document.querySelector('footer'));
    }
  });

  $: showMorePosts;
  async function showMorePosts() {
    try {
      const newLimit = limit + LIMIT_STEP;

      if (newLimit <= $feed.length) {
        // load more images from store
        limit = newLimit;
      } else {
        const data = {
          number_of_posts: ADDITONAL_POSTS_TO_FETCH,
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
        feed.set([...$feed, ...newPosts.posts]);
        // console.log("$feed is after")
        // console.log($feed)
        limit = newLimit;
      }
      
    } catch (error) {
      console.error(error);
    }
  }
</script>

<style>
  main {
    min-height: 100vh;
  }
</style>

<main class="container">
  {#each $feed?.slice(0, limit) as post}
    <Post post={post} />
  {/each}
  {#if limitReached()}
  <button>
    Új posztok betöltése
  </button>
  {/if}
</main>

