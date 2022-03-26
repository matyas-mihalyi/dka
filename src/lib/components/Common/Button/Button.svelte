<script>
  export let buttonData;

  const {text, href, icon} = buttonData;
</script>


<button>
  <a href="{href}">
    {#if icon}
      <i class="{icon}"></i>
    {/if}
    {text}
  </a>
</button>

<style>
  button {
    display: block;
    padding: 1em;
    border-radius: 0.25em;
    border: none;
    box-shadow: inset 0 0 0 0.0625em #ddd;
    background-color: #eeeeee;
    margin: 1em auto;
    
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  button i{
    font-size: 1.5rem;
    margin-right: 0.5em;
  }
</style>