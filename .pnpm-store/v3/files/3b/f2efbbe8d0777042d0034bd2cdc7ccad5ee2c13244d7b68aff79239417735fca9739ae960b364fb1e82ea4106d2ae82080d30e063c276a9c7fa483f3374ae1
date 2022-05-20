"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tapStartToRunWorkers = void 0;
const files_change_1 = require("../files-change");
const infrastructure_logger_1 = require("../infrastructure-logger");
const plugin_hooks_1 = require("../plugin-hooks");
const plugin_pools_1 = require("../plugin-pools");
const intercept_done_to_get_dev_server_tap_1 = require("./intercept-done-to-get-dev-server-tap");
const tap_after_compile_to_get_issues_1 = require("./tap-after-compile-to-get-issues");
const tap_done_to_async_get_issues_1 = require("./tap-done-to-async-get-issues");
function tapStartToRunWorkers(compiler, getIssuesWorker, getDependenciesWorker, config, state) {
    const hooks = (0, plugin_hooks_1.getPluginHooks)(compiler);
    const { log, debug } = (0, infrastructure_logger_1.getInfrastructureLogger)(compiler);
    compiler.hooks.run.tap('ForkTsCheckerWebpackPlugin', () => {
        if (!state.initialized) {
            debug('Initializing plugin for single run (not async).');
            state.initialized = true;
            state.watching = false;
            (0, tap_after_compile_to_get_issues_1.tapAfterCompileToGetIssues)(compiler, config, state);
        }
    });
    compiler.hooks.watchRun.tap('ForkTsCheckerWebpackPlugin', () => __awaiter(this, void 0, void 0, function* () {
        if (!state.initialized) {
            state.initialized = true;
            state.watching = true;
            if (config.async) {
                debug('Initializing plugin for watch run (async).');
                (0, tap_done_to_async_get_issues_1.tapDoneToAsyncGetIssues)(compiler, config, state);
                (0, intercept_done_to_get_dev_server_tap_1.interceptDoneToGetDevServerTap)(compiler, config, state);
            }
            else {
                debug('Initializing plugin for watch run (not async).');
                (0, tap_after_compile_to_get_issues_1.tapAfterCompileToGetIssues)(compiler, config, state);
            }
        }
    }));
    compiler.hooks.compilation.tap('ForkTsCheckerWebpackPlugin', (compilation) => __awaiter(this, void 0, void 0, function* () {
        if (compilation.compiler !== compiler) {
            // run only for the compiler that the plugin was registered for
            return;
        }
        const iteration = ++state.iteration;
        let change = {};
        if (state.watching) {
            change = (0, files_change_1.consumeFilesChange)(compiler);
            log([
                'Calling reporter service for incremental check.',
                `  Changed files: ${JSON.stringify(change.changedFiles)}`,
                `  Deleted files: ${JSON.stringify(change.deletedFiles)}`,
            ].join('\n'));
        }
        else {
            log('Calling reporter service for single check.');
        }
        change = yield hooks.start.promise(change, compilation);
        debug(`Submitting the getIssuesWorker to the pool, iteration ${iteration}.`);
        state.issuesPromise = plugin_pools_1.issuesPool.submit(() => __awaiter(this, void 0, void 0, function* () {
            try {
                debug(`Running the getIssuesWorker, iteration ${iteration}.`);
                return yield getIssuesWorker(change, state.watching);
            }
            catch (error) {
                hooks.error.call(error, compilation);
                return undefined;
            }
            finally {
                debug(`The getIssuesWorker finished its job, iteration ${iteration}.`);
            }
        }));
        debug(`Submitting the getDependenciesWorker to the pool, iteration ${iteration}.`);
        state.dependenciesPromise = plugin_pools_1.dependenciesPool.submit(() => __awaiter(this, void 0, void 0, function* () {
            try {
                debug(`Running the getDependenciesWorker, iteration ${iteration}.`);
                return yield getDependenciesWorker(change);
            }
            catch (error) {
                hooks.error.call(error, compilation);
                return undefined;
            }
            finally {
                debug(`The getDependenciesWorker finished its job, iteration ${iteration}.`);
            }
        }));
    }));
}
exports.tapStartToRunWorkers = tapStartToRunWorkers;
