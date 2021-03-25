import { useEffect, useState } from "react";
import api from "../services/api";

interface Todo {
  id: number;
  content: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    api.get("todos").then((reponse) => setTodos(reponse.data));
  }, []);

  async function handleCreateNewTodo() {
    const response = await api.post("todos", { content: newTodo });

    const todo: Todo = {
      id: response.data.id,
      content: response.data.content,
    };

    setTodos([...todos, todo]);
  }

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

      <main>
        {todos.map((todo) => {
          return <h1>{todo.content}</h1>;
        })}
      </main>
    </section>
  );
}
