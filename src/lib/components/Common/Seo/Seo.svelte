<script>
  import { TITLE_SUFFIX } from '$lib/config/general';
  import logo from '$lib/assets/dkalogo.jpg';

  export let title;
  export let description;
  export let url;
  export let contentType;
  export let image;

  const metaTitle = `${title} ${TITLE_SUFFIX}`;

</script>

<svelte:head>
  <title>{metaTitle}</title>
  <meta name="description" content="{description}"/>
  <meta
    name="robots"
    content="index, follow, max-snippet:-1, max-image-preview:large"
  />
  
  <!-- twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={metaTitle} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:url" content={url} />
  {#if image}
  <meta name="twitter:image" content={image.url? image.url : logo} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}

  <!-- fb -->
  <meta property="og:url" content="{url}" />
  <meta property="og:type" content="{contentType}" />
  <meta property="og:title"  content="{metaTitle}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" itemprop="image" content="{image.url? image.url : logo}" />

  <!-- colour -->
  <meta name="theme-color" content="#cccccc" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#2a2a2a" media="(prefers-color-scheme: dark)">
  
</svelte:head>