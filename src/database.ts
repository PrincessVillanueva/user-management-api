import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./models/User";

export default (host: string, port: number | undefined, username: string, password: string, database: string) => {
  return new DataSource({
    type: "mysql",
    host: host,
    port: port,
    username: username,
    password: password || "",
    database: database,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
  });
};
