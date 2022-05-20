"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFormatterConfig = void 0;
const basic_formatter_1 = require("./basic-formatter");
const code_frame_formatter_1 = require("./code-frame-formatter");
function createFormatterConfig(options) {
    if (typeof options === 'function') {
        return options;
    }
    const type = options
        ? typeof options === 'object'
            ? options.type || 'codeframe'
            : options
        : 'codeframe';
    if (!type || type === 'basic') {
        return (0, basic_formatter_1.createBasicFormatter)();
    }
    if (type === 'codeframe') {
        const config = options && typeof options === 'object'
            ? options.options || {}
            : {};
        return (0, code_frame_formatter_1.createCodeFrameFormatter)(config);
    }
    throw new Error(`Unknown "${type}" formatter. Available types are: "basic", "codeframe" or a custom function.`);
}
exports.createFormatterConfig = createFormatterConfig;
