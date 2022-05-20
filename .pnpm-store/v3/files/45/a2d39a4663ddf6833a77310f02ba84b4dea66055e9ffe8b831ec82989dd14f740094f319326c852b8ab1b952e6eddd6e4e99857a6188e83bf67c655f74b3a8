"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExp = exports.ValidatorType = exports.createSchemaValidator = exports.Validator = exports.SchemaErr = void 0;
var tslib_1 = require("tslib");
var S = (0, tslib_1.__importStar)(require("./schema"));
var schema_1 = require("./schema");
var helper_1 = require("./helper");
var result_1 = require("./result");
var SchemaErr = function (message, path) {
    return (0, result_1.Err)({
        path: path,
        message: message,
    });
};
exports.SchemaErr = SchemaErr;
var validatorWeakMap = new WeakMap();
var getValidatorImpl = function (input) {
    if (typeof input !== 'function') {
        return undefined;
    }
    if (validatorWeakMap.has(input)) {
        return validatorWeakMap.get(input);
    }
    var next = Object.getPrototypeOf(input);
    if (next === Function.prototype) {
        return undefined;
    }
    return getValidatorImpl(next);
};
exports.Validator = {
    impl: function (Ctor, impl) {
        validatorWeakMap.set(Ctor, impl);
    },
    get: function (Ctor) {
        var finalCtor = S.getSchemaCtor(Ctor);
        var validatorImpl = getValidatorImpl(finalCtor);
        // instantiation validator and save to weak-map
        if (typeof validatorImpl === 'function') {
            var schema = (0, schema_1.getInstance)(Ctor);
            var impl = validatorImpl(schema);
            validatorWeakMap.set(Ctor, impl);
            return impl;
        }
        return validatorImpl;
    },
    validate: function (Ctor, input, options) {
        var validatorImpl = exports.Validator.get(Ctor);
        if (!validatorImpl) {
            throw new Error("No impl found for Validator, Ctor: ".concat(Ctor));
        }
        return validatorImpl.validate(input, options);
    },
};
exports.Validator.impl(S.String, {
    validate: function (input) {
        if (typeof input === 'string') {
            return (0, result_1.Ok)(input);
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a string"));
    },
});
var isNumber = function (input) {
    return typeof input === 'number' && !isNaN(input);
};
var parseNumberLiteral = function (input) {
    if (typeof input === 'string') {
        var value = parseFloat(input);
        if (isNumber(value)) {
            return (0, result_1.Ok)(value);
        }
    }
    return (0, result_1.Err)("Expected a string, but got ".concat(input));
};
exports.Validator.impl(S.Number, {
    validate: function (input, options) {
        if (isNumber(input))
            return (0, result_1.Ok)(input);
        if ((options === null || options === void 0 ? void 0 : options.strict) === false) {
            var result = parseNumberLiteral(input);
            if (result.isOk)
                return result;
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a number"));
    },
});
exports.Validator.impl(S.Int, {
    validate: function (input, options) {
        if (typeof input === 'number' && Number.isInteger(input)) {
            return (0, result_1.Ok)(input);
        }
        if ((options === null || options === void 0 ? void 0 : options.strict) === false) {
            if (isNumber(input))
                return (0, result_1.Ok)(Math.floor(input));
            var result = parseNumberLiteral(input);
            if (result.isOk)
                return (0, result_1.Ok)(Math.floor(result.value));
        }
        return (0, exports.SchemaErr)("".concat(input, " is not an integer"));
    },
});
exports.Validator.impl(S.Float, {
    validate: function (input, options) {
        if (typeof input === 'number' && !isNaN(input)) {
            return (0, result_1.Ok)(input);
        }
        if ((options === null || options === void 0 ? void 0 : options.strict) === false) {
            var result = parseNumberLiteral(input);
            if (result.isOk)
                return result;
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a number"));
    },
});
exports.Validator.impl(S.ID, {
    validate: function (input) {
        if (typeof input === 'string') {
            if (input === '') {
                return (0, exports.SchemaErr)("ID can't be empty.");
            }
            return (0, result_1.Ok)(input);
        }
        return (0, exports.SchemaErr)("".concat(input, " is not an ID"));
    },
});
var parseBooleanLiteral = function (input) {
    if (input === 'false')
        return (0, result_1.Ok)(false);
    if (input === 'true')
        return (0, result_1.Ok)(true);
    return (0, result_1.Err)('');
};
exports.Validator.impl(S.Boolean, {
    validate: function (input, options) {
        if (typeof input === 'boolean') {
            return (0, result_1.Ok)(input);
        }
        if ((options === null || options === void 0 ? void 0 : options.strict) === false) {
            var result = parseBooleanLiteral(input);
            if (result.isOk)
                return result;
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a boolean"));
    },
});
exports.Validator.impl(S.Date, {
    validate: function (input) {
        if (input instanceof Date) {
            return (0, result_1.Ok)(input);
        }
        if (typeof input === 'number') {
            return (0, result_1.Ok)(new Date(input));
        }
        if (typeof input === 'string') {
            var timestamp = Date.parse(input);
            if (Number.isNaN(timestamp)) {
                return (0, exports.SchemaErr)("".concat(input, " is not a valid date input"));
            }
            return (0, result_1.Ok)(new Date(timestamp));
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a valid date input"));
    },
});
exports.Validator.impl(S.LiteralType, function (schema) { return ({
    validate: function (input, options) {
        var value = schema.value;
        if (input === value) {
            return (0, result_1.Ok)(input);
        }
        if ((options === null || options === void 0 ? void 0 : options.strict) === false && typeof value !== 'string') {
            if (typeof value === 'number') {
                var result = parseNumberLiteral(input);
                if (result.isOk && result.value === value)
                    return result;
            }
            else if (typeof value === 'boolean') {
                var result = parseBooleanLiteral(input);
                if (result.isOk && result.value === value)
                    return result;
            }
        }
        return (0, exports.SchemaErr)("".concat(input, " is not a literal ").concat(value));
    },
}); });
exports.Validator.impl(S.NullableType, function (schema) { return ({
    validate: function (input, options) {
        if (input === null || input === undefined) {
            return (0, result_1.Ok)(input);
        }
        return exports.Validator.validate(schema.Item, input, options);
    }
}); });
exports.Validator.impl(S.ListType, function (schema) { return ({
    validate: function (input, options) {
        var _a;
        if (!Array.isArray(input)) {
            return (0, exports.SchemaErr)("".concat(input, " is not a list"));
        }
        var results = [];
        for (var i = 0; i < input.length; i++) {
            var item = input[i];
            var result = exports.Validator.validate(schema.Item, item, options);
            if (result.isErr) {
                return (0, exports.SchemaErr)(result.value.message, (0, tslib_1.__spreadArray)([i], (0, tslib_1.__read)(((_a = result.value.path) !== null && _a !== void 0 ? _a : [])), false));
            }
            results.push(result.value);
        }
        return (0, result_1.Ok)(results);
    },
}); });
exports.Validator.impl(S.StructType, function (schema) {
    var fields = (0, helper_1.getSchemaCtorFields)(schema.descriptors);
    return {
        validate: function (input, options) {
            var _a;
            if (typeof input === 'string') {
                if ((options === null || options === void 0 ? void 0 : options.strict) === false) {
                    try {
                        input = JSON.parse(input);
                    }
                    catch (e) {
                        // ignore
                    }
                }
            }
            if (typeof input !== 'object' || !input) {
                return (0, exports.SchemaErr)("".concat(input, " is not an object"));
            }
            var results = {};
            for (var key in fields) {
                var Field = fields[key];
                var value = input[key];
                var result = exports.Validator.validate(Field[S.Type], value, options);
                if (result.isErr) {
                    return (0, exports.SchemaErr)(result.value.message, (0, tslib_1.__spreadArray)([key], (0, tslib_1.__read)(((_a = result.value.path) !== null && _a !== void 0 ? _a : [])), false));
                }
                results[key] = result.value;
            }
            return (0, result_1.Ok)(results);
        },
    };
});
exports.Validator.impl(S.ObjectType, function (schema) {
    var fields = (0, helper_1.getSchemaCtorFields)(schema);
    var Struct = S.Struct(fields);
    return {
        validate: function (input, options) {
            return exports.Validator.validate(Struct, input, options);
        },
    };
});
exports.Validator.impl(S.RecordType, function (schema) {
    return {
        validate: function (input, options) {
            var e_1, _a;
            var _b;
            if (typeof input !== 'object' || !input) {
                return (0, exports.SchemaErr)("".concat(input, " is not an object"));
            }
            var results = {};
            try {
                for (var _c = (0, tslib_1.__values)(Object.entries(input)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = (0, tslib_1.__read)(_d.value, 2), key = _e[0], value = _e[1];
                    var result = exports.Validator.validate(schema.Item, value, options);
                    if (result.isErr) {
                        return (0, exports.SchemaErr)(result.value.message, (0, tslib_1.__spreadArray)([key], (0, tslib_1.__read)(((_b = result.value.path) !== null && _b !== void 0 ? _b : [])), false));
                    }
                    results[key] = result.value;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return (0, result_1.Ok)(results);
        },
    };
});
exports.Validator.impl(S.UnionType, function (schema) {
    return {
        validate: function (input, options) {
            var e_2, _a;
            var messages = [];
            try {
                for (var _b = (0, tslib_1.__values)(schema.Items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var Item = _c.value;
                    if (Item === S.Never)
                        continue;
                    var result = exports.Validator.validate(Item, input, options);
                    if (result.isOk)
                        return result;
                    messages.push(result.value.message);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return (0, exports.SchemaErr)("Matched unions failed: \n".concat(messages.join('\n&\n')));
        },
    };
});
exports.Validator.impl(S.IntersectType, function (schema) {
    return {
        validate: function (input, options) {
            var e_3, _a;
            var results = {};
            try {
                for (var _b = (0, tslib_1.__values)(schema.Items), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var Item = _c.value;
                    var result = exports.Validator.validate(Item, input, options);
                    if (result.isErr)
                        return result;
                    Object.assign(results, result.value);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return (0, result_1.Ok)(results);
        },
    };
});
var validateJson = function (input) {
    var e_4, _a, e_5, _b;
    if (typeof input === 'string' || typeof input === 'number' || typeof input === 'boolean' || input === null) {
        return (0, result_1.Ok)(input);
    }
    if (Array.isArray(input)) {
        try {
            for (var input_1 = (0, tslib_1.__values)(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var value = input_1_1.value;
                var result = validateJson(value);
                if (result.isErr)
                    return result;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return (0, result_1.Ok)(input);
    }
    if (typeof input === 'object' && input) {
        try {
            for (var _c = (0, tslib_1.__values)(Object.values(input)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var value = _d.value;
                var result = validateJson(value);
                if (result.isErr)
                    return result;
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return (0, result_1.Ok)(input);
    }
    throw new Error("".concat(input, " is not a valid json"));
};
exports.Validator.impl(S.Json, {
    validate: validateJson,
});
exports.Validator.impl(S.Any, {
    validate: function (input) { return (0, result_1.Ok)(input); },
});
exports.Validator.impl(S.Unknown, {
    validate: function (input) { return (0, result_1.Ok)(input); },
});
exports.Validator.impl(S.Never, {
    validate: function (input) {
        throw new Error("Should not validate here, got ".concat(input));
    }
});
exports.Validator.impl(S.StrictType, function (schema) {
    return {
        validate: function (input, options) {
            return exports.Validator.validate(schema.Item, input, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, options), { strict: true }));
        },
    };
});
exports.Validator.impl(S.NonStrictType, function (schema) {
    return {
        validate: function (input, options) {
            return exports.Validator.validate(schema.Item, input, (0, tslib_1.__assign)((0, tslib_1.__assign)({}, options), { strict: false }));
        },
    };
});
exports.Validator.impl(S.ReadOnlyType, function (schema) {
    return {
        validate: function (input, options) {
            return exports.Validator.validate(schema.Item, input, options);
        },
    };
});
exports.Validator.impl(S.ReadOnlyDeepType, function (schema) {
    return {
        validate: function (input, options) {
            return exports.Validator.validate(schema.Item, input, options);
        },
    };
});
exports.Validator.impl(S.TupleType, function (schema) {
    return {
        validate: function (input, options) {
            var _a;
            if (!Array.isArray(input)) {
                return (0, exports.SchemaErr)("".concat(input, " is not an array"));
            }
            var tuple = [];
            for (var i = 0; i < schema.Items.length; i++) {
                var Item = schema.Items[i];
                var result = exports.Validator.validate(Item, input[i], options);
                if (result.isErr) {
                    return (0, exports.SchemaErr)(result.value.message, (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(((_a = result.value.path) !== null && _a !== void 0 ? _a : [])), false), [i], false));
                }
                tuple.push(result.value);
            }
            return (0, result_1.Ok)(tuple);
        }
    };
});
exports.Validator.impl(helper_1.PartialType, function (schema) {
    return {
        validate: function (input, options) {
            return exports.Validator.validate(schema.Item, input, options);
        }
    };
});
var createSchemaValidator = function (SchemaCtor, options) {
    return function (input) {
        return exports.Validator.validate(SchemaCtor, input, options);
    };
};
exports.createSchemaValidator = createSchemaValidator;
var ValidatorType = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(ValidatorType, _super);
    function ValidatorType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidatorType.prototype.Ok = function (value) {
        return (0, result_1.Ok)(value);
    };
    ValidatorType.prototype.Err = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return exports.SchemaErr.apply(void 0, (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(args), false));
    };
    return ValidatorType;
}(S.Schema));
exports.ValidatorType = ValidatorType;
exports.Validator.impl(ValidatorType, function (schema) {
    return {
        validate: schema.validate.bind(schema)
    };
});
var RegExp = function (regexp) {
    return /** @class */ (function (_super) {
        (0, tslib_1.__extends)(RegExp, _super);
        function RegExp() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RegExp.prototype.validate = function (input) {
            var text = "".concat(input);
            if (regexp.test(text)) {
                return this.Ok(text);
            }
            return this.Err("".concat(text, " was not matched: ").concat(regexp));
        };
        return RegExp;
    }(ValidatorType));
};
exports.RegExp = RegExp;
//# sourceMappingURL=validator.js.map