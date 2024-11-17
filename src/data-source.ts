import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./entities/User.entity";
import { Auction } from "./entities/Auction.entity";
import { Favorite } from "./entities/Favorite.entity";
import { Obtained } from "./entities/Obtained.entity";


dotenv.config();

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
  throw new Error("La variable de entorno MONGO_URI no está definida.");
}

export const AppDataSource = new DataSource({
  type: "mongodb",
  url: MONGO_URI,
  entities: [User, Auction, Favorite, Obtained],
  useUnifiedTopology: true,
  synchronize: true,
  migrations: ["src/migrations/*.ts"],
  migrationsRun: true,
  logging: true,
});
