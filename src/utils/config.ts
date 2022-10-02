import fs from 'fs';

// Will need to rewrite again. Made a change that broke it.

const CONFIG_DIR: string = `${process.env.HOME}/.pcli`
const CONFIG_PATH: string = `${CONFIG_DIR}/config.json`;

const defaultConfig = {
  'browserPath': '',
  'githubHandle': ''
}

const Config = {...defaultConfig};

type Config = {
  browserPath: string,
  githubHandle: string,
  test: number,
}

const ConfigUtils = {

  /**
   * Saves the config to file.
   * Path is '$HOME/.pcli/config.json'
   * 
   * @param key Config item.
   * @param value Value item.
   */
  save: function (key: string, value: string): void {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify({ ...Config, [key]: value }));
  },

  /**
   * Resets a config item.
   * Resets entire config if there is no item specified.
   * 
   * @param key Config item to reset.
   */
  reset: function (key?: string): void {
    if (key) {
      delete Config[key];
      this.save('','');
    } else {
      fs.rmSync(CONFIG_PATH);
      for (const prop in Config) {
        delete Config[prop];
      }
    }
  },
  
  /**
   * Loads the config from the config file.
   */
  // This function should only be called once.
  // I'm sure there's a better way to do this.
  getConfig: function (): Config {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, { encoding: 'utf-8' }));
    } catch (err) {
      fs.mkdirSync(CONFIG_DIR);
      fs.writeFileSync(CONFIG_PATH, JSON.stringify({...defaultConfig, 'test':123}));
      return this.getConfig();
    }
  }

  // loadConfig: async function (): Promise<void> {
  //   await fs.readFile(CONFIG_PATH, (err, data) => {
  //     // Save config if there is no config
  //     if (err) {
  //       fs.mkdirSync(CONFIG_DIR);
  //       fs.writeFileSync(CONFIG_PATH, JSON.stringify({...defaultConfig, 'test':123}));
  //       this.loadConfig();
  //     } else {
  //         // Set config to Config
  //         Object.assign(Config, JSON.parse(data.toString()));
  //     }
  //   });
  // }
}

export { ConfigUtils, Config }