
<script context="module">
  
  export async function load ({fetch}) {
    const res = await fetch(`/api/posts.json`);
    const posts = await res.json();

    return {
      props: {
        posts
      }
    }
  }
</script>

<script>
  import Post from '$lib/Post.svelte'

  export let posts;
</script>

{#each posts as post}
  <Post post={post} />
{/each}
