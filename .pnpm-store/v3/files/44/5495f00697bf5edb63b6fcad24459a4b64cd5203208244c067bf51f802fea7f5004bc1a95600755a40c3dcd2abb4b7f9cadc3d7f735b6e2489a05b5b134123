import { Answers } from 'inquirer';
import { chalk } from '@modern-js/utils';
import OriginChoices from 'inquirer/lib/objects/choices';
import { pointer as pointerCharacter } from './pointer';

export type ChoiceItem = Answers & {
  disabled: boolean | ((answers: Answers) => boolean);
};

export type Choices<T> = OriginChoices<T> & { type?: 'separator' | 'choices' };

/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */
export function listRender(
  choices: Choices<ChoiceItem>,
  pointer: number,
  answers: Answers,
): string {
  let output = '';
  let separatorOffset = 0;

  choices.forEach((choice, i) => {
    if (choice.type === 'separator') {
      separatorOffset++;
      // separator class toString result
      output += `  ${choice as any as string}\n`;
      return;
    }

    if (choice.disabled) {
      // TODO confirm
      if (typeof choice.disabled === 'function') {
        choice.disabled = (choice.disabled as (answers: Answers) => boolean)(
          answers,
        );
      }
      separatorOffset++;
      let choiceItem = '';
      choiceItem += `  - ${choice.name}`;
      choiceItem += ` (${
        typeof choice.disabled === 'string' ? choice.disabled : 'Disabled'
      })`;
      output += chalk.dim(choiceItem);
      output += '\n';
      return;
    }

    const isSelected = i - separatorOffset === pointer;

    let line = (isSelected ? `${pointerCharacter} ` : '  ') + choice.name;

    if (isSelected) {
      line = chalk.cyan(line);
    }
    output += `${line} \n`;
  });

  return output.replace(/\n$/, '');
}
