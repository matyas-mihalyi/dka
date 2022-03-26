import { get } from 'svelte/store';
import { saveToStore, deleteFromStore, savedPosts, getSavedPosts } from '../stores/saved-posts';
import { alertModal, closeModal } from '../Common/Alert/Alert.svelte';
import { ALERT_DURATION, COPY_ALERT_MESSAGE } from '$lib/config/alerts';

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
    if (saved) {
      return saved.includes(id);
    } else {
      return false;
    }
};

export async function sharePost (shareData) {
  if (navigator && navigator.share) {
    try {
      await navigator.share(shareData);
    } catch(err) {
      console.error(err)
    }
  } else {
    copyLink(shareData.url);
  }
}

function copyLink (text = "") {
  navigator.clipboard.writeText(text)
  alertModal(COPY_ALERT_MESSAGE);
  setTimeout(()=> {
    closeModal();
  }, ALERT_DURATION)
}