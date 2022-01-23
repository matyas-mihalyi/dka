import { xml2js } from 'xml-js';

import { getPictureUrl, getDescription } from '../utils';

export const get = async ({params}) => {
  const { id } = params;
  const res = await fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`);
  const text = await res.text();
  const xml = xml2js(text, {compact: true});

  console.log(id)
  console.log(xml.dkalista.DKA)

  const img = getPictureUrl(await xml.dkalista.DKA.identifier.Filename._text, await xml.dkalista.DKA.identifier.URLOfDoc._text) 
  const title = await xml.dkalista.DKA.DKAtitle.MainTitle._text; 
  const description = getDescription(await xml.dkalista.DKA);
  //const related
  //const author

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