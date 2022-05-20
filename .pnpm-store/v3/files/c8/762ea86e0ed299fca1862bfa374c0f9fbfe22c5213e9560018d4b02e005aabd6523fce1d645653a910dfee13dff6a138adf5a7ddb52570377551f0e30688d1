import { ChildHandler, CoexitRelationHandler, FormHandler, MutualexclusionRelationHandler, NoneHandler, RootHandler, Schema, SchemaValueType, ValueHandler } from './interface/ISchema';
export declare class BaseReader {
  data: any;
  private schema;
  private readonly rulesHandler;
  private isReady;
  private readonly extra;
  constructor(schema: Schema, data: any, extra?: any);
  updateSchema(schema: Schema): void;
  updateData(data: any): void;
  registReadRoot(callback: RootHandler): {
    registReadForm: (callback: FormHandler) => {
      registReadChild: (callback: ChildHandler) => {
        registReadAsValue: (callback: ValueHandler) => {
          registReadCoexitRelation: (callback: CoexitRelationHandler) => {
            registerReadNoneItem: (callback: NoneHandler) => {
              registReadMutualexclusionRelation: (callback: MutualexclusionRelationHandler) => void;
            };
          };
        };
      };
    };
  };
  private registReadForm;
  private registReadChild;
  private registReadAsValue;
  private registReadCoexitRelation;
  private registerReadNoneItem;
  private registReadMutualexclusionRelation;
  private setReady;
  private runHandler;
  filterBoolean(data: any): any;
  getSchemaType(schema: Schema): string[];
  getInitValues(schema: Schema): any;
  getSchemaDefaultValue(schema: Schema, brothers: string[], isRoot: boolean): SchemaValueType;
  read(): any;
  private readObj;
  private readRelation;
  private isNoneItem;
  private doRead;
}