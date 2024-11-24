import { ObjectId } from 'mongodb';
import { User } from '../entities/User.entity';

export class AuctionResponse{
    _id: ObjectId;
    auctionCreator: User;
    acquirer: User;
    character1Id: number;
    character2Id: number;
    completed: boolean;
    startDate: Date;
    endDate: Date;
    creatorId: string;

}