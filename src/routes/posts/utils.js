import { savedPosts } from "$lib/components/stores";
import { browser } from "$app/env";

export { sharePost } from '$lib/components/Post/post.utils';
export { truncateDesc } from '$lib/utils';

const getSavedPosts = () => browser ? JSON.parse(window.localStorage.getItem("savedPosts")) : "problémaaaaa";

export function updateSavedPostsStore () { savedPosts.set(getSavedPosts()); };

export function savePost (id="") {
  
  if (!getSavedPosts()) {
    localStorage.setItem("savedPosts", JSON.stringify([id]));
  } else {
    localStorage.setItem("savedPosts", JSON.stringify([...getSavedPosts(), id]));
  };
  
  updateSavedPostsStore();
  
  console.log(JSON.parse(localStorage.getItem('savedPosts')))
};

export function deleteSavedPost (id="") {
  
  const updatedSavedPosts = getSavedPosts().filter(post => post !== id);
  
  localStorage.setItem("savedPosts", JSON.stringify(updatedSavedPosts));
  
  updateSavedPostsStore();

  console.log(JSON.parse(localStorage.getItem('savedPosts')))
}

export const saved = (id="") => {
  if (getSavedPosts() && getSavedPosts().length) {
    return getSavedPosts().includes(id);
  }
  return false
}