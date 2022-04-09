<script>
  import Menu from '$lib/components/Menu/Menu.svelte';
  import Footer from '$lib/components/Footer/Footer.svelte';
  import Alert from '$lib/components/Common/Alert/Alert.svelte'
</script>

<style>
  @import '$lib/styles/global.css';
</style>

<Menu />

<slot></slot>

<Footer />

<Alert />