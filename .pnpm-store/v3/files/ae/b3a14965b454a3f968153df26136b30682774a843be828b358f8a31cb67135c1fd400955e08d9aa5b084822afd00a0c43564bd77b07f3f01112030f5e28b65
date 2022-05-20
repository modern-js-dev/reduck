"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRegex = void 0;
const assert_1 = __importDefault(require("assert"));
const mergeRegex = (...regexes) => {
    (0, assert_1.default)(regexes.length, 'mergeRegex: regular expression array should not be empty.');
    const sources = regexes.map(regex => regex instanceof RegExp ? regex.source : regex);
    return new RegExp(sources.join('|'));
};
exports.mergeRegex = mergeRegex;
