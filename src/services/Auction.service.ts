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

    async saveAuction(auction: Auction): Promise<Auction> {
        try {
            // Verificar que el objeto auction sea válido
            if (!auction || !auction.auctionCreator || !auction.auctionCreator._id) {
                throw new Error("Invalid auction object or auction creator information is missing.");
            }
    
            console.log("Saving auction:", auction);
    
            // Buscar al creador de la subasta
            const user = await this.UserRepository.findByIdUser(auction.auctionCreator._id);
            if (!user) {
                throw new Error("The auction creator doesn't exist.");
            }
    
            // Asignar datos del creador y marcar la subasta como no completada
            auction.auctionCreator = user;
            auction.completed = false;
    
            // Realizar validaciones específicas antes de guardar
            await this.validations(auction);
    
            // Guardar la subasta en el repositorio
            return await this.AuctionRepository.save(auction);
        } catch (error) {
            // Lanzar un error específico con información adicional si es necesario
            console.error("Error saving auction:", error.message);
            throw new Error(`Failed to save auction: ${error.message}`);
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
        if(auction.acquirer){
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
        else{
            throw new Error("The acquirer doesn't exist")
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
            const auctionOwner = await this.UserRepository.findByIdUser(auction.creatorId);
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
            character1.location = { lat: 0, lng: 0 };
            character1.date = new Date();
            character2.location = { lat: 0, lng: 0 };
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
            if(auctionExistente.completed){
                throw new Error("The auction is already completed")
            }
            // Según los elementos ingresados, se actualizan los campos si es necesario
            if (auction.character1Id) {
                auctionExistente.character1Id = auction.character1Id;
            }
            if (auction.character2Id) {
                auctionExistente.character2Id = auction.character2Id;
            }
            if (auction.acquirer) {
                auctionExistente.acquirer = auction.acquirer;
            }
            if (auction.endDate) {
                auctionExistente.endDate = auction.endDate;
            }
            if (auction.completed) {
                auctionExistente.completed = auction.completed;
            }
            if (auction.auctionCreator) {
                auctionExistente.auctionCreator = auction.auctionCreator;
            }
            
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