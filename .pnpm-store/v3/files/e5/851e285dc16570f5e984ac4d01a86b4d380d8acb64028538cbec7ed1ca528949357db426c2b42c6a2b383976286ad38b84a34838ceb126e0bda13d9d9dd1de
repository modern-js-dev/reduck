"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = void 0;
var tslib_1 = require("tslib");
var chalk_1 = (0, tslib_1.__importDefault)(require("chalk"));
var util_1 = (0, tslib_1.__importDefault)(require("util"));
var bytes_1 = (0, tslib_1.__importDefault)(require("bytes"));
var util_2 = require("./util");
var colorCodes = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow',
};
var getColor = function (str, code) {
    var _a;
    var method = (_a = colorCodes[code]) !== null && _a !== void 0 ? _a : 'yellow';
    return chalk_1.default[method](str);
};
var createLogger = function (options) {
    var config = (0, tslib_1.__assign)({ transporter: function (str) { return console.log(str); } }, options);
    var transporter = config.transporter;
    var print = function (format) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var string = util_1.default.format.apply(util_1.default, (0, tslib_1.__spreadArray)([format], (0, tslib_1.__read)(args), false));
        transporter(string);
    };
    var logInput = function (method, url) {
        print("  ".concat(chalk_1.default.gray('<--'), " ").concat(chalk_1.default.bold('%s'), " ").concat(chalk_1.default.gray('%s')), method, url);
    };
    var logOutput = function (method, url, status, startTime, contentLength, event) {
        var colorCode = (status / 100) | 0;
        var length = [204, 205, 304].includes(status) ? '' : contentLength ? (0, bytes_1.default)(contentLength) : '-';
        var upstream = event === 'error' ? chalk_1.default.red('xxx') : event === 'close' ? chalk_1.default.yellow('-x-') : chalk_1.default.gray('-->');
        print("  ".concat(upstream, " ").concat(chalk_1.default.bold('%s'), " ").concat(chalk_1.default.gray('%s'), " ").concat(getColor('%s', colorCode), " ").concat(chalk_1.default.gray('%s'), " ").concat(chalk_1.default.gray('%s')), method, url, status, (0, util_2.prettyTime)(startTime), length);
    };
    return {
        print: print,
        logInput: logInput,
        logOutput: logOutput,
    };
};
exports.createLogger = createLogger;
//# sourceMappingURL=logger.js.map