"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageDeps = exports.gitStatus = exports.gitLsTree = exports.getGitHashForFiles = exports.parseGitStatus = exports.parseGitLsTree = exports.parseGitFilename = void 0;
const path = __importStar(require("path"));
const node_core_library_1 = require("@rushstack/node-core-library");
const getRepoState_1 = require("./getRepoState");
/**
 * Parses a quoted filename sourced from the output of the "git status" command.
 *
 * Paths with non-standard characters will be enclosed with double-quotes, and non-standard
 * characters will be backslash escaped (ex. double-quotes, non-ASCII characters). The
 * escaped chars can be included in one of two ways:
 * - backslash-escaped chars (ex. \")
 * - octal encoded chars (ex. \347)
 *
 * See documentation: https://git-scm.com/docs/git-status
 */
function parseGitFilename(filename) {
    // If there are no double-quotes around the string, then there are no escaped characters
    // to decode, so just return
    if (!filename.match(/^".+"$/)) {
        return filename;
    }
    // Need to hex encode '%' since we will be decoding the converted octal values from hex
    filename = filename.replace(/%/g, '%25');
    // Replace all instances of octal literals with percent-encoded hex (ex. '\347\275\221' -> '%E7%BD%91').
    // This is done because the octal literals represent UTF-8 bytes, and by converting them to percent-encoded
    // hex, we can use decodeURIComponent to get the Unicode chars.
    filename = filename.replace(/(?:\\(\d{1,3}))/g, (match, ...[octalValue, index, source]) => {
        // We need to make sure that the backslash is intended to escape the octal value. To do this, walk
        // backwards from the match to ensure that it's already escaped.
        const trailingBackslashes = source
            .slice(0, index)
            .match(/\\*$/);
        return trailingBackslashes && trailingBackslashes.length > 0 && trailingBackslashes[0].length % 2 === 0
            ? `%${parseInt(octalValue, 8).toString(16)}`
            : match;
    });
    // Finally, decode the filename and unescape the escaped UTF-8 chars
    return JSON.parse(decodeURIComponent(filename));
}
exports.parseGitFilename = parseGitFilename;
/**
 * Parses the output of the "git ls-tree" command
 */
function parseGitLsTree(output) {
    const changes = new Map();
    if (output) {
        // A line is expected to look like:
        // 100644 blob 3451bccdc831cb43d7a70ed8e628dcf9c7f888c8    src/typings/tsd.d.ts
        // 160000 commit c5880bf5b0c6c1f2e2c43c95beeb8f0a808e8bac  rushstack
        const gitRegex = /([0-9]{6})\s(blob|commit)\s([a-f0-9]{40})\s*(.*)/;
        // Note: The output of git ls-tree uses \n newlines regardless of OS.
        const outputLines = output.trim().split('\n');
        for (const line of outputLines) {
            if (line) {
                // Take everything after the "100644 blob", which is just the hash and filename
                const matches = line.match(gitRegex);
                if (matches && matches[3] && matches[4]) {
                    const hash = matches[3];
                    const filename = parseGitFilename(matches[4]);
                    changes.set(filename, hash);
                }
                else {
                    throw new Error(`Cannot parse git ls-tree input: "${line}"`);
                }
            }
        }
    }
    return changes;
}
exports.parseGitLsTree = parseGitLsTree;
/**
 * Parses the output of the "git status" command
 */
function parseGitStatus(output, packagePath) {
    const changes = new Map();
    /*
     * Typically, output will look something like:
     * M temp_modules/rush-package-deps-hash/package.json
     * D package-deps-hash/src/index.ts
     */
    // If there was an issue with `git ls-tree`, or there are no current changes, processOutputBlocks[1]
    // will be empty or undefined
    if (!output) {
        return changes;
    }
    // Note: The output of git hash-object uses \n newlines regardless of OS.
    const outputLines = output.trim().split('\n');
    for (const line of outputLines) {
        /*
         * changeType is in the format of "XY" where "X" is the status of the file in the index and "Y" is the status of
         * the file in the working tree. Some example statuses:
         *   - 'D' == deletion
         *   - 'M' == modification
         *   - 'A' == addition
         *   - '??' == untracked
         *   - 'R' == rename
         *   - 'RM' == rename with modifications
         *   - '[MARC]D' == deleted in work tree
         * Full list of examples: https://git-scm.com/docs/git-status#_short_format
         */
        const match = line.match(/("(\\"|[^"])+")|(\S+\s*)/g);
        if (match && match.length > 1) {
            const [changeType, ...filenameMatches] = match;
            // We always care about the last filename in the filenames array. In the case of non-rename changes,
            // the filenames array only contains one file, so we can join all segments that were split on spaces.
            // In the case of rename changes, the last item in the array is the path to the file in the working tree,
            // which is the only one that we care about. It is also surrounded by double-quotes if spaces are
            // included, so no need to worry about joining different segments
            let lastFilename = changeType.startsWith('R')
                ? filenameMatches[filenameMatches.length - 1]
                : filenameMatches.join('');
            lastFilename = parseGitFilename(lastFilename);
            changes.set(lastFilename, changeType.trimRight());
        }
    }
    return changes;
}
exports.parseGitStatus = parseGitStatus;
/**
 * Takes a list of files and returns the current git hashes for them
 *
 * @public
 */
function getGitHashForFiles(filesToHash, packagePath, gitPath) {
    const changes = new Map();
    if (filesToHash.length) {
        // Use --stdin-paths arg to pass the list of files to git in order to avoid issues with
        // command length
        const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['hash-object', '--stdin-paths'], { input: filesToHash.map((x) => path.resolve(packagePath, x)).join('\n') });
        if (result.status !== 0) {
            (0, getRepoState_1.ensureGitMinimumVersion)(gitPath);
            throw new Error(`git hash-object exited with status ${result.status}: ${result.stderr}`);
        }
        const hashStdout = result.stdout.trim();
        // The result of "git hash-object" will be a list of file hashes delimited by newlines
        const hashes = hashStdout.split('\n');
        if (hashes.length !== filesToHash.length) {
            throw new Error(`Passed ${filesToHash.length} file paths to Git to hash, but received ${hashes.length} hashes.`);
        }
        for (let i = 0; i < hashes.length; i++) {
            const hash = hashes[i];
            const filePath = filesToHash[i];
            changes.set(filePath, hash);
        }
    }
    return changes;
}
exports.getGitHashForFiles = getGitHashForFiles;
/**
 * Executes "git ls-tree" in a folder
 */
function gitLsTree(path, gitPath) {
    const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['ls-tree', 'HEAD', '-r'], {
        currentWorkingDirectory: path
    });
    if (result.status !== 0) {
        (0, getRepoState_1.ensureGitMinimumVersion)(gitPath);
        throw new Error(`git ls-tree exited with status ${result.status}: ${result.stderr}`);
    }
    return result.stdout;
}
exports.gitLsTree = gitLsTree;
/**
 * Executes "git status" in a folder
 */
function gitStatus(path, gitPath) {
    /**
     * -s - Short format. Will be printed as 'XY PATH' or 'XY ORIG_PATH -> PATH'. Paths with non-standard
     *      characters will be escaped using double-quotes, and non-standard characters will be backslash
     *      escaped (ex. spaces, tabs, double-quotes)
     * -u - Untracked files are included
     *
     * See documentation here: https://git-scm.com/docs/git-status
     */
    const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['status', '-s', '-u', '.'], {
        currentWorkingDirectory: path
    });
    if (result.status !== 0) {
        (0, getRepoState_1.ensureGitMinimumVersion)(gitPath);
        throw new Error(`git status exited with status ${result.status}: ${result.stderr}`);
    }
    return result.stdout;
}
exports.gitStatus = gitStatus;
/**
 * Builds an object containing hashes for the files under the specified `packagePath` folder.
 * @param packagePath - The folder path to derive the package dependencies from. This is typically the folder
 *                      containing package.json.  If omitted, the default value is the current working directory.
 * @param excludedPaths - An optional array of file path exclusions. If a file should be omitted from the list
 *                         of dependencies, use this to exclude it.
 * @returns the package-deps.json file content
 *
 * @public
 */
function getPackageDeps(packagePath = process.cwd(), excludedPaths, gitPath) {
    const gitLsOutput = gitLsTree(packagePath, gitPath);
    // Add all the checked in hashes
    const result = parseGitLsTree(gitLsOutput);
    // Remove excluded paths
    if (excludedPaths) {
        for (const excludedPath of excludedPaths) {
            result.delete(excludedPath);
        }
    }
    // Update the checked in hashes with the current repo status
    const gitStatusOutput = gitStatus(packagePath, gitPath);
    const currentlyChangedFiles = parseGitStatus(gitStatusOutput, packagePath);
    const filesToHash = [];
    const excludedPathSet = new Set(excludedPaths);
    for (const [filename, changeType] of currentlyChangedFiles) {
        // See comments inside parseGitStatus() for more information
        if (changeType === 'D' || (changeType.length === 2 && changeType.charAt(1) === 'D')) {
            result.delete(filename);
        }
        else {
            if (!excludedPathSet.has(filename)) {
                filesToHash.push(filename);
            }
        }
    }
    const currentlyChangedFileHashes = getGitHashForFiles(filesToHash, packagePath, gitPath);
    for (const [filename, hash] of currentlyChangedFileHashes) {
        result.set(filename, hash);
    }
    return result;
}
exports.getPackageDeps = getPackageDeps;
//# sourceMappingURL=getPackageDeps.js.map