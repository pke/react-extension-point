"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _ExtensionRegistry = _interopRequireDefault(require("../ExtensionRegistry"));
var _validateExtensionName = _interopRequireDefault(require("../internal/validateExtensionName"));
var _ExtensionProvider = require("../ExtensionProvider");
var _excluded = ["extensionName", "children", "registry"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var ExtensionPoint = function ExtensionPoint(_ref) {
  var extensionName = _ref.extensionName,
    _ref$children = _ref.children,
    children = _ref$children === void 0 ? null : _ref$children,
    registryFromProps = _ref.registry,
    props = _objectWithoutProperties(_ref, _excluded);
  var registry = (0, _ExtensionProvider.useExtensionRegistry)() || registryFromProps || _ExtensionRegistry["default"];
  var validatedExtensionName = (0, _validateExtensionName["default"])(extensionName);
  var Extension = registry === null || registry === void 0 ? void 0 : registry.getExtension(validatedExtensionName);
  if (typeof children === "function") {
    return children(Extension, props) || null;
  } else if (typeof Extension === "undefined") {
    if ( /*#__PURE__*/_react["default"].isValidElement(children)) {
      return /*#__PURE__*/_react["default"].cloneElement(children, props);
    } else {
      return children;
    }
  } else if (!Extension) {
    return null;
  }
  return /*#__PURE__*/_react["default"].createElement(Extension, props);
};
var _default = exports["default"] = ExtensionPoint;