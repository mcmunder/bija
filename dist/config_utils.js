'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_CONFIG = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getConfig = getConfig;
exports.readCustomConfig = readCustomConfig;

var _utils = require('./utils');

var DEFAULT_CONFIG = exports.DEFAULT_CONFIG = {
  tabSize: 2,
  storybook: false,
  generateComponentTests: false,
  generateContainerTests: false,
  modulesPath: 'src/modules'

  /**
   * getConfig returns a full config object based on the default config
   * and overriding values.
   *
   * @param customConfig {Object} - key values pairs to override the default config
   * @return {Object} - custom config
   */
};function getConfig() {
  var customConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return _extends({}, DEFAULT_CONFIG, customConfig);
}

/**
 * readCustomConfig parses `_cli.yaml` and returns an object containing configs
 * if `bija.yaml` exists in the app root. Otherwise, it returns an empty object
 */
function readCustomConfig() {
  var userConfigPath = './.bija.yaml';

  // If user config exists, override defaultConfig with user config
  if ((0, _utils.checkFileExists)(userConfigPath)) {
    return (0, _utils.parseYamlFromFile)(userConfigPath);
  }

  return {};
}