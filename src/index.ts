import Express from "express";
import type { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import bcrypt from "bcrypt";
import createDatabase from "./database";
import { User } from "./models/User";
import error, { BadRequestError, NotFoundError } from "./middleware/error";
import { z, ZodError } from "zod";
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
const postSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(), 
  password: z.string().min(5)
});

app.post("/users", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Validate request body using Zod
    const body = postSchema.parse(req.body);

    // Check if email already exists
    const existingUser = await userRepository.findOneBy({ email: body.email });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use." });
      return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    //Create new user
    const newUser = userRepository.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashedPassword,
    });

    //Save user in database
    await userRepository.save(newUser);

    // Respond with the created user (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser.id, firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email,  password: newUser.password}
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ name: "Bad Request", message: "Invalid request body!" });
      return;
    }
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
