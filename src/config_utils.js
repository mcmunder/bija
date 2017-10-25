import {checkFileExists, parseYamlFromFile} from './utils'

export const DEFAULT_CONFIG = {
  tabSize: 2,
  storybook: false,
  generateComponentTests: false,
  generateContainerTests: false,
  modulesPath: 'src/modules',
  useIndexFile: false
}

/**
 * getConfig returns a full config object based on the default config
 * and overriding values.
 *
 * @param customConfig {Object} - key values pairs to override the default config
 * @return {Object} - custom config
 */
export function getConfig (customConfig = {}) {
  return {...DEFAULT_CONFIG, ...customConfig}
}

/**
 * readCustomConfig parses `_cli.yaml` and returns an object containing configs
 * if `bija.yaml` exists in the app root. Otherwise, it returns an empty object
 */
export function readCustomConfig () {
  let userConfigPath = './.bija.yaml'

  // If user config exists, override defaultConfig with user config
  if (checkFileExists(userConfigPath)) {
    return parseYamlFromFile(userConfigPath)
  }

  return {}
}
