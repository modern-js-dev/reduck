"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.walkDirectory = exports.isRouteComponentFile = exports.getDefaultImports = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _utils = require("@modern-js/utils");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const walkDirectory = dir => _fs.default.readdirSync(dir).reduce((previous, filename) => {
  const filePath = _path.default.join(dir, filename);

  if (_fs.default.statSync(filePath).isDirectory()) {
    return [...previous, ...walkDirectory(filePath)];
  } else {
    return [...previous, filePath];
  }
}, []);

exports.walkDirectory = walkDirectory;

const getDefaultImports = ({
  entrypoint,
  srcDirectory,
  internalSrcAlias,
  internalDirAlias
}) => {
  const {
    entryName,
    fileSystemRoutes,
    customBootstrap,
    entry
  } = entrypoint;
  const imports = [{
    specifiers: [{
      local: 'React'
    }],
    value: 'react'
  }, {
    specifiers: [{
      imported: 'createApp'
    }, {
      imported: 'bootstrap'
    }],
    value: '@modern-js/runtime'
  }, customBootstrap && {
    specifiers: [{
      local: 'customBootstrap'
    }],
    value: (0, _utils.normalizeToPosixPath)(customBootstrap.replace(srcDirectory, internalSrcAlias))
  }].filter(Boolean);

  if (fileSystemRoutes) {
    const route = {
      specifiers: [{
        imported: 'routes'
      }],
      value: (0, _utils.normalizeToPosixPath)(`${internalDirAlias}/${entryName}/${_constants.FILE_SYSTEM_ROUTES_FILE_NAME}`)
    };

    if (fileSystemRoutes.globalApp) {
      imports.push({
        specifiers: [{
          local: 'App'
        }],
        value: (0, _utils.normalizeToPosixPath)(fileSystemRoutes.globalApp.replace(srcDirectory, internalSrcAlias))
      });
    } else {
      route.initialize = 'const App = false;';
    }

    imports.push(route);
  } else {
    imports.push({
      specifiers: [{
        local: 'App'
      }],
      value: (0, _utils.normalizeToPosixPath)(entry.replace(srcDirectory, internalSrcAlias))
    });
  }

  return imports;
};

exports.getDefaultImports = getDefaultImports;

const isRouteComponentFile = filePath => {
  if (/\.(d|test|spec|e2e)\.(js|jsx|ts|tsx)$/.test(filePath)) {
    return false;
  }

  if (['.js', '.jsx', '.ts', '.tsx'].includes(_path.default.extname(filePath))) {
    return true;
  }

  return false;
};

exports.isRouteComponentFile = isRouteComponentFile;