"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const globby_1 = __importDefault(require("globby"));
const utils_1 = require("../utils");
/**
 * Rule which enforces the typings file to be present in the `files` list in `package.json`.
 *
 * @param context - The context object.
 * @returns A list of custom diagnostics.
 */
exports.default = (context) => {
    const { pkg, typingsFile } = context;
    const packageFiles = pkg.files;
    if (!Array.isArray(packageFiles)) {
        return [];
    }
    const normalizedTypingsFile = path_1.default.normalize(typingsFile);
    const patternProcessedPackageFiles = processGitIgnoreStylePatterns(packageFiles);
    const normalizedFiles = globby_1.default.sync(patternProcessedPackageFiles, { cwd: context.cwd }).map(path_1.default.normalize);
    if (normalizedFiles.includes(normalizedTypingsFile)) {
        return [];
    }
    const packageJsonFullPath = path_1.default.join(context.cwd, 'package.json');
    const content = fs_1.default.readFileSync(packageJsonFullPath, 'utf8');
    return [
        Object.assign({ fileName: packageJsonFullPath, message: `TypeScript type definition \`${normalizedTypingsFile}\` is not part of the \`files\` list.`, severity: 'error' }, (0, utils_1.getJSONPropertyPosition)(content, 'files'))
    ];
};
function processGitIgnoreStylePatterns(patterns) {
    const processedPatterns = patterns
        .map(pattern => {
        var _a;
        const [negatePatternMatch] = (_a = /^!+/.exec(pattern)) !== null && _a !== void 0 ? _a : [];
        const negationMarkersCount = negatePatternMatch ? negatePatternMatch.length : 0;
        return [
            pattern
                .slice(negationMarkersCount)
                // Strip off `/` from the start of the pattern
                .replace(/^\/+/, ''),
            negationMarkersCount % 2 === 0
        ];
    })
        // Only include pattern if it has an even count of negation markers
        .filter(([, hasEvenCountOfNegationMarkers]) => hasEvenCountOfNegationMarkers)
        .map(([processedPattern]) => processedPattern);
    return [...new Set(processedPatterns)];
}
