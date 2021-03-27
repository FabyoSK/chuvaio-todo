import { Request, Response } from "express";
import { uuid } from "uuidv4";
import db from "../database/connection";

interface Todo {
  id: string;
  content: string;
}

export default class TodoController {
  async list(request: Request, response: Response) {
    console.log("here");

    const todos = await db.select().from<Todo>("todos");
    console.log(todos);

    return response.json(todos);
  }

  async create(request: Request, response: Response) {
    const { content } = request.body;

    const todo: Todo = { id: uuid(), content: content };

    const trx = await db.transaction();

    try {
      console.log("TRY");

      await trx("todos").insert(todo);
      await trx.commit();
      console.log("commit");
    } catch (error) {
      console.log("error");
      await trx.rollback();
    }
    return response.json(todo);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      console.log("TRY");
      await db("todos").where("id", id).del();
      console.log("deleted");
    } catch (error) {
      console.log("error");
    }
    return response.status(204).send();
  }
}
