import { FsMaterial } from "../materials/FsMaterial.d";
export interface RuntimeCurrent {
  material: FsMaterial;
}
export interface GeneratorContext {
  materials: Record<string, FsMaterial>;
  config: Record<string, any>;
  data?: Record<string, any>;
  current: RuntimeCurrent | null;
  [key: string]: any;
}