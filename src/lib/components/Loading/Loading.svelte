<script>
  import {fade} from 'svelte/transition';
</script>

<div class="loading-wrapper" transition:fade >
  <i class="ri-refresh-line"></i>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    height: 100vh;
  }

  i {
    font-size: 3rem;
    animation: rotate 1s infinite, opacity 3s forwards;;
    color: var(--font-color-default);
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes opacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 100;
    }
  }

</style>