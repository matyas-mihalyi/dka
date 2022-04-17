<script>
  import { TITLE_SUFFIX } from '$lib/config/general';
  import logo from '$lib/assets/dkalogo.jpg';
  import {page} from '$app/stores';

  export let title;
  export let description;
  export let url;
  export let contentType;
  export let image;

  const logoPath = `${$page.url.origin}${logo}`;

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
    <meta name="twitter:image" content={image.url? image.url : logoPath} />
    <meta name="twitter:image:alt" content={image.alt} />
  {/if}

  <!-- fb -->
  <meta property="og:url" content="{url}" />
  <meta property="og:type" content="{contentType}" />
  <meta property="og:title" content="{metaTitle}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" itemprop="image" content="{image.url? image.url : logoPath}" />

  <!-- colour -->
  <meta name="theme-color" content="#14606b" />
  
</svelte:head>