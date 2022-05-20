import { ObjectType, StructType, getInstance, isFieldDescriptor, Struct, isFieldDescriptors, } from './schema';
import * as S from './schema';
export const field = (fieldInfo) => {
    return fieldInfo;
};
export const pickStruct = (Ctor, keys) => {
    const instance = getInstance(Ctor);
    const descriptors = {};
    for (const key in instance.descriptors) {
        if (keys.includes(key)) {
            const value = instance.descriptors[key];
            descriptors[key] = value;
        }
    }
    return Struct(descriptors);
};
export const omitStruct = (Ctor, keys) => {
    const instance = getInstance(Ctor);
    const descriptors = {};
    for (const key in instance.descriptors) {
        if (!keys.includes(key)) {
            const value = instance.descriptors[key];
            descriptors[key] = value;
        }
    }
    return Struct(descriptors);
};
export const pickObject = (Ctor, keys) => {
    const instance = getInstance(Ctor);
    const descriptors = {};
    if (instance instanceof ObjectType) {
        for (const key of Object.keys(instance)) {
            if (keys.includes(key)) {
                const value = instance[key];
                if (isFieldDescriptor(value)) {
                    descriptors[key] = value;
                }
                else if (isFieldDescriptors(value)) {
                    descriptors[key] = value;
                }
            }
        }
    }
    return Struct(descriptors);
};
export const omitObject = (Ctor, keys) => {
    const instance = getInstance(Ctor);
    const descriptors = {};
    if (instance instanceof ObjectType) {
        for (const key of Object.keys(instance)) {
            if (!keys.includes(key)) {
                const value = instance[key];
                if (isFieldDescriptor(value)) {
                    descriptors[key] = value;
                }
                else if (isFieldDescriptors(value)) {
                    descriptors[key] = value;
                }
            }
        }
    }
    return Struct(descriptors);
};
export const pick = ((Ctor, keys) => {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof ObjectType) {
        return pickObject(Ctor, keys);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof StructType) {
        return pickStruct(Ctor, keys);
    }
    throw new Error(`Unknown Schema Constructor: ${Ctor}`);
});
export const omit = ((Ctor, keys) => {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof ObjectType) {
        return omitObject(Ctor, keys);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof StructType) {
        return omitStruct(Ctor, keys);
    }
    throw new Error(`Unknown Schema Constructor: ${Ctor}`);
});
export const keyofStruct = (Ctor) => {
    return Object.keys(getInstance(Ctor).descriptors);
};
export const keyofObject = (Ctor) => {
    const instance = getInstance(Ctor);
    const keys = [];
    for (const key of Object.keys(instance)) {
        const value = instance[key];
        if (isFieldDescriptor(value)) {
            keys.push(key);
        }
        else if (isFieldDescriptors(value)) {
            keys.push(key);
        }
    }
    return keys;
};
export const keyof = ((Ctor) => {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof ObjectType) {
        return keyofObject(Ctor);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof StructType) {
        return keyofStruct(Ctor);
    }
    throw new Error(`Unknown Schema Constructor: ${Ctor}`);
});
export const getSchemaCtorFields = (descriptors) => {
    const fields = {};
    for (const [key, field] of Object.entries(descriptors)) {
        if (S.isFieldDescriptor(field)) {
            if (typeof field === 'function') {
                fields[key] = {
                    [S.Type]: field,
                };
            }
            else {
                fields[key] = field;
            }
        }
        else if (S.isFieldDescriptors(field)) {
            fields[key] = {
                [S.Type]: S.Struct(getSchemaCtorFields(field)),
            };
        }
    }
    return fields;
};
export class PartialType extends S.Schema {
}
const isNullableType = (input) => {
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof S.NullableType;
};
const getPartialFields = (fields) => {
    const descriptors = {};
    for (const [key, value] of Object.entries(getSchemaCtorFields(fields))) {
        descriptors[key] = {
            ...value,
            [S.Type]: isNullableType(value[S.Type]) ? value[S.Type] : S.Nullable(value[S.Type]),
        };
    }
    return descriptors;
};
export const partialStruct = (Ctor) => {
    const instance = getInstance(Ctor);
    return class partial extends PartialType {
        constructor() {
            super(...arguments);
            this.Item = S.Struct(getPartialFields(instance.descriptors));
        }
    };
};
export const partialObject = (Ctor) => {
    const instance = getInstance(Ctor);
    return class partial extends PartialType {
        constructor() {
            super(...arguments);
            this.Item = S.Struct(getPartialFields(instance));
        }
    };
};
export const partial = (Ctor) => {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof ObjectType) {
        return partialObject(Ctor);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof StructType) {
        return partialStruct(Ctor);
    }
    throw new Error(`Unknown Schema Constructor: ${Ctor}`);
};
//# sourceMappingURL=helper.js.map