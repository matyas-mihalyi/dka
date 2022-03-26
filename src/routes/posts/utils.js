import { savedPosts } from "$lib/components/stores";
import {writable} from 'svelte/store';
import { browser } from "$app/env";

export { sharePost } from '$lib/components/Post/post.utils'

const getSavedPosts = () => browser ? JSON.parse(window.localStorage.getItem("savedPosts")) : "problémaaaaa";

export function updateStore () { savedPosts.set(getSavedPosts()); };

export function savePost (id="") {
  
  if (!getSavedPosts()) {
    localStorage.setItem("savedPosts", JSON.stringify([id]));
  } else {
    localStorage.setItem("savedPosts", JSON.stringify([...getSavedPosts(), id]));
  };
  
  updateStore();
  
  console.log(JSON.parse(localStorage.getItem('savedPosts')))
};

export function deleteSavedPost (id="") {
  
  const updatedSavedPosts = getSavedPosts().filter(post => post !== id);
  
  localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
  
  updateStore();

  console.log(JSON.parse(localStorage.getItem('savedPosts')))
}

export const saved = (id="") => {
  if (getSavedPosts() && getSavedPosts().length) {
    return getSavedPosts().includes(id);
  }
  return false
}