"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("@modern-js-reduck/store");

var _utils = require("./utils");

var primitiveActions = _interopRequireWildcard(require("./primitive"));

var arrayActions = _interopRequireWildcard(require("./array"));

var _object = require("./object");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = (0, _store.createPlugin)(() => ({
  prepareModelDesc(modelDesc) {
    const initialState = modelDesc.state;
    const type = (0, _utils.getType)(initialState);

    if (type === 'primitive') {
      return (0, _utils.mergeActions)(modelDesc, primitiveActions);
    }

    if (type === 'array') {
      return (0, _utils.mergeActions)(modelDesc, arrayActions);
    }

    if (type === 'object') {
      return (0, _utils.mergeActions)(modelDesc, (0, _object.createObjectActions)(modelDesc.state));
    }

    return modelDesc;
  }

}));

exports.default = _default;