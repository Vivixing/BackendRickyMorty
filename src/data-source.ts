import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User.entity";


dotenv.config();

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error("La variable de entorno MONGO_URI no está definida.");
}

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URI,
  entities: [User],
  useUnifiedTopology: true,
  synchronize: true,
});
