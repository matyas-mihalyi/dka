/* 
  Post id storing in sessionStorage
*/

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
  for (let id of ids) {
    if (!stored.includes(id)) {
      stored.push(id);
    }
  }
  sessionStorage.setItem(`loadedPosts_${key}`, JSON.stringify(stored));
}

export function updateFeedFromSessionStorage (feed, posts) {
  feed.update((store)=> {
    const feed = store;
    for (let post of posts) {
      feed.push(post);
    }
    return feed
  });
}

/* 
  Post loading
*/

export async function loadPosts (ids = []) {
  const postsRes = await fetch('/api/get-posts.json', {method: 'POST', body: JSON.stringify({requested_ids: ids})});
  const posts = await postsRes.json();
  return posts;
}


export function getNextBatch ( feed = [], ids = [], additionalPostsToFetch ) {
  const fetchedPostIds = feed.map(post => post.id);
  const remaingingPostIds = ids.filter((id)=> !fetchedPostIds.includes(id));
  return remaingingPostIds.slice(0, additionalPostsToFetch);
}