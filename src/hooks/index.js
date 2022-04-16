import { getCookie } from '$lib/utils';

export async function handle ({event, resolve}) {
  const cookie = event.request.headers.get('cookie');
  event.locals.theme = getTheme(cookie);

  const response = await resolve(event);

  return response;
} 

export async function getSession ({locals}) {
  const theme = locals.theme; 
  return { theme }
}

function getTheme (cookie = "") {
  const theme = getCookie(cookie, 'theme');
  if (theme) {
    return theme;
  } else {
    return null;
  }
}