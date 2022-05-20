export interface IGitVersion {
    major: number;
    minor: number;
    patch: number;
}
/**
 * Parses the output of the "git ls-tree -r -z" command
 * @internal
 */
export declare function parseGitLsTree(output: string): Map<string, string>;
/**
 * Information about the changes to a file.
 * @beta
 */
export interface IFileDiffStatus {
    mode: string;
    oldhash: string;
    newhash: string;
    status: 'A' | 'D' | 'M';
}
/**
 * Parses the output of `git diff-index --color=never --no-renames --no-commit-id -z <REVISION> --
 * Returns a map of file path to diff
 * @internal
 */
export declare function parseGitDiffIndex(output: string): Map<string, IFileDiffStatus>;
/**
 * Parses the output of `git status -z -u` to extract the set of files that have changed since HEAD.
 *
 * @param output - The raw output from Git
 * @returns a map of file path to if it exists
 * @internal
 */
export declare function parseGitStatus(output: string): Map<string, boolean>;
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
 * Augments the state value with modifications that are not in the index.
 * @param rootDirectory - The root directory of the Git repository
 * @param state - The current map of git path -> object hash. Will be mutated.
 * @param gitPath - The path to the Git executable
 * @internal
 */
export declare function applyWorkingTreeState(rootDirectory: string, state: Map<string, string>, gitPath?: string): void;
/**
 * Gets the object hashes for all files in the Git repo, combining the current commit with working tree state.
 * @param currentWorkingDirectory - The working directory. Only used to find the repository root.
 * @param gitPath - The path to the Git executable
 * @beta
 */
export declare function getRepoState(currentWorkingDirectory: string, gitPath?: string): Map<string, string>;
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
 * Checks the git version and throws an error if it is less than the minimum required version.
 *
 * @public
 */
export declare function ensureGitMinimumVersion(gitPath?: string): void;
export declare function parseGitVersion(gitVersionOutput: string): IGitVersion;
//# sourceMappingURL=getRepoState.d.ts.map