<script>
  export let menuItem;
</script>

<style lang="less">
  @import './MenuLink';
</style>

<li role="none">
  <a role="menuitem" href="{menuItem.href}">
    {menuItem.text}
  </a>
</li>
