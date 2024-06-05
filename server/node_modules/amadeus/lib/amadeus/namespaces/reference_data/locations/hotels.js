"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _byCity = _interopRequireDefault(require("./hotels/by-city.js"));
var _byGeocode = _interopRequireDefault(require("./hotels/by-geocode.js"));
var _byHotels = _interopRequireDefault(require("./hotels/by-hotels.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * A namespaced client for the
 * `/v1/reference-data/locations/hotels` endpoints
 *
 * Access via the {@link Amadeus} object
 *
 * ```js
 * let amadeus = new Amadeus();
 * amadeus.referenceData.locations.hotels;
 * ```
 *
 * @param {Client} client
 */
var Hotels = /*#__PURE__*/_createClass(function Hotels(client) {
  _classCallCheck(this, Hotels);
  this.client = client;
  this.byCity = new _byCity["default"](client);
  this.byGeocode = new _byGeocode["default"](client);
  this.byHotels = new _byHotels["default"](client);
});
var _default = exports["default"] = Hotels;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYnlDaXR5IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfYnlHZW9jb2RlIiwiX2J5SG90ZWxzIiwib2JqIiwiX19lc01vZHVsZSIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJpIiwibGVuZ3RoIiwiZGVzY3JpcHRvciIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiX3RvUHJvcGVydHlLZXkiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJDb25zdHJ1Y3RvciIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsInByb3RvdHlwZSIsInQiLCJfdG9QcmltaXRpdmUiLCJfdHlwZW9mIiwiciIsImUiLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsImNhbGwiLCJUeXBlRXJyb3IiLCJTdHJpbmciLCJOdW1iZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkhvdGVscyIsImNsaWVudCIsImJ5Q2l0eSIsImJ5R2VvY29kZSIsImJ5SG90ZWxzIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9hbWFkZXVzL25hbWVzcGFjZXMvcmVmZXJlbmNlX2RhdGEvbG9jYXRpb25zL2hvdGVscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYnlDaXR5IGZyb20gJy4vaG90ZWxzL2J5LWNpdHkuanMnO1xuaW1wb3J0IGJ5R2VvY29kZSBmcm9tICcuL2hvdGVscy9ieS1nZW9jb2RlLmpzJztcbmltcG9ydCBieUhvdGVscyBmcm9tICcuL2hvdGVscy9ieS1ob3RlbHMuanMnO1xuXG4vKipcbiAqIEEgbmFtZXNwYWNlZCBjbGllbnQgZm9yIHRoZVxuICogYC92MS9yZWZlcmVuY2UtZGF0YS9sb2NhdGlvbnMvaG90ZWxzYCBlbmRwb2ludHNcbiAqXG4gKiBBY2Nlc3MgdmlhIHRoZSB7QGxpbmsgQW1hZGV1c30gb2JqZWN0XG4gKlxuICogYGBganNcbiAqIGxldCBhbWFkZXVzID0gbmV3IEFtYWRldXMoKTtcbiAqIGFtYWRldXMucmVmZXJlbmNlRGF0YS5sb2NhdGlvbnMuaG90ZWxzO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtDbGllbnR9IGNsaWVudFxuICovXG5jbGFzcyBIb3RlbHMge1xuICBjb25zdHJ1Y3RvcihjbGllbnQpIHtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmJ5Q2l0eSA9IG5ldyBieUNpdHkoY2xpZW50KTtcbiAgICB0aGlzLmJ5R2VvY29kZSA9IG5ldyBieUdlb2NvZGUoY2xpZW50KTtcbiAgICB0aGlzLmJ5SG90ZWxzID0gbmV3IGJ5SG90ZWxzKGNsaWVudCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSG90ZWxzO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsSUFBQUEsT0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsVUFBQSxHQUFBRixzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUUsU0FBQSxHQUFBSCxzQkFBQSxDQUFBQyxPQUFBO0FBQTZDLFNBQUFELHVCQUFBSSxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsZ0JBQUFBLEdBQUE7QUFBQSxTQUFBRSxrQkFBQUMsTUFBQSxFQUFBQyxLQUFBLGFBQUFDLENBQUEsTUFBQUEsQ0FBQSxHQUFBRCxLQUFBLENBQUFFLE1BQUEsRUFBQUQsQ0FBQSxVQUFBRSxVQUFBLEdBQUFILEtBQUEsQ0FBQUMsQ0FBQSxHQUFBRSxVQUFBLENBQUFDLFVBQUEsR0FBQUQsVUFBQSxDQUFBQyxVQUFBLFdBQUFELFVBQUEsQ0FBQUUsWUFBQSx3QkFBQUYsVUFBQSxFQUFBQSxVQUFBLENBQUFHLFFBQUEsU0FBQUMsTUFBQSxDQUFBQyxjQUFBLENBQUFULE1BQUEsRUFBQVUsY0FBQSxDQUFBTixVQUFBLENBQUFPLEdBQUEsR0FBQVAsVUFBQTtBQUFBLFNBQUFRLGFBQUFDLFdBQUEsRUFBQUMsVUFBQSxFQUFBQyxXQUFBLFFBQUFELFVBQUEsRUFBQWYsaUJBQUEsQ0FBQWMsV0FBQSxDQUFBRyxTQUFBLEVBQUFGLFVBQUEsT0FBQUMsV0FBQSxFQUFBaEIsaUJBQUEsQ0FBQWMsV0FBQSxFQUFBRSxXQUFBLEdBQUFQLE1BQUEsQ0FBQUMsY0FBQSxDQUFBSSxXQUFBLGlCQUFBTixRQUFBLG1CQUFBTSxXQUFBO0FBQUEsU0FBQUgsZUFBQU8sQ0FBQSxRQUFBZixDQUFBLEdBQUFnQixZQUFBLENBQUFELENBQUEsZ0NBQUFFLE9BQUEsQ0FBQWpCLENBQUEsSUFBQUEsQ0FBQSxHQUFBQSxDQUFBO0FBQUEsU0FBQWdCLGFBQUFELENBQUEsRUFBQUcsQ0FBQSxvQkFBQUQsT0FBQSxDQUFBRixDQUFBLE1BQUFBLENBQUEsU0FBQUEsQ0FBQSxNQUFBSSxDQUFBLEdBQUFKLENBQUEsQ0FBQUssTUFBQSxDQUFBQyxXQUFBLGtCQUFBRixDQUFBLFFBQUFuQixDQUFBLEdBQUFtQixDQUFBLENBQUFHLElBQUEsQ0FBQVAsQ0FBQSxFQUFBRyxDQUFBLGdDQUFBRCxPQUFBLENBQUFqQixDQUFBLFVBQUFBLENBQUEsWUFBQXVCLFNBQUEseUVBQUFMLENBQUEsR0FBQU0sTUFBQSxHQUFBQyxNQUFBLEVBQUFWLENBQUE7QUFBQSxTQUFBVyxnQkFBQUMsUUFBQSxFQUFBaEIsV0FBQSxVQUFBZ0IsUUFBQSxZQUFBaEIsV0FBQSxlQUFBWSxTQUFBO0FBRTdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWkEsSUFhTUssTUFBTSxnQkFBQWxCLFlBQUEsQ0FDVixTQUFBa0IsT0FBWUMsTUFBTSxFQUFFO0VBQUFILGVBQUEsT0FBQUUsTUFBQTtFQUNsQixJQUFJLENBQUNDLE1BQU0sR0FBR0EsTUFBTTtFQUNwQixJQUFJLENBQUNDLE1BQU0sR0FBRyxJQUFJQSxrQkFBTSxDQUFDRCxNQUFNLENBQUM7RUFDaEMsSUFBSSxDQUFDRSxTQUFTLEdBQUcsSUFBSUEscUJBQVMsQ0FBQ0YsTUFBTSxDQUFDO0VBQ3RDLElBQUksQ0FBQ0csUUFBUSxHQUFHLElBQUlBLG9CQUFRLENBQUNILE1BQU0sQ0FBQztBQUN0QyxDQUFDO0FBQUEsSUFBQUksUUFBQSxHQUFBQyxPQUFBLGNBR1lOLE1BQU07QUFBQU8sTUFBQSxDQUFBRCxPQUFBLEdBQUFBLE9BQUEsQ0FBQUUsT0FBQSIsImlnbm9yZUxpc3QiOltdfQ==