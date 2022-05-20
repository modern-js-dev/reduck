import type { FullTap } from 'tapable';
import type { FilesMatch } from './files-match';
import type { Issue } from './issue';
interface ForkTsCheckerWebpackPluginState {
    issuesPromise: Promise<Issue[] | undefined>;
    dependenciesPromise: Promise<FilesMatch | undefined>;
    lastDependencies: FilesMatch | undefined;
    watching: boolean;
    initialized: boolean;
    iteration: number;
    webpackDevServerDoneTap: FullTap | undefined;
}
declare function createPluginState(): ForkTsCheckerWebpackPluginState;
export { ForkTsCheckerWebpackPluginState, createPluginState };
