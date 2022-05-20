import { BooleanConfig, Language, LanguageSchema, PackageManager, PackageManagerSchema, PackageNameSchema, PackagePathSchema } from "../common";
import { ClientRouteSchema, DisableStateManagementSchema, NeedModifyMWAConfigSchema, RunWay, RunWaySchema, EnableMWALessSchema, EnableMWASassSchema, ClientRoute } from "./common";
export var MWASchemas = [PackageNameSchema, PackagePathSchema, LanguageSchema, PackageManagerSchema, RunWaySchema, NeedModifyMWAConfigSchema, ClientRouteSchema, DisableStateManagementSchema, EnableMWALessSchema, EnableMWASassSchema];
export var MWASchema = {
  key: 'mwa',
  isObject: true,
  items: MWASchemas
};
export var MWADefaultConfig = {
  language: Language.TS,
  packageManager: PackageManager.Pnpm,
  runWay: RunWay.No,
  needModifyMWAConfig: BooleanConfig.NO,
  clientRoute: ClientRoute.SelfControlRoute,
  disableStateManagement: BooleanConfig.NO,
  enableLess: BooleanConfig.NO,
  enableSass: BooleanConfig.NO
};