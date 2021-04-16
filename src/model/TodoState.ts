import * as Todo from "./Todo";
import * as Prism from "monocle-ts/Prism";
import * as Lens from "monocle-ts/Lens";
import * as O from "fp-ts/Option";
import { flow, pipe } from "fp-ts/lib/function";
import * as Optional from "monocle-ts/Optional";

export interface State {
  readonly items: readonly Todo.TodoItem[];
}

const itemsLens = pipe(Lens.id<State>(), Lens.prop("items"));
export const setItmes = itemsLens.set;

const itemByIdLens = (id: number) =>
  pipe(
    itemsLens,
    Lens.findFirst((todo) => todo.id === id)
  );

export const findById = flow(itemByIdLens, (s) => s.getOption);

export const toggleTodo = flow(itemByIdLens, Optional.modify(Todo.toggle));

export const updateItemName = (name: Todo.Name) =>
  flow(itemByIdLens, Optional.modify(Todo.setName(name)));
