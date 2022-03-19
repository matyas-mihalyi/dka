<script context="module">
  
  export async function load ({fetch}) {

    const NUMBER_OF_INITIAL_POSTS = 9; 
    const apiReqestBody = JSON.stringify({number_of_posts: NUMBER_OF_INITIAL_POSTS})

    const res = await fetch(`/api/posts.json`, { method: 'POST', body: apiReqestBody});
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
  import Post from '$lib/components/Post.svelte'
  export let posts;

</script>

{#each posts as post}
<Post post={post} />
{/each}
