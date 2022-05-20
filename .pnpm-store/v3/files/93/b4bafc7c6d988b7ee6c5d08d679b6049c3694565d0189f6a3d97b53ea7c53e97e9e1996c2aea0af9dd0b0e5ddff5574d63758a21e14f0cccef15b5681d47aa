"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = exports.createApi = exports.isApi = exports.getTypeDeprecated = exports.getTypeDescription = exports.getContentType = void 0;
var farrow_schema_1 = require("farrow-schema");
var farrow_pipeline_1 = require("farrow-pipeline");
var getContentType = function (typeable) {
    var _a;
    return (_a = typeable[farrow_schema_1.Type]) !== null && _a !== void 0 ? _a : typeable;
};
exports.getContentType = getContentType;
var getTypeDescription = function (typeable) {
    var _a;
    return (_a = typeable) === null || _a === void 0 ? void 0 : _a.description;
};
exports.getTypeDescription = getTypeDescription;
var getTypeDeprecated = function (typeable) {
    var _a;
    return (_a = typeable) === null || _a === void 0 ? void 0 : _a.deprecated;
};
exports.getTypeDeprecated = getTypeDeprecated;
var isApi = function (input) {
    return typeof input === 'function' && (input === null || input === void 0 ? void 0 : input.type) === 'Api';
};
exports.isApi = isApi;
var useContainerSafe = function () {
    try {
        return (0, farrow_pipeline_1.useContainer)();
        // eslint-disable-next-line no-empty
    }
    catch (_) { }
};
function createApi(definition, impl) {
    var apiPipeline = (0, farrow_pipeline_1.createAsyncPipeline)();
    var apiSchema = {
        type: 'Api',
        definition: definition,
    };
    var apiImpl = function (input) {
        var container = useContainerSafe();
        return apiPipeline.run(input, {
            container: container,
        });
    };
    var apiMethods = {
        new: function () {
            return createApi(definition, impl);
        },
    };
    if (impl) {
        apiPipeline.use(impl);
    }
    return Object.assign(apiImpl, apiSchema, apiPipeline, apiMethods);
}
exports.createApi = createApi;
exports.Api = createApi;
//# sourceMappingURL=api.js.map