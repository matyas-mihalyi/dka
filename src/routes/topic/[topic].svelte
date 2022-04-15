<script context="module">

 export async function load ({fetch, params, url}) {
  const { topic } = await params;
  const page = await url.searchParams.get("page");
  
  const res = await fetch(`/api/topic/${topic}.json`);
  const ids = await res.json();


  const requestBody = JSON.stringify({ids});
  const postsRes = await fetch(`/api/posts`, {method: 'POST', body: requestBody});

  const posts = await postsRes.json();

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
  import {TOPIC_FEED_SEO} from '$lib/config/topics';
  import { page } from '$app/stores';

  import Post from '$lib/components/Post/Post.svelte';
  import Seo from '$lib/components/Common/Seo/Seo.svelte';

  export let posts;
  export let topic;
  export let ids;

  console.log(ids)

  TOPIC_FEED_SEO.description = TOPIC_FEED_SEO.description + topic;
  const { description, contentType, image } = TOPIC_FEED_SEO;
  const url = $page.url.href;
  

</script>

<style>
  h1 {
    margin-top: 2.5em;
  }
</style>

<main class="container">
  <h1>#{topic}</h1>
  {#each posts.posts as post}
    <Post post={post} />
  {/each}
</main>


<Seo 
  title={topic}
  {description}
  {url}
  {contentType}
  {image}
/>
