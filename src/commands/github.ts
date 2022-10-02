import navigate from '../utils/navigate';
import { ConfigUtils } from '../utils/config';

export const gotoGithubRepo = (repoArgs: string[]) => {
  let url = `https://github.com/${ConfigUtils.getConfig().githubHandle}/`;

  if (repoArgs.length) {
    url += repoArgs[0];
  }

  navigate(url);
};
