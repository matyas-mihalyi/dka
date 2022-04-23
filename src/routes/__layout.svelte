<script>
  import { theme } from '$lib/components/stores/theme';
  import { navigating, page } from '$app/stores';
  import Menu from '$lib/components/Menu/Menu.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import Alert from '$lib/components/Common/Alert/Alert.svelte';
  import Loading from '$lib/components/Loading/Loading.svelte';
  import {updateHistory} from '$lib/utils'

  $: $page, updateHistory($page.url.pathname);

</script>

<style>
  @import '$lib/styles/global.css';
</style>

<div id="app-wrapper" class="{$theme}">
  <Menu />
  
  {#if $navigating}
  <Loading />
  {:else}
  <slot></slot>
  {/if}
  <Footer />
  
  <Alert />
</div>