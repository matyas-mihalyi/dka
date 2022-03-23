import { get } from 'svelte/store';
import { saveToStore, deleteFromStore, savedPosts, getSavedPosts } from '../stores/saved-posts';
import { browser } from '$app/env';


export function savePost (id="") {
  saveToStore(id);
  const store = get(savedPosts);
  fetch('/save-post', {method: 'PUT', body: id});
  localStorage.setItem("savedPosts", JSON.stringify(store));
  
};

export function unSavePost (id="") {
  deleteFromStore(id);
  const store = get(savedPosts);
  fetch('/delete-post', {method: 'PUT', body: id});
  localStorage.setItem("savedPosts", JSON.stringify(store));
};

export function isSaved (id="") {
    const saved = getSavedPosts();
    return saved.includes(id);
};