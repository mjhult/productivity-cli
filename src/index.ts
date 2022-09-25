#!/usr/bin/env node
import { selectAudio } from './commands/audio.js';
import { gotoGithubRepo } from './commands/github.js';
import { executeGoogleSearch } from './commands/google.js';
import { executeYoutubeSearch } from './commands/youtube.js';

const [_nodeExecutablePath, executablePath, ...args] = process.argv;
const pathComponents = executablePath.split('/');
const command = pathComponents[pathComponents.length - 1];

const commandActions = {
  google: () => executeGoogleSearch(args),
  youtube: () => executeYoutubeSearch(args),
  github: () => gotoGithubRepo(args),
  audio: () => selectAudio(),
};

commandActions[command]();
