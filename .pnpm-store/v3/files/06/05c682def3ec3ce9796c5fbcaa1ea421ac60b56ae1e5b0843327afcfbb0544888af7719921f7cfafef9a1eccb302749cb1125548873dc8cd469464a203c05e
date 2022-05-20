"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
var tslib_1 = require("tslib");
var prettier_1 = (0, tslib_1.__importDefault)(require("prettier"));
var cosmiconfig_1 = require("cosmiconfig");
var explorer = (0, cosmiconfig_1.cosmiconfigSync)('prettier');
var prettierConfig = explorer.search();
var format = function (source) {
    return prettier_1.default.format(source, (0, tslib_1.__assign)({ semi: false, printWidth: 120, singleQuote: true, parser: 'typescript' }, prettierConfig === null || prettierConfig === void 0 ? void 0 : prettierConfig.config));
};
exports.format = format;
//# sourceMappingURL=prettier.js.map