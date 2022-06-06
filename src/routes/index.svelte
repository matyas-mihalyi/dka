<script context="module">
  import { INITIAL_POSTS } from '$lib/config/homefeed';
  
  export async function load ({fetch}) {

    const idsRes = await fetch(`/api/posts.json`);
    const ids = await idsRes.json();
    const postsRes = await fetch(`/api/get-posts.json`, { method: 'POST', body: JSON.stringify({requested_ids: await ids.slice(0, INITIAL_POSTS)}) });
    const posts = await postsRes.json();

    return {
      props: {
        posts,
        ids
      }
    }
  }
</script>

<script>
  import { LIMIT_STEP, ADDITONAL_POSTS_TO_FETCH, MAX_POSTS, HOMEFEED_SEO } from '$lib/config/homefeed';
  import { onMount } from 'svelte';
  import { feed } from '$lib/components/stores/posts';
  import { updateSavedPostsStore } from '$lib/components/stores/saved-posts'
  import { page } from '$app/stores';
  import { scrollTo, updateScrollPos, updateLoadedPosts, updateFeedFromSessionStorage, loadPosts, getNextBatch } from '$lib/utils/index';

  import InfiniteScroller, {observe} from '$lib/components/InfiniteScroller/InfiniteScroller.svelte';
  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';
  import Button from '$lib/components/Common/Button/Button.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';

  export let posts;
  export let ids;

  //SEO
  const {title, description, contentType, image } = HOMEFEED_SEO;
  const url = $page.url.href;

  // infinite scroller
  feed.set(posts);
  
  let limit = INITIAL_POSTS;
  
  $: limitReached = () => {
    return (MAX_POSTS <= limit);
  };

  let loading = false;
  
  onMount( async () => {
    //update savedPostsstore
    updateSavedPostsStore();
    
    const previousScrollPosition = sessionStorage.getItem('scrollPosition_home');
    
    //get loaded posts from sessionStorage
    const previouslyLoadedPosts = sessionStorage.getItem('loadedPosts_home');

    if (previouslyLoadedPosts && JSON.parse(previouslyLoadedPosts).length) {
      loading = true;

      const additionalIdsToLoad = await JSON.parse(sessionStorage.getItem('loadedPosts_home'));
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
        const nextPostIds = getNextBatch($feed, ids, ADDITONAL_POSTS_TO_FETCH);
        // fetch new posts
        const newPosts = await loadPosts(nextPostIds);
        
        feed.set([...$feed, ...await newPosts]);
        limit = newLimit;

        const newIds = await newPosts.map(post => post.id);
        updateLoadedPosts(`home`, newIds);
      }
      
    } catch (error) {
      console.error(error);
    }
  }
  
  async function loadNewPosts () {
    scrollTo(0);
    
    try {
      await fetch('/clear-posts', {method: 'DELETE'}); //delete ids cookie
      feed.set([]);
      sessionStorage.setItem('loadedPosts_home', JSON.stringify([]));
      sessionStorage.setItem('scrollPosition_home', 0);

      const idsRes = await fetch(`/api/posts.json`);
      const newIds = await idsRes.json();
      const postsRes = await fetch(`/api/get-posts.json`, { method: 'POST', body: JSON.stringify({requested_ids: await newIds.slice(0, INITIAL_POSTS)}) });
      const newPosts = await postsRes.json();

      feed.set(await newPosts);
      ids = await newIds;
      
      limit = INITIAL_POSTS;
      
      observe.set(true); // restart observer
    } catch (error) {
      console.error(error);
    }
  };

  let scrollY;

</script>

<style lang="less">
  @import './Home.less';
</style>

<Seo 
  {title}
  {description}
  {url}
  {contentType}
  {image}
/>

<svelte:window bind:scrollY on:scroll="{updateScrollPos('scrollPosition_home', scrollY)}"/>

{#if loading}
  <Loading />
{/if}

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
    <Button 
      text={'Új képek betöltése'}
      icon={'ri-refresh-line'}
      on:click={loadNewPosts}
    />
  {/if}
  </InfiniteScroller>
</main>

