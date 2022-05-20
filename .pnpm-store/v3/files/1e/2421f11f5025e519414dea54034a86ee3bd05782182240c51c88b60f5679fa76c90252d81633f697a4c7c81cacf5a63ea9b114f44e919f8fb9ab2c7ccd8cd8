"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBundleEntry = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("@modern-js/utils");

var _getFileSystemEntry = require("./getFileSystemEntry");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ensureExtensions = file => {
  if (!_path.default.extname(file)) {
    return (0, _utils.findExists)(_constants.JS_EXTENSIONS.map(ext => `${file}${ext}`)) || file;
  }

  return file;
};

const ifAlreadyExists = (entrypoints, checked) => entrypoints.some(entrypoint => {
  if (ensureExtensions(entrypoint.entry) === ensureExtensions(checked.entry)) {
    // reset entryName
    checked.entryName = entrypoint.entryName;
    return true;
  } // filesystem routes entrypoint conflict with normal entrypoint.


  if (entrypoint.entry.startsWith(checked.entry) || checked.entry.startsWith(entrypoint.entry)) {
    throw new Error(`Entry configuration conflicts\n Your configuration: ${checked.entry}.\n Default entrypoint: ${entrypoint.entry}\n Please reset source.entries or set source.disableDefaultEntries to disable the default entry rules.`);
  }

  return false;
});

const getBundleEntry = (appContext, config) => {
  const {
    appDirectory,
    packageName
  } = appContext;
  const {
    source: {
      disableDefaultEntries,
      entries,
      entriesDir
    }
  } = config;
  const defaults = disableDefaultEntries ? [] : (0, _getFileSystemEntry.getFileSystemEntry)(appContext, config); // merge entrypoints from user config with directory convention.

  if (entries) {
    Object.keys(entries).forEach(name => {
      const value = entries[name];
      const entrypoint = typeof value === 'string' ? {
        entryName: name,
        entry: (0, _utils.ensureAbsolutePath)(appDirectory, value),
        isAutoMount: true,
        fileSystemRoutes: _utils.fs.statSync((0, _utils.ensureAbsolutePath)(appDirectory, value)).isDirectory() ? {} : undefined
      } : {
        entryName: name,
        entry: (0, _utils.ensureAbsolutePath)(appDirectory, value.entry),
        isAutoMount: !value.disableMount,
        fileSystemRoutes: value.enableFileSystemRoutes ? {} : undefined
      };

      if (!ifAlreadyExists(defaults, entrypoint)) {
        defaults.push(entrypoint);
      }
    });
  } // find main entry point which server route is '/'.


  const entriesDirAbs = (0, _utils.ensureAbsolutePath)(appDirectory, entriesDir);
  const found = defaults.find(({
    entryName,
    entry
  }) => entryName === packageName || _path.default.dirname(entry) === entriesDirAbs);
  found && (found.entryName = _utils.MAIN_ENTRY_NAME);
  return defaults;
};

exports.getBundleEntry = getBundleEntry;