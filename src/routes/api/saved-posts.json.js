import { xml2js } from 'xml-js';
import { getCookie } from './utils';

import { getPictureUrl, getDescription } from './utils';

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

  const posts = await ids.reduce(async (prevPromise, id) => {
    let posts = await prevPromise;
    const res = await fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`);
    if (res.ok) {
      const text = await res.text();
      const js = xml2js(text, {compact: true});
      const img = getPictureUrl(js.dkalista.DKA.identifier.Filename._text, js.dkalista.DKA.identifier.URLOfDoc._text);
      const post = {
        img: img,
        largeImg: getLargePictureUrl(img),        
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