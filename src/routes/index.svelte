<script context="module">
  export async function load ({fetch}) {
    const res = await fetch(`/api/post.json`);
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
<img src={post.img} alt="kép">
<p>{post.description}</p>
