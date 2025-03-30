import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import app from "..";
import request from "supertest";
import database from "../database";

describe("TEST /users", () => {
  beforeAll(async () => {
    await database.initialize();
  });

  test("[GET] /users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
  });

  test("[POST] /users", async () => {
    const response = await request(app).post("/users").send({
      email: "johndoe@email.com",
      password: "johndoe",
      firstName: "John",
      lastName: "Doe",
    });

    const result = response.body as {
      id: number;
    };
    await request(app).delete(`/users/${result.id}`);

    expect(response.statusCode).toBe(201);
  });

  test("[DELETE] /users/:id", async () => {
    const tmpResponse = await request(app).post("/users").send({
      email: "johndoe@email.com",
      password: "johndoe",
      firstName: "John",
      lastName: "Doe",
    });
    const tmpResult = tmpResponse.body as {
      id: number;
      lastName: string;
      firstName: string;
      email: string;
      password: string;
    };

    const response = await request(app).delete(`/users/${tmpResult.id}`);

    expect(response.statusCode).toBe(200);
  });

  afterAll(async () => {
    await database.destroy();
  });
});
