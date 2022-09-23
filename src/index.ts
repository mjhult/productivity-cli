#!/usr/bin/env node
import { executeGoogleSearch } from './commands/google';
import { executeYoutubeSearch } from './commands/youtube';

const [_nodeExecutablePath, executablePath, ...args] = process.argv;
const pathComponents = executablePath.split('/');
const command = pathComponents[pathComponents.length - 1];

const commandActions = {
  google: () => executeGoogleSearch(args),
  youtube: () => executeYoutubeSearch(args),
};

commandActions[command]();
