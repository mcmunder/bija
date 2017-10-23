'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateModule = generateModule;
exports.destroyModule = destroyModule;

var _fsExtra = require('fs-extra');

var _snakeCase = require('lodash/snakeCase');

var _snakeCase2 = _interopRequireDefault(_snakeCase);

var _camelCase = require('lodash/camelCase');

var _camelCase2 = _interopRequireDefault(_camelCase);

var _utils = require('../utils');

var _config_utils = require('../config_utils');

var _utils2 = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateModule(name, options) {
  var customConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _getConfig = (0, _config_utils.getConfig)(customConfig),
      useIndexFile = _getConfig.useIndexFile,
      modulesPath = _getConfig.modulesPath,
      storybook = _getConfig.storybook,
      snakeCaseFileNames = _getConfig.snakeCaseFileNames;

  var fileName = snakeCaseFileNames ? (0, _snakeCase2.default)(name) : (0, _camelCase2.default)(name);
  var modulePath = './' + modulesPath + '/' + fileName;

  (0, _utils.createDir)(modulePath);
  (0, _utils.createDir)(modulePath + '/components');
  (0, _utils.createDir)(modulePath + '/containers');

  if (useIndexFile) {
    (0, _fsExtra.outputFileSync)(modulePath + '/index.js', '');
  }

  if (storybook) {
    var moduleStoriesDir = modulePath + '/components/stories';
    (0, _utils.createDir)(moduleStoriesDir);
  }
}

function destroyModule(name, options, customConfig) {
  var _getConfig2 = (0, _config_utils.getConfig)(customConfig),
      modulesPath = _getConfig2.modulesPath,
      snakeCaseFileNames = _getConfig2.snakeCaseFileNames;

  var fileName = snakeCaseFileNames ? (0, _snakeCase2.default)(name) : (0, _camelCase2.default)(name);
  var modulePath = './' + modulesPath + '/' + fileName;
  (0, _utils2.removeFile)(modulePath);
}