import Express from "express";
import type { Request, Response } from "express";
import "reflect-metadata";
import database from "./database";
import { User } from "./models/User";

const app = Express();
const userRepository = database.getRepository(User);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

database
  .initialize()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });

/**
 * [GET] /users/
 * @author INSERT NAME HERE
 */
app.get("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [POST] /users/
 * @author INSERT NAME HERE
 */
app.post("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [DELETE] /users/:id
 * @author INSERT NAME HERE
 */
app.delete("/users/:id", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

app.listen(3000, (err) => {
  console.log("Server running...");
});
