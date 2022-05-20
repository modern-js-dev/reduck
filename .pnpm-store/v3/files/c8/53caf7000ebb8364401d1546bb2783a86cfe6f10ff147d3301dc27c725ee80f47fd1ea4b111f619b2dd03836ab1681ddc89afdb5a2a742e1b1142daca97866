import { GeneratorContext } from '@modern-js/codesmith';
export * from './utils';
export { fs, readTsConfigByFile, getPackageManager, canUseNpm, canUsePnpm, canUseYarn } from '@modern-js/utils';
export { i18n } from './locale';
export declare function getPackageVersion(packageName: string, registry?: string): Promise<string>;
export declare function getPackageManagerText(packageManager: 'pnpm' | 'yarn' | 'npm'): string;
export declare function isTsProject(appDir: string): boolean;
export declare function getPackageObj(context: GeneratorContext): Promise<any>;
export declare function getAllPackages(appDir: string): string[];
export declare function validatePackageName(value: string, packages: string[], options: {
  isMonorepoSubProject: boolean;
}): {
  success: boolean;
  error: string;
} | {
  success: boolean;
  error?: undefined;
};
export declare function validatePackagePath(value: string, projectDir: string, options?: {
  isMwa?: boolean;
  isPublic?: boolean;
  isTest?: boolean;
}): {
  success: boolean;
  error: string;
} | {
  success: boolean;
  error?: undefined;
};
export declare function getModuleProjectPath(packagePath: string, isMonorepoSubProject: boolean, isPublic: boolean, isLocalPackages: boolean): string;
export declare function getMWAProjectPath(packagePath: string, isMonorepoSubProject: boolean, isTest?: boolean): string;