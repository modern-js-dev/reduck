"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileSystemEntry = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("@modern-js/utils");

var _isDefaultExportFunction = require("./isDefaultExportFunction");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasIndex = dir => (0, _utils.findExists)(_constants.JS_EXTENSIONS.map(ext => _path.default.resolve(dir, `${_constants.INDEX_FILE_NAME}${ext}`)));

const hasApp = dir => (0, _utils.findExists)(_constants.JS_EXTENSIONS.map(ext => _path.default.resolve(dir, `${_constants.APP_FILE_NAME}${ext}`)));

const hasPages = dir => _fs.default.existsSync(_path.default.join(dir, _constants.PAGES_DIR_NAME));

const isBundleEntry = dir => hasApp(dir) || hasPages(dir) || hasIndex(dir);

const scanDir = dirs => dirs.map(dir => {
  const indexFile = hasIndex(dir);
  const customBootstrap = (0, _isDefaultExportFunction.isDefaultExportFunction)(indexFile) ? indexFile : false;

  const entryName = _path.default.basename(dir);

  if (indexFile && !customBootstrap) {
    return {
      entryName,
      entry: indexFile,
      isAutoMount: false
    };
  }

  if (hasApp(dir)) {
    return {
      entryName,
      entry: _path.default.join(dir, _constants.APP_FILE_NAME),
      isAutoMount: true,
      customBootstrap
    };
  } else if (hasPages(dir)) {
    return {
      entryName,
      entry: _path.default.join(dir, _constants.PAGES_DIR_NAME),
      fileSystemRoutes: {
        globalApp: (0, _utils.findExists)(_constants.JS_EXTENSIONS.map(ext => _path.default.resolve(dir, `./${_constants.PAGES_DIR_NAME}/${_constants.FILE_SYSTEM_ROUTES_GLOBAL_LAYOUT}${ext}`)))
      },
      isAutoMount: true,
      customBootstrap
    };
  } else {
    return {
      entryName,
      entry: indexFile,
      isAutoMount: false
    };
  }
});

const getFileSystemEntry = (appContext, config) => {
  const {
    appDirectory
  } = appContext;
  const {
    source: {
      entriesDir
    }
  } = config;
  const src = (0, _utils.ensureAbsolutePath)(appDirectory, entriesDir);

  if (_fs.default.existsSync(src)) {
    if (_fs.default.statSync(src).isDirectory()) {
      return scanDir(isBundleEntry(src) ? [src] : _fs.default.readdirSync(src).map(file => _path.default.join(src, file)).filter(file => _fs.default.statSync(file).isDirectory() && isBundleEntry(file)));
    } else {
      throw Error(`source.entriesDir accept a directory.`);
    }
  } else {
    throw Error(`src dir ${entriesDir} not found.`);
  }
};

exports.getFileSystemEntry = getFileSystemEntry;