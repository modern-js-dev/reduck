import { Answers } from 'inquirer';
import OriginChoices from 'inquirer/lib/objects/choices';
export declare type ChoiceItem = Answers & {
  disabled: boolean | ((answers: Answers) => boolean);
};
export declare type Choices<T> = OriginChoices<T> & {
  type?: 'separator' | 'choices';
};
/**
 * Function for rendering list choices
 * @param  {Number} pointer Position of the pointer
 * @return {String}         Rendered content
 */

export declare function listRender(choices: Choices<ChoiceItem>, pointer: number, answers: Answers): string;