import { xml2js } from 'xml-js';
import { getPictureUrl, getDescription, getCookie, getKeywords } from '$lib/utils';

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

  
  // to do: fetch'/api/posts' instead
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
        topics: getKeywords(js.dkalista.DKA),
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