import { isBooleanConstructor, isNumberConstructor, isStringConstructor, isDateConstructor } from './utils';
export class Schema {
    static create(value) {
        return value;
    }
}
export class Number extends Schema {
}
export class String extends Schema {
}
export class Boolean extends Schema {
}
export class ID extends Schema {
}
export class Int extends Schema {
}
export class Float extends Schema {
}
export class Date extends Schema {
}
export class ListType extends Schema {
}
export const List = (Item) => {
    return class List extends ListType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export class ObjectType extends Schema {
}
export class UnionType extends Schema {
}
export const Union = (...Items) => {
    return class Union extends UnionType {
        constructor() {
            super(...arguments);
            this.Items = toSchemaCtors(Items);
        }
    };
};
export class IntersectType extends Schema {
}
export const Intersect = (...Items) => {
    return class Intersect extends IntersectType {
        constructor() {
            super(...arguments);
            this.Items = toSchemaCtors(Items);
        }
    };
};
export class LiteralType extends Schema {
}
export const Literal = (value) => {
    return class Literal extends LiteralType {
        constructor() {
            super(...arguments);
            this.value = value;
        }
    };
};
export const Null = Literal(null);
export const Undefined = Literal(undefined);
export class NullableType extends Schema {
}
export const isNullableType = (input) => {
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof NullableType;
};
export const Nullable = (Item) => {
    return class Nullable extends NullableType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export const Type = '__type';
export class StructType extends Schema {
}
export const Struct = (descriptors) => {
    return class Struct extends StructType {
        constructor() {
            super(...arguments);
            this.descriptors = descriptors;
        }
    };
};
export class RecordType extends Schema {
}
export const Record = (Item) => {
    return class Record extends RecordType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export class Any extends Schema {
}
export class Unknown extends Schema {
}
export class Never extends Schema {
}
export class Json extends Schema {
}
export class StrictType extends Schema {
}
export const Strict = (Item) => {
    return class Strict extends StrictType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export class NonStrictType extends Schema {
}
export const NonStrict = (Item) => {
    return class Strict extends NonStrictType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export class ReadOnlyType extends Schema {
}
export const ReadOnly = (Item) => {
    return class ReadOnly extends ReadOnlyType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export class ReadOnlyDeepType extends Schema {
}
export const ReadOnlyDeep = (Item) => {
    return class Strict extends ReadOnlyDeepType {
        constructor() {
            super(...arguments);
            this.Item = toSchemaCtor(Item);
        }
    };
};
export const getSchemaCtor = (Ctor) => {
    if (isNumberConstructor(Ctor)) {
        return Number;
    }
    if (isStringConstructor(Ctor)) {
        return String;
    }
    if (isBooleanConstructor(Ctor)) {
        return Boolean;
    }
    if (isDateConstructor(Ctor)) {
        return Date;
    }
    return Ctor;
};
export const isSchemaCtor = (input) => {
    if (isNumberConstructor(input) ||
        isStringConstructor(input) ||
        isBooleanConstructor(input) ||
        isDateConstructor(input)) {
        return true;
    }
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof Schema;
};
export const isFieldDescriptor = (input) => {
    var _a;
    return isSchemaCtor((_a = input === null || input === void 0 ? void 0 : input[Type]) !== null && _a !== void 0 ? _a : input);
};
export const isFieldDescriptors = (input) => {
    return !!(input && typeof input === 'object');
};
export const toSchemaCtor = (Item) => {
    if (isSchemaCtor(Item)) {
        return Item;
    }
    return Struct(Item);
};
export const toSchemaCtors = (Inputs) => {
    if (Array.isArray(Inputs)) {
        // @ts-ignore: ignore
        return Inputs.map(toSchemaCtor);
    }
    if (Inputs && typeof Inputs === 'object') {
        const result = {};
        for (const key in Inputs) {
            // @ts-ignore: ignore
            result[key] = toSchemaCtor(Inputs[key]);
        }
        return result;
    }
    throw new Error(`Unknown inputs: ${Inputs}`);
};
const instanceWeakMap = new WeakMap();
export const getInstance = (Ctor) => {
    if (isNumberConstructor(Ctor)) {
        return getInstance(Number);
    }
    if (isStringConstructor(Ctor)) {
        return getInstance(String);
    }
    if (isBooleanConstructor(Ctor)) {
        return getInstance(Boolean);
    }
    if (isDateConstructor(Ctor)) {
        return getInstance(Date);
    }
    if (instanceWeakMap.has(Ctor)) {
        return instanceWeakMap.get(Ctor);
    }
    const instance = new Ctor();
    instanceWeakMap.set(Ctor, instance);
    return instance;
};
export class TupleType extends Schema {
}
export const Tuple = (...Items) => {
    return class Tuple extends TupleType {
        constructor() {
            super(...arguments);
            this.Items = toSchemaCtors(Items);
        }
    };
};
//# sourceMappingURL=schema.js.map