import { ConfigUtils } from '../utils/config';

export const pConfig = async (args: string[]) => {

  // Get which action is wanted.
  switch (args[0].toLowerCase()) {

    case 'set':
      console.log(`Command: set\n`, args);
      break;

    case 'reset':
      console.log(`Command: reset\n`, args);
      break;

    case 'config':
      console.log(ConfigUtils.getConfig());
      break;

    case 'test':
      console.log(ConfigUtils.getConfig().test);
      break;

    default:
      console.log('Display help here.');
      break;
  }

}