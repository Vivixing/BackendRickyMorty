import { ObjectId } from "mongodb";
import { AuctionRepository } from "../repositories/Auction.repository";
import { Auction } from "../entities/Auction.entity";
import { User } from "../entities/User.entity";
import { UserRepository } from "../repositories/User.repository";

export class AuctionService {
    private AuctionRepository: AuctionRepository = new AuctionRepository();
    private UserRepository: UserRepository = new UserRepository();

    findAll() {
        return this.AuctionRepository.getAll()
    }

    async findByIdAuction(idAuction: ObjectId) {
        const auctionExistente = await this.AuctionRepository.findById(idAuction)
        console.log(auctionExistente);
        if (!auctionExistente) {
            throw new Error("Ninguna subasta corresponde a ese ID")
        }
        return auctionExistente;
    }

    async findByCreator(user: User) {
        return this.AuctionRepository.findByCreator(user)
    }

    async findByAcquirer(user: User) {
        return this.AuctionRepository.findByAcquirer(user)
    }

    async findByCompleted(completed: boolean) {
        return this.AuctionRepository.findByCompleted(completed)
    }

    async saveAuction(auction: Auction) {
        try {
            console.log(auction);
            const user = await this.UserRepository.findByIdUser(auction.auctionCreator._id);
            if (!user) {
                throw new Error("El usuario creador no existe")
            }
            console.log(user);
            auction.auctionCreator = user;
            auction.completed = false;
            await this.validations(auction);
            return this.AuctionRepository.save(auction);
        } catch (error) {
            throw error;
        }
    }

    async validations(auction: Auction) {
        if (auction.character1Id === auction.character2Id) {
            throw new Error("Los personajes no pueden ser iguales")
        }

        const auctionProgress = await this.AuctionRepository.findByCreator(auction.auctionCreator);
        if (auctionProgress) {
            throw new Error("El usuario ya tiene una subasta en progreso")
        }
        return true;
    }

    async updateAuction(auction: Auction) {
        try {
            const auctionExistente = await this.AuctionRepository.findById(auction._id);
            if (!auctionExistente) {
                throw new Error("Ninguna subasta corresponde a ese ID");
            }
            await this.validations(auction);
            auctionExistente.character1Id = auction.character1Id;
            auctionExistente.character2Id = auction.character2Id;
            auctionExistente.completed = auction.completed;
            auctionExistente.startDate = auction.startDate;
            auctionExistente.endDate = auction.endDate;
            return this.AuctionRepository.save(auctionExistente);
        } catch (error) {
            throw error;
        }
    }

    async deleteAuction(idAuction: ObjectId) {
        const auctionExistente = await this.AuctionRepository.findById(idAuction)
        console.log(auctionExistente);
        if (!auctionExistente) {
            throw new Error("Ninguna subasta corresponde a ese ID")
        }
        return this.AuctionRepository.delete(idAuction);
    }

}