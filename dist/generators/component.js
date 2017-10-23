'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.generateComponent = generateComponent;
exports.destroyComponent = destroyComponent;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

var _storybook = require('./storybook');

var _config_utils = require('../config_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateComponent(name, options, customConfig) {
  var config = (0, _config_utils.getConfig)(customConfig);
  var useIndexFile = config.useIndexFile,
      modulesPath = config.modulesPath,
      snakeCaseFileNames = config.snakeCaseFileNames;

  var _name$split = name.split(':'),
      _name$split2 = _slicedToArray(_name$split, 2),
      moduleName = _name$split2[0],
      entityName = _name$split2[1];

  var casedEntityName = snakeCaseFileNames ? _lodash2.default.snakeCase(entityName) : _lodash2.default.upperFirst(_lodash2.default.camelCase(entityName));

  (0, _utils.ensureModuleNameProvided)(name);
  (0, _utils.ensureModuleExists)(moduleName, customConfig);

  (0, _utils._generate)('component', moduleName, casedEntityName, options, config);

  if (useIndexFile) {
    (0, _utils.updateIndexFile)({
      indexFilePath: './' + modulesPath + '/' + moduleName + '/index.js',
      insertImport: 'export {default as ' + casedEntityName + '} from \'./components/' + casedEntityName + '\'',
      omitExport: true
    });
  }

  if (config.generateComponentTests) {
    (0, _utils._generateTest)('component', customConfig, moduleName, entityName, config);
  }
  if (config.storybook) {
    (0, _storybook.generateStorybook)(name, options, customConfig);
  }
}

function destroyComponent(name, options, customConfig) {
  var _getConfig = (0, _config_utils.getConfig)(customConfig),
      useIndexFile = _getConfig.useIndexFile,
      modulesPath = _getConfig.modulesPath,
      snakeCaseFileNames = _getConfig.snakeCaseFileNames;

  var _name$split3 = name.split(':'),
      _name$split4 = _slicedToArray(_name$split3, 2),
      moduleName = _name$split4[0],
      entityName = _name$split4[1];

  var casedEntityName = snakeCaseFileNames ? _lodash2.default.snakeCase(entityName) : _lodash2.default.upperFirst(_lodash2.default.camelCase(entityName));

  (0, _utils.ensureModuleNameProvided)(name);
  (0, _utils.ensureModuleExists)(moduleName, customConfig);
  (0, _utils.removeFile)((0, _utils.getOutputPath)(customConfig, 'component', casedEntityName, moduleName));
  (0, _utils.removeFile)((0, _utils.getTestOutputPath)('component', casedEntityName, moduleName));

  if (useIndexFile) {
    (0, _utils.removeFromIndexFile)('./' + modulesPath + '/' + moduleName + '/index.js', 'component', casedEntityName);
  }

  // Also destroy storybook
  (0, _storybook.destroyStorybook)(name, options, customConfig);
}