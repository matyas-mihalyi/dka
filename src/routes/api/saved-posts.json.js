import { xml2js } from 'xml-js';
import * as cookieParser from 'cookie-parser';

import { getPictureUrl, getDescription, getCookie } from './utils';


export const get = async ({request}) => {
  
  const cookies = request.headers.get('cookie');
  const savedPostIds = await JSON.parse(getCookie(cookies, 'savedPosts'));
    
  const posts = await savedPostIds.reduce(async (prevPromise, id) => {
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

  return {
    status: 200,
    body: {
      posts
    }
  };

}