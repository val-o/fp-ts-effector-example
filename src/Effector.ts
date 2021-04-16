import { createEvent, createStore } from "effector";
import * as Todo from "./model/Todo";
import { flow, pipe } from "fp-ts/lib/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import * as E from "fp-ts/Either";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as Eq from "fp-ts/Eq";
import * as Prism from "monocle-ts/Prism";
import * as Lens from "monocle-ts/Lens";
import * as TodoReducer from "./service/TodoReducer";
import * as TodoState from "./model/TodoState";

const addTodoEvent = createEvent<Todo.TodoItem>();
const toggleTodoEvent = createEvent<Todo.TodoItem>();

const todoStore = createStore<TodoState.State>({ items: [] });

todoStore.on(addTodoEvent, TodoReducer.addTodo);
todoStore.on(toggleTodoEvent, TodoReducer.toggleTodo);

export { todoStore, addTodoEvent, toggleTodoEvent };
