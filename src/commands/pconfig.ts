import { ConfigUtils } from '../utils/config';

export const pConfig = async (args: string[]): Promise<void> => {
  
  // Current config
  const config = ConfigUtils.getConfig();

  // Available commands
  const commands = {

    /**
     * Sets a config item.
     * 
     * @param options Key/value from user
     */
    set: function (options: string[]): void {
      const key: string = options[0];
      const value: string = options[1] || '';

      if (key === undefined) return this.help();
      if (!(key in config)) return console.log('Config item invalid.');

      ConfigUtils.save(key, value);

      console.log(`Saved config item: ${key} : ${value}`);
    },

    /**
     * Displays the current config item value or entire config if no key is specified.
     * 
     * @param options Key from user.
     */
    get: function (options?: string[]): void {
      const key: string = options[0] || '';
      console.log(key in config ? `${key} : ${config[key]}` : config);
    },

    /**
     * Resets a key specified by user or entire config if no key specified.
     * 
     * @param options Key to reset.
     */
    reset: function (options?: string[]): void {
      const key: string = options[0] || '';
      ConfigUtils.reset(key);
      // console.log(`Command: reset\n`, key);
      console.log(key ? `Reset key: ${key}.` : `Reset config.`);
      // console.log(ConfigUtils.getConfig());
    },

    /**
     * Displays help.
     */
    help: function (): void {
      console.log('Display help here.');
    }
  }

  // Does the command exist?
  if (!args[0] || !(args[0] in commands)) return commands['help']();

  // Command does exist!
  commands[args[0]](args.slice(1));
}