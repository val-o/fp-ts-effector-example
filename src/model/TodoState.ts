import * as Todo from "./Todo";
import * as Prism from "monocle-ts/Prism";
import * as Lens from "monocle-ts/Lens";
import { pipe } from "fp-ts/lib/function";
import { Optional } from "monocle-ts";

export interface State {
  readonly items: readonly Todo.TodoItem[];
}

const itemsLens = pipe(Lens.id<State>(), Lens.prop("items"));
export const setItmes = itemsLens.set;

export const findById = (id: number) => pipe(itemsLens, Lens.findFirst(t => t.id === id)).getOption

// const itemByIdLens = (id: number) =>
//   pipe(
//     itemsLens,
//     Lens.findFirst((todo) => todo.id === id),
//   );

// const updateItemName = (name: string, id: number) => {
//   const item = itemByIdLens(id).getOption;
//   itemByIdLens(id).set(Todo.setName(name))
// }
