import { RenderResult, ServerHookRunner } from '../../type';
import { ModernRoute } from '../route';
import { ModernServerContext } from '../context';
export declare const createRenderHandler: ({
  distDir,
  staticGenerate
}: {
  distDir: string;
  staticGenerate: boolean;
}) => ({
  ctx,
  route,
  runner
}: {
  ctx: ModernServerContext;
  route: ModernRoute;
  runner: ServerHookRunner;
}) => Promise<RenderResult | null>;