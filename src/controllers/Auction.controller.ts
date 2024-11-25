import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import { AuctionResponse } from "../dto/Auction.dto";
import { Auction } from "../entities/Auction.entity";
import { AuctionService } from "../services/Auction.service";
import { User } from "../entities/User.entity";
import { UserService } from "../services/User.service";
import { AuctionCreationSchema, AuctionUpdateSchema } from "../schemas/Auction.schema";

export class AuctionController {
    private AuctionService: AuctionService = new AuctionService();
    private UserService: UserService = new UserService();
    
    public getByCreator = async (req: Request, res: Response) => {
        const { user } = req.params;
        const objectId = new ObjectId(user);

        try {
            const auctionCreator: User = await this.UserService.findByIdUser(objectId);
            const auction: AuctionResponse = await this.AuctionService.findByCreator(auctionCreator);
            return res.status(200).json({
                auction,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByAcquirer = async (req: Request, res: Response) => {
        const { user } = req.params;
        const objectId = new ObjectId(user);
        try {
            const acquirer: User = await this.UserService.findByIdUser(objectId);
            const auction: AuctionResponse = await this.AuctionService.findByAcquirer(acquirer);
            
            if (!auction) {
                return res.status(404).json({ error: 'La subasta no existe' });
            }
            res.status(200).json({ auction });
    
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByCompleted = async (req: Request, res: Response) => {
        const { completed } = req.params;
        console.log(completed);
        if (completed !== 'true' && completed !== 'false') {
            return res.status(400).json({ error: 'El valor de completado debe ser true o false' });
        }
        if (completed === 'true') {
            var completedBool = true;
        }
        if (completed === 'false') {
            var completedBool = false;
        }
        try {
            const auction: Auction[] = await this.AuctionService.findByCompleted(completedBool);
            return res.status(200).json({
                auction,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdAuction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        try {
            const auction: AuctionResponse = await this.AuctionService.findByIdAuction(objectId);
            
            if (!auction) {
                return res.status(404).json({ error: 'La subasta no existe' });
            }
            res.status(200).json({ auction });
    
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getAllAuctions = async (req: Request, res: Response) => {
        try {
            const auctions: Auction[] = await this.AuctionService.findAll();
            return res.status(200).json(auctions);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public saveAuction = async (req: Request, res: Response) => {
        const body = req.body;
        const data = AuctionCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Auction = await this.AuctionService.saveAuction(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updateAuction = async (req: Request, res: Response) => {
        const body = req.body;
        const data = AuctionUpdateSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Auction = await this.AuctionService.updateAuction(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteAuction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        try {
            await this.AuctionService.deleteAuction(objectId);
            res.status(200).json({ message: 'Subasta eliminada' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public exchangeCharacters = async (req: Request, res: Response) => {
        const body = req.body;
        const data = AuctionUpdateSchema.validate(body)
        try {
            const result: Auction = await this.AuctionService.exchangeCharacters(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}