import Express from "express";
import type { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import createDatabase from "./database";
import { User } from "./models/User";
import error, { NotFoundError } from "./middleware/error";
require("dotenv").config();

const database = createDatabase(
  process.env.DB_HOST || "localhost",
  process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
  process.env.DB_USERNAME || "root",
  "",
  process.env.DB_NAME || "intprog"
);

const app = Express();
const userRepository = database.getRepository(User);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
/**
 * [GET] /users/
 * @author Ian John Dal
 */
app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  const users = await userRepository.find();
  res.status(200).json(users);
});

/**
 * [POST] /users/
 * @author Princess Villanueva
 */
app.post("/users", (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);
});

/**
 * [DELETE] /users/:id
 * @author Christian Yancha
 */
app.delete(
  "/users/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = database.getRepository(User);
    const userId = Number.parseInt(req.params.id);

    // Check if the user exists
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      next(new NotFoundError("User not found!"));
      return;
    }

    // Delete the user
    await userRepository.remove(user);

    res.status(200).json({ message: "User deleted successfully" });
  }
);

/**
 * NOT FOUND
 */
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError("Route not found!");
});

/**
 * ERROR MIDDLEWARE
 */
app.use(error);

database
  .initialize()
  .then(() => {
    console.log("Database connected...");

    app.listen(3000, (err) => {
      console.log("Server running...");
    });
  })
  .catch((err) => {
    console.log("Error connecting to database...");
  });
