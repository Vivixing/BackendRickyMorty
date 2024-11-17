import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";

import "reflect-metadata";
import { errorHandler } from "./middleware/errorHandler";
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerSpec from './swagger'
import { userRouter } from "./routes/User.routes";
import { auctionRouter } from "./routes/Auction.route";
import { obtainedRouter } from "./routes/Obtained.route";
import { favoriteRouter } from "./routes/Favorite.route";

const cors = require('cors');
dotenv.config();

const { PORT = 3000 } = process.env;
var express = require('express');
var app = express();
const wsInstance = require('express-ws')(app);
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use("/api", userRouter, auctionRouter, obtainedRouter, favoriteRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
AppDataSource.initialize()
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));