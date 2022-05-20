import { EventObject, ActionObject, AssignAction, AssignMeta } from 'xstate';
import { Draft } from 'immer';
export declare type ImmerAssigner<TContext, TEvent extends EventObject> = (context: Draft<TContext>, event: TEvent, meta: AssignMeta<TContext, TEvent>) => void;
export interface ImmerAssignAction<TContext, TEvent extends EventObject> extends ActionObject<TContext, TEvent> {
    assignment: ImmerAssigner<TContext, TEvent>;
}
declare function immerAssign<TContext, TEvent extends EventObject = EventObject>(recipe: ImmerAssigner<TContext, TEvent>): AssignAction<TContext, TEvent>;
export { immerAssign as assign };
export interface ImmerUpdateEvent<TType extends string = string, TInput = unknown> {
    type: TType;
    input: TInput;
}
export interface ImmerUpdater<TContext, TEvent extends ImmerUpdateEvent> {
    update: (input: TEvent['input']) => TEvent;
    action: AssignAction<TContext, TEvent>;
    type: TEvent['type'];
}
export declare function createUpdater<TContext, TEvent extends ImmerUpdateEvent>(type: TEvent['type'], recipe: ImmerAssigner<TContext, TEvent>): ImmerUpdater<TContext, TEvent>;
//# sourceMappingURL=index.d.ts.map