# Installation
> `npm install --save @types/redux-logger`

# Summary
This package contains type definitions for redux-logger (https://github.com/theaqua/redux-logger).

# Details
Files were exported from https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/redux-logger.
## [index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/redux-logger/index.d.ts)
````ts
// Type definitions for redux-logger 3.0
// Project: https://github.com/theaqua/redux-logger
// Definitions by: Alexander Rusakov <https://github.com/arusakov>
//                 Kevin Groat <https://github.com/kgroat>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export as namespace ReduxLogger;

import * as Redux from 'redux';

export const logger: Redux.Middleware;

export type LoggerPredicate = (
    getState: () => any,
    action: any,
    logEntry?: LogEntryObject
) => boolean;

export type StateToString = (state: any) => string;
export type ActionToString = (action: any) => string;
export type ErrorToString = (error: any, prevState: any) => string;

export interface ColorsObject {
    title?: boolean | ActionToString | undefined;
    prevState?: boolean | StateToString | undefined;
    action?: boolean | ActionToString | undefined;
    nextState?: boolean | StateToString | undefined;
    error?: boolean | ErrorToString | undefined;
}

export interface LevelObject {
    prevState?: string | boolean | StateToString | undefined;
    action?: string | boolean | ActionToString | undefined;
    nextState?: string | boolean | StateToString | undefined;
    error?: string | boolean | ErrorToString | undefined;
}

export interface LogEntryObject {
    action?: string | boolean | ActionToString | undefined;
    started?: number | undefined;
    startedTime?: Date | undefined;
    took?: number | undefined;
    error?(error: any): any;
    nextState?(state: any): any;
    prevState?(state: any): any;
}

export interface ReduxLoggerOptions {
    level?: string | ActionToString | LevelObject | undefined;
    duration?: boolean | undefined;
    timestamp?: boolean | undefined;
    colors?: ColorsObject | false | undefined;
    titleFormatter?(formattedAction: any, formattedTime: string, took: number): string;
    logger?: any;
    logErrors?: boolean | undefined;
    collapsed?: boolean | LoggerPredicate | undefined;
    predicate?: LoggerPredicate | undefined;
    diff?: boolean | undefined;
    diffPredicate?: LoggerPredicate | undefined;
    stateTransformer?(state: any): any;
    actionTransformer?(action: any): any;
    errorTransformer?(error: any): any;
}

export function createLogger(options?: ReduxLoggerOptions): Redux.Middleware;

export default logger;

````

### Additional Details
 * Last updated: Wed, 07 Jul 2021 18:31:54 GMT
 * Dependencies: [@types/redux](https://npmjs.com/package/@types/redux)
 * Global values: `ReduxLogger`

# Credits
These definitions were written by [Alexander Rusakov](https://github.com/arusakov), and [Kevin Groat](https://github.com/kgroat).
