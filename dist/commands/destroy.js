'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = destroy;

var _component = require('../generators/component');

var _container = require('../generators/container');

var _module = require('../generators/module');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function destroy(type, name, options, customConfig) {
  if (_lodash2.default.isEmpty(name)) {
    console.log('Please specify a name for the ' + type + ' to destroy:');
    console.log(' destroy ' + type + ' <name>');
    return;
  }
  var destroyFn = getDestroyFn(type);
  if (!destroyFn) {
    console.log('Invalid type ' + type);
    console.log('Run ` generate --help` for more options.');
    return;
  }
  destroyFn(name, options, customConfig);
}

function getDestroyFn(type) {
  var destroyFnMap = {
    component: _component.destroyComponent,
    container: _container.destroyContainer,
    module: _module.destroyModule
  };

  return destroyFnMap[type];
}