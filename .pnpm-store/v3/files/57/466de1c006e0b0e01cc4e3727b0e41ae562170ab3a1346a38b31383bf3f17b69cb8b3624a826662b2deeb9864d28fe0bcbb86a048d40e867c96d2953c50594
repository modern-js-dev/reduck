import * as S from './schema';
import { getInstance } from './schema';
import { getSchemaCtorFields, PartialType } from './helper';
export const isNamedFormatType = (input) => {
    return (input.type === 'Object' ||
        input.type === 'Struct' ||
        input.type === 'Union' ||
        input.type === 'Intersect' ||
        input.type === 'Tuple');
};
const formatterWeakMap = new WeakMap();
const getFormatterImpl = (input) => {
    if (typeof input !== 'function') {
        return undefined;
    }
    if (formatterWeakMap.has(input)) {
        return formatterWeakMap.get(input);
    }
    const next = Object.getPrototypeOf(input);
    if (next === Function.prototype) {
        return undefined;
    }
    return getFormatterImpl(next);
};
export const Formatter = {
    impl(Ctor, impl) {
        formatterWeakMap.set(Ctor, impl);
    },
    get(Ctor) {
        const finalCtor = S.getSchemaCtor(Ctor);
        const FormatterImpl = getFormatterImpl(finalCtor);
        // instantiation Formatter and save to weak-map
        if (typeof FormatterImpl === 'function') {
            const schema = getInstance(Ctor);
            const impl = FormatterImpl(schema);
            formatterWeakMap.set(Ctor, impl);
            return impl;
        }
        return FormatterImpl;
    },
    formatSchema(Ctor, ctx) {
        if (ctx.formatCache.has(Ctor)) {
            return ctx.formatCache.get(Ctor);
        }
        const FormatterImpl = Formatter.get(Ctor);
        if (!FormatterImpl) {
            throw new Error(`No impl found for Formatter, Ctor: ${Ctor}`);
        }
        const typeId = FormatterImpl.format(ctx);
        ctx.formatCache.set(Ctor, typeId);
        return typeId;
    },
    format(Ctor, context) {
        const types = {};
        let uid = 0;
        const lazyTypeList = [];
        const addType = (type) => {
            if (type.type === 'Object' || type.type === 'Struct') {
                lazyTypeList.push(type);
            }
            if (context === null || context === void 0 ? void 0 : context.addType) {
                return context.addType(type);
            }
            const id = uid++;
            types[`${id}`] = type;
            return id;
        };
        const finalContext = {
            formatCache: new WeakMap(),
            ...context,
            addType,
        };
        const typeId = Formatter.formatSchema(Ctor, finalContext);
        // trigger all lazy fields to expand formatResult.types
        while (lazyTypeList.length) {
            const objectType = lazyTypeList.shift();
            objectType === null || objectType === void 0 ? void 0 : objectType.fields;
        }
        return {
            typeId,
            types,
        };
    },
};
export const formatSchema = Formatter.format;
Formatter.impl(S.String, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'String',
        });
    },
});
Formatter.impl(S.ID, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'ID',
        });
    },
});
Formatter.impl(S.Number, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Number',
        });
    },
});
Formatter.impl(S.Int, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Int',
        });
    },
});
Formatter.impl(S.Float, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'number',
            valueName: 'Float',
        });
    },
});
Formatter.impl(S.Boolean, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'boolean',
            valueName: 'Boolean',
        });
    },
});
Formatter.impl(S.Date, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'string',
            valueName: 'Date',
        });
    },
});
Formatter.impl(S.LiteralType, (schema) => {
    return {
        format(ctx) {
            return ctx.addType({
                type: 'Literal',
                value: schema.value,
            });
        },
    };
});
Formatter.impl(S.NullableType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Nullable',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.ListType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'List',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.StructType, (schema) => {
    const fields = getSchemaCtorFields(schema.descriptors);
    return {
        format(ctx) {
            const formatFields = {};
            let hasGetFields = false;
            const getFields = () => {
                if (hasGetFields)
                    return formatFields;
                hasGetFields = true;
                for (const [key, Field] of Object.entries(fields)) {
                    const typeId = Formatter.formatSchema(Field[S.Type], ctx);
                    formatFields[key] = {
                        typeId,
                        $ref: `#/types/${typeId}`,
                        description: Field.description,
                        deprecated: Field.deprecated,
                    };
                }
                return formatFields;
            };
            const Constructor = schema.constructor;
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
Formatter.impl(S.ObjectType, (schema) => {
    const fields = getSchemaCtorFields(schema);
    return {
        format(ctx) {
            var _a;
            const formatFields = {};
            let hasGetFields = false;
            const getFields = () => {
                if (hasGetFields)
                    return formatFields;
                hasGetFields = true;
                for (const [key, Field] of Object.entries(fields)) {
                    const typeId = Formatter.formatSchema(Field[S.Type], ctx);
                    formatFields[key] = {
                        typeId,
                        $ref: `#/types/${typeId}`,
                        description: Field.description,
                        deprecated: Field.deprecated,
                    };
                }
                return formatFields;
            };
            const Constructor = schema.constructor;
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
Formatter.impl(S.UnionType, (schema) => {
    const Constructor = schema.constructor;
    const displayName = Constructor.displayName;
    return {
        format(ctx) {
            const itemTypes = schema.Items.map((Item) => {
                const typeId = Formatter.formatSchema(Item, ctx);
                return {
                    typeId,
                    $ref: `#/types/${typeId}`,
                };
            });
            return ctx.addType({
                type: 'Union',
                name: displayName,
                itemTypes,
            });
        },
    };
});
Formatter.impl(S.IntersectType, (schema) => {
    const Constructor = schema.constructor;
    const displayName = Constructor.displayName;
    return {
        format(ctx) {
            const itemTypes = schema.Items.map((Item) => {
                const typeId = Formatter.formatSchema(Item, ctx);
                return {
                    typeId,
                    $ref: `#/types/${typeId}`,
                };
            });
            return ctx.addType({
                type: 'Intersect',
                name: displayName,
                itemTypes,
            });
        },
    };
});
Formatter.impl(S.TupleType, (schema) => {
    const Constructor = schema.constructor;
    const displayName = Constructor.displayName;
    return {
        format(ctx) {
            const itemTypes = schema.Items.map((Item) => {
                const typeId = Formatter.formatSchema(Item, ctx);
                return {
                    typeId,
                    $ref: `#/types/${typeId}`,
                };
            });
            return ctx.addType({
                type: 'Tuple',
                name: displayName,
                itemTypes,
            });
        },
    };
});
Formatter.impl(S.RecordType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Record',
                valueTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.Unknown, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'unknown',
            valueName: 'Unknown',
        });
    },
});
Formatter.impl(S.Any, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'any',
            valueName: 'Any',
        });
    },
});
Formatter.impl(S.Never, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'never',
            valueName: 'Never',
        });
    },
});
Formatter.impl(S.Json, {
    format(ctx) {
        return ctx.addType({
            type: 'Scalar',
            valueType: 'JsonType',
            valueName: 'Json',
        });
    },
});
Formatter.impl(S.StrictType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'Strict',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.NonStrictType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'NonStrict',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.ReadOnlyType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'ReadOnly',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(S.ReadOnlyDeepType, (schema) => {
    return {
        format(ctx) {
            const typeId = Formatter.formatSchema(schema.Item, ctx);
            return ctx.addType({
                type: 'ReadOnlyDeep',
                itemTypeId: typeId,
                $ref: `#/types/${typeId}`,
            });
        },
    };
});
Formatter.impl(PartialType, schema => {
    const Constructor = schema.constructor;
    const ItemConstructor = schema.Item;
    ItemConstructor.displayName = Constructor.displayName;
    return {
        format(ctx) {
            return Formatter.formatSchema(schema.Item, ctx);
        }
    };
});
//# sourceMappingURL=formatter.js.map