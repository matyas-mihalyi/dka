export function scrollTo (pos) {
    window.scrollTo({
    top: pos,
    behavior: 'smooth'
  });
}

export function updateScrollPos (key, pos) {
    sessionStorage.setItem(key, pos)
}

export function updateLoadedPosts (key, ids = []) {
  const stored = JSON.parse(sessionStorage.getItem(`loadedPosts_${key}`)) || [];
  const updated = [...stored, ...ids];
  sessionStorage.setItem(`loadedPosts_${key}`, JSON.stringify(updated));
}