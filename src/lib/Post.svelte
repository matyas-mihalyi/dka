<script>
  export let post = {};
</script>

<article>
  <h2>{post.title}</h2>
  <img src="{post.img}" alt="">
  <p>{post.description}</p>
</article>

<style>
  article {
    width: 100%;
    padding: 1em;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
  }

</style>