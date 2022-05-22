import { writable, get } from "svelte/store";
import { browser } from "$app/env";


export function getSavedPosts () { return browser ? JSON.parse(window.localStorage.getItem("savedPosts")) : null;}

export function updateSavedPostsStore () { savedPosts.set(getSavedPosts()); };

export const savedPosts = writable([]);

export const feed = writable([]);

export function saveToStore (id="") {
  const saved = get(savedPosts);
  if (saved) {
    savedPosts.set([id, ...saved])
  } else {
    savedPosts.set([id])
  }
};

export function deleteFromStore (id="") {
  const saved = get(savedPosts);
  const newList = saved.filter(post => post !== id);
  savedPosts.set(newList);
}

