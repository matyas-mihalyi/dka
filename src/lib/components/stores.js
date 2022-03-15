import { writable, derived, get } from "svelte/store";
import { session } from "$app/stores";
import { browser } from "$app/env";



export const savedPosts = writable([]);

// export const savedPosts = derived(session, ($session, set) => {
//   const savedPosts = getSavedPosts();
//   console.log("savedPosts ran")
//   set($session.savedPosts)
// });

export const getSavedPosts = browser ? JSON.parse(window.localStorage.getItem("savedPosts")) : "not in browser"; 

export function updateSavedPosts (posts=[]) {
  console.log("updateSavedPosts ran")
  session.update(($session) => ({...$session, posts}))
  console.log(get(session));
};
