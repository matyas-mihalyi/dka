<script context="module">
  
  export async function load ({fetch, params}) {
    const { id } = params;
    const res = await fetch(`/api/posts/${id}.json`);
    const post = await res.json();
    return {
      props: {
        post
      }
    };
  }

</script>

<script>
  export let post;
</script>

<article>
    
  <header>
    <h1>{post.title}</h1>
    <a href="/" title="Vissza a főoldalra">&#8592;</a>
  </header>

  <img src={post.img} alt={`${post.title} kép`}>
  <p>{@html post.description}</p>

  <span class="divider" aria-hidden="true"></span>
  
  <section>
    <p>Kapcsolódó</p>
    <a href={`/posts/${post.related.id}`}>{post.related.title}</a>
  </section>
  <section>
    <p>Szerző</p>
    <a href={`/posts/${post.related.id}`}>{post.related.title}</a>
  </section>
  
  <span class="divider" aria-hidden="true"></span>
  
  <a href={post.originalUrl}>Megtekintés a DKA oldalán</a>

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
  }

  section {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  section > p {
    font-weight: 500;
  }

  h1 {
    font-size: 1.125rem;
    text-align: center;
  }

  header {
    /* display: flex;
    flex-direction: row-reverse; */
    position: relative;
    width: 100%;
  }

  header > a {
    text-decoration: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  img {
    object-fit: contain;
    width: 100%;
    height: auto;
    border-radius: 0.075em;
  }

  p {
    font-size: 0.8125rem;
  }
  
  a {
    font-size: 0.8125rem;
    /* text-decoration: none; */
    color: #444;
    display: inline;
    align-items: center;
  }

  span.divider{
    width: 100%;
    border-bottom: 1px solid #ccc;
  }

</style>