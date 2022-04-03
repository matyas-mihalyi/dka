<script>
  import { PROJECT_NAME, META_DESCRIPTION } from '$lib/config/general'

  export let title;
  export let description = META_DESCRIPTION;
  export let url;
  export let contentType;
  export let image;

  const metaTitle = `${title} | ${PROJECT_NAME}`;


</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta type="description" content="{description}"/>
  <meta
    name="robots"
    content="index, follow, max-snippet:-1, max-image-preview:large"
  />
  <html lang="hu">

  <!-- twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:url" content={url} />
  {#if image}
    <meta name="twitter:image" content={image.url} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}

  <!-- fb -->
  <meta property="og:url" content="{url}" />
  <meta property="og:type" content="{contentType}" />
  <meta property="og:title"  content="{metaTitle}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" itemprop="image" content="{image.url}" />

</svelte:head>