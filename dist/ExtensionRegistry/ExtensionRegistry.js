"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.createExtensionRegistry = void 0;
var _validateExtensionName = _interopRequireDefault(require("../internal/validateExtensionName"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Import React

var required = function required(name) {
  throw new TypeError("".concat(name, " is required"));
};
var createExtensionRegistry = exports.createExtensionRegistry = function createExtensionRegistry() {
  var extensions = {};
  var addExtension = function addExtension(extensionName, extension) {
    extensionName = (0, _validateExtensionName["default"])(extensionName);
    if (!extension && extension !== null) {
      return required("extension");
    }
    extensions[extensionName.toLowerCase()] = extension;
  };
  var getExtension = function getExtension(extensionName) {
    extensionName = (0, _validateExtensionName["default"])(extensionName);
    return extensions[extensionName.toLowerCase()];
  };
  return {
    addExtension: addExtension,
    getExtension: getExtension
  };
};
var defaultRegistry = exports["default"] = createExtensionRegistry();