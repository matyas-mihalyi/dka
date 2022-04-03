import { getCookie } from '../lib/utilss';

export const put = async ({request}) => {
  
  const postToDelete = await request.text();
  const cookies = await request.headers.get('cookie');
  let savedPosts = await JSON.parse(getCookie(await cookies, 'savedPosts')) || [];

  if (savedPosts.includes(postToDelete)) {
    const newPosts = savedPosts.filter(post => post !== postToDelete)
    savedPosts = newPosts;
  }
  const cookieValue = JSON.stringify(savedPosts);

  const date = new Date();

  // Default at 365 days.
  const days = 365;

  // Get unix milliseconds at current time plus number of days
  date.setTime(+ date + (days * 86400000)); //24 * 60 * 60 * 1000

  return {
    status: 200,
    headers: {
      'Set-Cookie': `savedPosts=; SameSite=Strict; HttpOnly; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
      'Set-Cookie': `savedPosts=${cookieValue}; SameSite=Strict; HttpOnly; Secure; expires=${date.toGMTString()};`,
    }
  };

}