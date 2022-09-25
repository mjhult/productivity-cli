import inquirer from 'inquirer';
import {
  getOutputDevices,
  getInputDevices,
  setDefaultOutputDevice,
  setDefaultInputDevice,
} from 'macos-audio-devices';

/**
 * Prompt the user to select an audio device for output and input.
 */
export const selectAudio = async () => {
  const [outputDevices, inputDevices] = await Promise.all([
    getOutputDevices(),
    getInputDevices(),
  ]);

  const audioDevicePrompt = await inquirer.prompt([
    {
      type: 'list',
      name: 'output',
      choices: outputDevices.map((device) => ({
        name: device.name,
        value: device.id,
      })),
      message: 'Select an output device:',
    },
    {
      type: 'list',
      name: 'input',
      choices: inputDevices.map((device) => ({
        name: device.name,
        value: device.id,
      })),
      message: 'Select an input device:',
    },
  ]);

  await Promise.all([
    setDefaultOutputDevice(audioDevicePrompt.output),
    setDefaultInputDevice(audioDevicePrompt.input),
  ]);
};
