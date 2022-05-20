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
export declare function parseGitFilename(filename: string): string;
/**
 * Parses the output of the "git ls-tree" command
 */
export declare function parseGitLsTree(output: string): Map<string, string>;
/**
 * Parses the output of the "git status" command
 */
export declare function parseGitStatus(output: string, packagePath: string): Map<string, string>;
/**
 * Takes a list of files and returns the current git hashes for them
 *
 * @public
 */
export declare function getGitHashForFiles(filesToHash: string[], packagePath: string, gitPath?: string): Map<string, string>;
/**
 * Executes "git ls-tree" in a folder
 */
export declare function gitLsTree(path: string, gitPath?: string): string;
/**
 * Executes "git status" in a folder
 */
export declare function gitStatus(path: string, gitPath?: string): string;
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
//# sourceMappingURL=getPackageDeps.d.ts.map