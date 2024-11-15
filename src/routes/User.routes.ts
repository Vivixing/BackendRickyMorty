import * as express from "express";
import { UserController } from "../controllers/User.controller";

const Router = express.Router();
const userController = new UserController();

Router.get(
    "/User/:username",
    userController.getByUsername
);

Router.get(
    "/User/find/:id",
    userController.getByIdUser
);

Router.get(
    "/User",
    userController.getAllUsers
);

Router.post(
    "/User",
    userController.saveUser
);

Router.put(
    "/User",
    userController.updateuser
)

Router.delete(
    "/User/:id",
    userController.deleteUser
)

export { Router as userRouter };