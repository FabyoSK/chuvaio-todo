import { useEffect, useState } from "react";
import api from "../services/api";

import "../styles/todoList.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";
interface Todo {
  id: number;
  content: string;
}

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    api.get("todos").then((reponse) => setTodos(reponse.data));
  }, []);

  async function handleCreateNewTodo() {
    try {
      const response = await api.post("todos", { content: newTodo });

      const todo: Todo = {
        id: response.data.id,
        content: response.data.content,
      };

      setTodos([...todos, todo]);
      setNewTodo("");
    } catch (error) {
      setHasError(true);
      console.log(error);

      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }

  async function handleDeleteTodo(id: number) {
    try {
      await api.delete(`todos/${id}`);

      const filtredTodo = todos.filter((todo) => todo.id !== id);

      setTodos(filtredTodo);
    } catch (error) {
      setHasError(true);
      console.log(error);

      setTimeout(() => {
        setHasError(false);
      }, 5000);
    }
  }

  function errorHandling(erroMessage: string) {
    return (
      <div className="error">
        <h1>{erroMessage}</h1>
      </div>
    );
  }
  return (
    <section className="todo-list container">
      {hasError &&
        errorHandling("Error while connecting to the server, Please try again")}
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
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.content}</p>
              <button onClick={() => handleDeleteTodo(todo.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
