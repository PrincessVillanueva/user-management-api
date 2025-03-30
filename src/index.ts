import Express from "express";
import type { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import bcrypt from "bcrypt";
import createDatabase from "./database";
import { User } from "./models/User";
import error from "./middleware/error";
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
app.post("/users", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Extract data from request body
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = userRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await userRepository.save(newUser);

    // Respond with success message excluding password
    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, firstName, lastName, email },
    });
  } catch (error) {
    next(error); 
  }
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
      next(new Error("Not found!"));
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
  throw new Error("Not found!");
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
