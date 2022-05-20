"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const path_1 = __importDefault(require("path"));
const cosmiconfig_1 = require("cosmiconfig");
const cosmiconfig_typescript_loader_1 = __importDefault(require("@endemolshinegroup/cosmiconfig-typescript-loader"));
async function loadConfig(cwd, configPath) {
    const moduleName = 'commitlint';
    const explorer = (0, cosmiconfig_1.cosmiconfig)(moduleName, {
        searchPlaces: [
            'package.json',
            `.${moduleName}rc`,
            `.${moduleName}rc.json`,
            `.${moduleName}rc.yaml`,
            `.${moduleName}rc.yml`,
            `.${moduleName}rc.ts`,
            `.${moduleName}rc.js`,
            `${moduleName}.config.ts`,
            `${moduleName}.config.js`,
        ],
        loaders: {
            '.ts': cosmiconfig_typescript_loader_1.default,
        },
    });
    const explicitPath = configPath ? path_1.default.resolve(cwd, configPath) : undefined;
    const explore = explicitPath ? explorer.load : explorer.search;
    const searchPath = explicitPath ? explicitPath : cwd;
    const local = await explore(searchPath);
    if (local) {
        return local;
    }
    return null;
}
exports.loadConfig = loadConfig;
//# sourceMappingURL=load-config.js.map