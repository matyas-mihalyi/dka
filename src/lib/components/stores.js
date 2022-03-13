import { writable, derived } from "svelte/store";
import { session } from "$app/stores";

// const getSavedPosts = () => JSON.parse(localStorage.getItem("savedPosts"));

export const savedPosts = writable([]);

// export const _posts = derived(session, ($session, set) => {
//   const savedPosts = getSavedPosts();
//   set($session.savedPosts)
// })

// export function updatedSavedPosts (posts=[]) {
//   session.update(($session) => ({...$session, posts}))
// };
