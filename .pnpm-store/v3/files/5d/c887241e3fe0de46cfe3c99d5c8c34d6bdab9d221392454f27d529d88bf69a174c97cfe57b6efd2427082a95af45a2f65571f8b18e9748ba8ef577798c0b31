"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controvertTypes = exports.controvertEntries = void 0;
var tslib_1 = require("tslib");
var farrow_schema_1 = require("farrow-schema");
var api_1 = require("./api");
var controvertEntries = function (input) {
    var types = (0, exports.controvertTypes)(input.types);
    var findType = function (typeId) {
        var schemaCtor = types.get(typeId.toString());
        if (!schemaCtor) {
            throw new Error("Unknown typeId: ".concat(typeId));
        }
        return schemaCtor;
    };
    var controvertFieldType = function (input) {
        return {
            __type: findType(input.typeId),
            description: input.description,
            deprecated: input.deprecated,
        };
    };
    var controvertApi = function (input) {
        return (0, api_1.Api)({
            input: controvertFieldType(input.input),
            output: controvertFieldType(input.output),
            description: input.description,
            deprecated: input.deprecated,
        });
    };
    var controvertEntries = function (input) {
        var entries = {};
        for (var name in input.entries) {
            var item = input.entries[name];
            if (item.type === 'Api') {
                entries[name] = controvertApi(item);
            }
            else {
                entries[name] = controvertEntries(item);
            }
        }
        return entries;
    };
    return controvertEntries(input.entries);
};
exports.controvertEntries = controvertEntries;
var controvertTypes = function (input) {
    var controvertType = function (input) {
        switch (input.type) {
            case 'Scalar': {
                return controvertScalarType(input);
            }
            case 'Object': {
                return controvertObjectType(input);
            }
            case 'Union': {
                return controvertUnionType(input);
            }
            case 'Intersect': {
                return controvertIntersectType(input);
            }
            case 'Struct': {
                return controvertStructType(input);
            }
            case 'Record': {
                return controvertRecordType(input);
            }
            case 'List': {
                return controvertListType(input);
            }
            case 'Tuple': {
                return controvertTupleType(input);
            }
            case 'Literal': {
                return controvertLiteralType(input);
            }
            case 'Nullable': {
                return controvertNullableType(input);
            }
            case 'Strict': {
                return controvertStrictType(input);
            }
            case 'NonStrict': {
                return controvertNonStrictType(input);
            }
            case 'ReadOnly': {
                return controvertReadOnlyType(input);
            }
            case 'ReadOnlyDeep': {
                return controvertReadOnlyDeepType(input);
            }
            // for eslint
            default: {
                throw new Error("Unknown format type: ".concat(input));
            }
        }
    };
    var controvertScalarType = function (input) {
        switch (input.valueName) {
            case 'String':
                return farrow_schema_1.String;
            case 'ID':
                return farrow_schema_1.ID;
            case 'Number':
                return farrow_schema_1.Number;
            case 'Int':
                return farrow_schema_1.Int;
            case 'Float':
                return farrow_schema_1.Float;
            case 'Boolean':
                return farrow_schema_1.Boolean;
            case 'Date':
                return Date;
            case 'Unknown':
                return farrow_schema_1.Unknown;
            case 'Any':
                return farrow_schema_1.Any;
            case 'Json':
                return farrow_schema_1.Json;
            default:
                throw new Error("Unknown Scalar Type name: ".concat(input.valueName));
        }
    };
    var controvertObjectType = function (input) {
        var fields = controvertFieldsType(input.fields);
        return /** @class */ (function (_super) {
            (0, tslib_1.__extends)(Obj, _super);
            function Obj() {
                var _this = _super.call(this) || this;
                for (var name in fields) {
                    _this[name] = fields[name];
                }
                return _this;
            }
            return Obj;
        }(farrow_schema_1.ObjectType));
    };
    var controvertFieldsType = function (input) {
        var fields = {};
        for (var name in input) {
            fields[name] = controvertFieldType(input[name]);
        }
        return fields;
    };
    var controvertFieldType = function (input) {
        return {
            __type: findType(input.typeId),
            description: input.description,
            deprecated: input.deprecated,
        };
    };
    var controvertUnionType = function (input) {
        var items = input.itemTypes.map(function (_a) {
            var typeId = _a.typeId;
            return findType(typeId);
        });
        return farrow_schema_1.Union.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(items), false));
    };
    var controvertIntersectType = function (input) {
        var items = input.itemTypes.map(function (_a) {
            var typeId = _a.typeId;
            return findType(typeId);
        });
        return farrow_schema_1.Intersect.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(items), false));
    };
    var controvertStructType = function (input) {
        var fields = controvertFieldsType(input.fields);
        return (0, farrow_schema_1.Struct)(fields);
    };
    var controvertRecordType = function (input) {
        var item = findType(input.valueTypeId);
        return (0, farrow_schema_1.Record)(item);
    };
    var controvertListType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.List)(item);
    };
    var controvertTupleType = function (input) {
        var items = input.itemTypes.map(function (_a) {
            var typeId = _a.typeId;
            return findType(typeId);
        });
        return farrow_schema_1.Tuple.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(items), false));
    };
    var controvertLiteralType = function (input) {
        return (0, farrow_schema_1.Literal)(input.value);
    };
    var controvertNullableType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.Nullable)(item);
    };
    var controvertStrictType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.Strict)(item);
    };
    var controvertNonStrictType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.NonStrict)(item);
    };
    var controvertReadOnlyType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.ReadOnly)(item);
    };
    var controvertReadOnlyDeepType = function (input) {
        var item = findType(input.itemTypeId);
        return (0, farrow_schema_1.ReadOnlyDeep)(item);
    };
    var findType = function (typeId) {
        var schemaCtor = types.get(typeId.toString());
        if (!schemaCtor) {
            throw new Error("Unknown typeId: ".concat(typeId));
        }
        return schemaCtor;
    };
    var types = new Map();
    for (var id in input) {
        types.set(id, controvertType(input[id]));
    }
    return types;
};
exports.controvertTypes = controvertTypes;
//# sourceMappingURL=controvert.js.map