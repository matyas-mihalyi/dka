import { getIds, getCookie } from '$lib/utils';
import { getPosts } from './api.utils';
import { MAX_POSTS_IN_COOKIES } from '$lib/config/homefeed';

export const post = async ({ request }) => {
  console.log("fetched")

  const body = JSON.parse(await request.text());
  const numberOfRequestedPosts = await body.number_of_posts;
  const loadedPosts = await body.loaded_posts;
  const cookies = request.headers.get('cookie');
  const previousIds = await JSON.parse(getCookie(cookies, 'ids'));
  
  // save only last posts to cookie
  const idsToStore = (arr=[]) => {
    if (arr.length > MAX_POSTS_IN_COOKIES) {
      return arr.splice(0, arr.length - MAX_POSTS_IN_COOKIES);
    } else {
      return arr;
    }
  }

  
  let ids;
  let idString;
  
  if (previousIds && !loadedPosts) {
    ids = previousIds;
    idString = JSON.stringify(idsToStore(previousIds))
  } else {
    ids = getIds(numberOfRequestedPosts, loadedPosts);
    idString = JSON.stringify(ids);
  } 
  
  console.log(idString)
  
  const posts = await getPosts(ids);

  if (previousIds && !loadedPosts) {
    return {
      status: 200,
      body: {
        posts,
        ids
      }
    };
  } else {
    return {
      status: 200,
      headers: {
        'Set-Cookie': `ids=${idString}; SameSite=Strict; HttpOnly; Secure; path=/`
      },
      body: {
        posts,
        ids
      }
    };
  }

}