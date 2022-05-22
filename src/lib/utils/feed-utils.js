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

export async function loadPosts (ids = []) {
  const postsRes = await fetch('/api/get-posts.json', {method: 'POST', body: JSON.stringify({requested_ids: ids})});
  const posts = await postsRes.json();
  return posts;
}


export function getNextBatch ( feed = [], ids = [], additionalPostsToFetch ) {
  console.log('getNextBatch ran')
  const fetchedPostIds = feed.map(post => post.id);
  const remaingingPostIds = ids.filter((id)=> !fetchedPostIds.includes(id));
  return remaingingPostIds.slice(0, additionalPostsToFetch);
}