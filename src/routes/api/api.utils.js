import { xml2js } from 'xml-js';
import { getPictureUrl, getDescription, getKeywords } from '$lib/utils';

export async function getPosts (ids = []) { 
  
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
  
  return posts;
  
}