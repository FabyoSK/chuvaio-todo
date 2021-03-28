const request = require("supertest");

import { app } from "../server";

describe("Todos", () => {
  it("should be able to create new todos", async () => {
    const response = await request(app).post("/todos").send({ content: "fsk" });

    expect(response.statusCode).toEqual(201);

    expect(response.body).tsoMatchObject({
      content: "fsk",
    });
  });
});
