"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceIncludes = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("@modern-js/utils");
const memoize_1 = require("./memoize");
const shouldIncludePackage = (p, include) => include.some(i => (i instanceof RegExp ? i.test(p.name) : p.name === i));
exports.getSourceIncludes = (0, memoize_1.memoize)((appDirectory, config) => {
    const { source } = config;
    const include = (source === null || source === void 0 ? void 0 : source.include) || [];
    const root = (0, utils_1.findMonorepoRoot)(appDirectory);
    if (!root) {
        return include;
    }
    const packages = (0, utils_1.getMonorepoPackages)(root);
    const modernjsMonorepo = (0, utils_1.isModernjsMonorepo)(root);
    const paths = packages
        .filter(p => (modernjsMonorepo &&
        p.path.startsWith(path_1.default.join(root, 'features'))) ||
        shouldIncludePackage(p, include))
        .map(p => p.path);
    return [...paths, ...include];
});
