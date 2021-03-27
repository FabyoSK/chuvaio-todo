import express from "express";
import TodoController from "./controllers/TodoController";

const routes = express.Router();
const todoController = new TodoController();

// GET resquests on /todos
routes.get("/todos", todoController.list);

// POST resquests on /todos
routes.post("/todos", todoController.create);

// DELETE resquests on /todos/:id
routes.delete("/todos/:id", todoController.delete);

export default routes;
