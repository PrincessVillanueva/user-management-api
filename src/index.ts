import Express from "express";
import type { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import createDatabase from "./database";
import { User } from "./models/User";
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

/**
 * Middlewares
 */
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

/**
 * [GET] /users/
 * @author Ian John Dal
 */
app.get("/users", async (req: Request, res: Response) => {
  try {
    // Fetch all users from the database
    const users = await userRepository.find();

    // Return users in JSON format
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
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
app.delete("/users/:id", async (req: Request, res: Response) => {
  const userRepository = database.getRepository(User);

  try {
    const userId = Number.parseInt(req.params.id);

    // Check if the user exists
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Delete the user
    await userRepository.remove(user);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

/**
 * NOT FOUND
 */
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not found!" });
});

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
