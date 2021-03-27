import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/todoList.scss";

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

  async function handleDeleteTodo(id: number) {
    await api.delete(`todos/${id}`);

    const filtredTodo = todos.filter((todo) => todo.id !== id);

    setTodos(filtredTodo);
  }
  return (
    <section className="todo-list container">
      <header>
        <h2>Your Todo List</h2>
        <div className="input-group">
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
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.content}</p>
              <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
