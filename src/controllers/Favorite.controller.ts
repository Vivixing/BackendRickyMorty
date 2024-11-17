import { Request, Response } from "express";
import { FavoriteResponse } from "../dto/Favorite.dto";
import { User } from "../entities/User.entity";
import { FavoriteService } from "../services/Favorite.service";
import { UserService } from "../services/User.service";
import { ObjectId } from "mongodb";
import { Favorite } from "../entities/Favorite.entity";
import { FavoriteCreationSchema, FavoriteUpdateSchema } from "../schemas/Favorite.schema";

export class FavoriteController{
    private favoriteService: FavoriteService = new FavoriteService();
    private userService: UserService = new UserService();

    public getByUser = async (req: Request, res: Response) => {
        const { user } = req.params;
        const objectId = new ObjectId(user);

        try {
            const user: User = await this.userService.findByIdUser(objectId);
            const favorite: Favorite[] = await this.favoriteService.findByUser(user);
            return res.status(200).json({
                favorite,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdFavorite = async (req: Request, res: Response) => {
        const { idFavorite } = req.params;
        const objectId = new ObjectId(idFavorite);
        try {
            const favorite: FavoriteResponse = await this.favoriteService.findById(objectId);
            return res.status(200).json({
                favorite,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getAll = async (req: Request, res: Response) => {
        try {
            const favorite: Favorite[] = await this.favoriteService.findAll();
            return res.status(200).json({
                favorite,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public saveFavorite = async (req: Request, res: Response) => {
        const body = req.body;
        const data = FavoriteCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Favorite = await this.favoriteService.saveFavorite(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteFavorite = async (req: Request, res: Response) => {
        const { idFavorite } = req.params;
        const objectId = new ObjectId(idFavorite);
        try {
            await this.favoriteService.deleteFavorite(objectId);
            return res.status(200).json({
                message: "Favorite deleted successfully",
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public updateFavorite = async (req: Request, res: Response) => {
        const { favorite } = req.body;
        const data = FavoriteUpdateSchema.validate(favorite);

        if (data.error) {
            return res.status(400).json({ error: data.error.details[0].message });
        }
        try {
            const result: Favorite = await this.favoriteService.updateFavorite(favorite);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    
}