'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _package = require('../package.json');

var _commands = require('./commands');

var _config_utils = require('./config_utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package.version);

_commander2.default.command('generate [type] [name]').alias('g').description('generate an entity with the name provided').action(function (type, name, options) {
  var customConfig = (0, _config_utils.readCustomConfig)();
  (0, _commands.generate)(type, name, options, customConfig);
}).on('--help', function () {
  console.log('  Choose from the following generator types:');
  console.log('  component, container, module');
  console.log('');
  console.log('  You need to provide module name for component, and container');
  console.log("  Format your 'name' argument in the form of moduleName:entityName");
  console.log('');
  console.log('  e.g. `bija generate action core:post`');
});

_commander2.default.command('destroy [type] [name]').alias('d').description('delete files generated for the given type and name').action(function (type, name, options) {
  var customConfig = (0, _config_utils.readCustomConfig)();
  (0, _commands.destroy)(type, name, options, customConfig);
});

_commander2.default.parse(process.argv);