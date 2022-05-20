import { FsMaterial } from '@/materials/FsMaterial';

export interface RuntimeCurrent {
  material: FsMaterial;
}

export interface GeneratorContext {
  materials: Record<string, FsMaterial>;
  config: Record<string, any>; // Generator config
  data?: Record<string, any>; // RuntimeCurrent context data
  current: RuntimeCurrent | null; // RuntimeCurrent
  [key: string]: any;
}
