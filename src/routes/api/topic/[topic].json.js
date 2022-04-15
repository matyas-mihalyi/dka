import * as cheerio from 'cheerio';
import { getIdFromUrl, encodeURIforDKA } from '$lib/utils';

export const get = async ({ request, params }) => {
  const { topic } = await params;
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


  return {
    status: 200,
    body: {
      ids
    }
  }


}