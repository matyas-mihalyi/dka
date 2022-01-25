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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid #ccc;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    border-radius: 0.075em;
  }

</style>