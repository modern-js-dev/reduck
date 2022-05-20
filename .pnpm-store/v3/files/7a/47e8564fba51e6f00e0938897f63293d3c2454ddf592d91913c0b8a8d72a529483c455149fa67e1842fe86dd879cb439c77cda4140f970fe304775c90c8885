/// <reference types="node" />
import { Interface as ReadLineInterface } from 'readline';
import { Question, Answers } from 'inquirer';
import Base from 'inquirer/lib/prompts/base';
export declare class List extends Base<Question & {
  loop: boolean;
}> {
  private readonly paginator;
  private firstRender;
  private selected;
  private done?;
  constructor(question: Question & {
    loop: boolean;
  }, readLine: ReadLineInterface, answers: Answers);
  onUpKey(): void;
  onDownKey(): void;
  onNumberKey(input: unknown): void;
  getCurrentValue(): any;
  onSubmit(value: unknown): void;
  _run(cb: (callback: unknown) => void): this;
  render(): void;
}