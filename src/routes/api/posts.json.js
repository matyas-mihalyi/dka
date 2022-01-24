import { xml2js } from 'xml-js';

import { getPictureUrl, getDescription } from './utils';
import { getIds } from '$lib/utils.js'

export const get = async () => {
  const ids = getIds();

  const promises = ids.map(async (id) => {
    return fetch(`https://dka.oszk.hu/export/xml_/${id}.xml`)
    .then(res => res.text())
    .then(txt => xml2js(txt, {compact: true}))
  });
  
  const posts = await Promise.all(promises.map(async (res) => {
    console.log(Object.keys((await res).dkalista))
    return {
      img: getPictureUrl((await res).dkalista.DKA.identifier.Filename._text, (await res).dkalista.DKA.identifier.URLOfDoc._text),
      title: (await res).dkalista.DKA.DKAtitle.MainTitle._text,
      description: getDescription((await res).dkalista.DKA)
    }
  }));

  return {
    status: 200,
    body: posts
  };
}