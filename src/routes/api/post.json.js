import { xml2js } from 'xml-js';

import { getPictureUrl, getDescription } from './utils';
// import * as cheerio from 'cheerio';

export const get = async () => {

  const res = await fetch(`https://dka.oszk.hu/export/xml_/000413.xml`);
  const text = await res.text();
  const xml = xml2js(text, {compact: true})

  // console.log(xml.dkalista.DKA)
  
  const img = getPictureUrl(await xml.dkalista.DKA.identifier.Filename._text, await xml.dkalista.DKA.identifier.URLOfDoc._text)
  
  const title = await xml.dkalista.DKA.DKAtitle.MainTitle._text;
  
  const description = getDescription(await xml.dkalista.DKA);

  // console.log(img + "\n" + title + "\n" + description)

  const post = {
    title: title,
    description: description,
    img: img
  }

  return {
    status: 200,
    body: post
  }
}