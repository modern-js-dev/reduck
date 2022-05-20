"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toJSON = void 0;
var farrow_schema_1 = require("farrow-schema");
var formatter_1 = require("farrow-schema/formatter");
var api_1 = require("./api");
var isApiType = function (input) {
    return (input === null || input === void 0 ? void 0 : input.type) === 'Api';
};
var toJSON = function (apiEntries) {
    var types = {};
    var uid = 0;
    var addType = function (type) {
        var id = uid++;
        types["".concat(id)] = type;
        return id;
    };
    var context = {
        addType: addType,
        formatCache: new WeakMap(),
    };
    var formatTypeable = function (typeable) {
        var SchemaCtor = (0, farrow_schema_1.toSchemaCtor)((0, api_1.getContentType)(typeable));
        var formatResult = formatter_1.Formatter.format(SchemaCtor, context);
        return {
            typeId: formatResult.typeId,
            $ref: "#/types/".concat(formatResult.typeId),
            description: (0, api_1.getTypeDescription)(typeable),
            deprecated: (0, api_1.getTypeDeprecated)(typeable),
        };
    };
    var formatApiType = function (apiType) {
        var formatEntry = {
            type: 'Api',
            input: formatTypeable(apiType.definition.input),
            output: formatTypeable(apiType.definition.output),
            description: apiType.definition.description,
            deprecated: apiType.definition.deprecated,
        };
        return formatEntry;
    };
    var formatApiEntries = function (apiEntries) {
        var entries = {};
        var formatEntries = {
            type: 'Entries',
            entries: entries,
        };
        for (var key in apiEntries) {
            var item = apiEntries[key];
            if (isApiType(item)) {
                entries[key] = formatApiType(item);
            }
            else {
                entries[key] = formatApiEntries(item);
            }
        }
        return formatEntries;
    };
    var formatResult = {
        protocol: 'Farrow-API',
        types: types,
        entries: formatApiEntries(apiEntries),
    };
    return formatResult;
};
exports.toJSON = toJSON;
//# sourceMappingURL=toJSON.js.map