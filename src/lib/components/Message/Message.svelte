<script>
  import Button from "../Common/Button/Button.svelte";

  export let message = {title: "", text: ""}

  const {href, text, icon} = message.buttonData;
</script>

<main>
  <h2>{message.title}</h2>
  <p>{message.text}</p>
  {#if text}
    <Button {href} {text} {icon} />
  {/if}
</main>

<style>
  main {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1em;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  p {
    margin-bottom: 1rem;
  }

  h2, p {
    color: var(--font-color-default);
  }
</style>
