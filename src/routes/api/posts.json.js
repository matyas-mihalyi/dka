import { xml2js } from 'xml-js';
import * as cookieParser from 'cookie-parser';

import { getPictureUrl, getDescription, getIds, getCookie } from './utils';


export const post = async ({ request }) => {
  const body = JSON.parse(await request.text());
  const numberOfRequestedPosts = await body.number_of_posts;
  console.log(numberOfRequestedPosts)
  
  const cookies = request.headers.get('cookie');
  const previousIds = await JSON.parse(getCookie(cookies, 'ids'));
  
  const ids = previousIds || getIds();
  const _ids = JSON.stringify(ids);
  
  const posts = await ids.reduce(async (prevPromise, id) => {
    let posts = await prevPromise;
    const res = await fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`);
    if (res.ok) {
      const text = await res.text();
      const js = xml2js(text, {compact: true});
      const post = {
        img: getPictureUrl(js.dkalista.DKA.identifier.Filename._text, js.dkalista.DKA.identifier.URLOfDoc._text),
        title: js.dkalista.DKA.DKAtitle.MainTitle._text,
        description: getDescription(js.dkalista.DKA, { truncated: true}),
        id: id
      }
      posts.push(post);
    }
    return posts;
  }, []);

  if (previousIds) {
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
        'Set-Cookie': `ids=${_ids}; SameSite=Strict; HttpOnly; Secure; path=/`
      },
      body: {
        posts,
        ids
      }
    };
  }


}