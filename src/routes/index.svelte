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
  import { onMount } from 'svelte';
  import { feed, loadedPostIds } from '$lib/components/stores/posts';
  import { updateStore } from '$lib/components/stores/saved-posts'
  import { page } from '$app/stores';

  import InfiniteScroller, {observe} from '$lib/components/InfiniteScroller/InfiniteScroller.svelte';
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import Button from '$lib/components/Common/Button/Button.svelte';

  export let posts;
  export let ids;

  const {title, description, contentType, image } = HOMEFEED_SEO;
  const url = $page.url.href;

  feed.set(posts);
  
  loadedPostIds.set(ids);
  
  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    return (MAX_POSTS <= limit);
  };


  onMount(() => {
    //update savedPostsstore
    updateStore()
  });

  async function showMorePosts() {
    try {
      const newLimit = limit + LIMIT_STEP;

      if (newLimit <= $feed.length) {
        // load more posts from store
        limit = newLimit;
      } else {
        const newPosts = await loadPosts(ADDITONAL_POSTS_TO_FETCH);
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
      observe.set(true); // restart observer
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
<main class=container>
  <InfiniteScroller
    elementToObserve={'footer'}
    limitReached={limitReached()}
    showMorePosts={()=>showMorePosts()}
  >
    {#each $feed?.slice(0, limit) as post}
      <Post post={post} />
    {/each}
    {#if limitReached()}
      <button on:click={loadNewPosts}>
        <i class="ri-refresh-line"></i>
        Új képek betöltése
      </button>
      <Button 
        text={'Új képek betöltése'}
        icon={'ri-refresh-line'}
        on:click={loadNewPosts}
      />
    {/if}
  </InfiniteScroller>
</main>


<Seo 
  {title}
  {description}
  {url}
  {contentType}
  {image}
/>