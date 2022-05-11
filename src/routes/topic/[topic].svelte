<script context="module">
  
  export async function load ({fetch, params, url}) {
  const { topic } = await params;
  const page = await url.searchParams.get("page");
  
  const idsRes = await fetch(`/api/topic/${topic}.json`);
  const ids = await idsRes.json();

  const postsRes = await fetch(`/api/get-posts.json`, { method: 'POST', body: JSON.stringify({requested_ids: await ids.slice(0, INITIAL_POSTS)}) });
  const posts = await postsRes.json();

  return {
    status: postsRes.status,
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
  import { updateScrollPos, scrollTo, updateLoadedPosts } from '$lib/utils/index';

  import Loading from '$lib/components/Loading/Loading.svelte';
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import InfiniteScroller from '$lib/components/InfiniteScroller/InfiniteScroller.svelte'

  export let posts;
  export let topic;
  export let ids;


  let loading = false;
  // store ids in session storage
  onMount( async ()=> {
    // to improve: ids are only returned on initial fetch
    sessionStorage.setItem(`postIds_${topic}`, JSON.stringify(ids));

    const previousScrollPosition = sessionStorage.getItem(`scrollPosition_${topic}`);
    
    //get loaded posts from sessionStorage
    const previouslyLoadedPosts = sessionStorage.getItem(`loadedPosts_${topic}`);

    if (previouslyLoadedPosts && JSON.parse(previouslyLoadedPosts).length) {
      loading = true;

      console.log('adding posts from sessionStorage')
      const additionalIdsToLoad = await JSON.parse(sessionStorage.getItem(`loadedPosts_${topic}`));
      await fetch('/api/get-posts.json', {
        method: 'POST', 
        body: JSON.stringify({requested_ids: await additionalIdsToLoad})})
        .then(res => res.json())
        .then(res => {
          feed.set([...$feed, res]); // add posts to feed
          limit += res.length; // increase limit so posts will show up
        })
        //scroll to
        .then(()=> {
          loading = false;
          if (previousScrollPosition) {
            console.log('Setting scroll position to ' + previousScrollPosition)
            scrollTo(previousScrollPosition);
          }
        })
        .catch(e => console.error(e));
    }

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
        const nextPostIds = getNextBatch();
        const newPosts = await loadPosts(nextPostIds); //add next x number of saved ids
        feed.set([...$feed, ...await newPosts]);        
        limit = newLimit;

        updateLoadedPosts(topic, nextPostIds);

      }     
    } catch (error) {
      console.error(error);
    }
  }

  async function loadPosts (ids = []) {
    const postsRes = await fetch('/api/get-posts.json', {method: 'POST', body: JSON.stringify({requested_ids: ids})});
    const posts = await postsRes.json();
    return posts;
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

  let scrollY
  
</script>

<style>
  h1 {
    margin-top: 2.5em;
    color: var(--ui-secondary);
    position: relative;
  }

</style>

<svelte:window bind:scrollY on:scroll="{updateScrollPos(`scrollPosition_${topic}`, scrollY)}"/>

{#if loading}
  <Loading />
{/if}

<main class="container">
  <InfiniteScroller 
    elementToObserve={'article.post:last-of-type'}
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
