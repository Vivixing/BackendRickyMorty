import { User } from "../entities/User.entity";
import { Auction } from "../entities/Auction.entity";
import { AppDataSource } from "../data-source";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class AuctionRepository {
    private repository: MongoRepository<Auction>;

    constructor() {
        this.repository = AppDataSource.getMongoRepository(Auction);
    }

    async findByCreator(user: User) {
        return this.repository.findOne({
            where: {
                auctionCreator: user,
            },
        });
    }

    async findByAcquirer(user: User) {
        return this.repository.findOne({
            where: {
                acquirer: user,
            },
        });
    }

    async findByCompleted(completed: boolean) {
        return this.repository.find({
            where: {
                completed,
            },
        });
    }

    async findById(idAuction: string | ObjectId) {
        const objectId = idAuction instanceof ObjectId ? idAuction : new ObjectId(idAuction);
        return this.repository.findOne({ where: { _id: objectId } });
    }

    async getAll() {
        return this.repository.find();
    }

    async save(Auction: Auction) {
        return this.repository.save(Auction);
    }

    async delete(idAuction: ObjectId) {
        return this.repository.delete(idAuction);
    }
}
