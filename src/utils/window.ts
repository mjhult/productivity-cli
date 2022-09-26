import activeWindow from 'active-win';
import { focusWindow } from 'window-control';

/**
 * Return focus back to the command prompt window after opening an application.
 * @returns A callback function that will return focus to the process active at the time refocusWindow is invoked.
 */
export const refocusWindow = async () => {
  const currentWindow = await activeWindow({
    screenRecordingPermission: false,
  });
  return () => {
    focusWindow(currentWindow.owner.processId);
  };
};
