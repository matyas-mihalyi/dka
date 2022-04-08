import { xml2js } from 'xml-js';

import { 
  getPictureUrl, 
  getDescription, 
  getRelated,
  getCookie,
  isSaved,
  getLargePictureUrl,
  getOriginals } from '$lib/utils';

export const get = async ({params, request}) => {
  const { id } = await params;

  const cookies = request.headers.get('cookie');
  const savedPosts = await JSON.parse(getCookie(cookies, 'savedPosts'));
  const saved = isSaved(await savedPosts, await id);

  const res = await fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`);
  const text = await res.text();
  const xml = xml2js(text, {compact: true});

  const img = getPictureUrl(await xml.dkalista.DKA.identifier.Filename._text, await xml.dkalista.DKA.identifier.URLOfDoc._text);
  const largeImg = getLargePictureUrl(img);
  const title = await xml.dkalista.DKA.DKAtitle.MainTitle._text; 
  const description = getDescription(await xml.dkalista.DKA);
  const related = getRelated(await xml.dkalista.DKA.relation);
  const originalUrl = await xml.dkalista.DKA.identifier.URLOfDoc._text;
  const src = await xml.dkalista.DKA.source?.NameOfSource?._text || null;
  const srcUrl = await xml.dkalista.DKA.source?.URLOfSource?._text || null;
  const originals = getOriginals(await xml.dkalista.DKA.original_document || null)

  const post = {
    id,
    img,
    largeImg,
    title,
    description,
    related,
    originalUrl,
    src,
    srcUrl,
    saved,
    originals
  };

  return {
    status: 200,
    body: post
  };
}