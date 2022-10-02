import navigate from '../utils/navigate';
import { ConfigUtils } from '../utils/config';

export const gotoGithubRepo = (repoArgs: string[]) => {

  const config = ConfigUtils.getConfig();

  if (!config.githubHandle) return console.log('Please run \'pconfig set githubHandle <handle>\' before running this command.');

  let url = `https://github.com/${config.githubHandle}/`;

  if (repoArgs.length) {
    url += repoArgs[0];
  }

  navigate(url);
};
