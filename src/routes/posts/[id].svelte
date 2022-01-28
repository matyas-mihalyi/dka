<script context="module">
  
  export async function load ({fetch, params}) {
    const { id } = params;
    const res = await fetch(`/api/posts/${id}.json`);
    const post = await res.json();

    return {
      props: {
        post
      }
    }
  }

</script>

<script>
  export let post;
</script>

<h1>{post.title}</h1>
<p>{@html post.description}</p>