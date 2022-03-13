import { savedPosts } from "$lib/components/stores";
import {writable} from 'svelte/store';

const getSavedPosts = () => JSON.parse(localStorage.getItem("savedPosts"));
function updateStore () { savedPosts.set(getSavedPosts()); }

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