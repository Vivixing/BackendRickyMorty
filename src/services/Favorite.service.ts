
import { ObjectId } from "mongodb";
import { User } from "../entities/User.entity";
import { FavoriteRepository } from "../repositories/Favorite.repository";
import { UserRepository } from "../repositories/User.repository";
import { Favorite } from "../entities/Favorite.entity";

export class FavoriteService {
    private favoriteRepository: FavoriteRepository = new FavoriteRepository();
    private userRepository: UserRepository = new UserRepository();

    async findAll() {
        return this.favoriteRepository.getAll();
    }

    async findByUser(user: User) {
        return this.favoriteRepository.findByUser(user);
    }

    async findById(idFavorite: ObjectId) {
        return this.favoriteRepository.findById(idFavorite);
    }

    async saveFavorite(favorite: Favorite) {
        try {
            const user = await this.userRepository.findByIdUser(favorite.user._id);
            if (!user) {
                throw new Error("El usuario no existe");
            }
            favorite.user = user;
            await this.validations(favorite.characterId, favorite.user);
            return this.favoriteRepository.save(favorite);
        } catch (error) {
            throw error;
        }
    }

    async deleteFavorite(idFavorite: ObjectId) {
        return this.favoriteRepository.delete(idFavorite);
    }

    async validations(characterId: number, user: User) {
        const favoriteExistente = await this.favoriteRepository.findByCharacterIdAndUser(characterId, user);
        if (favoriteExistente) {
            throw new Error("El usuario ya tiene ese personaje");
        }
    }

    async updateFavorite(favorite: Favorite) {
        try {
            const user = await this.userRepository.findByIdUser(favorite.user._id);
            if (!user) {
                throw new Error("El usuario no existe");
            }
            const favoriteExistente = await this.favoriteRepository.findByCharacterIdAndUser(favorite.characterId, favorite.user);
            await this.validations(favorite.characterId, favorite.user);
            favoriteExistente.characterId = favorite.characterId;
            return this.favoriteRepository.save(favoriteExistente);
        } catch (error) {
            throw error;
        }
    }


}