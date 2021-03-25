import express from "express";
import { uuid } from "uuidv4";
const routes = express.Router();

interface Todo {
  id: number;
  content: string;
}
const todos = [];

routes.get("/todos", (req, res) => {
  return res.json(todos);
});

routes.post("/todos", (req, res) => {
  const { content } = req.body;

  const todo = { id: uuid(), content: content };

  todos.push(todo);

  return res.json(todo);
});

// app.put("/todos/:id", (req, res) => {
//   const { id } = req.params;
//   const { content } = req.body;

//   const todo = { id, content };

//   const todoIndex = todos.findIndex((todo) => todo.id === id);
//   if (todoIndex < 0) {
//     return res.status(400).json({ ERROR: "Todo not found." });
//   }
//   todos[todoIndex] = todo;

//   return res.json(todo);
// });

routes.delete("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);
  if (todoIndex < 0) {
    return res.status(400).json({ ERROR: "Todo not found." });
  }
  todos.splice(todoIndex, 1);

  return res.status(204).send();
});

export default routes;
