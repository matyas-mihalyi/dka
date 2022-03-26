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
    padding: 1em 0;
    text-align: right;
  }

  li:not(:last-child) {
    border-bottom: 2px solid #ddd;
  }

  a {
    text-decoration: none;
    color: #000;
    font-size: 1.25rem;
  }


</style>