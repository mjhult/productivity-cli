import navigate from '../utils/navigate';

export const executeGoogleSearch = (searchArgs: string[]) => {
  let url = 'https://www.google.com/';

  if (searchArgs.length > 0) {
    const searchQuery = searchArgs.join('+');
    url += `search?q=${searchQuery}`;
  }

  navigate(url);
};
