<script>
  import { theme, setTheme } from '$lib/components/stores/theme';
  
  $: icon =  $theme === 'light' ? 'sun' : 'moon';
  $: nextTheme = $theme === 'light' ?'dark' : 'light';

</script>

<span role="none">
  <i 
  class="{`ri-${icon}-line`}"
  on:click="{()=> setTheme(nextTheme)}"
  ></i>
</span>

<style lang="less">
  @import '/ThemeSwitcher';
</style>