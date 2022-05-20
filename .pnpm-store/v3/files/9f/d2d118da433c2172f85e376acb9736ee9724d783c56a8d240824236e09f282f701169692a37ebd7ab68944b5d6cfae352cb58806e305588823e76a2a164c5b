import { Language, LanguageSchema, PackageManager, PackageManagerSchema, PackageNameSchema, PackagePathSchema } from "../common";
var GeneratorSchemas = [PackageNameSchema, PackagePathSchema, PackageManagerSchema, LanguageSchema];
export var GeneratorSchema = {
  key: 'generator-generator',
  isObject: true,
  items: Object.values(GeneratorSchemas)
};
export var GeneratorDefaultConfig = {
  packageManager: PackageManager.Pnpm,
  language: Language.TS
};