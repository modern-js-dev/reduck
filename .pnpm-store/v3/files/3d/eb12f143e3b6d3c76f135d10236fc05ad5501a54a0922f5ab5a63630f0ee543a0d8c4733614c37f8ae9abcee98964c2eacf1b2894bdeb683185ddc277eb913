declare class TemplateAPI {
  private content;
  constructor(content: string);
  get(): string;
  set(content: string): void;
  prependHead(fragment: string): this;
  appendHead(fragment: string): this;
  prependBody(fragment: string): this;
  appendBody(fragment: string): this;
  replace(reg: RegExp | string, text: string): this;
}

export declare const createTemplateAPI: (content: string) => TemplateAPI;
export {};