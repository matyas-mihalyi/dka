export const del = async ({request}) => {
  console.log('clear-posts ran')
  const postToBeDeleted = await request.text();

  return {
    status: 200,
    headers: {
      'Set-Cookie': `ids=; SameSite=Strict; HttpOnly; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT;`,
    }
  };

}