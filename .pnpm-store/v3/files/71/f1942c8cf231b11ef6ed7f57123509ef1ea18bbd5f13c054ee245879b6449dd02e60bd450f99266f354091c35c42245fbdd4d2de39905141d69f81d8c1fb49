import { i18n, localeKeys } from "../locale";
import { FrameworkSchema, Framework } from "./common";
export const ServerSchemas = [FrameworkSchema];
export const ServerSchema = {
  key: 'server',
  label: () => i18n.t(localeKeys.action.element.server),
  isObject: true,
  items: ServerSchemas
};
export const MWADefaultServerConfig = {
  framework: Framework.Express
};