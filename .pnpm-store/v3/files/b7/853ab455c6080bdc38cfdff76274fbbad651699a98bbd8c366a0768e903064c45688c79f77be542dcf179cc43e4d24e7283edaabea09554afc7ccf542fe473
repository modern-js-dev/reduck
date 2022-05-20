"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatSchema = exports.Formatter = exports.isNamedFormatType = void 0;
var tslib_1 = require("tslib");
var S = (0, tslib_1.__importStar)(require("./schema"));
var schema_1 = require("./schema");
var helper_1 = require("./helper");
var isNamedFormatType = function (input) {
    return (input.type === 'Object' ||
        input.type === 'Struct' ||
        input.type === 'Union' ||
        input.type === 'Intersect' ||
        input.type === 'Tuple');
};
exports.isNamedFormatType = isNamedFormatType;
var formatterWeakMap = new WeakMap();
var getFormatterImpl = function (input) {
    if (typeof input !== 'function') {
        return undefined;
    }
    if (formatterWeakMap.has(input)) {
        return formatterWeakMap.get(input);
    }
    var next = Object.getPrototypeOf(input);
    if (next === Function.prototype) {
        return undefined;
    }
    return getFormatterImpl(next);
};
exports.Formatter = {
    impl: function (Ctor, impl) {
        formatterWeakMap.set(Ctor, impl);
    },
    get: function (Ctor) {
        var finalCtor = S.getSchemaCtor(Ctor);
        var FormatterImpl = getFormatterImpl(finalCtor);
        // instantiation Formatter and save to weak-map
        if (typeof FormatterImpl === 'function') {
            var schema = (0, schema_1.getInstance)(Ctor);
            var impl = FormatterImpl(schema);
            formatterWeakMap.set(Ctor, impl);
            return impl;
        }
        return FormatterImpl;
    },
    formatSchema: function (Ctor, ctx) {
        if (ctx.formatCache.has(Ctor)) {
            return ctx.formatCache.get(Ctor);
        }
        var FormatterImpl = exports.Formatter.get(Ctor);
        if (!FormatterImpl) {
            throw new Error("No impl found for Formatter, Ctor: ".concat(Ctor));
        }
        var typeId = FormatterImpl.format(ctx);
        ctx.formatCache.set(Ctor, typeId);
        return typeId;
    },
    format: function (Ctor, context) {
        var types = {};
        var uid = 0;
        var lazyTypeList = [];
        var addType = function (type) {
            if (type.type === 'Object' || type.type === 'Struct') {
                lazyTypeList.push(type);
            }
            if (context === null || context === void 0 ? void 0 : context.addType) {
                return context.addType(type);
            }
            var id = uid++;
            types["".concat(id)] = type;
            return id;
        };
        var finalContext = (0, tslib_1.__assign)((0, tslib_1.__assign)({ formatCache: new WeakMap() }, context), { addType: addType });
        var typeId = exports.Formatter.formatSchema(Ctor, finalContext);
        // trigger all lazy fields to expand formatResult.types
        while (lazyTypeList.length) {
            var objectType = lazyTypeList.shift();
            objectType === null || objectType === void 0 ? void 0 : objectType.fields;
        }
        return {
            typeId: typeId,
            types: types,
        };
    },
};
exports.formatSchema = exports.Formatter.format;
exports.Formatter.impl(S.String, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'String',
        });
    },
});
exports.Formatter.impl(S.ID, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'ID',
        });
    },
});
exports.Formatter.impl(S.Number, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Number',
        });
    },
});
exports.Formatter.impl(S.Int, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Int',
        });
    },
});
exports.Formatter.impl(S.Float, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Float',
        });
    },
});
exports.Formatter.impl(S.Boolean, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'boolean',
            valueName: 'Boolean',
        });
    },
});
exports.Formatter.impl(S.Date, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'Date',
        });
    },
});
exports.Formatter.impl(S.LiteralType, function (schema) {
    return {
        format: function (ctx) {
            return ctx.addType({
                type: 'Literal',
                value: schema.value,
            });
        },
    };
});
exports.Formatter.impl(S.NullableType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Nullable',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.ListType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'List',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.StructType, function (schema) {
    var fields = (0, helper_1.getSchemaCtorFields)(schema.descriptors);
    return {
        format: function (ctx) {
            var formatFields = {};
            var hasGetFields = false;
            var getFields = function () {
                var e_1, _a;
                if (hasGetFields)
                    return formatFields;
                hasGetFields = true;
                try {
                    for (var _b = (0, tslib_1.__values)(Object.entries(fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = (0, tslib_1.__read)(_c.value, 2), key = _d[0], Field = _d[1];
                        var typeId = exports.Formatter.formatSchema(Field[S.Type], ctx);
                        formatFields[key] = {
                            typeId: typeId,
                            $ref: "#/types/".concat(typeId),
                            description: Field.description,
                            deprecated: Field.deprecated,
                        };
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return formatFields;
            };
            var Constructor = schema.constructor;
            return ctx.addType({
                type: 'Struct',
                name: Constructor.displayName,
                get fields() {
                    return getFields();
                }
            });
        },
    };
});
exports.Formatter.impl(S.ObjectType, function (schema) {
    var fields = (0, helper_1.getSchemaCtorFields)(schema);
    return {
        format: function (ctx) {
            var _a;
            var formatFields = {};
            var hasGetFields = false;
            var getFields = function () {
                var e_2, _a;
                if (hasGetFields)
                    return formatFields;
                hasGetFields = true;
                try {
                    for (var _b = (0, tslib_1.__values)(Object.entries(fields)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var _d = (0, tslib_1.__read)(_c.value, 2), key = _d[0], Field = _d[1];
                        var typeId = exports.Formatter.formatSchema(Field[S.Type], ctx);
                        formatFields[key] = {
                            typeId: typeId,
                            $ref: "#/types/".concat(typeId),
                            description: Field.description,
                            deprecated: Field.deprecated,
                        };
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return formatFields;
            };
            var Constructor = schema.constructor;
            return ctx.addType({
                type: 'Object',
                name: (_a = Constructor.displayName) !== null && _a !== void 0 ? _a : Constructor.name,
                get fields() {
                    return getFields();
                }
            });
        },
    };
});
exports.Formatter.impl(S.UnionType, function (schema) {
    var Constructor = schema.constructor;
    var displayName = Constructor.displayName;
    return {
        format: function (ctx) {
            var itemTypes = schema.Items.map(function (Item) {
                var typeId = exports.Formatter.formatSchema(Item, ctx);
                return {
                    typeId: typeId,
                    $ref: "#/types/".concat(typeId),
                };
            });
            return ctx.addType({
                type: 'Union',
                name: displayName,
                itemTypes: itemTypes,
            });
        },
    };
});
exports.Formatter.impl(S.IntersectType, function (schema) {
    var Constructor = schema.constructor;
    var displayName = Constructor.displayName;
    return {
        format: function (ctx) {
            var itemTypes = schema.Items.map(function (Item) {
                var typeId = exports.Formatter.formatSchema(Item, ctx);
                return {
                    typeId: typeId,
                    $ref: "#/types/".concat(typeId),
                };
            });
            return ctx.addType({
                type: 'Intersect',
                name: displayName,
                itemTypes: itemTypes,
            });
        },
    };
});
exports.Formatter.impl(S.TupleType, function (schema) {
    var Constructor = schema.constructor;
    var displayName = Constructor.displayName;
    return {
        format: function (ctx) {
            var itemTypes = schema.Items.map(function (Item) {
                var typeId = exports.Formatter.formatSchema(Item, ctx);
                return {
                    typeId: typeId,
                    $ref: "#/types/".concat(typeId),
                };
            });
            return ctx.addType({
                type: 'Tuple',
                name: displayName,
                itemTypes: itemTypes,
            });
        },
    };
});
exports.Formatter.impl(S.RecordType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Record',
                valueTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.Unknown, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'unknown',
            valueName: 'Unknown',
        });
    },
});
exports.Formatter.impl(S.Any, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'any',
            valueName: 'Any',
        });
    },
});
exports.Formatter.impl(S.Never, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'never',
            valueName: 'Never',
        });
    },
});
exports.Formatter.impl(S.Json, {
    format: function (ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'JsonType',
            valueName: 'Json',
        });
    },
});
exports.Formatter.impl(S.StrictType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Strict',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.NonStrictType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'NonStrict',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.ReadOnlyType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'ReadOnly',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(S.ReadOnlyDeepType, function (schema) {
    return {
        format: function (ctx) {
            var typeId = exports.Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'ReadOnlyDeep',
                itemTypeId: typeId,
                $ref: "#/types/".concat(typeId),
            });
        },
    };
});
exports.Formatter.impl(helper_1.PartialType, function (schema) {
    var Constructor = schema.constructor;
    var ItemConstructor = schema.Item;
    ItemConstructor.displayName = Constructor.displayName;
    return {
        format: function (ctx) {
            return exports.Formatter.formatSchema(schema.Item, ctx);
        }
    };
});
//# sourceMappingURL=formatter.js.map