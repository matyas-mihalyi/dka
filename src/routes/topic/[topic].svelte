<script context="module">

 export async function load ({fetch, params, url}) {
  const { topic } = await params;
  const page = await url.searchParams.get("page");
  
  const res = await fetch(`/api/topic/${topic}.json`, {method: 'POST'});
  const {posts, ids} = await res.json();

  return {
    status: res.status,
    props: {
      posts,
      ids,
      topic
    }
  }
}

</script>
<script>
  import { TOPIC_FEED_SEO, INITIAL_POSTS, LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, MAX_POSTS } from '$lib/config/topics';
  import { page } from '$app/stores';
  import { onMount } from 'svelte/internal';
  import { writable } from 'svelte/store';

  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import InfiniteScroller from '$lib/components/InfiniteScroller/InfiniteScroller.svelte'

  export let posts;
  export let topic;
  export let ids;

  // store ids in session storage
  onMount(()=> {
    // to improve: ids are only returned on initial fetch
    window.sessionStorage.setItem(topic, JSON.stringify(ids));
  });

  // initialize store with first returned posts
  const feed = writable(posts);
  let limit = INITIAL_POSTS;
  $: limitReached = () => {
    return (MAX_POSTS <= limit);
  };

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
    const data = { requested_posts: nextIds, topic };
    const requestBody = JSON.stringify(data);
    const response = await fetch(`/api/topic/${topic}.json`, {
      method: 'POST',
      credentials: 'same-origin', 
      body: requestBody
    });
    const newPosts = await response.json();

    return newPosts;
  }

  // to do: improve performance by not iterating through the whole array
  function getNextBatch () {
    const fetchedPostIds = $feed.map(post => post.id);
    const remaingingPostIds = ids.filter((id)=> !fetchedPostIds.includes(id));
    const nextPostsToFetch = remaingingPostIds.slice(0, ADDITONAL_POSTS_TO_FETCH);

    return nextPostsToFetch;
  }


  // SEO stuff
  TOPIC_FEED_SEO.description = TOPIC_FEED_SEO.description + topic;
  const { description, contentType, image } = TOPIC_FEED_SEO;
  const url = $page.url.href;
  
</script>

<style>
  h1 {
    margin-top: 2.5em;
    color: var(--ui-secondary);
    position: relative;
  }

</style>

<main class="container">
  <InfiniteScroller 
    elementToObserve={'footer'}
    limitReached={limitReached()}
    showMorePosts={()=>showMorePosts()}
  >
    <h1>#{topic}</h1>
    {#each $feed?.slice(0, limit) as post}
      <Post post={post} />
    {/each}
  </InfiniteScroller>
</main>


<Seo 
  title={topic}
  {description}
  {url}
  {contentType}
  {image}
/>
