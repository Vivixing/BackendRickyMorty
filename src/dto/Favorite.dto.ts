import { ObjectId } from "mongodb";
import { User } from "../entities/User.entity";

export class FavoriteResponse{
    _id: ObjectId;
    characterId: number;
    user: User;
}