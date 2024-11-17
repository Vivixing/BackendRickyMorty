import { ObjectId } from 'mongodb';
import { User } from '../entities/User.entity';

export class ObtainedResponse{
    _id: ObjectId;
    characterId: number;
    date: Date;
    location: string;
    method: string;
    user: User;
}