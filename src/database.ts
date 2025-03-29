import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";

export default new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  database: "nodecrud",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
