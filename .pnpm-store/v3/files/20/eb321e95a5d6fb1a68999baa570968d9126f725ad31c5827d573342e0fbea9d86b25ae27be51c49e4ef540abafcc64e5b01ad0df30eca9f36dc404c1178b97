/**
 * This package builds a JSON object containing the git hashes of all files used to produce a given NPM package.
 * The {@link https://rushjs.io/ | Rush} tool uses this library to implement incremental build detection.
 *
 * @remarks
 *
 * For more info, please see the package {@link https://www.npmjs.com/package/@rushstack/package-deps-hash
 * | README}.
 *
 * @packageDocumentation
 */

/**
 * Checks the git version and throws an error if it is less than the minimum required version.
 *
 * @public
 */
export declare function ensureGitMinimumVersion(gitPath?: string): void;

/**
 * Takes a list of files and returns the current git hashes for them
 *
 * @public
 */
export declare function getGitHashForFiles(filesToHash: string[], packagePath: string, gitPath?: string): Map<string, string>;

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
export declare function getPackageDeps(packagePath?: string, excludedPaths?: string[], gitPath?: string): Map<string, string>;

/**
 * Find all changed files tracked by Git, their current hashes, and the nature of the change. Only useful if all changes are staged or committed.
 * @param currentWorkingDirectory - The working directory. Only used to find the repository root.
 * @param revision - The Git revision specifier to detect changes relative to. Defaults to HEAD (i.e. will compare staged vs. committed)
 *   If comparing against a different branch, call `git merge-base` first to find the target commit.
 * @param gitPath - The path to the Git executable
 * @returns A map from the Git file path to the corresponding file change metadata
 * @beta
 */
export declare function getRepoChanges(currentWorkingDirectory: string, revision?: string, gitPath?: string): Map<string, IFileDiffStatus>;

/**
 * Finds the root of the current Git repository
 *
 * @param currentWorkingDirectory - The working directory for which to locate the repository
 * @param gitPath - The path to the Git executable
 *
 * @returns The full path to the root directory of the Git repository
 * @beta
 */
export declare function getRepoRoot(currentWorkingDirectory: string, gitPath?: string): string;

/**
 * Gets the object hashes for all files in the Git repo, combining the current commit with working tree state.
 * @param currentWorkingDirectory - The working directory. Only used to find the repository root.
 * @param gitPath - The path to the Git executable
 * @beta
 */
export declare function getRepoState(currentWorkingDirectory: string, gitPath?: string): Map<string, string>;

/**
 * Information about the changes to a file.
 * @beta
 */
export declare interface IFileDiffStatus {
    mode: string;
    oldhash: string;
    newhash: string;
    status: 'A' | 'D' | 'M';
}

export { }
