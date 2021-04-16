import { flow, pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as RA from "fp-ts/ReadonlyArray";
import * as Eq from "fp-ts/Eq";
import * as Prism from "monocle-ts/Prism";
import * as TodoState from "../model/TodoState";
import * as Todo from "../model/Todo";

type Reducer<TPayload> = {
  (state: TodoState.State, todoItem: TPayload): TodoState.State;
};

export const addTodo: Reducer<Todo.TodoItem> = (state, todoItem) => {
  return {
    ...state,
    items: pipe(state.items, RA.append(todoItem)),
  };
};

export const editTodoName: Reducer<{ id: number; newName: Todo.Name }> = (
  state,
  { id, newName }
) => {
  const items = pipe(
    state.items,
    RA.findIndex((t) => t.id === id),
    O.chain((idx) =>
      pipe(state.items, RA.modifyAt(idx, Todo.setName(newName)))
    ),
    O.getOrElse(() => state.items)
  );

  return pipe(state, TodoState.setItmes(items));
};

export const toggleTodo: Reducer<Todo.TodoItem> = (state, todoItem) => {
  const items = pipe(
    state.items,
    RA.findIndex((t) => Todo.eq.equals(t, todoItem)),
    O.chain((idx) => pipe(state.items, RA.modifyAt(idx, Todo.toggle))),
    O.getOrElse(() => state.items)
  );

  return pipe(state, TodoState.setItmes(items));
};

export const deleteTodo: Reducer<number> = (state, todoId) => {
  const items = pipe(
    state.items,
    RA.findIndex((t) => t.id === todoId),
    O.chain((idx) => RA.deleteAt(idx)(state.items)),
    O.getOrElse(() => state.items)
  );

  return pipe(state, TodoState.setItmes(items));
};
