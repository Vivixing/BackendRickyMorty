import { User } from "../entities/User.entity";
import { AppDataSource } from "../data-source";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class UserRepository {
    private repository: MongoRepository<User>;

    constructor() {
        this.repository = AppDataSource.getMongoRepository(User);
    }

    async findByUsername(username: string) {
        return this.repository.findOne({
            where: {
                username: { $regex: new RegExp(username, "i") },
            },
        });
    }

    async findByIdUser(idUser: string | ObjectId) {
        const objectId = idUser instanceof ObjectId ? idUser : new ObjectId(idUser);
        return this.repository.findOne({ where: { _id: objectId } });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(user: User) {
        return this.repository.save(user);
    }

    async delete(idUser: ObjectId) {
        return this.repository.delete(idUser);
    }
}
