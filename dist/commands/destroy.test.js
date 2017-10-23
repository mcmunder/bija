'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _destroy = require('./destroy');

var _destroy2 = _interopRequireDefault(_destroy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('destroy', function () {
  test('returns function', function () {
    expect(_typeof((0, _destroy2.default)())).toBe('function');
  });
});