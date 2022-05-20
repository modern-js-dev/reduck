"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCounter = void 0;
var createCounter = function (callback) {
    var dispatch = function (index, input) {
        var next = function (nextInput) {
            if (nextInput === void 0) { nextInput = input; }
            return dispatch(index + 1, nextInput);
        };
        return callback(index, input, next);
    };
    var start = function (input) {
        return dispatch(0, input);
    };
    return {
        start: start,
        dispatch: dispatch,
    };
};
exports.createCounter = createCounter;
//# sourceMappingURL=counter.js.map