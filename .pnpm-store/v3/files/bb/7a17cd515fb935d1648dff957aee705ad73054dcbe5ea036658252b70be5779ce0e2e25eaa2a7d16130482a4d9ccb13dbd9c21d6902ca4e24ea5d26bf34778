"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformSchema = transformSchema;

var _isUndefined2 = _interopRequireDefault(require("lodash/isUndefined"));

var _easyFormCli = require("@modern-js/easy-form-cli");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transformSchema(schema, configValue = {}, validateMap = {}) {
  (0, _easyFormCli.forEach)(schema, schemaItem => {
    var _schemaItem$state;

    if (schemaItem !== null && schemaItem !== void 0 && (_schemaItem$state = schemaItem.state) !== null && _schemaItem$state !== void 0 && _schemaItem$state.cliLabel) {
      schemaItem.label = schemaItem.state.cliLabel;
    }

    const {
      when,
      validate
    } = schemaItem;

    schemaItem.when = (values, extra) => {
      if (!(0, _isUndefined2.default)(configValue[schemaItem.key])) {
        return false;
      }

      return when ? when(values, extra) : true;
    };

    schemaItem.validate = async (value, data, extra) => {
      if (validate) {
        const result = await validate(value, data, extra);

        if (!result.success) {
          return result;
        }
      }

      if (validateMap[schemaItem.key]) {
        return validateMap[schemaItem.key](value, data);
      }

      return {
        success: true
      };
    };
  });
}