import { useStore } from "effector-react";
import { constVoid, flow, pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/Option";
import * as RA from "fp-ts/ReadonlyArray";
import React, { useState } from "react";
import { addTodoEvent, todoStore, toggleTodoEvent } from "../Effector";
import * as Todo from "../model/Todo";

let globalId = 0;
const renderItems = flow(
  RA.sortBy([Todo.orgByDone, Todo.orgById]),
  RA.map((it) => <TodoItemC key={it.id} item={it} />)
);

export const TodoList: React.FC<{}> = (props) => {
  const state = useStore(todoStore);
  const [nameInput, setName] = useState("");

  const handleAdd = () => {
    pipe(
      Todo.makeName(nameInput),
      O.map((name) => Todo.makeTodoItem({ name, id: globalId++ })),
      O.match(constVoid, addTodoEvent)
    );
    setName("");
  };

  return (
    <>
      <div style={{ width: 300 }}>
        <input
          placeholder="New todo"
          value={nameInput}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button onClick={handleAdd}>Add</button>
        {renderItems(state.items)}
      </div>
    </>
  );
};

const TodoItemC: React.FC<{ item: Todo.TodoItem }> = ({ item }) => {
  return (
    <div>
      <input
        type="checkbox"
        onChange={(e) => toggleTodoEvent(item)}
        checked={item.done}
      ></input>
      {item.name}
    </div>
  );
};
