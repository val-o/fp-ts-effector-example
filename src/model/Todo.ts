import * as Eq from "fp-ts/Eq";
import { Endomorphism } from "fp-ts/lib/function";
import * as Ord from "fp-ts/Ord";
import * as O from "fp-ts/Option";
import * as Number from "fp-ts/number";
import * as Bool from "fp-ts/boolean";

//#region definitions
export type Name = string & { brand: "Name" };
export interface TodoItem {
  readonly id: number;
  readonly name: Name;
  readonly done: boolean;
}
//#endregion

//#region constructors
export const makeName = (input: string): O.Option<Name> =>
  input.length > 3 ? O.some(input as Name) : O.none;

export const makeTodoItem = (args: Omit<TodoItem, "done">): TodoItem => ({
  ...args,
  done: false,
});
//#endregion

//#region instances
export const eq: Eq.Eq<TodoItem> = Eq.contramap((t: TodoItem) => t.id)(
  Number.Eq
);

export const ordByDone: Ord.Ord<TodoItem> = Ord.contramap(
  (a: TodoItem) => a.done
)(Bool.Ord);

export const ordById: Ord.Ord<TodoItem> = Ord.contramap((a: TodoItem) => a.id)(
  Number.Ord
);

//#endregion

//#region utils

export const toggle: Endomorphism<TodoItem> = (todo) => ({
  ...todo,
  done: !todo.done,
});

export const setName = (name: Name): Endomorphism<TodoItem> => (todo) => ({
  ...todo,
  name: name,
});

//#endregion
