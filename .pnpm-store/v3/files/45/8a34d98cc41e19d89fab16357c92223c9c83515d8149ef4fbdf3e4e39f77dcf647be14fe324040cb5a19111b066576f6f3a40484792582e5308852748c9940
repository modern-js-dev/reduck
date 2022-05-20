import { checkSchema } from './checkSchema';
import { MESSAGE, NODE_HANDLERS } from './constant';
import {
  ChildHandler,
  CoexitRelationHandler,
  FormHandler,
  Handler,
  MutualexclusionRelationHandler,
  NoneHandler,
  RootHandler,
  Schema,
  SchemaEffectedValueType,
  SchemaValueType,
  // SchemaValueType,
  ValueHandler,
} from './interface/ISchema';
import { getItems, isEffectedValue } from './utils';

export class BaseReader {
  data: any = {}; // The current data of the form

  private schema: Schema;

  private readonly rulesHandler: { [key: string]: Handler }; // Develop custom interpretation rules for various situations

  private isReady: boolean = false; // After the rule is set, the interpretation can be started

  private readonly extra: Record<string, unknown> = {};

  constructor(schema: Schema, data: any, extra?: any) {
    if (!schema) {
      throw Error(MESSAGE.SCHEMA_SHOULD_NOT_BE_EMPTY);
    }
    this.extra = extra;
    this.schema = schema;
    this.data = data;
    this.rulesHandler = {};
  }

  public updateSchema(schema: Schema) {
    this.schema = schema;
  }

  public updateData(data: any) {
    this.data = data;
  }

  public registReadRoot(callback: RootHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_ROOT] = callback;
    return {
      registReadForm: this.registReadForm.bind(this),
    };
  }

  private registReadForm(callback: FormHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_FORM] = callback;
    return {
      registReadChild: this.registReadChild.bind(this),
    };
  }

  private registReadChild(callback: ChildHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_CHILD] = callback;
    return {
      registReadAsValue: this.registReadAsValue.bind(this),
    };
  }

  private registReadAsValue(callback: ValueHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_AS_VALUE] = callback;
    return {
      registReadCoexitRelation: this.registReadCoexitRelation.bind(this),
    };
  }

  private registReadCoexitRelation(callback: CoexitRelationHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_COEXIT_RELATION] = callback;
    return {
      registerReadNoneItem: this.registerReadNoneItem.bind(this),
    };
  }

  private registerReadNoneItem(callback: NoneHandler) {
    this.rulesHandler[NODE_HANDLERS.READ_NONE_ITEM] = callback;
    return {
      registReadMutualexclusionRelation:
        this.registReadMutualexclusionRelation.bind(this),
    };
  }

  private registReadMutualexclusionRelation(
    callback: MutualexclusionRelationHandler,
  ) {
    this.rulesHandler[NODE_HANDLERS.READ_MUTUALEXCLUSION_RELATION] = callback;
    this.setReady();
  }

  private setReady() {
    this.isReady = true;
  }

  private runHandler(handlerName: string, result: any): any {
    if (this.rulesHandler[handlerName]) {
      return this.rulesHandler[handlerName](result);
    }
    return result;
  }

  // 表单里的 true 和 false 字符串处理成布尔值
  filterBoolean(data: any) {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      for (const key of keys) {
        if (data[key] === 'true') {
          data[key] = true;
        }
        if (data[key] === 'false') {
          data[key] = false;
        }
      }
    }
    return data;
  }

  public getSchemaType(schema: Schema): string[] {
    if (!schema.type) {
      return [];
    }
    return schema.type;
  }

  // Get the initial default value of the field in the schema, only the field value in the UI displayed in the initialization
  public getInitValues(schema: Schema): any {
    const initValues: any = {};
    const readDefaultValue = (
      _schema: Schema,
      brothers: string[],
      isRoot: boolean,
    ): any => {
      if (_schema.type) {
        initValues[_schema.key] = this.getSchemaDefaultValue(
          _schema,
          brothers,
          isRoot,
        );
      }

      if (_schema.items) {
        const items = getItems(_schema, this.data, this.extra);
        items.forEach(each =>
          readDefaultValue(
            each,
            items.map(x => x.key),
            false,
          ),
        );
      }
    };
    readDefaultValue(schema, [], true);
    return this.filterBoolean(initValues);
  }

  // Get the default value of the current shema
  public getSchemaDefaultValue(
    schema: Schema,
    brothers: string[],
    isRoot: boolean,
  ): SchemaValueType {
    const { state } = schema;
    if (typeof state === 'object') {
      // Processing linkage
      const handleEffects = (val: SchemaValueType) => {
        if (!isEffectedValue(val)) {
          // Return without existence
          return val;
        }
        const {
          effectedByFields = [],
          action,
          ...rest
        } = val as SchemaEffectedValueType;
        if (isRoot) {
          // If there is no upper level, there is no linkage, return value options other than linkage
          throw Error(`[${schema.key}] top level should not have effects`);
          // return rest;
        }

        // There is an upper level, it is judged whether the key of the current linkage is at the same level, and the keys that are not at the same level are not linked.
        // not including myself
        const curNodeEffectedByFields = effectedByFields.filter(
          x => x !== schema.key,
        );
        if (curNodeEffectedByFields.length === 0) {
          // There is no linkage, no linkage related content is returned
          return rest as any;
        }
        // Return the related linkage of the key at the same level
        return {
          effectedByFields: curNodeEffectedByFields,
          action,
          ...rest,
        };
      };
      return handleEffects(state.value);
    }
    return state;
  }

  public read(): any {
    if (!this.schema) {
      return null;
    }
    if (!this.isReady) {
      throw Error('you should finished setting rules');
    }
    checkSchema(this.schema, this.extra);
    return this.runHandler(NODE_HANDLERS.READ_ROOT, {
      schema: this.schema,
      result: this.doRead(this.schema, true),
    });
  }

  private readObj(schema: Schema): any {
    const children: any[] = [];
    for (const item of getItems(schema, this.data, this.extra)) {
      if (item.items) {
        children.push(this.doRead(item));
      } else if (this.isNoneItem(item)) {
        children.push(this.runHandler(NODE_HANDLERS.READ_NONE_ITEM, item));
      } else {
        children.push(this.runHandler(NODE_HANDLERS.READ_AS_VALUE, item));
      }
    }
    return children;
  }

  private readRelation(schema: Schema): any {
    if (schema.coexit) {
      return this.runHandler(NODE_HANDLERS.READ_COEXIT_RELATION, {
        parent: schema,
        doRead: this.doRead.bind(this),
      });
    }
    if (schema.mutualExclusion) {
      return this.runHandler(NODE_HANDLERS.READ_MUTUALEXCLUSION_RELATION, {
        parent: schema,
        doRead: this.doRead.bind(this),
      });
    }
    throw new Error(MESSAGE.SHOULD_HAS_RELATION(''));
  }

  private isNoneItem(schema: Schema): boolean {
    if (!schema.type) {
      return false;
    }
    return schema.type.length > 0 && schema.type[0] === 'none';
  }

  private doRead(schema: Schema, root?: boolean): any {
    let result: any = null;
    if (!schema.items) {
      if (this.isNoneItem(schema)) {
        result = this.runHandler(NODE_HANDLERS.READ_NONE_ITEM, schema);
      } else {
        result = this.runHandler(NODE_HANDLERS.READ_AS_VALUE, schema);
      }
    } else if (schema.isObject) {
      result = this.readObj(schema);

      if (root) {
        return this.runHandler(NODE_HANDLERS.READ_FORM, {
          schema,
          result,
        });
      } else {
        return this.runHandler(NODE_HANDLERS.READ_CHILD, {
          schema,
          result,
        });
      }
    } else if (schema.coexit || schema.mutualExclusion) {
      result = this.readRelation(schema);
    }
    return result;
  }
}
