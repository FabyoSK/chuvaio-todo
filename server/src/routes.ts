import express from "express";
import TodoController from "./controllers/TodoController";

const routes = express.Router();
const todoController = new TodoController();

routes.get("/todos", todoController.list);

routes.post("/todos", todoController.create);

routes.delete("/todos/:id", todoController.delete);

export default routes;
