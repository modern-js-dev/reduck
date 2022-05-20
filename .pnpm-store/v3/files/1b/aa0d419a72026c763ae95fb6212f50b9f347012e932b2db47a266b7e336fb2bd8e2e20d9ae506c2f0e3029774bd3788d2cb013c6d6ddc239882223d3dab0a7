import { i18n, localeKeys } from "../locale";
import { FrameworkSchema, Framework } from "./common";
export var ServerSchemas = [FrameworkSchema];
export var ServerSchema = {
  key: 'server',
  label: function label() {
    return i18n.t(localeKeys.action.element.server);
  },
  isObject: true,
  items: ServerSchemas
};
export var MWADefaultServerConfig = {
  framework: Framework.Express
};