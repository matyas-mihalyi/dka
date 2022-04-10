<script>
  import Menu from '$lib/components/Menu/Menu.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import Alert from '$lib/components/Common/Alert/Alert.svelte';
  import { theme } from '$lib/components/stores/theme';
</script>

<style>
  @import '$lib/styles/global.css';
</style>
<div id="app-wrapper" class="{$theme}">
  <Menu />
  
  <slot></slot>
  
  <Footer />
  
  <Alert />
</div>