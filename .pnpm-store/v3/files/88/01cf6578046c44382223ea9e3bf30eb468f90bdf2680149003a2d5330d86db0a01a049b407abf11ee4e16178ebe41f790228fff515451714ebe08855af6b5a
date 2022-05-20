"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppIconPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const webpack_1 = require("webpack");
class AppIconPlugin {
    constructor(htmlWebpackPlugin, iconPath) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.iconPath = iconPath;
        this.name = 'app-icon';
    }
    apply(compiler) {
        const { publicPath } = compiler.options.output;
        const iconName = path_1.default.basename(this.iconPath);
        // add html asset tags
        compiler.hooks.compilation.tap(this.name, (compilation) => {
            this.htmlWebpackPlugin
                .getHooks(compilation)
                .alterAssetTagGroups.tap(this.name, data => {
                data.headTags.unshift({
                    tagName: 'link',
                    voidTag: true,
                    attributes: {
                        rel: 'apple-touch-icon',
                        sizes: '180*180',
                        href: `${publicPath}${iconName}`,
                    },
                    meta: {},
                });
                return data;
            });
        });
        // copy icon to dist
        compiler.hooks.thisCompilation.tap('app-icon', (compilation) => {
            compilation.hooks.processAssets.tap({
                name: 'app-icon',
                stage: webpack_1.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
            }, assets => {
                const source = fs_1.default.readFileSync(this.iconPath);
                assets[iconName] = new webpack_1.sources.RawSource(source, false);
            });
        });
    }
}
exports.AppIconPlugin = AppIconPlugin;
