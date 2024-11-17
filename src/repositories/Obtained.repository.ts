import { MongoRepository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Obtained } from "../entities/Obtained.entity";
import { ObjectId } from "mongodb";
import { User } from "../entities/User.entity";

export class ObtainedRepository {
    private repository: MongoRepository<Obtained>;

    constructor() {
        this.repository = AppDataSource.getMongoRepository(Obtained);
    }

    async findByUser(user: User) {
        return this.repository.find({
            where: {
                user,
            },
        });
    }

    async findById(obtainedId: ObjectId) {
        return this.repository.findOne({ where: { _id: obtainedId } });
    }

    async findByCharacterIdAndUser(characterId:number, user: User) {
        return this.repository.findOne({
            where: {
                characterId : characterId,
                user: user
            },
        });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(obtained: Obtained) {
        return this.repository.save(obtained);
    }

    async delete(obtainedId: ObjectId) {
        return this.repository.delete(obtainedId);
    }
}