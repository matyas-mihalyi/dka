<script context="module">
  
  export async function load ({fetch}) {

    const res = await fetch(`/api/posts.json`);
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
  import Post from '$lib/Post.svelte'
  export let posts;

</script>

{#each posts as post}
<Post post={post} />
{/each}
