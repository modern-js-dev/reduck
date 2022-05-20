"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tuple = exports.TupleType = exports.getInstance = exports.toSchemaCtors = exports.toSchemaCtor = exports.isFieldDescriptors = exports.isFieldDescriptor = exports.isSchemaCtor = exports.getSchemaCtor = exports.ReadOnlyDeep = exports.ReadOnlyDeepType = exports.ReadOnly = exports.ReadOnlyType = exports.NonStrict = exports.NonStrictType = exports.Strict = exports.StrictType = exports.Json = exports.Never = exports.Unknown = exports.Any = exports.Record = exports.RecordType = exports.Struct = exports.StructType = exports.Type = exports.Nullable = exports.isNullableType = exports.NullableType = exports.Undefined = exports.Null = exports.Literal = exports.LiteralType = exports.Intersect = exports.IntersectType = exports.Union = exports.UnionType = exports.ObjectType = exports.List = exports.ListType = exports.Date = exports.Float = exports.Int = exports.ID = exports.Boolean = exports.String = exports.Number = exports.Schema = void 0;
var tslib_1 = require("tslib");
var utils_1 = require("./utils");
var Schema = /** @class */ (function () {
    function Schema() {
    }
    Schema.create = function (value) {
        return value;
    };
    return Schema;
}());
exports.Schema = Schema;
var Number = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Number, _super);
    function Number() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Number;
}(Schema));
exports.Number = Number;
var String = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(String, _super);
    function String() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return String;
}(Schema));
exports.String = String;
var Boolean = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Boolean, _super);
    function Boolean() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Boolean;
}(Schema));
exports.Boolean = Boolean;
var ID = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ID, _super);
    function ID() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ID;
}(Schema));
exports.ID = ID;
var Int = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Int, _super);
    function Int() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Int;
}(Schema));
exports.Int = Int;
var Float = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Float, _super);
    function Float() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Float;
}(Schema));
exports.Float = Float;
var Date = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Date, _super);
    function Date() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Date;
}(Schema));
exports.Date = Date;
var ListType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ListType, _super);
    function ListType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ListType;
}(Schema));
exports.ListType = ListType;
var List = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(List, _super);
        function List() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return List;
    }(ListType));
};
exports.List = List;
var ObjectType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ObjectType, _super);
    function ObjectType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ObjectType;
}(Schema));
exports.ObjectType = ObjectType;
var UnionType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(UnionType, _super);
    function UnionType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UnionType;
}(Schema));
exports.UnionType = UnionType;
var Union = function () {
    var Items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Items[_i] = arguments[_i];
    }
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Union, _super);
        function Union() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Items = (0, exports.toSchemaCtors)(Items);
            return _this;
        }
        return Union;
    }(UnionType));
};
exports.Union = Union;
var IntersectType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(IntersectType, _super);
    function IntersectType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IntersectType;
}(Schema));
exports.IntersectType = IntersectType;
var Intersect = function () {
    var Items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Items[_i] = arguments[_i];
    }
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Intersect, _super);
        function Intersect() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Items = (0, exports.toSchemaCtors)(Items);
            return _this;
        }
        return Intersect;
    }(IntersectType));
};
exports.Intersect = Intersect;
var LiteralType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(LiteralType, _super);
    function LiteralType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LiteralType;
}(Schema));
exports.LiteralType = LiteralType;
var Literal = function (value) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Literal, _super);
        function Literal() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.value = value;
            return _this;
        }
        return Literal;
    }(LiteralType));
};
exports.Literal = Literal;
exports.Null = (0, exports.Literal)(null);
exports.Undefined = (0, exports.Literal)(undefined);
var NullableType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NullableType, _super);
    function NullableType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NullableType;
}(Schema));
exports.NullableType = NullableType;
var isNullableType = function (input) {
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof NullableType;
};
exports.isNullableType = isNullableType;
var Nullable = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Nullable, _super);
        function Nullable() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return Nullable;
    }(NullableType));
};
exports.Nullable = Nullable;
exports.Type = '__type';
var StructType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(StructType, _super);
    function StructType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StructType;
}(Schema));
exports.StructType = StructType;
var Struct = function (descriptors) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Struct, _super);
        function Struct() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.descriptors = descriptors;
            return _this;
        }
        return Struct;
    }(StructType));
};
exports.Struct = Struct;
var RecordType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(RecordType, _super);
    function RecordType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RecordType;
}(Schema));
exports.RecordType = RecordType;
var Record = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Record, _super);
        function Record() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return Record;
    }(RecordType));
};
exports.Record = Record;
var Any = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Any, _super);
    function Any() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Any;
}(Schema));
exports.Any = Any;
var Unknown = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Unknown, _super);
    function Unknown() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Unknown;
}(Schema));
exports.Unknown = Unknown;
var Never = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Never, _super);
    function Never() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Never;
}(Schema));
exports.Never = Never;
var Json = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(Json, _super);
    function Json() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Json;
}(Schema));
exports.Json = Json;
var StrictType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(StrictType, _super);
    function StrictType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StrictType;
}(Schema));
exports.StrictType = StrictType;
var Strict = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Strict, _super);
        function Strict() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return Strict;
    }(StrictType));
};
exports.Strict = Strict;
var NonStrictType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NonStrictType, _super);
    function NonStrictType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NonStrictType;
}(Schema));
exports.NonStrictType = NonStrictType;
var NonStrict = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Strict, _super);
        function Strict() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return Strict;
    }(NonStrictType));
};
exports.NonStrict = NonStrict;
var ReadOnlyType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ReadOnlyType, _super);
    function ReadOnlyType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReadOnlyType;
}(Schema));
exports.ReadOnlyType = ReadOnlyType;
var ReadOnly = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(ReadOnly, _super);
        function ReadOnly() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return ReadOnly;
    }(ReadOnlyType));
};
exports.ReadOnly = ReadOnly;
var ReadOnlyDeepType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ReadOnlyDeepType, _super);
    function ReadOnlyDeepType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ReadOnlyDeepType;
}(Schema));
exports.ReadOnlyDeepType = ReadOnlyDeepType;
var ReadOnlyDeep = function (Item) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Strict, _super);
        function Strict() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = (0, exports.toSchemaCtor)(Item);
            return _this;
        }
        return Strict;
    }(ReadOnlyDeepType));
};
exports.ReadOnlyDeep = ReadOnlyDeep;
var getSchemaCtor = function (Ctor) {
    if ((0, utils_1.isNumberConstructor)(Ctor)) {
        return Number;
    }
    if ((0, utils_1.isStringConstructor)(Ctor)) {
        return String;
    }
    if ((0, utils_1.isBooleanConstructor)(Ctor)) {
        return Boolean;
    }
    if ((0, utils_1.isDateConstructor)(Ctor)) {
        return Date;
    }
    return Ctor;
};
exports.getSchemaCtor = getSchemaCtor;
var isSchemaCtor = function (input) {
    if ((0, utils_1.isNumberConstructor)(input) ||
        (0, utils_1.isStringConstructor)(input) ||
        (0, utils_1.isBooleanConstructor)(input) ||
        (0, utils_1.isDateConstructor)(input)) {
        return true;
    }
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof Schema;
};
exports.isSchemaCtor = isSchemaCtor;
var isFieldDescriptor = function (input) {
    var _a;
    return (0, exports.isSchemaCtor)((_a = input === null || input === void 0 ? void 0 : input[exports.Type]) !== null && _a !== void 0 ? _a : input);
};
exports.isFieldDescriptor = isFieldDescriptor;
var isFieldDescriptors = function (input) {
    return !!(input && typeof input === 'object');
};
exports.isFieldDescriptors = isFieldDescriptors;
var toSchemaCtor = function (Item) {
    if ((0, exports.isSchemaCtor)(Item)) {
        return Item;
    }
    return (0, exports.Struct)(Item);
};
exports.toSchemaCtor = toSchemaCtor;
var toSchemaCtors = function (Inputs) {
    if (Array.isArray(Inputs)) {
        // @ts-ignore: ignore
        return Inputs.map(exports.toSchemaCtor);
    }
    if (Inputs && typeof Inputs === 'object') {
        var result = {};
        for (var key in Inputs) {
            // @ts-ignore: ignore
            result[key] = (0, exports.toSchemaCtor)(Inputs[key]);
        }
        return result;
    }
    throw new Error("Unknown inputs: ".concat(Inputs));
};
exports.toSchemaCtors = toSchemaCtors;
var instanceWeakMap = new WeakMap();
var getInstance = function (Ctor) {
    if ((0, utils_1.isNumberConstructor)(Ctor)) {
        return (0, exports.getInstance)(Number);
    }
    if ((0, utils_1.isStringConstructor)(Ctor)) {
        return (0, exports.getInstance)(String);
    }
    if ((0, utils_1.isBooleanConstructor)(Ctor)) {
        return (0, exports.getInstance)(Boolean);
    }
    if ((0, utils_1.isDateConstructor)(Ctor)) {
        return (0, exports.getInstance)(Date);
    }
    if (instanceWeakMap.has(Ctor)) {
        return instanceWeakMap.get(Ctor);
    }
    var instance = new Ctor();
    instanceWeakMap.set(Ctor, instance);
    return instance;
};
exports.getInstance = getInstance;
var TupleType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(TupleType, _super);
    function TupleType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TupleType;
}(Schema));
exports.TupleType = TupleType;
var Tuple = function () {
    var Items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Items[_i] = arguments[_i];
    }
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(Tuple, _super);
        function Tuple() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Items = (0, exports.toSchemaCtors)(Items);
            return _this;
        }
        return Tuple;
    }(TupleType));
};
exports.Tuple = Tuple;
//# sourceMappingURL=schema.js.map