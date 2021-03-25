import { useState } from "react";

interface Todo {
  id: number;
  content: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  function handleCreateNewTodo() {}

  return (
    <section>
      <header>
        <h2>Your Todo List</h2>

        <div>
          <input
            type="text"
            placeholder="Add new todo"
            onChange={(e) => setNewTodo(e.target.value)}
            value={newTodo}
          />
          <button type="submit" onClick={handleCreateNewTodo}>
            Add
          </button>
        </div>
      </header>

      <main>todos everywhereeeeee</main>
    </section>
  );
}
