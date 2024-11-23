import { ObjectId } from "mongodb";
import { AuctionRepository } from "../repositories/Auction.repository";
import { Auction } from "../entities/Auction.entity";
import { User } from "../entities/User.entity";
import { UserRepository } from "../repositories/User.repository";
import { Obtained } from "../entities/Obtained.entity";
import { ObtainedRepository } from "../repositories/Obtained.repository";

export class AuctionService {
    private AuctionRepository: AuctionRepository = new AuctionRepository();
    private UserRepository: UserRepository = new UserRepository();
    private ObtainedRepository: ObtainedRepository = new ObtainedRepository();

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
            const acquirer = await this.UserRepository.findByIdUser(auction.acquirer._id);
            auction.auctionCreator = user;
            auction.acquirer = acquirer;
            auction.completed = false;
            await this.validations(auction);
            return this.AuctionRepository.save(auction);
        } catch (error) {
            throw error;
        }
    }

    async validations(auction: Auction) {
        if (auction.character1Id === auction.character2Id) {
            throw new Error("Characters must be different")
        }
        const owner = await this.UserRepository.findByIdUser(auction.auctionCreator._id);
        if (!owner) {
            throw new Error("The user doesn't exist")
        }
        const isObtained1 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character1Id, owner);
        console.log(isObtained1);
        if (!isObtained1) {
            throw new Error("You don't have that character")
        }
        const isObtained2 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character2Id, owner);
        if (isObtained2) {
            throw new Error("You already have that character")
        }
        if(isObtained1.method === "Exchanged"){
            throw new Error("You can't auction a character you got by auction")
        }
        const auctionProgress = await this.AuctionRepository.findByCreator(auction.auctionCreator);
        if (auctionProgress) {
            throw new Error("You already have an auction in progress")
        }
        const acquirer = await this.UserRepository.findByIdUser(auction.acquirer._id);
        if(acquirer){
            const acquirerObtained1 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character1Id, acquirer);
            if(acquirerObtained1){
                throw new Error("The acquirer already have that character")
            }
            const acquirerObtained2 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character2Id, acquirer);
            if(!acquirerObtained2){
                throw new Error("The acquirer doesn't have that character")
            }
        }
        return true;
    }

    async exchangeCharacters(auction: Auction) {
        try {
            const auctionExistente = await this.AuctionRepository.findById(auction._id);
            if (!auctionExistente) {
                throw new Error("Ninguna subasta corresponde a ese ID");
            }
            if (auctionExistente.completed) {
                throw new Error("The auction is already completed");
            }
            const auctionOwner = await this.UserRepository.findByIdUser(auction.auctionCreator._id);
            auctionExistente.auctionCreator = auctionOwner

            const acquirer = await this.UserRepository.findByIdUser(auction.acquirer._id);
            auctionExistente.acquirer = acquirer;

            const character1 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character1Id, auctionOwner);
            const character2 = await this.ObtainedRepository.findByCharacterIdAndUser(auction.character2Id, acquirer);
            if (!character1 || !character2) {
                throw new Error("Characters not found");
            }
            character1.characterId = auction.character2Id;
            character1.method = "Exchanged";
            character1.location = { lat: 0, long: 0 };
            character1.date = new Date();
            character2.location = { lat: 0, long: 0 };
            character2.characterId = auction.character1Id;
            character2.method = "Exchanged";
            character2.date = new Date();
            await this.ObtainedRepository.save(character1);
            await this.ObtainedRepository.save(character2);
            auctionExistente.completed = true;
            auctionExistente.endDate = new Date();
            return this.AuctionRepository.save(auctionExistente);
        } catch (error) {
            throw error;
        }
    }

    async updateAuction(auction: Auction) {
        try {
            const auctionExistente = await this.AuctionRepository.findById(auction._id);
            if (!auctionExistente) {
                throw new Error("Ninguna subasta corresponde a ese ID");
            }
            await this.validations(auction);
            const auctionOwner = await this.UserRepository.findByIdUser(auction.auctionCreator._id);
            auctionExistente.auctionCreator = auctionOwner

            const acquirer = await this.UserRepository.findByIdUser(auction.acquirer._id);
            auctionExistente.acquirer = acquirer;
            
            console.log(auctionOwner, acquirer);
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