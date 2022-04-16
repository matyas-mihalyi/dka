<script context="module">
  import { writable } from "svelte/store";

  export const observe = writable(true);

</script>

<script>
  import { onMount } from "svelte/internal";
  import {browser} from "$app/env";

  export let elementToObserve;
  export let limitReached = false;
  // export let limit;
  // export let limitStep = 6;
  // export let feedLength;
  // export let additionalPostsToFetch;
  export let showMorePosts;
  
  
  let observer;
  onMount(() => {
    
    // updateStore() update in index.svelte!
    
    if (browser && document.querySelector(elementToObserve)) {
      const handleIntersect = (entries, observer) => {
        entries.forEach((entry) => {
          if (limitReached) {
            console.log("Limit reached");
            observer.unobserve(entry.target);
            observe.set(false);
          }
          showMorePosts();
        });
      };
      const options = { threshold: 0.25, rootMargin: '-100% 0% 100%' };
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
