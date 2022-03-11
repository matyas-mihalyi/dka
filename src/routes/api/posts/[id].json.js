import { xml2js } from 'xml-js';

import { getPictureUrl, getDescription, getRelated, getCookie, isSaved } from '../utils';

export const get = async ({params, request}) => {
  const { id } = await params;

  const cookies = request.headers.get('cookie');
  const savedPosts = await JSON.parse(getCookie(cookies, 'savedPosts'));
  const saved = isSaved(await savedPosts, await id);

  const res = await fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`);
  const text = await res.text();
  const xml = xml2js(text, {compact: true});

  // console.log(id)
  // console.log(xml.dkalista.DKA.date)
  // console.log(xml.dkalista.DKA)

  const img = getPictureUrl(await xml.dkalista.DKA.identifier.Filename._text, await xml.dkalista.DKA.identifier.URLOfDoc._text);
  const title = await xml.dkalista.DKA.DKAtitle.MainTitle._text; 
  const description = getDescription(await xml.dkalista.DKA);
  const related = getRelated(await xml.dkalista.DKA.relation);
  const originalUrl = await xml.dkalista.DKA.identifier.URLOfDoc._text;
  //const author
  const src = await xml.dkalista.DKA.source.NameOfSource?._text || null;
  const srcUrl = await xml.dkalista.DKA.source.URLOfSource?._text || null;

  const post = {
    id,
    saved,
    title,
    description,
    img,
    related,
    originalUrl,
    src,
    srcUrl
  };

  console.log(post)

  return {
    status: 200,
    body: post
  };
}