import { ObjectId } from 'mongodb';
import { User } from '../entities/User.entity';

export class ObtainedResponse{
    _id: ObjectId;
    characterId: number;
    date: Date;
    location: { lat: 0, lng: 0 };
    method: string;
    user: User;
}