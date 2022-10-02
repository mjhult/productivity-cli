import { exec } from 'child_process';
import { ConfigUtils } from './config';

const navigate = (url: string) => {
  const commandString = `open ${ConfigUtils.getConfig().browserPath || ''} ${url}`;

  exec(commandString, (error, stdout, stderr) => {
    if (error) console.log(error);
    if (stdout) console.log(stdout);
    if (stderr) console.log(stderr);
  });
};

export default navigate;
