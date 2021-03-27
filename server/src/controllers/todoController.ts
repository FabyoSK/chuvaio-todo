import { Request, Response } from "express";
import { uuid } from "uuidv4";

interface Todo {
  id: string;
  content: string;
}

const todos = <Todo[]>[];

export default class TodoController {
  async list(request: Request, response: Response) {
    return response.json(todos);
  }

  async create(request: Request, response: Response) {
    const { content } = request.body;

    const todo: Todo = { id: uuid(), content: content };

    todos.push(todo);

    return response.json(todo);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex < 0) {
      return response.status(400).json({ ERROR: "Todo not found." });
    }

    todos.splice(todoIndex, 1);

    return response.status(204).send();
  }
}
