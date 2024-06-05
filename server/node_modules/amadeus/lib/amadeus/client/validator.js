"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _https = _interopRequireDefault(require("https"));
var _http = _interopRequireDefault(require("http"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(fn) { try { return Function.toString.call(fn).indexOf("[native code]") !== -1; } catch (e) { return typeof fn === "function"; } }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var HOSTS = {
  'test': 'test.api.amadeus.com',
  'production': 'api.amadeus.com'
};
var RECOGNIZED_OPTIONS = ['clientId', 'clientSecret', 'logger', 'logLevel', 'hostname', 'host', 'customAppId', 'customAppVersion', 'http', 'ssl', 'port'];

/**
 * Helper class for validating parameters
 * @protected
 */
var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }
  return _createClass(Validator, [{
    key: "validateAndInitialize",
    value:
    /**
     * Initialise the client's default value, ensuring the required values are
     * present
     *
     * @param  {Client} client the client object to set the defaults for
     * @param  {Object} options the associative array of options passed to the
     *  client on initialization
     */
    function validateAndInitialize(client, options) {
      this.initializeClientCredentials(client, options);
      this.initializeLogger(client, options);
      this.initializeHost(client, options);
      this.initializeCustomApp(client, options);
      this.initializeHttp(client, options);
      this.warnOnUnrecognizedOptions(options, client, RECOGNIZED_OPTIONS);
    }

    // PRIVATE
  }, {
    key: "initializeClientCredentials",
    value: function initializeClientCredentials(client, options) {
      client.clientId = this.initRequired('clientId', options);
      client.clientSecret = this.initRequired('clientSecret', options);
    }
  }, {
    key: "initializeLogger",
    value: function initializeLogger(client, options) {
      client.logger = this.initOptional('logger', options, console);
      client.logLevel = this.initOptional('logLevel', options, 'silent');
    }
  }, {
    key: "initializeHost",
    value: function initializeHost(client, options) {
      var hostname = this.initOptional('hostname', options, 'test');
      client.host = this.initOptional('host', options, HOSTS[hostname]);
      client.port = this.initOptional('port', options, 443);
      client.ssl = this.initOptional('ssl', options, true);
    }
  }, {
    key: "initializeCustomApp",
    value: function initializeCustomApp(client, options) {
      client.customAppId = this.initOptional('customAppId', options);
      client.customAppVersion = this.initOptional('customAppVersion', options);
    }
  }, {
    key: "initializeHttp",
    value: function initializeHttp(client, options) {
      var network = client.ssl ? _https["default"] : _http["default"];
      client.http = this.initOptional('http', options, network);
    }
  }, {
    key: "initRequired",
    value: function initRequired(key, options) {
      var result = this.initOptional(key, options);
      if (!result) throw new ArgumentError("Missing required argument: ".concat(key));
      return result;
    }
  }, {
    key: "initOptional",
    value: function initOptional(key, options) {
      var fallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      //Env variables names expected to be in SNAKE_CASE and uppercase
      var envKey = "AMADEUS_".concat(key.replace(/[A-Z]/g, function (c) {
        return "_".concat(c.toLowerCase());
      }).toUpperCase());
      var value = options[key] || process.env[envKey] || fallback;
      return value;
    }
  }, {
    key: "warnOnUnrecognizedOptions",
    value: function warnOnUnrecognizedOptions(options, client, recognizedOptions) {
      Object.keys(options).forEach(function (key) {
        if (recognizedOptions.indexOf(key) === -1 && client.warn()) {
          client.logger.log("Unrecognized option: ".concat(key));
        }
      });
      return null;
    }
  }]);
}(); // PRIVATE
var ArgumentError = /*#__PURE__*/function (_Error) {
  function ArgumentError(message) {
    var _this;
    _classCallCheck(this, ArgumentError);
    _this = _callSuper(this, ArgumentError, [message]);
    _this.name = 'ArgumentError';
    return _this;
  }
  _inherits(ArgumentError, _Error);
  return _createClass(ArgumentError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
var _default = exports["default"] = Validator;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfaHR0cHMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9odHRwIiwib2JqIiwiX19lc01vZHVsZSIsIl9jYWxsU3VwZXIiLCJ0IiwibyIsImUiLCJfZ2V0UHJvdG90eXBlT2YiLCJfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybiIsIl9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QiLCJSZWZsZWN0IiwiY29uc3RydWN0IiwiY29uc3RydWN0b3IiLCJhcHBseSIsInNlbGYiLCJjYWxsIiwiX3R5cGVvZiIsIlR5cGVFcnJvciIsIl9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQiLCJSZWZlcmVuY2VFcnJvciIsIl9pbmhlcml0cyIsInN1YkNsYXNzIiwic3VwZXJDbGFzcyIsInByb3RvdHlwZSIsIk9iamVjdCIsImNyZWF0ZSIsInZhbHVlIiwid3JpdGFibGUiLCJjb25maWd1cmFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9zZXRQcm90b3R5cGVPZiIsIl93cmFwTmF0aXZlU3VwZXIiLCJDbGFzcyIsIl9jYWNoZSIsIk1hcCIsInVuZGVmaW5lZCIsIl9pc05hdGl2ZUZ1bmN0aW9uIiwiaGFzIiwiZ2V0Iiwic2V0IiwiV3JhcHBlciIsIl9jb25zdHJ1Y3QiLCJhcmd1bWVudHMiLCJlbnVtZXJhYmxlIiwiciIsInB1c2giLCJwIiwiYmluZCIsIkJvb2xlYW4iLCJ2YWx1ZU9mIiwiZm4iLCJGdW5jdGlvbiIsInRvU3RyaW5nIiwiaW5kZXhPZiIsInNldFByb3RvdHlwZU9mIiwiX19wcm90b19fIiwiZ2V0UHJvdG90eXBlT2YiLCJTeW1ib2wiLCJpdGVyYXRvciIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiQ29uc3RydWN0b3IiLCJfZGVmaW5lUHJvcGVydGllcyIsInRhcmdldCIsInByb3BzIiwiaSIsImxlbmd0aCIsImRlc2NyaXB0b3IiLCJfdG9Qcm9wZXJ0eUtleSIsImtleSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsIl90b1ByaW1pdGl2ZSIsInRvUHJpbWl0aXZlIiwiU3RyaW5nIiwiTnVtYmVyIiwiSE9TVFMiLCJSRUNPR05JWkVEX09QVElPTlMiLCJWYWxpZGF0b3IiLCJ2YWxpZGF0ZUFuZEluaXRpYWxpemUiLCJjbGllbnQiLCJvcHRpb25zIiwiaW5pdGlhbGl6ZUNsaWVudENyZWRlbnRpYWxzIiwiaW5pdGlhbGl6ZUxvZ2dlciIsImluaXRpYWxpemVIb3N0IiwiaW5pdGlhbGl6ZUN1c3RvbUFwcCIsImluaXRpYWxpemVIdHRwIiwid2Fybk9uVW5yZWNvZ25pemVkT3B0aW9ucyIsImNsaWVudElkIiwiaW5pdFJlcXVpcmVkIiwiY2xpZW50U2VjcmV0IiwibG9nZ2VyIiwiaW5pdE9wdGlvbmFsIiwiY29uc29sZSIsImxvZ0xldmVsIiwiaG9zdG5hbWUiLCJob3N0IiwicG9ydCIsInNzbCIsImN1c3RvbUFwcElkIiwiY3VzdG9tQXBwVmVyc2lvbiIsIm5ldHdvcmsiLCJodHRwcyIsImh0dHAiLCJyZXN1bHQiLCJBcmd1bWVudEVycm9yIiwiY29uY2F0IiwiZmFsbGJhY2siLCJlbnZLZXkiLCJyZXBsYWNlIiwiYyIsInRvTG93ZXJDYXNlIiwidG9VcHBlckNhc2UiLCJwcm9jZXNzIiwiZW52IiwicmVjb2duaXplZE9wdGlvbnMiLCJrZXlzIiwiZm9yRWFjaCIsIndhcm4iLCJsb2ciLCJfRXJyb3IiLCJtZXNzYWdlIiwiX3RoaXMiLCJuYW1lIiwiRXJyb3IiLCJfZGVmYXVsdCIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZhdWx0Il0sInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FtYWRldXMvY2xpZW50L3ZhbGlkYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHR0cHMgICAgIGZyb20gJ2h0dHBzJztcbmltcG9ydCBodHRwICAgICAgZnJvbSAnaHR0cCc7XG5cbmNvbnN0IEhPU1RTID0ge1xuICAndGVzdCcgICAgICAgOiAndGVzdC5hcGkuYW1hZGV1cy5jb20nLFxuICAncHJvZHVjdGlvbicgOiAnYXBpLmFtYWRldXMuY29tJ1xufTtcblxuY29uc3QgUkVDT0dOSVpFRF9PUFRJT05TID0gW1xuICAnY2xpZW50SWQnLFxuICAnY2xpZW50U2VjcmV0JyxcbiAgJ2xvZ2dlcicsXG4gICdsb2dMZXZlbCcsXG4gICdob3N0bmFtZScsXG4gICdob3N0JyxcbiAgJ2N1c3RvbUFwcElkJyxcbiAgJ2N1c3RvbUFwcFZlcnNpb24nLFxuICAnaHR0cCcsXG4gICdzc2wnLFxuICAncG9ydCdcbl07XG5cbi8qKlxuICogSGVscGVyIGNsYXNzIGZvciB2YWxpZGF0aW5nIHBhcmFtZXRlcnNcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuY2xhc3MgVmFsaWRhdG9yIHtcblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgY2xpZW50J3MgZGVmYXVsdCB2YWx1ZSwgZW5zdXJpbmcgdGhlIHJlcXVpcmVkIHZhbHVlcyBhcmVcbiAgICogcHJlc2VudFxuICAgKlxuICAgKiBAcGFyYW0gIHtDbGllbnR9IGNsaWVudCB0aGUgY2xpZW50IG9iamVjdCB0byBzZXQgdGhlIGRlZmF1bHRzIGZvclxuICAgKiBAcGFyYW0gIHtPYmplY3R9IG9wdGlvbnMgdGhlIGFzc29jaWF0aXZlIGFycmF5IG9mIG9wdGlvbnMgcGFzc2VkIHRvIHRoZVxuICAgKiAgY2xpZW50IG9uIGluaXRpYWxpemF0aW9uXG4gICAqL1xuICB2YWxpZGF0ZUFuZEluaXRpYWxpemUoY2xpZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5pbml0aWFsaXplQ2xpZW50Q3JlZGVudGlhbHMoY2xpZW50LCBvcHRpb25zKTtcbiAgICB0aGlzLmluaXRpYWxpemVMb2dnZXIoY2xpZW50LCBvcHRpb25zKTtcbiAgICB0aGlzLmluaXRpYWxpemVIb3N0KGNsaWVudCwgb3B0aW9ucyk7XG4gICAgdGhpcy5pbml0aWFsaXplQ3VzdG9tQXBwKGNsaWVudCwgb3B0aW9ucyk7XG4gICAgdGhpcy5pbml0aWFsaXplSHR0cChjbGllbnQsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy53YXJuT25VbnJlY29nbml6ZWRPcHRpb25zKG9wdGlvbnMsIGNsaWVudCwgUkVDT0dOSVpFRF9PUFRJT05TKTtcbiAgfVxuXG4gIC8vIFBSSVZBVEVcblxuICBpbml0aWFsaXplQ2xpZW50Q3JlZGVudGlhbHMoY2xpZW50LCBvcHRpb25zKSB7XG4gICAgY2xpZW50LmNsaWVudElkID0gdGhpcy5pbml0UmVxdWlyZWQoJ2NsaWVudElkJywgb3B0aW9ucyk7XG4gICAgY2xpZW50LmNsaWVudFNlY3JldCA9IHRoaXMuaW5pdFJlcXVpcmVkKCdjbGllbnRTZWNyZXQnLCBvcHRpb25zKTtcbiAgfVxuXG4gIGluaXRpYWxpemVMb2dnZXIoY2xpZW50LCBvcHRpb25zKSB7XG4gICAgY2xpZW50LmxvZ2dlciAgICA9IHRoaXMuaW5pdE9wdGlvbmFsKCdsb2dnZXInLCBvcHRpb25zLCBjb25zb2xlKTtcbiAgICBjbGllbnQubG9nTGV2ZWwgPSB0aGlzLmluaXRPcHRpb25hbCgnbG9nTGV2ZWwnLCBvcHRpb25zLCAnc2lsZW50Jyk7XG4gIH1cblxuICBpbml0aWFsaXplSG9zdChjbGllbnQsIG9wdGlvbnMpIHtcbiAgICBsZXQgaG9zdG5hbWUgPSB0aGlzLmluaXRPcHRpb25hbCgnaG9zdG5hbWUnLCBvcHRpb25zLCAndGVzdCcpO1xuICAgIGNsaWVudC5ob3N0ICA9IHRoaXMuaW5pdE9wdGlvbmFsKCdob3N0Jywgb3B0aW9ucywgSE9TVFNbaG9zdG5hbWVdKTtcbiAgICBjbGllbnQucG9ydCAgPSB0aGlzLmluaXRPcHRpb25hbCgncG9ydCcsIG9wdGlvbnMsIDQ0Myk7XG4gICAgY2xpZW50LnNzbCAgID0gdGhpcy5pbml0T3B0aW9uYWwoJ3NzbCcsIG9wdGlvbnMsIHRydWUpO1xuICB9XG5cbiAgaW5pdGlhbGl6ZUN1c3RvbUFwcChjbGllbnQsIG9wdGlvbnMpIHtcbiAgICBjbGllbnQuY3VzdG9tQXBwSWQgPSB0aGlzLmluaXRPcHRpb25hbCgnY3VzdG9tQXBwSWQnLCBvcHRpb25zKTtcbiAgICBjbGllbnQuY3VzdG9tQXBwVmVyc2lvbiA9IHRoaXMuaW5pdE9wdGlvbmFsKCdjdXN0b21BcHBWZXJzaW9uJywgb3B0aW9ucyk7XG4gIH1cblxuICBpbml0aWFsaXplSHR0cChjbGllbnQsIG9wdGlvbnMpIHtcbiAgICBsZXQgbmV0d29yayA9IGNsaWVudC5zc2wgPyBodHRwcyA6IGh0dHA7XG4gICAgY2xpZW50Lmh0dHAgPSB0aGlzLmluaXRPcHRpb25hbCgnaHR0cCcsIG9wdGlvbnMsIG5ldHdvcmspO1xuICB9XG5cbiAgaW5pdFJlcXVpcmVkKGtleSwgb3B0aW9ucykge1xuICAgIGxldCByZXN1bHQgPSB0aGlzLmluaXRPcHRpb25hbChrZXksIG9wdGlvbnMpO1xuICAgIGlmICghcmVzdWx0KSB0aHJvdyBuZXcgQXJndW1lbnRFcnJvcihgTWlzc2luZyByZXF1aXJlZCBhcmd1bWVudDogJHtrZXl9YCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGluaXRPcHRpb25hbChrZXksIG9wdGlvbnMsIGZhbGxiYWNrID0gbnVsbCkge1xuICAgIC8vRW52IHZhcmlhYmxlcyBuYW1lcyBleHBlY3RlZCB0byBiZSBpbiBTTkFLRV9DQVNFIGFuZCB1cHBlcmNhc2VcbiAgICBsZXQgZW52S2V5ID0gYEFNQURFVVNfJHtrZXkucmVwbGFjZSgvW0EtWl0vZywgYyA9PiBgXyR7Yy50b0xvd2VyQ2FzZSgpfWApLnRvVXBwZXJDYXNlKCl9YDtcbiAgICBsZXQgdmFsdWUgPSBvcHRpb25zW2tleV0gfHwgcHJvY2Vzcy5lbnZbZW52S2V5XSB8fCBmYWxsYmFjaztcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICB3YXJuT25VbnJlY29nbml6ZWRPcHRpb25zKG9wdGlvbnMsIGNsaWVudCwgcmVjb2duaXplZE9wdGlvbnMpIHtcbiAgICBPYmplY3Qua2V5cyhvcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChyZWNvZ25pemVkT3B0aW9ucy5pbmRleE9mKGtleSkgPT09IC0xICYmIGNsaWVudC53YXJuKCkpIHtcbiAgICAgICAgY2xpZW50LmxvZ2dlci5sb2coYFVucmVjb2duaXplZCBvcHRpb246ICR7a2V5fWApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8vIFBSSVZBVEVcblxuY2xhc3MgQXJndW1lbnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubmFtZSA9ICdBcmd1bWVudEVycm9yJztcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWYWxpZGF0b3I7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQUFBLE1BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLEtBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUE2QixTQUFBRCx1QkFBQUcsR0FBQSxXQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBLGdCQUFBQSxHQUFBO0FBQUEsU0FBQUUsV0FBQUMsQ0FBQSxFQUFBQyxDQUFBLEVBQUFDLENBQUEsV0FBQUQsQ0FBQSxHQUFBRSxlQUFBLENBQUFGLENBQUEsR0FBQUcsMEJBQUEsQ0FBQUosQ0FBQSxFQUFBSyx5QkFBQSxLQUFBQyxPQUFBLENBQUFDLFNBQUEsQ0FBQU4sQ0FBQSxFQUFBQyxDQUFBLFFBQUFDLGVBQUEsQ0FBQUgsQ0FBQSxFQUFBUSxXQUFBLElBQUFQLENBQUEsQ0FBQVEsS0FBQSxDQUFBVCxDQUFBLEVBQUFFLENBQUE7QUFBQSxTQUFBRSwyQkFBQU0sSUFBQSxFQUFBQyxJQUFBLFFBQUFBLElBQUEsS0FBQUMsT0FBQSxDQUFBRCxJQUFBLHlCQUFBQSxJQUFBLDJCQUFBQSxJQUFBLGFBQUFBLElBQUEseUJBQUFFLFNBQUEsdUVBQUFDLHNCQUFBLENBQUFKLElBQUE7QUFBQSxTQUFBSSx1QkFBQUosSUFBQSxRQUFBQSxJQUFBLHlCQUFBSyxjQUFBLHdFQUFBTCxJQUFBO0FBQUEsU0FBQU0sVUFB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