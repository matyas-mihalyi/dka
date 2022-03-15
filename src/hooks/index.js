function getCookie(cookie, name)
{
  var re = new RegExp(name + "=([^;]+)");
  var value = re.exec(cookie);
  return (value != null) ? unescape(value[1]) : null;
}


// export async function handle ({event, resolve}) {
//   event.locals.ids = "await getCookieValue(event.request.headers.get('cookie'), 'ids');"
//   // event.locals.ids = await getCookieValue(event.request.headers.get('cookie'), 'ids');
//   console.log('handle ran')
//   console.log(event.locals.ids)
//   const response = await resolve(event);
//   response.headers.set('x-custom-header', 'potato');
 
//   return response;
// } 

import { get } from 'svelte/store';
import { savedPosts } from "$lib/components/stores";

export async function getSession ({request}) {
  const ids = request.headers.get("cookie") ? getCookie(request.headers.get('cookie'), 'ids') : null;
  // console.log(JSON.stringify(request.headers))
  return { ids,  savedPosts:  get(savedPosts) }
}