import * as cheerio from 'cheerio';
import { getIdFromUrl, encodeURIforDKA } from '$lib/utils';
import {getPosts} from '../api.utils';
import { INITIAL_POSTS } from '$lib/config/topics';

export const post = async ({ request, params }) => {
  const { topic } = await params;
  const query = await topic;

  // get requested ids & topic from request body (sessionStorage)
  const body = await request.text();
  let parsedBody;;
  let activeTopic;
  let requestedIds;
  //request body is empty on initial load
  if (await body !== "") {
    parsedBody = await JSON.parse(body);
    console.log(parsedBody)
    activeTopic = await parsedBody.topic;
    requestedIds = await parsedBody.requested_posts;
  }
  
  let allIds = [];
  let ids = [];

  // only fetch if topic in request body is different or non existent
  if (topic !== activeTopic) {
    const url = `https://dka.oszk.hu/kereses/keres_cedulaelem.php?kulcsszo=${encodeURIforDKA(query)}`;
    const markup = await (await fetch(url)).text();
    const $ = cheerio.load(markup);
    const rows = $('table:nth-of-type(3) tbody').children();
    rows.each((i, el) => {
      const href = $(el).find('td a:nth-of-type(3)').text();
      const id = getIdFromUrl(href);  
      allIds.push(id);
    });

    ids = allIds.slice(0, INITIAL_POSTS);

  // if ids are already provided
  } else {
    ids = requestedIds;
  }

  const posts = await getPosts(ids);

  return {
    status: 200,
    body: {
      posts,
      ids: allIds
    }
  }


}