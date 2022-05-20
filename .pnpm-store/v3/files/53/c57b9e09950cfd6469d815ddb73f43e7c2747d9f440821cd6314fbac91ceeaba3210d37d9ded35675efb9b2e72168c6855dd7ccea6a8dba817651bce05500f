"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineChunkHtmlPlugin = void 0;
const utils_1 = require("@modern-js/utils");
class InlineChunkHtmlPlugin {
    constructor(htmlWebpackPlugin, tests) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.tests = tests;
    }
    getInlinedScriptTag(publicPath, assets, tag) {
        if (!((tag === null || tag === void 0 ? void 0 : tag.attributes.src) && (0, utils_1.isString)(tag.attributes.src))) {
            return tag;
        }
        const scriptName = publicPath
            ? tag.attributes.src.replace(publicPath, '')
            : tag.attributes.src;
        if (!this.tests.some(test => test.exec(scriptName))) {
            return tag;
        }
        const asset = assets[scriptName];
        if (asset == null) {
            return tag;
        }
        const ret = {
            tagName: 'script',
            innerHTML: asset.source(),
            closeTag: true,
        };
        return ret;
    }
    getInlinedCSSTag(publicPath, assets, tag) {
        if (!(tag.attributes.href && (0, utils_1.isString)(tag.attributes.href))) {
            return tag;
        }
        const linkName = publicPath
            ? tag.attributes.href.replace(publicPath, '')
            : tag.attributes.href;
        if (!this.tests.some(test => test.exec(linkName))) {
            return tag;
        }
        const asset = assets[linkName];
        return {
            tagName: 'style',
            innerHTML: asset.source(),
            closeTag: true,
        };
    }
    getInlinedTag(publicPath, assets, tag) {
        if (tag.tagName === 'script') {
            return this.getInlinedScriptTag(publicPath, assets, tag);
        }
        if (tag.tagName === 'link' &&
            tag.attributes &&
            tag.attributes.rel === 'stylesheet') {
            return this.getInlinedCSSTag(publicPath, assets, tag);
        }
        return tag;
    }
    apply(compiler) {
        let publicPath = compiler.options.output.publicPath || '';
        if (publicPath && !publicPath.endsWith('/')) {
            publicPath += '/';
        }
        compiler.hooks.compilation.tap('InlineChunkHtmlPlugin', (compilation) => {
            const tagFunction = (tag) => this.getInlinedTag(publicPath, compilation.assets, tag);
            const hooks = this.htmlWebpackPlugin.getHooks(compilation);
            hooks.alterAssetTagGroups.tap('InlineChunkHtmlPlugin', assets => {
                const deferScriptTags = [];
                for (const headTag of assets.headTags) {
                    if (headTag.tagName === 'script') {
                        const { attributes } = headTag;
                        if (attributes && attributes.defer === true) {
                            deferScriptTags.push(headTag);
                            assets.headTags.splice(assets.headTags.indexOf(headTag), 1);
                        }
                    }
                }
                assets.bodyTags = assets.bodyTags.concat(deferScriptTags);
                assets.headTags = assets.headTags.map(tagFunction);
                assets.bodyTags = assets.bodyTags.map(tagFunction);
                return assets;
            });
        });
    }
}
exports.InlineChunkHtmlPlugin = InlineChunkHtmlPlugin;
