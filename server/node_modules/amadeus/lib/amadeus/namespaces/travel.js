"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _analytics = _interopRequireDefault(require("./travel/analytics"));
var _predictions = _interopRequireDefault(require("./travel/predictions"));
var _trip_parser = _interopRequireDefault(require("./travel/trip_parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * A namespaced client for the
 * `/v1/travel` & `/v2/travel` & `/v3/travel` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```js
 * let amadeus = new Amadeus();
 * amadeus.travel;
 * ```
 *
 * @param {Client} client
 * @property {Analytics} analytics
 * @property {Predictions} predictions
 * @property {TripParser} tripParser
 * @protected
 */
var Travel = /*#__PURE__*/_createClass(function Travel(client) {
  _classCallCheck(this, Travel);
  this.client = client;
  this.analytics = new _analytics["default"](client);
  this.predictions = new _predictions["default"](client);
  this.tripParser = new _trip_parser["default"](client);
});
var _default = exports["default"] = Travel;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYW5hbHl0aWNzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfcHJlZGljdGlvbnMiLCJfdHJpcF9wYXJzZXIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiX2RlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImkiLCJsZW5ndGgiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJfdG9Qcm9wZXJ0eUtleSIsImtleSIsIl9jcmVhdGVDbGFzcyIsIkNvbnN0cnVjdG9yIiwicHJvdG9Qcm9wcyIsInN0YXRpY1Byb3BzIiwicHJvdG90eXBlIiwidCIsIl90b1ByaW1pdGl2ZSIsIl90eXBlb2YiLCJyIiwiZSIsIlN5bWJvbCIsInRvUHJpbWl0aXZlIiwiY2FsbCIsIlR5cGVFcnJvciIsIlN0cmluZyIsIk51bWJlciIsIl9jbGFzc0NhbGxDaGVjayIsImluc3RhbmNlIiwiVHJhdmVsIiwiY2xpZW50IiwiYW5hbHl0aWNzIiwiQW5hbHl0aWNzIiwicHJlZGljdGlvbnMiLCJQcmVkaWN0aW9ucyIsInRyaXBQYXJzZXIiLCJUcmlwUGFyc2VyIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hbWFkZXVzL25hbWVzcGFjZXMvdHJhdmVsLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBbmFseXRpY3MgZnJvbSAnLi90cmF2ZWwvYW5hbHl0aWNzJztcbmltcG9ydCBQcmVkaWN0aW9ucyBmcm9tICcuL3RyYXZlbC9wcmVkaWN0aW9ucyc7XG5pbXBvcnQgVHJpcFBhcnNlciBmcm9tICcuL3RyYXZlbC90cmlwX3BhcnNlcic7XG5cbi8qKlxuICogQSBuYW1lc3BhY2VkIGNsaWVudCBmb3IgdGhlXG4gKiBgL3YxL3RyYXZlbGAgJiBgL3YyL3RyYXZlbGAgJiBgL3YzL3RyYXZlbGAgZW5kcG9pbnRzXG4gKlxuICogQWNjZXNzIHZpYSB0aGUge0BsaW5rIEFtYWRldXN9IG9iamVjdFxuICpcbiAqIGBgYGpzXG4gKiBsZXQgYW1hZGV1cyA9IG5ldyBBbWFkZXVzKCk7XG4gKiBhbWFkZXVzLnRyYXZlbDtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7Q2xpZW50fSBjbGllbnRcbiAqIEBwcm9wZXJ0eSB7QW5hbHl0aWNzfSBhbmFseXRpY3NcbiAqIEBwcm9wZXJ0eSB7UHJlZGljdGlvbnN9IHByZWRpY3Rpb25zXG4gKiBAcHJvcGVydHkge1RyaXBQYXJzZXJ9IHRyaXBQYXJzZXJcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuY2xhc3MgVHJhdmVsIHtcbiAgY29uc3RydWN0b3IoY2xpZW50KSB7XG4gICAgdGhpcy5jbGllbnQgICAgPSBjbGllbnQ7XG4gICAgdGhpcy5hbmFseXRpY3MgPSBuZXcgQW5hbHl0aWNzKGNsaWVudCk7XG4gICAgdGhpcy5wcmVkaWN0aW9ucyA9IG5ldyBQcmVkaWN0aW9ucyhjbGllbnQpO1xuICAgIHRoaXMudHJpcFBhcnNlciA9IG5ldyBUcmlwUGFyc2VyKGNsaWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVHJhdmVsO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsVUFBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsWUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsWUFBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQThDLFNBQUFELHVCQUFBSSxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsZ0JBQUFBLEdBQUE7QUFBQSxTQUFBRSxrQkFBQUMsTUFBQSxFQUFBQyxLQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBRCxLQUFBLENBQUFFLE1BQUEsRUFBQUQsQ0FBQSxVQUFBRSxVQUFBLEdBQUFILEtBQUEsQ0FBQUMsQ0FBQSxHQUFBRSxVQUFBLENBQUFDLFVBQUEsR0FBQUQsVUFBQSxDQUFBQyxVQUFBLFdBQUFELFVBQUEsQ0FBQUUsWUFBQSx3QkFBQUYsVUFBQSxFQUFBQSxVQUFBLENBQUFHLFFBQUEsU0FBQUMsTUFBQSxDQUFBQyxjQUFBLENBQUFULE1BQUEsRUFBQVUsY0FBQSxDQUFBTixVQUFBLENBQUFPLEdBQUEsR0FBQVAsVUFBQTtBQUFBLFNBQUFRLGFBQUFDLFdBQUEsRUFBQUMsVUFBQSxFQUFBQyxXQUFBLFFBQUFELFVBQUEsRUFBQWYsaUJBQUEsQ0FBQWMsV0FBQSxDQUFBRyxTQUFBLEVBQUFGLFVBQUEsT0FBQUMsV0FBQSxFQUFBaEIsaUJBQUEsQ0FBQWMsV0FBQSxFQUFBRSxXQUFBLEdBQUFQLE1BQUEsQ0FBQUMsY0FBQSxDQUFBSSxXQUFBLGlCQUFBTixRQUFBLG1CQUFBTSxXQUFBO0FBQUEsU0FBQUgsZUFBQU8sQ0FBQSxRQUFBZixDQUFBLEdBQUFnQixZQUFBLENBQUFELENBQUEsZ0NBQUFFLE9BQUEsQ0FBQWpCLENBQUEsSUFBQUEsQ0FBQSxHQUFBQSxDQUFBO0FBQUEsU0FBQWdCLGFBQUFELENBQUEsRUFBQUcsQ0FBQSxvQkFBQUQsT0FBQSxDQUFBRixDQUFBLE1BQUFBLENBQUEsU0FBQUEsQ0FBQSxNQUFBSSxDQUFBLEdBQUFKLENBQUEsQ0FBQUssTUFBQSxDQUFBQyxXQUFBLGtCQUFBRixDQUFBLFFBQUFuQixDQUFBLEdBQUFtQixDQUFBLENBQUFHLElBQUEsQ0FBQVAsQ0FBQSxFQUFBRyxDQUFBLGdDQUFBRCxPQUFBLENBQUFqQixDQUFBLFVBQUFBLENBQUEsWUFBQXVCLFNBQUEseUVBQUFMLENBQUEsR0FBQU0sTUFBQSxHQUFBQyxNQUFBLEVBQUFWLENBQUE7QUFBQSxTQUFBVyxnQkFBQUMsUUFBQSxFQUFBaEIsV0FBQSxVQUFBZ0IsUUFBQSxZQUFBaEIsV0FBQSxlQUFBWSxTQUFBO0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFoQkEsSUFpQk1LLE1BQU0sZ0JBQUFsQixZQUFBLENBQ1YsU0FBQWtCLE9BQVlDLE1BQU0sRUFBRTtFQUFBSCxlQUFBLE9BQUFFLE1BQUE7RUFDbEIsSUFBSSxDQUFDQyxNQUFNLEdBQU1BLE1BQU07RUFDdkIsSUFBSSxDQUFDQyxTQUFTLEdBQUcsSUFBSUMscUJBQVMsQ0FBQ0YsTUFBTSxDQUFDO0VBQ3RDLElBQUksQ0FBQ0csV0FBVyxHQUFHLElBQUlDLHVCQUFXLENBQUNKLE1BQU0sQ0FBQztFQUMxQyxJQUFJLENBQUNLLFVBQVUsR0FBRyxJQUFJQyx1QkFBVSxDQUFDTixNQUFNLENBQUM7QUFDMUMsQ0FBQztBQUFBLElBQUFPLFFBQUEsR0FBQUMsT0FBQSxjQUdZVCxNQUFNO0FBQUFVLE1BQUEsQ0FBQUQsT0FBQSxHQUFBQSxPQUFBLENBQUFFLE9BQUEiLCJpZ25vcmVMaXN0IjpbXX0=