import { ObjectId } from "mongodb";
import { ObtainedRepository } from "../repositories/Obtained.repository";
import { UserRepository } from "../repositories/User.repository";
import { Obtained } from "../entities/Obtained.entity";
import { User } from "../entities/User.entity";

export class ObtainedService {
    private obtainedRepository: ObtainedRepository = new ObtainedRepository();
    private userRepository: UserRepository = new UserRepository();
    
    async findAll() {
        return this.obtainedRepository.getAll();
    }

    async findByUser(user: User) {
        return this.obtainedRepository.findByUser(user);
    }
    
    async findById(obtainedId: ObjectId) {
        return this.obtainedRepository.findById(obtainedId);
    }

    async findByCharacterIdAndUser(characterId: number, user: User) {
        return this.obtainedRepository.findByCharacterIdAndUser(characterId, user);
    }

    async saveObtained(obtained: Obtained) {
        try {
            const user = await this.userRepository.findByIdUser(obtained.user._id);
            if (!user) {
                throw new Error("El usuario no existe");
            }
            obtained.user = user;
            await this.validations(obtained.characterId, obtained.user);
            return this.obtainedRepository.save(obtained);
        } catch (error) {
            throw error;
        }
    }

    async deleteObtained(obtainedId: ObjectId) {
        return this.obtainedRepository.delete(obtainedId);
    }

    async validations(characterId:number, user: User) {
        const obtainedExistente = await this.obtainedRepository.findByCharacterIdAndUser(characterId, user);
        if (obtainedExistente) {
            throw new Error("El usuario ya tiene ese personaje");
        }
    }

    async updateObtained(obtained: Obtained) {
        try {
            const user = await this.userRepository.findByIdUser(obtained.user._id);
            if (!user) {
                throw new Error("El usuario no existe");
            }
            const obtainedExistente = await this.obtainedRepository.findByCharacterIdAndUser(obtained.characterId, obtained.user);
            await this.validations(obtained.characterId, obtained.user);
            obtainedExistente.characterId = obtained.characterId;
            obtainedExistente.date = obtained.date;
            obtainedExistente.location = obtained.location;
            obtainedExistente.method = obtained.method;
            return this.obtainedRepository.save(obtained);
        } catch (error) {
            throw error;
        }
    }


}