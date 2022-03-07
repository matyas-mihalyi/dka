<script>
  export let menuItem;
</script>

<li role="none">
  <a role="menuitem" href="{menuItem.href}">
    {menuItem.text}
  </a>
</li>

<style>
  li {
    list-style: none;
    padding: 0.5em 1em
  }

  a {
    text-decoration: none;
    color: #000;
  }


</style>