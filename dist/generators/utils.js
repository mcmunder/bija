'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOutputPath = getOutputPath;
exports.getTestOutputPath = getTestOutputPath;
exports.readTemplateContent = readTemplateContent;
exports.getTemplateVariables = getTemplateVariables;
exports.getTestTemplateVariables = getTestTemplateVariables;
exports.updateIndexFile = updateIndexFile;
exports.removeWholeLine = removeWholeLine;
exports.removeFromIndexFile = removeFromIndexFile;
exports.removeFile = removeFile;
exports.compileTemplate = compileTemplate;
exports._generate = _generate;
exports._generateTest = _generateTest;
exports.checkForModuleName = checkForModuleName;
exports.ensureModuleNameProvided = ensureModuleNameProvided;
exports.ensureModuleExists = ensureModuleExists;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _matchBracket = require('match-bracket');

var _matchBracket2 = _interopRequireDefault(_matchBracket);

var _locater = require('locater');

var _locater2 = _interopRequireDefault(_locater);

var _utils = require('../utils');

var _logger = require('../logger');

var _config_utils = require('../config_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Gets the output path of the file that will be generated.
 * @param type {String} - the type of file to be generated. See extensionMap
 *        for the supported values.
 * @param entityName {String} - the name of the file that will be generated
 * @param [moduleName] {String} - the name of the module under which the file will
 *        be generated
 * @return String - the output path relative to the app root
 */
function getOutputPath(customConfig, type, entityName, moduleName) {
  var _getConfig = (0, _config_utils.getConfig)(customConfig),
      modulesPath = _getConfig.modulesPath;

  var extensionMap = {
    component: 'js',
    container: 'js',
    storybook: 'js'
  };
  var extension = extensionMap[type];
  var outputFileName = void 0;
  var modulePath = './' + modulesPath + '/' + moduleName;

  if (type === 'storybook') {
    outputFileName = entityName + 'stories.' + extension;
    return modulePath + '/components/stories/' + outputFileName;
  } else if (type === 'container') {
    outputFileName = entityName + 'Container.' + extension;
  } else {
    outputFileName = entityName + '.' + extension;
  }
  return modulePath + '/' + type + 's/' + outputFileName;
}

/**
 * getTestOutputPath gets the output path for the test file. It is similar to
 * getOutputPath function.
 *
 * @param type {String} - the type of file to be generated. See extensionMap
 *        for the supported values.
 * @param entityName {String} - the name of the file that will be generated
 * @param [moduleName] {String} - the name of the module under which the file will
 *        be generated
 * @return String - the output path relative to the app root
 */
function getTestOutputPath(customConfig, type, entityName, moduleName) {
  var _getConfig2 = (0, _config_utils.getConfig)(customConfig),
      modulesPath = _getConfig2.modulesPath,
      snakeCaseFileNames = _getConfig2.snakeCaseFileNames;

  var casedEntityName = snakeCaseFileNames ? _lodash2.default.snakeCase(entityName) : _lodash2.default.camelCase(entityName);
  var outputFileName = casedEntityName + '.js';
  return modulesPath + '/' + moduleName + '/' + type + 's/tests/' + outputFileName;
}

/**
 * Reads the content of a generic template for the file type
 * @param type {String} - type of the file. See getOutputPath's extensionMap for
 *        all valid types
 * @param templateOptions {Object} - options to be passed to functions for
 *        getting the template path.
 * @param config {Object} - global configuration for  CLI. This may contain
 *        custom template content
 * @return Buffer - the content of the template for the given type
 */
function readTemplateContent(type, templateOptions, config) {
  // First, try to get custom template from config
  // If cannot find custom template, return the default
  if (checkForCustomTemplate(config, type, templateOptions)) {
    var templateConfig = getCustomTemplate(config, type, templateOptions);
    return templateConfig.text;
  }
}

function getCustomTemplate(config, entityType, _ref) {
  var _ref$testTemplate = _ref.testTemplate,
      testTemplate = _ref$testTemplate === undefined ? false : _ref$testTemplate;

  var selector = { name: entityType };
  if (testTemplate) {
    selector.test = true;
  }
  var templateConfig = _lodash2.default.find(config.templates, selector);

  return templateConfig;
}

/**
 * Checks if there is a custom template defined in the config
 * for the given entity type
 * @param config {Object} - global configuration for  CLI.
 * @param entityType {String} - type of the file
 * @param options {Object} - options to be passed to functions for
 *        getting the template path.
 * @return Boolean
 */
function checkForCustomTemplate(config, entityType, options) {
  if (!config.templates) {
    return false;
  }
  var template = getCustomTemplate(config, entityType, options);
  return !_lodash2.default.isEmpty(template);
}

/**
 * Gets the variables to be passed to the generic template to be evaluated by
 * a template engine.
 * @param type {String} - type of the template
 * @param fileName {String} - name of the file being generated
 * @return {Object} - key-values pairs of variable names and their values
 */
function getTemplateVariables(customConfig, type, moduleName, fileName) {
  var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var snakeCaseFileNames = customConfig.snakeCaseFileNames;

  console.log('utils', fileName);
  if (type === 'component') {
    return {
      moduleName: snakeCaseFileNames ? _lodash2.default.snakeCase(moduleName) : _lodash2.default.camelCase(moduleName),
      componentName: _lodash2.default.upperFirst(_lodash2.default.camelCase(fileName))
    };
  } else if (type === 'storybook') {
    return {
      moduleName: snakeCaseFileNames ? _lodash2.default.snakeCase(moduleName) : _lodash2.default.camelCase(moduleName),
      componentName: _lodash2.default.upperFirst(_lodash2.default.camelCase(fileName)),
      componentFileName: snakeCaseFileNames ? _lodash2.default.snakeCase(fileName) : _lodash2.default.camelCase(fileName)
    };
  } else if (type === 'container') {
    return {
      moduleName: snakeCaseFileNames ? _lodash2.default.snakeCase(moduleName) : _lodash2.default.camelCase(moduleName),
      componentName: _lodash2.default.upperFirst(_lodash2.default.camelCase(fileName)),
      componentFileName: snakeCaseFileNames ? _lodash2.default.snakeCase(fileName) : _lodash2.default.camelCase(fileName)
    };
  }

  return {};
}

/**
 * Gets the variables to be passed to the test template.
 * @param type {String} - type of the template
 * @param moduleName {String} - name of the module the test belongs
 * @param fileName {String} - name of the file which the test is for
 * @return {Object} - key-values pairs of variable names and their values
 */
function getTestTemplateVariables(customConfig, type, moduleName, fileName) {
  var snakeCaseFileNames = customConfig.snakeCaseFileNames;

  if (type === 'component') {
    return {
      componentName: _lodash2.default.upperFirst(_lodash2.default.camelCase(fileName)),
      componentFileName: snakeCaseFileNames ? _lodash2.default.snakeCase(fileName) : _lodash2.default.camelCase(fileName),
      moduleName: snakeCaseFileNames ? _lodash2.default.snakeCase(moduleName) : _lodash2.default.camelCase(moduleName)
    };
  } else if (type === 'container') {
    return {
      containerFileName: snakeCaseFileNames ? _lodash2.default.snakeCase(fileName) : _lodash2.default.camelCase(fileName),
      moduleName: snakeCaseFileNames ? _lodash2.default.snakeCase(moduleName) : _lodash2.default.camelCase(moduleName)
    };
  }
}

/**
 * Updates a relevant index.js file by inserting an import statement at the top
 * portion of the file, and a statement inside the export block.
 * Uses locater, and matchBracket to pinpoint the position at which the
 * statements are to be inserted.
 *
 * @param {Object}
 *        - indexFilePath: the path to the index file to be modified
 *        - exportBeginning: the content of the line on which the export block
 *          begins
 *        - insertImport: the import statement to be inserted at the top portion
 *          of the file
 *        - insertExport: the statement to be inserted inside the export block
 *        - commaDelimited: whether the items in the export blocks are separated
 *          by commas.
 *          e.g. export default { posts, users } // => commaDelimited is true
 *        - omitExport: whether to add export-statement (defaults to true)
 */
function updateIndexFile(_ref2) {
  var indexFilePath = _ref2.indexFilePath,
      exportBeginning = _ref2.exportBeginning,
      insertImport = _ref2.insertImport,
      insertExport = _ref2.insertExport,
      commaDelimited = _ref2.commaDelimited,
      _ref2$omitExport = _ref2.omitExport,
      omitExport = _ref2$omitExport === undefined ? false : _ref2$omitExport;

  if (!(0, _utils.checkFileExists)(indexFilePath)) {
    _logger.logger.missing(indexFilePath);
    return;
  }

  function analyzeExportBlock() {
    var indexContent = _fs2.default.readFileSync(indexFilePath, { encoding: 'utf-8' });
    var exportBeginningRegex = new RegExp(_lodash2.default.escapeRegExp(exportBeginning), 'g');

    var exportBeginningPos = _locater2.default.findOne(exportBeginningRegex, indexContent);
    var bracketCursor = exportBeginning.indexOf('{') + 1; // cursor at which the bracket appears on the line where export block starts
    var matchedBracketPos = (0, _matchBracket2.default)(indexContent, _lodash2.default.assign(exportBeginningPos, { cursor: bracketCursor }));

    return {
      beginningLine: exportBeginningPos.line,
      endLine: matchedBracketPos.line,
      isEmpty: exportBeginningPos.line === matchedBracketPos.line - 1
    };
  }

  _logger.logger.update(indexFilePath);

  // Insert the import statement at the top portion of the file
  (0, _utils.insertToFile)(indexFilePath, insertImport, {
    or: [{ after: { regex: /import .*\n/g, last: true }, asNewLine: true }, { before: { line: 1 }, asNewLine: true, _appendToModifier: '\n' }]
  });
  if (!omitExport) {
    // Insert within the export block and modify the block content as needed
    var info = analyzeExportBlock();

    if (!info.isEmpty && commaDelimited) {
      (0, _utils.insertToFile)(indexFilePath, ',', { after: { line: info.endLine - 1 } });
    }
    (0, _utils.insertToFile)(indexFilePath, insertExport, {
      before: { line: info.endLine },
      asNewLine: true
    });
  }
}

/**
 * Removes from the string the whole line on which the pattern appears. Useful
 * when removing import and export lines from index files
 *
 * @param string {String} - a string to be modified
 * @param pattern {String|RegExp} - pattern to be matched against the `string`
 */
function removeWholeLine(string, pattern) {
  function nthIndexOf(str, part, n) {
    var len = str.length;
    var i = -1;

    while (n-- && i++ < len) {
      i = str.indexOf(part, i);
      if (i < 0) break;
    }

    return i;
  }
  var position = _locater2.default.findOne(pattern, string);

  if (!position) {
    return string;
  }

  var lineNumber = position.line;
  var lineStartIndex = nthIndexOf(string, '\n', lineNumber - 1) + 1;
  var lineEndIndex = nthIndexOf(string, '\n', lineNumber);

  return string.substring(0, lineStartIndex) + string.substring(lineEndIndex + 1);
}

/**
 * Remove the import and export statement for an entity from the index file
 * specified by the path
 *
 * @param indexFilePath {String} - the path to the index.js file to be modified
 * @param entityName {String} - the name of the entity whose import and export
 *        statements to be removed from the index file
 */
function removeFromIndexFile(indexFilePath, type, entityName) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  console.log('export {default as ' + entityName + '} from \'./' + type + '/' + entityName + '\'');
  if (!(0, _utils.checkFileExists)(indexFilePath)) {
    _logger.logger.missing(indexFilePath);
    return;
  }
  _logger.logger.update(indexFilePath);

  var regex = new RegExp('  ' + entityName + '.*\n', 'g');

  var content = _fs2.default.readFileSync(indexFilePath, { encoding: 'utf-8' });
  content = removeWholeLine(content, 'export {default as ' + entityName + '} from \'./' + type + 's/' + entityName + '\'');
  content = removeWholeLine(content, regex);

  (0, _fsExtra.outputFileSync)(indexFilePath, content);
}

/**
 * Removes a file at the given path
 * @param path {String} - the path to the file to be removed
 */
function removeFile(path) {
  _logger.logger.remove(path);
  (0, _fsExtra.removeSync)(path);
}

/**
 * Compiles a template given content and variables. Reads and applies user
 * configurations.
 * @param content {String} - template content
 * @param variables {Object} - variable names and values to be passed to the
 *        template and evaluated
 * @param config {Object} -  config
 * @return {String} - compiled content
 */
function compileTemplate(content, variables, config) {
  var compiled = _lodash2.default.template(content)(variables);
  var tab = _lodash2.default.repeat(' ', config.tabSize);
  var defaultTabSize = 2;

  // TODO: windows newline
  // customize tabSpace by replacing spaces followed by newline
  return compiled.replace(/(\n|\r\n)( +)/g, function (match, lineBreak, defaultTab) {
    var numTabs = defaultTab.length / defaultTabSize;
    return lineBreak + _lodash2.default.repeat(tab, numTabs);
  });
}

/**
 * A generic function for generating entities. Used by generators for each
 * types
 *
 * @param type {String} - type of the entity to be generated
 * @param moduleName {String} - name of the module that the entity belongs
 *        applicable for client entities. Set to `null` if not applicable
 * @param entityName {String} - name of the entity to be generated
 * @param options {Object} - options passed by the CLI
 * @param config {Object} - global configuration of the CLI
 * @return {String} - path to the generated file
 */
function _generate(type, moduleName, entityName, options, customConfig) {
  var config = (0, _config_utils.getConfig)(customConfig);
  var templateContent = readTemplateContent(type, options, config);
  var outputPath = getOutputPath(customConfig, type, entityName, moduleName);
  var templateVariables = getTemplateVariables(customConfig, type, moduleName, entityName, options);
  var component = compileTemplate(templateContent, templateVariables, config);

  if ((0, _utils.checkFileExists)(outputPath)) {
    _logger.logger.exists(outputPath);
    return { exists: true, outputPath: outputPath };
  }

  _fsExtra2.default.outputFileSync(outputPath, component);
  _logger.logger.create(outputPath);
  return { exists: false, outputPath: outputPath };
}

function _generateTest(type, customConfig, moduleName, entityName, config) {
  var templateContent = readTemplateContent(type, { testTemplate: true }, config);
  var outputPath = getTestOutputPath(customConfig, type, entityName, moduleName);
  var templateVariables = getTestTemplateVariables(customConfig, type, moduleName, entityName);
  var component = _lodash2.default.template(templateContent)(templateVariables);

  if ((0, _utils.checkFileExists)(outputPath)) {
    _logger.logger.exists(outputPath);
    return outputPath;
  }

  _fsExtra2.default.outputFileSync(outputPath, component);
  _logger.logger.create(outputPath);
  return outputPath;
}

/**
 * Checks if the given string follows the format of moduleName:entityName
 * @return {Boolean} - true if validation passes, false otherwise
 */
function checkForModuleName(str) {
  var re = /.*:.*/;
  return re.test(str);
}

/**
 * Checks if name is in the format of `moduleName:entityName`. Exits the process
 * if the validation fails
 *
 * @param name {String} - name to validate
 */
function ensureModuleNameProvided(name) {
  if (!checkForModuleName(name)) {
    console.log('Invalid name: ' + name + '. Did you remember to provide the module name?');
    console.log('Run ` generate --help` for more options.');
    process.exit(1);
  }
}

/**
 * Checks if module with the given name exists. Exits the process if the module
 * does not exist
 *
 * @param moduleName {String} - name of the module to check if exists
 */
function ensureModuleExists(moduleName) {
  var customConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = (0, _config_utils.getConfig)(customConfig);
  if (!(0, _utils.checkFileExists)('./' + config.modulesPath + '/' + moduleName)) {
    console.log('A module named ' + moduleName + ' does not exist. Try to generate it first.');
    console.log('Run ` generate --help` for more options.');
    process.exit(1);
  }
}