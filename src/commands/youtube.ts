import navigate from '../utils/navigate';

export const executeYoutubeSearch = (searchArgs: string[]) => {
  let url = 'https://www.youtube.com/';

  if (searchArgs.length > 0) {
    const searchQuery = searchArgs.join('+');
    url += `results?search_query=${searchQuery}`;
  }

  navigate(url);
};
