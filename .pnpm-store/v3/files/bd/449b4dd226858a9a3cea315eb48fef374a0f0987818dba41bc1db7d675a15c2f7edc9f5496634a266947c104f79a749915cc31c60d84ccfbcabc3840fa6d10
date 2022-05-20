"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomTemplatePlugin = void 0;
const bottomTemplateReg = /<!--<\?-\s*bottomTemplate\s*\?>-->/;
const bodyRegExp = /(<\/\s*body\s*>)/i;
class BottomTemplatePlugin {
    constructor(htmlWebpackPlugin) {
        this.htmlWebpackPlugin = htmlWebpackPlugin;
        this.name = 'bottom-template';
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(this.name, (compilation) => {
            this.htmlWebpackPlugin
                .getHooks(compilation)
                .beforeEmit.tap(this.name, data => {
                var _a;
                if (!((_a = data.plugin.options) === null || _a === void 0 ? void 0 : _a.__internal__)) {
                    return data;
                }
                // 含有 <!--<?- bottomTemplate ?>--> 占位符时才需要注入 bottom.html
                if (bottomTemplateReg.test(data.html)) {
                    // 清空占位符
                    data.html = data.html.replace(bottomTemplateReg, '');
                    const { bottomTemplate } = data.plugin.options;
                    if (bottomTemplate) {
                        data.html = data.html.replace(bodyRegExp, match => `\n${bottomTemplate}\n${match}`);
                    }
                }
                return data;
            });
        });
    }
}
exports.BottomTemplatePlugin = BottomTemplatePlugin;
