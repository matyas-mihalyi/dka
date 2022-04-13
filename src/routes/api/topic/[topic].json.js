import * as cheerio from 'cheerio';
import { xml2js } from 'xml-js';
import { getIdFromUrl, getPictureUrl, getDescription, encodeURIforDKA, getKeywords } from '$lib/utils';

export const get = async ({ request, params }) => {
  const { topic } = await params;
  // const query = await topic.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s/g, "_");
  const query = await topic;
  const url = `https://dka.oszk.hu/kereses/keres_cedulaelem.php?kulcsszo=${encodeURIforDKA(query)}`;
  const markup = await (await fetch(url)).text();

  const $ = cheerio.load(markup);
  const rows = $('table:nth-of-type(3) tbody').children();

  const ids = [];
  rows.each((i, el) => {
    const href = $(el).find('td a:nth-of-type(3)').text();
    const id = getIdFromUrl(href);  
    ids.push(id);
  });

  // console.log(ids)

    
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
      posts,
      ids
    }
  }


}