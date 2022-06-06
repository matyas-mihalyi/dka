<script context="module">
  import { INITIAL_POSTS } from '$lib/config/saved-posts';
  
  export async function load ({fetch, session}) {
    const ids = await session.savedPostIds;
    const postsRes = await fetch(`/api/get-posts.json`, { method: 'POST', body: JSON.stringify({requested_ids: await ids}) });
    const posts = await postsRes.json();

    return {
      props: {
        posts
      }
    }
  }

</script>

<script>
  import { LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, SAVEDFEED_SEO, NO_SAVED_ITEMS_MESSAGE } from '$lib/config/saved-posts';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { savedPosts } from '$lib/components/stores/saved-posts';
  import { updateSavedPostsStore, feed } from '$lib/components/stores/saved-posts';
  import { scrollTo, updateScrollPos, updateLoadedPosts, updateFeedFromSessionStorage,loadPosts, getNextBatch } from '$lib/utils/index';

  import InfiniteScroller from '$lib/components/InfiniteScroller/InfiniteScroller.svelte';
  import Message from '$lib/components/Message/Message.svelte'
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';

  const { title, description, contentType, image } = SAVEDFEED_SEO;
  const url = $page.url.href;

  export let posts;

  let noSavedItems = false;

  $: $savedPosts, checkForSavedPosts();

  function checkForSavedPosts () {
    if ($feed.length === 0 && (!$savedPosts || $savedPosts.length === 0)) {
      noSavedItems = true;
    } else {
      noSavedItems = false;
    }
  }

  feed.set(posts);

  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    if ($savedPosts && $savedPosts.length) {
      return $savedPosts.length === $feed.length;
    }
  };
  
  let loading =  false;

  onMount( async () => {
    //update savedPostsstore
    updateSavedPostsStore();

    const previousScrollPosition = sessionStorage.getItem('scrollPosition_saved');
    
    //get loaded posts from sessionStorage
    const previouslyLoadedPosts = sessionStorage.getItem('loadedPosts_saved');

    if (previouslyLoadedPosts && JSON.parse(previouslyLoadedPosts).length) {
      loading = true;

      const additionalIdsToLoad = await JSON.parse(sessionStorage.getItem('loadedPosts_saved'));
      await fetch('/api/get-posts.json', {
        method: 'POST', 
        body: JSON.stringify({requested_ids: await additionalIdsToLoad})})
        .then(res => res.json())
        .then(res => {
          // add posts to feed
          updateFeedFromSessionStorage(feed, res);          
          limit += res.length; // increase limit so posts will show up
        })
        //scroll to
        .then(()=> {
          loading = false;
          if (previousScrollPosition) {
            scrollTo(previousScrollPosition);
          }
        })
        .catch(e => console.error(e));
    }


  });

  async function showMorePosts() {
    try {
      const newLimit = limit + LIMIT_STEP;

      if (newLimit <= $feed.length) {
        // load more posts from store
        limit = newLimit;
      } else {
        const nextIds = getNextBatch($feed, $savedPosts, ADDITONAL_POSTS_TO_FETCH);
        const newPosts = await loadPosts(nextIds); //add next x number of saved ids
        feed.set([...$feed, ...await newPosts]);        
        limit = newLimit;

        updateLoadedPosts(`saved`, nextIds);
      }
      
    } 
    
    catch (error) {
      console.error(error);
    }
  }

  let scrollY;
</script>

<svelte:window bind:scrollY on:scroll="{updateScrollPos('scrollPosition_saved', scrollY)}"/>


<main class=container>
  
  {#if noSavedItems}
   <Message message={NO_SAVED_ITEMS_MESSAGE}/>   
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