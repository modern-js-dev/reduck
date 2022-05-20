"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const eslint_formatter_pretty_1 = __importDefault(require("eslint-formatter-pretty"));
/**
 * Format the TypeScript diagnostics to a human readable output.
 *
 * @param diagnostics - List of TypeScript diagnostics.
 * @returns Beautiful diagnostics output
 */
exports.default = (diagnostics) => {
    const fileMap = new Map();
    for (const diagnostic of diagnostics) {
        let entry = fileMap.get(diagnostic.fileName);
        if (!entry) {
            entry = {
                filePath: diagnostic.fileName,
                errorCount: 0,
                warningCount: 0,
                messages: []
            };
            fileMap.set(diagnostic.fileName, entry);
        }
        entry.errorCount++;
        entry.messages.push(diagnostic);
    }
    return String((0, eslint_formatter_pretty_1.default)([...fileMap.values()]));
};
