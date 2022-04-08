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
  import { LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, MAX_STORED_POSTS, MAX_POSTS, HOMEFEED_SEO } from '$lib/config/homefeed';
  import { LOGO_PATH } from '$lib/config/general';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { feed, loadedPostIds } from '$lib/components/stores/posts';
  import { updateStore } from '$lib/components/stores/saved-posts'
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import { page } from '$app/stores';

  export let posts;
  export let ids;

  const {title, description, contentType, image } = HOMEFEED_SEO;
  const url = $page.url.href;
  image.url = `${url}${LOGO_PATH}`;

  feed.set(posts);
  
  loadedPostIds.set(ids);
  
  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    return (MAX_POSTS <= limit);
  };

  //intersection obs

  let observer;
  onMount(() => {
    if (browser && document.querySelector('footer')) {
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
      observer = new IntersectionObserver(handleIntersect, options);
      observer.observe(document.querySelector('footer'));
    }
    //update savedPostsstore
    updateStore()
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
      observer.observe(document.querySelector('footer'));
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

<style lang="less">
  @import './Home.less';
</style>

<main class="container">
  {#each $feed?.slice(0, limit) as post}
    <Post post={post} />
  {/each}
  {#if limitReached()}
    <button on:click={loadNewPosts}>
      <i class="ri-refresh-line"></i>
      Új képek betöltése
    </button>
  {/if}
</main>

<Seo 
  {title}
  {description}
  {url}
  {contentType}
  {image}
/>