<script context="module">

 export async function load ({fetch, params}) {
  const { topic } = await params;
  const res = await fetch(`/api/topic/${topic}.json`);

  const {posts, ids} = await res.json();

  return {
    props: {
      posts,
      ids,
      topic
    }
  }
}

</script>
<script>
  import Post from '$lib/components/Post/Post.svelte';

  export let posts;
  export let topic;
</script>

<main class="container">
  <h1>{topic}</h1>
  {#each posts as post}
    <Post post={post} />
  {/each}
</main>