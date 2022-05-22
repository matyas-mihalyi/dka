import { getCookie } from '$lib/utils';

export async function handle ({event, resolve}) {
  const cookie = event.request.headers.get('cookie');
  event.locals.theme = getTheme(cookie);
  event.locals.savedPostIds = await JSON.parse(getSavedPostIds(cookie));

  const response = await resolve(event);

  return response;
} 

export async function getSession ({locals}) {
  const theme = locals.theme; 
  const savedPostIds = locals.savedPostIds;
  return { theme, savedPostIds }
}

function getTheme (cookie = "") {
  const theme = getCookie(cookie, 'theme');
  if (theme) {
    return theme;
  } else {
    return null;
  }
}
  
function getSavedPostIds (cookie = "") {
  const savedPostIds = getCookie(cookie, 'savedPosts');
  if (savedPostIds) {
    return savedPostIds;
  } else {
    return null;
  }
}