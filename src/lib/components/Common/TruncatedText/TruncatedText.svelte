<script>
  export let text;
  export let limit;


  const truncatedText = () => {
    if (text.length < limit) {
      return text;
    }
    const cutoff = text.split("").findIndex((e,i)=> /\s/.test(e) && i > limit);
    return text.split("").slice(0, cutoff).join("") + " ...";
  };

  let fullText = false;
  let displayedText = truncatedText();

  function toggle () {
    if (limit < text.length) {
      fullText = !fullText;
      fullText ? 
      displayedText = text
      :
      displayedText = truncatedText();
    }
  }

</script>

<p on:click="{toggle}">
  {@html displayedText}
</p>
