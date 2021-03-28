import { Request, Response } from "express";
import { uuid } from "uuidv4";
import db from "../database/connection";

// the interface Todo
// All todo should hava an id, and a content
interface Todo {
  id: string;
  content: string;
}

export default class TodoController {
  async list(request: Request, response: Response) {
    try {
      // Get all todos from de database
      const todos = await db.select().from<Todo>("todos");

      // Return all the todos in a JSON format
      return response.json(todos);
    } catch (error) {
      return response.status(500).send("Error while fetching todos");
    }
  }

  async create(request: Request, response: Response) {
    // Get the content from the request body
    const { content } = request.body;

    // Create a todo with the given content
    // With a random id
    const todo: Todo = { id: uuid(), content: content };
    // Init a data base transation
    const trx = await db.transaction();

    try {
      // Insert the todo on the table toedos
      await trx("todos").insert(todo);

      // Commit to finish the trasaction
      await trx.commit();
    } catch (error) {
      // Rollback if something when wrong
      await trx.rollback();
      return response.status(401).send("Error while creating a new todo");
    }
    return response.status(201).json(todo);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    try {
      await db("todos").where("id", id).del();
    } catch (error) {
      return response.status(401).send("Error while deleting a new todo");
    }
    return response.status(204).send();
  }
}
