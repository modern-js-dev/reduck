function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var push = function push(state, payload) {
  return state.concat(payload);
};

var pop = function pop(state) {
  var newState = [];

  for (var i = 0; i < state.length - 1; i++) {
    newState.push(state[i]);
  }

  return newState;
};

var shift = function shift(state) {
  var newState = [];

  for (var i = 1; i < state.length; i++) {
    newState.push(state[i]);
  }

  return newState;
};

var unshift = function unshift(state, payload) {
  return [payload].concat(_toConsumableArray(state));
};

var concat = function concat(state, payload) {
  return [].concat(_toConsumableArray(state), _toConsumableArray(payload));
};

var splice = function splice(state, start, deleteCount) {
  var newState = state.slice();

  for (var _len = arguments.length, items = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    items[_key - 3] = arguments[_key];
  }

  newState.splice.apply(newState, [start, deleteCount].concat(items));
  return newState;
};

var filter = function filter(state, filterFn) {
  var newState = state.filter(filterFn);
  return newState;
};

export { push, pop, shift, unshift, concat, splice, filter };