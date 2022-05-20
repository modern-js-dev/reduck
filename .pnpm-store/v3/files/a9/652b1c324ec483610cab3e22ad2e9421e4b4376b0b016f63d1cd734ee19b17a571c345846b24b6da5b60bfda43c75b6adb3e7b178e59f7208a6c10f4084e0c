"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("@tsd/typescript");
/**
 * Load the configuration settings.
 *
 * @param pkg - The package.json object.
 * @returns The config object.
 */
exports.default = (pkg, cwd) => {
    var _a, _b;
    const pkgConfig = (_a = pkg.tsd) !== null && _a !== void 0 ? _a : {};
    const tsConfigCompilerOptions = getOptionsFromTsConfig(cwd);
    const packageJsonCompilerOptions = parseCompilerConfigObject((_b = pkgConfig.compilerOptions) !== null && _b !== void 0 ? _b : {}, cwd);
    return Object.assign(Object.assign({ directory: 'test-d' }, pkgConfig), { compilerOptions: Object.assign(Object.assign(Object.assign({ strict: true, jsx: typescript_1.JsxEmit.React, lib: parseRawLibs(['es2017', 'dom', 'dom.iterable'], cwd), module: typescript_1.ModuleKind.CommonJS, target: typescript_1.ScriptTarget.ES2017, esModuleInterop: true }, tsConfigCompilerOptions), packageJsonCompilerOptions), { moduleResolution: typescript_1.ModuleResolutionKind.NodeJs, skipLibCheck: false }) });
};
function getOptionsFromTsConfig(cwd) {
    const configPath = (0, typescript_1.findConfigFile)(cwd, typescript_1.sys.fileExists);
    if (!configPath) {
        return {};
    }
    return (0, typescript_1.parseJsonSourceFileConfigFileContent)((0, typescript_1.readJsonConfigFile)(configPath, typescript_1.sys.readFile), typescript_1.sys, cwd, undefined, configPath).options;
}
function parseCompilerConfigObject(compilerOptions, cwd) {
    return (0, typescript_1.parseJsonConfigFileContent)({ compilerOptions: compilerOptions || {} }, typescript_1.sys, cwd).options;
}
function parseRawLibs(libs, cwd) {
    var _a;
    return (_a = parseCompilerConfigObject({ lib: libs }, cwd).lib) !== null && _a !== void 0 ? _a : [];
}
