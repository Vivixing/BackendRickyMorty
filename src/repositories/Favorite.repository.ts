import { MongoRepository } from "typeorm";
import { Favorite } from "../entities/Favorite.entity";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User.entity";
import { ObjectId } from "mongodb";

export class FavoriteRepository{
    private repository: MongoRepository<Favorite>;

    constructor(){
        this.repository = AppDataSource.getMongoRepository(Favorite);
    }

    async findByUser(user: User){
        return this.repository.find({
            where: {
                user
            }
        });
    }

    async findById(idFavorite: string | ObjectId) {
        const objectId = idFavorite instanceof ObjectId ? idFavorite : new ObjectId(idFavorite);
        return this.repository.findOne({ where: { _id: objectId } });
    }

    async findByCharacterIdAndUser(characterId: number, user: User) {
        return this.repository.findOne({
            where: {
                characterId,
                user
            }
        });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(favorite: Favorite) {
        return this.repository.save(favorite);
    }

    async delete(idFavorite: ObjectId) {
        return this.repository.delete(idFavorite);
    }


}