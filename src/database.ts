import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";

require("dotenv").config();

export default new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || "root",
  password: "",
  database: process.env.DB_NAME || "intprog",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
