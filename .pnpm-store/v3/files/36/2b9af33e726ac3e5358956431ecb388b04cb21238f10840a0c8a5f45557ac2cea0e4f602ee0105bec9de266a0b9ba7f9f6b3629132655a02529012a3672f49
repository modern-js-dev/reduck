import webpack from 'webpack';
import type { Issue } from './issue';
declare class IssueWebpackError extends webpack.WebpackError {
    readonly issue: Issue;
    readonly hideStack = true;
    constructor(message: string, issue: Issue);
}
export { IssueWebpackError };
