import { getCookie } from '$lib/utils';
import { getPosts } from './api.utils';

export const post = async ({request}) => {

  const body = await request.text();
  const cookies = request.headers.get('cookie');
  const savedIdsCookie = await JSON.parse(getCookie(cookies, 'savedPosts'));
  
  let requestedIds;
  //request body is empty on initial load
  if (await body !== "") {
    requestedIds = await JSON.parse(body).requested_posts;
  }
  
  let ids;
  
  if (await requestedIds !== undefined) {
    console.log("from request body")
    ids = requestedIds;
  } else if (savedIdsCookie) {
    console.log("from cookies")
    ids = savedIdsCookie;
  } else {
    return {
      status: 200,
      body: {
        posts: []
      }
    };
  }

  const posts = await getPosts(ids);
    
  return {
    status: 200,
    body: {
      posts
    }
  };

}