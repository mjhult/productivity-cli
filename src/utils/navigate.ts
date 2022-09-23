import { exec } from 'child_process';
import Config from '../../cli-config.json';

const navigate = (url: string) => {
  const commandString = `open "${Config.browserPath}" ${url}`;

  exec(commandString, (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
};

export default navigate;
