"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExtensionRegistry = exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _invariant = _interopRequireDefault(require("invariant"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ExtensionRegistryContext = /*#__PURE__*/(0, _react.createContext)(null);
var useExtensionRegistry = exports.useExtensionRegistry = function useExtensionRegistry() {
  var registry = (0, _react.useContext)(ExtensionRegistryContext);
  return registry;
};
var ExtensionProvider = function ExtensionProvider(_ref) {
  var registry = _ref.registry,
    children = _ref.children;
  var initialRegistry = (0, _react.useRef)(registry);
  (0, _react.useEffect)(function () {
    (0, _invariant["default"])(initialRegistry.current === registry, "You can't change the extension registry after it has been rendered");
  }, [registry]);
  return /*#__PURE__*/_react["default"].createElement(ExtensionRegistryContext.Provider, {
    value: registry
  }, _react["default"].Children.only(children));
};
var _default = exports["default"] = ExtensionProvider;