import { ObjectId } from 'mongodb';

export class UserResponse{
    _id: ObjectId;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}