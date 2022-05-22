import { getIds, getCookie } from '$lib/utils';
import { MAX_POSTS } from '$lib/config/homefeed';

export const get = async ({ request }) => {
  console.log("get request sent for ids")
  
  const cookies = await request.headers.get('cookie');
  const idsInCookies = getCookie(await cookies, 'ids');

  let ids;
  if (idsInCookies && idsInCookies.length > 0) {
    ids = JSON.parse(idsInCookies);
  } else {
    ids = getIds(MAX_POSTS);
  }

  return {
    status: 200,
    headers: {
      'Set-Cookie': `ids=${JSON.stringify(ids)}; SameSite=Strict; HttpOnly; Secure; path=/`
    },
    body: {
      ids
    }
  };

}