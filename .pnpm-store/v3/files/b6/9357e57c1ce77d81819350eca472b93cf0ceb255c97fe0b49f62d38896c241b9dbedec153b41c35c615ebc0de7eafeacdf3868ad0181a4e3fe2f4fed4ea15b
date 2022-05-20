"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../utils");
/**
 * Rule which enforces the use of a `types` property over a `typings` property.
 *
 * @param context - The context object.
 * @returns A list of custom diagnostics.
 */
exports.default = (context) => {
    const { pkg } = context;
    if (!pkg.types && pkg.typings) {
        const packageJsonFullPath = path_1.default.join(context.cwd, 'package.json');
        const content = fs_1.default.readFileSync(packageJsonFullPath, 'utf8');
        return [
            Object.assign({ fileName: packageJsonFullPath, message: 'Use property `types` instead of `typings`.', severity: 'error' }, (0, utils_1.getJSONPropertyPosition)(content, 'typings'))
        ];
    }
    return [];
};
