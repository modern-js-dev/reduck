"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestInfo = exports.RequestInfoContext = exports.useRes = exports.useReq = exports.useResponse = exports.ResponseContext = exports.useRequest = exports.RequestContext = void 0;
var farrow_pipeline_1 = require("farrow-pipeline");
exports.RequestContext = (0, farrow_pipeline_1.createContext)(null);
var useRequest = function () {
    var request = exports.RequestContext.use().value;
    return request;
};
exports.useRequest = useRequest;
exports.ResponseContext = (0, farrow_pipeline_1.createContext)(null);
var useResponse = function () {
    var response = exports.ResponseContext.use().value;
    return response;
};
exports.useResponse = useResponse;
var useReq = function () {
    var req = (0, exports.useRequest)();
    if (!req) {
        throw new Error("Expected request, but got: ".concat(req));
    }
    return req;
};
exports.useReq = useReq;
var useRes = function () {
    var res = (0, exports.useResponse)();
    if (!res) {
        throw new Error("Expected response, but got: ".concat(res));
    }
    return res;
};
exports.useRes = useRes;
exports.RequestInfoContext = (0, farrow_pipeline_1.createContext)(null);
var useRequestInfo = function () {
    var requestInfo = exports.RequestInfoContext.use().value;
    if (!requestInfo) {
        throw new Error("Expected request info, but got: ".concat(requestInfo));
    }
    return requestInfo;
};
exports.useRequestInfo = useRequestInfo;
//# sourceMappingURL=context.js.map