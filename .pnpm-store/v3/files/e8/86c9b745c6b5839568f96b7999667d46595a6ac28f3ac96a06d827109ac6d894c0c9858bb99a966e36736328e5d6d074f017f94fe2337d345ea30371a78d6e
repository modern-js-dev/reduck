import _isUndefined from "lodash/isUndefined";
import { forEach } from '@modern-js/easy-form-cli';
export function transformSchema(schema, configValue = {}, validateMap = {}) {
  forEach(schema, schemaItem => {
    var _schemaItem$state;

    if (schemaItem !== null && schemaItem !== void 0 && (_schemaItem$state = schemaItem.state) !== null && _schemaItem$state !== void 0 && _schemaItem$state.cliLabel) {
      schemaItem.label = schemaItem.state.cliLabel;
    }

    const {
      when,
      validate
    } = schemaItem;

    schemaItem.when = (values, extra) => {
      if (!_isUndefined(configValue[schemaItem.key])) {
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