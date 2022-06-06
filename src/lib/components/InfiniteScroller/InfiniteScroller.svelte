<script context="module">
  import { writable } from "svelte/store";

  export const observe = writable(true);

</script>

<script>
  import { onMount } from "svelte/internal";
  import {browser} from "$app/env";

  export let elementToObserve;
  export let limitReached = false;
  export let showMorePosts;
  
  
  let observer;
  onMount(() => {
    
    // updateSavedPostsStore() update in index.svelte!
      if (browser && document.querySelector(elementToObserve)) {
        const handleIntersect = (entries, observer) => {
          entries.forEach((entry) => {
            if (limitReached) {
              // console.log("Limit reached");
              observer.unobserve(entry.target);
              observe.set(false);
              return
            }
            if (entry.isIntersecting && !limitReached) {
              showMorePosts();
            }
          });
        };
        const options = { threshold: 0.5, rootMargin: '0% 0% 100% 0%' };
        observer = new IntersectionObserver(handleIntersect, options);
        observer.observe(document.querySelector(elementToObserve));
      }
  });

  $: $observe, restart();

  function restart () {
    if (observer && $observe) {
      observer.observe(document.querySelector(elementToObserve));
    }
  }

</script>

<slot></slot>
