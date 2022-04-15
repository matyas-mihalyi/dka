<script context="module">
  
  export async function load ({fetch}) {
    const res = await fetch(
      `/api/saved-posts.json`, { method: 'POST'}
      );
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
  import { LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, INITIAL_POSTS, SAVEDFEED_SEO } from '$lib/config/saved-posts';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { savedPosts } from '$lib/components/stores/saved-posts'
  import { updateStore, feed } from '$lib/components/stores/saved-posts'

  import InfiniteScroller from '$lib/components/InfiniteScroller/InfiniteScroller.svelte';
  import Message from '$lib/components/Message/Message.svelte'
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';

  const {title, description, contentType, image } = SAVEDFEED_SEO;
  const url = $page.url.href;

  export let posts;

  let noSavedItems = false;

  const noSavedItemsMessage = {
    title: "Még nincs mentett bejegyzésed",
    text: "Böngéssz a főoldalon és mentsd el kedvenc bejegyzéseidet",
    buttonData: {
      text: "A főoldalra",
      href: "/",
      icon: "ri-arrow-left-line"
    }
  }

  $: $savedPosts, checkForSavedPosts();

  function checkForSavedPosts () {
    console.log($savedPosts)
    if ($feed.length === 0 && (!$savedPosts || $savedPosts.length === 0)) {
    noSavedItems = true;
   }
  }
  // export let ids;

  feed.set(posts);

  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    if ($savedPosts) {
      return $savedPosts.length === $feed.length;
    }
  };
  
  onMount(() => {
    //update savedPostsstore
    updateStore();
  });

  async function showMorePosts() {
    try {
      const newLimit = limit + LIMIT_STEP;

      if (newLimit <= $feed.length) {
        // load more posts from store
        limit = newLimit;
      } else {
        const newPosts = await loadPosts(); //add next x number of saved ids
        feed.set([...$feed, ...await newPosts.posts]);        
        limit = newLimit;
      }
      
    } catch (error) {
      console.error(error);
    }
  }



  async function loadPosts () {
    const nextIds = getNextBatch();
    const data = { requested_posts: nextIds };
    const requestBody = JSON.stringify(data);
    const response = await fetch('/api/saved-posts.json', {
      method: 'POST',
      credentials: 'same-origin', 
      body: requestBody
    });
    const newPosts = await response.json();

    return newPosts;
  }

  function getNextBatch () {
    const fetchedPostIds = $feed.map(post => post.id);
    const remaingingPostIds = $savedPosts.filter((id)=> !fetchedPostIds.includes(id));
    const nextPostsToFetch = remaingingPostIds.slice(0, ADDITONAL_POSTS_TO_FETCH);

    return nextPostsToFetch;
  }

</script>

<main class=container>
  
  {#if noSavedItems}
   <Message message={noSavedItemsMessage}/>   
  {:else}

  <InfiniteScroller
    elementToObserve={'footer'}
    limitReached={limitReached()}
    showMorePosts={()=>showMorePosts()}
  >

    {#each $feed?.slice(0, limit) as post}
      <Post post={post} />
    {/each}
  
  </InfiniteScroller>
  {/if}

</main>

<Seo 
  {title}
  {description}
  {url}
  {contentType}
  {image}
/>