"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGitVersion = exports.ensureGitMinimumVersion = exports.getRepoChanges = exports.getRepoState = exports.applyWorkingTreeState = exports.getRepoRoot = exports.parseGitStatus = exports.parseGitDiffIndex = exports.parseGitLsTree = void 0;
const node_core_library_1 = require("@rushstack/node-core-library");
const MINIMUM_GIT_VERSION = {
    major: 2,
    minor: 20,
    patch: 0
};
/**
 * Parses the output of the "git ls-tree -r -z" command
 * @internal
 */
function parseGitLsTree(output) {
    const result = new Map();
    // Parse the output
    // With the -z modifier, paths are delimited by nulls
    // A line looks like:
    // <mode> <type> <newhash>\t<path>\0
    // 100644 blob a300ccb0b36bd2c85ef18e3c619a2c747f95959e\ttools/prettier-git/prettier-git.js\0
    let last = 0;
    let index = output.indexOf('\0', last);
    while (index >= 0) {
        const item = output.slice(last, index);
        const tabIndex = item.indexOf('\t');
        const filePath = item.slice(tabIndex + 1);
        // The newHash will be all zeros if the file is deleted, or a hash if it exists
        const hash = item.slice(tabIndex - 40, tabIndex);
        result.set(filePath, hash);
        last = index + 1;
        index = output.indexOf('\0', last);
    }
    return result;
}
exports.parseGitLsTree = parseGitLsTree;
/**
 * Parses the output of `git diff-index --color=never --no-renames --no-commit-id -z <REVISION> --
 * Returns a map of file path to diff
 * @internal
 */
function parseGitDiffIndex(output) {
    const result = new Map();
    // Parse the output
    // With the -z modifier, paths are delimited by nulls
    // A line looks like:
    // :<oldmode> <newmode> <oldhash> <newhash> <status>\0<path>\0
    // :100644 100644 a300ccb0b36bd2c85ef18e3c619a2c747f95959e 0000000000000000000000000000000000000000 M\0tools/prettier-git/prettier-git.js\0
    let last = 0;
    let index = output.indexOf('\0', last);
    while (index >= 0) {
        const header = output.slice(last, index);
        const status = header.slice(-1);
        last = index + 1;
        index = output.indexOf('\0', last);
        const filePath = output.slice(last, index);
        // We passed --no-renames above, so a rename will be a delete of the old location and an add at the new.
        // The newHash will be all zeros if the file is deleted, or a hash if it exists
        const mode = header.slice(8, 14);
        const oldhash = header.slice(-83, -43);
        const newhash = header.slice(-42, -2);
        result.set(filePath, {
            mode,
            oldhash,
            newhash,
            status
        });
        last = index + 1;
        index = output.indexOf('\0', last);
    }
    return result;
}
exports.parseGitDiffIndex = parseGitDiffIndex;
/**
 * Parses the output of `git status -z -u` to extract the set of files that have changed since HEAD.
 *
 * @param output - The raw output from Git
 * @returns a map of file path to if it exists
 * @internal
 */
function parseGitStatus(output) {
    const result = new Map();
    // Parse the output
    // With the -z modifier, paths are delimited by nulls
    // A line looks like:
    // XY <path>\0
    //  M tools/prettier-git/prettier-git.js\0
    let startOfLine = 0;
    let eolIndex = output.indexOf('\0', startOfLine);
    while (eolIndex >= 0) {
        // We passed --no-renames above, so a rename will be a delete of the old location and an add at the new.
        // charAt(startOfLine) is the index status, charAt(startOfLine + 1) is the working tree status
        const workingTreeStatus = output.charAt(startOfLine + 1);
        // Deleted in working tree, or not modified in working tree and deleted in index
        const deleted = workingTreeStatus === 'D' || (workingTreeStatus === ' ' && output.charAt(startOfLine) === 'D');
        const filePath = output.slice(startOfLine + 3, eolIndex);
        result.set(filePath, !deleted);
        startOfLine = eolIndex + 1;
        eolIndex = output.indexOf('\0', startOfLine);
    }
    return result;
}
exports.parseGitStatus = parseGitStatus;
const repoRootCache = new Map();
/**
 * Finds the root of the current Git repository
 *
 * @param currentWorkingDirectory - The working directory for which to locate the repository
 * @param gitPath - The path to the Git executable
 *
 * @returns The full path to the root directory of the Git repository
 * @beta
 */
function getRepoRoot(currentWorkingDirectory, gitPath) {
    let cachedResult = repoRootCache.get(currentWorkingDirectory);
    if (!cachedResult) {
        const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['--no-optional-locks', 'rev-parse', '--show-toplevel'], {
            currentWorkingDirectory
        });
        if (result.status !== 0) {
            ensureGitMinimumVersion(gitPath);
            throw new Error(`git rev-parse exited with status ${result.status}: ${result.stderr}`);
        }
        repoRootCache.set(currentWorkingDirectory, (cachedResult = result.stdout.trim()));
    }
    return cachedResult;
}
exports.getRepoRoot = getRepoRoot;
/**
 * Augments the state value with modifications that are not in the index.
 * @param rootDirectory - The root directory of the Git repository
 * @param state - The current map of git path -> object hash. Will be mutated.
 * @param gitPath - The path to the Git executable
 * @internal
 */
function applyWorkingTreeState(rootDirectory, state, gitPath) {
    const statusResult = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['--no-optional-locks', 'status', '-z', '-u', '--no-renames', '--'], {
        currentWorkingDirectory: rootDirectory
    });
    if (statusResult.status !== 0) {
        ensureGitMinimumVersion(gitPath);
        throw new Error(`git status exited with status ${statusResult.status}: ${statusResult.stderr}`);
    }
    const locallyModified = parseGitStatus(statusResult.stdout);
    const filesToHash = [];
    for (const [filePath, exists] of locallyModified) {
        if (exists) {
            filesToHash.push(filePath);
        }
        else {
            state.delete(filePath);
        }
    }
    if (filesToHash.length) {
        // Use --stdin-paths arg to pass the list of files to git in order to avoid issues with
        // command length
        const hashObjectResult = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['hash-object', '--stdin-paths'], { input: filesToHash.join('\n') });
        if (hashObjectResult.status !== 0) {
            ensureGitMinimumVersion(gitPath);
            throw new Error(`git hash-object exited with status ${hashObjectResult.status}: ${hashObjectResult.stderr}`);
        }
        const hashStdout = hashObjectResult.stdout.trim();
        // The result of "git hash-object" will be a list of file hashes delimited by newlines
        const hashes = hashStdout.split('\n');
        if (hashes.length !== filesToHash.length) {
            throw new Error(`Passed ${filesToHash.length} file paths to Git to hash, but received ${hashes.length} hashes.`);
        }
        const len = hashes.length;
        for (let i = 0; i < len; i++) {
            const hash = hashes[i];
            const filePath = filesToHash[i];
            state.set(filePath, hash);
        }
    }
}
exports.applyWorkingTreeState = applyWorkingTreeState;
/**
 * Gets the object hashes for all files in the Git repo, combining the current commit with working tree state.
 * @param currentWorkingDirectory - The working directory. Only used to find the repository root.
 * @param gitPath - The path to the Git executable
 * @beta
 */
function getRepoState(currentWorkingDirectory, gitPath) {
    const rootDirectory = getRepoRoot(currentWorkingDirectory, gitPath);
    const lsTreeResult = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['--no-optional-locks', 'ls-tree', '-r', '-z', '--full-name', 'HEAD', '--'], {
        currentWorkingDirectory: rootDirectory
    });
    if (lsTreeResult.status !== 0) {
        ensureGitMinimumVersion(gitPath);
        throw new Error(`git ls-tree exited with status ${lsTreeResult.status}: ${lsTreeResult.stderr}`);
    }
    const state = parseGitLsTree(lsTreeResult.stdout);
    applyWorkingTreeState(rootDirectory, state, gitPath);
    return state;
}
exports.getRepoState = getRepoState;
/**
 * Find all changed files tracked by Git, their current hashes, and the nature of the change. Only useful if all changes are staged or committed.
 * @param currentWorkingDirectory - The working directory. Only used to find the repository root.
 * @param revision - The Git revision specifier to detect changes relative to. Defaults to HEAD (i.e. will compare staged vs. committed)
 *   If comparing against a different branch, call `git merge-base` first to find the target commit.
 * @param gitPath - The path to the Git executable
 * @returns A map from the Git file path to the corresponding file change metadata
 * @beta
 */
function getRepoChanges(currentWorkingDirectory, revision = 'HEAD', gitPath) {
    const rootDirectory = getRepoRoot(currentWorkingDirectory, gitPath);
    const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', [
        '--no-optional-locks',
        'diff-index',
        '--color=never',
        '--no-renames',
        '--no-commit-id',
        '--cached',
        '-z',
        revision,
        '--'
    ], {
        currentWorkingDirectory: rootDirectory
    });
    if (result.status !== 0) {
        ensureGitMinimumVersion(gitPath);
        throw new Error(`git diff-index exited with status ${result.status}: ${result.stderr}`);
    }
    const changes = parseGitDiffIndex(result.stdout);
    return changes;
}
exports.getRepoChanges = getRepoChanges;
/**
 * Checks the git version and throws an error if it is less than the minimum required version.
 *
 * @public
 */
function ensureGitMinimumVersion(gitPath) {
    const gitVersion = getGitVersion(gitPath);
    if (gitVersion.major < MINIMUM_GIT_VERSION.major ||
        (gitVersion.major === MINIMUM_GIT_VERSION.major && gitVersion.minor < MINIMUM_GIT_VERSION.minor) ||
        (gitVersion.major === MINIMUM_GIT_VERSION.major &&
            gitVersion.minor === MINIMUM_GIT_VERSION.minor &&
            gitVersion.patch < MINIMUM_GIT_VERSION.patch)) {
        throw new Error(`The minimum Git version required is ` +
            `${MINIMUM_GIT_VERSION.major}.${MINIMUM_GIT_VERSION.minor}.${MINIMUM_GIT_VERSION.patch}. ` +
            `Your version is ${gitVersion.major}.${gitVersion.minor}.${gitVersion.patch}.`);
    }
}
exports.ensureGitMinimumVersion = ensureGitMinimumVersion;
function getGitVersion(gitPath) {
    const result = node_core_library_1.Executable.spawnSync(gitPath || 'git', ['version']);
    if (result.status !== 0) {
        throw new Error(`While validating the Git installation, the "git version" command failed with ` +
            `status ${result.status}: ${result.stderr}`);
    }
    return parseGitVersion(result.stdout);
}
function parseGitVersion(gitVersionOutput) {
    // This regexp matches output of "git version" that looks like `git version <number>.<number>.<number>(+whatever)`
    // Examples:
    // - git version 1.2.3
    // - git version 1.2.3.4.5
    // - git version 1.2.3windows.1
    // - git version 1.2.3.windows.1
    const versionRegex = /^git version (\d+)\.(\d+)\.(\d+)/;
    const match = versionRegex.exec(gitVersionOutput);
    if (!match) {
        throw new Error(`While validating the Git installation, the "git version" command produced ` +
            `unexpected output: "${gitVersionOutput}"`);
    }
    const major = parseInt(match[1], 10);
    const minor = parseInt(match[2], 10);
    const patch = parseInt(match[3], 10);
    return {
        major,
        minor,
        patch
    };
}
exports.parseGitVersion = parseGitVersion;
//# sourceMappingURL=getRepoState.js.map