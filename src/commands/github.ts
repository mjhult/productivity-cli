import navigate from '../utils/navigate';
import Config from '../../cli-config.json';

export const gotoGithubRepo = (repoArgs: string[]) => {
  let url = `https://github.com/${Config.githubHandle}/`;

  if (repoArgs.length) {
    url += repoArgs[0];
  }

  navigate(url);
};
