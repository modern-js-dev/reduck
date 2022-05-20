"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partial = exports.partialObject = exports.partialStruct = exports.PartialType = exports.getSchemaCtorFields = exports.keyof = exports.keyofObject = exports.keyofStruct = exports.omit = exports.pick = exports.omitObject = exports.pickObject = exports.omitStruct = exports.pickStruct = exports.field = void 0;
var tslib_1 = require("tslib");
var schema_1 = require("./schema");
var S = (0, tslib_1.__importStar)(require("./schema"));
var field = function (fieldInfo) {
    return fieldInfo;
};
exports.field = field;
var pickStruct = function (Ctor, keys) {
    var instance = (0, schema_1.getInstance)(Ctor);
    var descriptors = {};
    for (var key in instance.descriptors) {
        if (keys.includes(key)) {
            var value = instance.descriptors[key];
            descriptors[key] = value;
        }
    }
    return (0, schema_1.Struct)(descriptors);
};
exports.pickStruct = pickStruct;
var omitStruct = function (Ctor, keys) {
    var instance = (0, schema_1.getInstance)(Ctor);
    var descriptors = {};
    for (var key in instance.descriptors) {
        if (!keys.includes(key)) {
            var value = instance.descriptors[key];
            descriptors[key] = value;
        }
    }
    return (0, schema_1.Struct)(descriptors);
};
exports.omitStruct = omitStruct;
var pickObject = function (Ctor, keys) {
    var e_1, _a;
    var instance = (0, schema_1.getInstance)(Ctor);
    var descriptors = {};
    if (instance instanceof schema_1.ObjectType) {
        try {
            for (var _b = (0, tslib_1.__values)(Object.keys(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (keys.includes(key)) {
                    var value = instance[key];
                    if ((0, schema_1.isFieldDescriptor)(value)) {
                        descriptors[key] = value;
                    }
                    else if ((0, schema_1.isFieldDescriptors)(value)) {
                        descriptors[key] = value;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    return (0, schema_1.Struct)(descriptors);
};
exports.pickObject = pickObject;
var omitObject = function (Ctor, keys) {
    var e_2, _a;
    var instance = (0, schema_1.getInstance)(Ctor);
    var descriptors = {};
    if (instance instanceof schema_1.ObjectType) {
        try {
            for (var _b = (0, tslib_1.__values)(Object.keys(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (!keys.includes(key)) {
                    var value = instance[key];
                    if ((0, schema_1.isFieldDescriptor)(value)) {
                        descriptors[key] = value;
                    }
                    else if ((0, schema_1.isFieldDescriptors)(value)) {
                        descriptors[key] = value;
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    return (0, schema_1.Struct)(descriptors);
};
exports.omitObject = omitObject;
exports.pick = (function (Ctor, keys) {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.ObjectType) {
        return (0, exports.pickObject)(Ctor, keys);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.StructType) {
        return (0, exports.pickStruct)(Ctor, keys);
    }
    throw new Error("Unknown Schema Constructor: ".concat(Ctor));
});
exports.omit = (function (Ctor, keys) {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.ObjectType) {
        return (0, exports.omitObject)(Ctor, keys);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.StructType) {
        return (0, exports.omitStruct)(Ctor, keys);
    }
    throw new Error("Unknown Schema Constructor: ".concat(Ctor));
});
var keyofStruct = function (Ctor) {
    return Object.keys((0, schema_1.getInstance)(Ctor).descriptors);
};
exports.keyofStruct = keyofStruct;
var keyofObject = function (Ctor) {
    var e_3, _a;
    var instance = (0, schema_1.getInstance)(Ctor);
    var keys = [];
    try {
        for (var _b = (0, tslib_1.__values)(Object.keys(instance)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = instance[key];
            if ((0, schema_1.isFieldDescriptor)(value)) {
                keys.push(key);
            }
            else if ((0, schema_1.isFieldDescriptors)(value)) {
                keys.push(key);
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return keys;
};
exports.keyofObject = keyofObject;
exports.keyof = (function (Ctor) {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.ObjectType) {
        return (0, exports.keyofObject)(Ctor);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.StructType) {
        return (0, exports.keyofStruct)(Ctor);
    }
    throw new Error("Unknown Schema Constructor: ".concat(Ctor));
});
var getSchemaCtorFields = function (descriptors) {
    var e_4, _a, _b, _c;
    var fields = {};
    try {
        for (var _d = (0, tslib_1.__values)(Object.entries(descriptors)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var _f = (0, tslib_1.__read)(_e.value, 2), key = _f[0], field_1 = _f[1];
            if (S.isFieldDescriptor(field_1)) {
                if (typeof field_1 === 'function') {
                    fields[key] = (_b = {},
                        _b[S.Type] = field_1,
                        _b);
                }
                else {
                    fields[key] = field_1;
                }
            }
            else if (S.isFieldDescriptors(field_1)) {
                fields[key] = (_c = {},
                    _c[S.Type] = S.Struct((0, exports.getSchemaCtorFields)(field_1)),
                    _c);
            }
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return fields;
};
exports.getSchemaCtorFields = getSchemaCtorFields;
var PartialType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(PartialType, _super);
    function PartialType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PartialType;
}(S.Schema));
exports.PartialType = PartialType;
var isNullableType = function (input) {
    return (input === null || input === void 0 ? void 0 : input.prototype) instanceof S.NullableType;
};
var getPartialFields = function (fields) {
    var e_5, _a, _b;
    var descriptors = {};
    try {
        for (var _c = (0, tslib_1.__values)(Object.entries((0, exports.getSchemaCtorFields)(fields))), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = (0, tslib_1.__read)(_d.value, 2), key = _e[0], value = _e[1];
            descriptors[key] = (0, tslib_1.__assign)((0, tslib_1.__assign)({}, value), (_b = {}, _b[S.Type] = isNullableType(value[S.Type]) ? value[S.Type] : S.Nullable(value[S.Type]), _b));
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return descriptors;
};
var partialStruct = function (Ctor) {
    var instance = (0, schema_1.getInstance)(Ctor);
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(partial, _super);
        function partial() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = S.Struct(getPartialFields(instance.descriptors));
            return _this;
        }
        return partial;
    }(PartialType));
};
exports.partialStruct = partialStruct;
var partialObject = function (Ctor) {
    var instance = (0, schema_1.getInstance)(Ctor);
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(partial, _super);
        function partial() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.Item = S.Struct(getPartialFields(instance));
            return _this;
        }
        return partial;
    }(PartialType));
};
exports.partialObject = partialObject;
var partial = function (Ctor) {
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.ObjectType) {
        return (0, exports.partialObject)(Ctor);
    }
    if ((Ctor === null || Ctor === void 0 ? void 0 : Ctor.prototype) instanceof schema_1.StructType) {
        return (0, exports.partialStruct)(Ctor);
    }
    throw new Error("Unknown Schema Constructor: ".concat(Ctor));
};
exports.partial = partial;
//# sourceMappingURL=helper.js.map