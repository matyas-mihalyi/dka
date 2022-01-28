<script>
  export let post = {};
</script>

<article>
  <h2>{post.title}</h2>
  <img src="{post.img}" alt="">
  <p>
    {@html post.description}
    <a href={`/posts/${post.id}`}>Tovább &#8594</a>
  </p>
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

  h2 {
    font-size: 1.125rem;
  }

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    border-radius: 0.075em;
  }

  p {
    font-size: 0.875rem;
  }

  a {
    text-decoration: none;
    color: #444;
    display: inline;
    align-items: center;
  }


</style>