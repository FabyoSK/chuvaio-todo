import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("todos", (table) => {
    table.increments("id").primary();
    table.string("content").notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("todos");
}
