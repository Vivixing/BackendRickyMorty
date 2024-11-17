import * as express from "express";
import { FavoriteController } from "../controllers/Favorite.controller";

const router = express.Router();

const favoriteController = new FavoriteController();

router.get(
    "/Favorite/user/:user",
    favoriteController.getByUser
);

router.get(
    "/Favorite/:idFavorite",
    favoriteController.getByIdFavorite
);

router.get(
    "/Favorite",
    favoriteController.getAll
);

router.post(
    "/Favorite",
    favoriteController.saveFavorite
);

router.delete(
    "/Favorite/:idFavorite",
    favoriteController.deleteFavorite
);

export { router as favoriteRouter };