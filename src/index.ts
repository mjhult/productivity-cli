#!/usr/bin/env node
import { selectAudio } from './commands/audio.js';
import { gotoGithubRepo } from './commands/github.js';
import { executeGoogleSearch } from './commands/google.js';
import { playMusic } from './commands/music.js';
import { executeYoutubeSearch } from './commands/youtube.js';
import { pConfig } from './commands/pconfig.js';

const [_nodeExecutablePath, executablePath, ...args] = process.argv;
const pathComponents = executablePath.split('/');
const command = pathComponents[pathComponents.length - 1];

const commandActions = {
  google: () => executeGoogleSearch(args),
  youtube: () => executeYoutubeSearch(args),
  github: () => gotoGithubRepo(args),
  audio: () => selectAudio(),
  music: () => playMusic(args),
  pconfig: () => pConfig(args),
};

commandActions[command]();