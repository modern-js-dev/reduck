import { Interface as ReadLineInterface } from 'readline';
import { isNumber, findIndex } from 'lodash';
import { Question, Answers } from 'inquirer';
import { chalk } from '@modern-js/utils';
import cliCursor from 'cli-cursor';
import runAsync from 'run-async';
import Base from 'inquirer/lib/prompts/base';
import Paginator from 'inquirer/lib/utils/paginator';
import observe from 'inquirer/lib/utils/events';
import { mergeMap, map, take, takeUntil } from 'rxjs/operators';
import incrementListIndex from 'inquirer/lib/utils/incrementListIndex';
import Choice from 'inquirer/lib/objects/choice';
import { listRender } from './utils';

export class List extends Base<Question & { loop: boolean }> {
  private readonly paginator: Paginator;

  private firstRender: boolean;

  private selected: number;

  private done?: (callback: unknown) => void;

  constructor(
    question: Question & { loop: boolean },
    readLine: ReadLineInterface,
    answers: Answers,
  ) {
    super(question, readLine, answers);

    if (!this.opt.choices) {
      this.throwParamError('choices');
    }

    this.firstRender = true;
    this.selected = 0;

    const def = this.opt.default;
    // If def is a Number, then use as index. Otherwise, check for value.
    if (isNumber(def) && def >= 0 && def < this.opt.choices.realLength) {
      this.selected = def;
    } else if (!isNumber(def) && def != null) {
      const index = findIndex(
        this.opt.choices.realChoices,
        ({ value }) => value === def,
      );
      this.selected = Math.max(index, 0);
    }

    // Make sure no default is set (so it won't be printed)
    this.opt.default = null;

    const shouldLoop = this.opt.loop === undefined ? true : this.opt.loop;
    // TODO @types/inquirer Paginator's constructor type is incorrect
    // https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/inquirer/lib/utils/paginator.d.ts
    this.paginator = new (Paginator as any)(this.screen, {
      isInfinite: shouldLoop,
    });
  }

  onUpKey() {
    this.selected = incrementListIndex(this.selected, 'up', this.opt);
    this.render();
  }

  onDownKey() {
    this.selected = incrementListIndex(this.selected, 'down', this.opt);
    this.render();
  }

  onNumberKey(input: unknown) {
    if (isNumber(input) && input <= this.opt.choices.realLength) {
      this.selected = input - 1;
    }

    this.render();
  }

  getCurrentValue() {
    return this.opt.choices.getChoice(this.selected).value;
  }

  onSubmit(value: unknown) {
    this.status = 'answered';

    // Rerender prompt
    this.render();

    this.screen.done();
    cliCursor.show();
    if (this.done) {
      this.done(value);
    }
  }

  _run(cb: (callback: unknown) => void) {
    this.done = cb;

    const events = observe(this.rl);
    // rxjs type is not match inquirer type, so use as any
    events.normalizedUpKey
      .pipe(takeUntil(events.line as any) as any)
      .forEach(this.onUpKey.bind(this));
    events.normalizedDownKey
      .pipe(takeUntil(events.line as any) as any)
      .forEach(this.onDownKey.bind(this));
    events.numberKey
      .pipe(takeUntil(events.line as any) as any)
      .forEach(this.onNumberKey.bind(this));
    events.line
      .pipe(
        take(1) as any,
        map(this.getCurrentValue.bind(this)) as any,
        mergeMap(value => runAsync(this.opt.filter)(value)) as any,
      )
      .forEach(this.onSubmit.bind(this));

    // Init the prompt
    cliCursor.hide();
    this.render();

    return this;
  }

  render() {
    // Render question
    let message = this.getQuestion();

    if (this.firstRender) {
      message += chalk.dim('(Use arrow keys)');
    }

    // Render choices or answer depending on the state
    if (this.status === 'answered') {
      message += chalk.cyan(this.opt.choices.getChoice(this.selected).short);
    } else {
      const choicesStr = listRender(
        this.opt.choices,
        this.selected,
        this.answers,
      );
      const indexPosition = this.opt.choices.indexOf(
        this.opt.choices.getChoice(this.selected) as Choice,
      );
      const realIndexPosition =
        this.opt.choices.choices.reduce((acc, value, i) => {
          // Dont count lines past the choice we are looking at
          if (i > indexPosition) {
            return acc;
          }
          // Add line if it's a separator
          if (value.type === 'separator') {
            return acc + 1;
          }

          let l: string | string[] | undefined = value.name;
          // Non-strings take up one line
          if (typeof l !== 'string') {
            return acc + 1;
          }

          // Calculate lines taken up by string
          l = l.split('\n');
          return acc + l.length;
        }, 0) - 1;
      message += `\n${this.paginator.paginate(choicesStr, realIndexPosition)}`;
    }

    this.firstRender = false;

    this.screen.render(message, '');
  }
}
