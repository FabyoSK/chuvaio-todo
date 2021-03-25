const express = require("express");
const { uuid } = require("uuidv4");
const app = express();
app.use(express.json());

const todos = [];

app.get("/todos", (req, res) => {
  return res.json(todos);
});

app.post("/todos", (req, res) => {
  const { content } = req.body;

  const todo = { id: uuid(), content: content };

  todos.push(todo);

  return res.json(todo);
});

app.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  const todo = { id, content };

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  todos[todoIndex] = todo;

  return res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  todos.splice(todoIndex, 1);

  return res.status(204).send();
});

app.listen(3333, () => {
  console.log("Server is Running");
});
