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


// export function getSession ({request, event}) {
//   const ids = request.headers.cookie ? getCookie(request.headers.cookie, 'ids') : null;
//   console.log('getSession ' + ids)
//   // console.log(JSON.stringify(request.headers))
//   return { ids }
// }