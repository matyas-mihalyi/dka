import { xml2js } from 'xml-js';
import { getPictureUrl, getDescription, getIds, getCookie, getKeywords } from '$lib/utils';
import { getPosts } from './api.utils';

export const post = async ({ request }) => {
  
  const body = JSON.parse(await request.text());
  const numberOfRequestedPosts = await body.number_of_posts;
  const loadedPosts = await body.loaded_posts;
  const cookies = request.headers.get('cookie');
  const previousIds = await JSON.parse(getCookie(cookies, 'ids'));
  
  let ids;
  let idString;
  if (previousIds && !loadedPosts) {
    ids = previousIds;
    idString = JSON.stringify(previousIds)
  } else {
    ids = getIds(numberOfRequestedPosts, loadedPosts);
    idString = previousIds ? JSON.stringify([ ...previousIds, ...ids]) : JSON.stringify(ids);
  } 
  
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