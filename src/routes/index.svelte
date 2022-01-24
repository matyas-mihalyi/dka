
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
  export let posts;
</script>

{#each posts as post}
  <h1>{post.title}</h1>
  <p>{post.description}</p>
{/each}
