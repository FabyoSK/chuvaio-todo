import db from "../database/connection";

function get(req, res) {
  const todos = db.select().from("todos");

  return res.json(todos);
}
