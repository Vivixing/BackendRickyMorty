import { Request, Response } from "express";
import { UserService } from "../services/User.service";
import { ObjectId } from "mongodb";
import { UserCreationSchema, UserUpdateSchema } from "../schemas/User.schema.js"
import { UserResponse } from "../dto/User.dto";
import { User } from "../entities/User.entity";

export class UserController {

    private UserService: UserService = new UserService();

    public getByUsername = async (req: Request, res: Response) => {
        const { username } = req.params;
        console.log(username);
        try {
            const user: UserResponse = await this.UserService.findByUsername(username);
            return res.status(200).json({
                user,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByIdUser = async (req: Request, res: Response) => {
        const { id } = req.params;
    
        const objectId = new ObjectId(id);
        try {
            const user: UserResponse = await this.UserService.findByIdUser(objectId);
            
            if (!user) {
                return res.status(404).json({ error: 'El usuario no existe' });
            }
            res.status(200).json({ user });
    
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getAllUsers = async (req: Request, res: Response) => {
        try {
            const users: User[] = await this.UserService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public saveUser = async (req: Request, res: Response) => {
        const body = req.body;
        const data = UserCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: User = await this.UserService.saveUser(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updateuser = async (req: Request, res: Response) => {
        const body = req.body;
        const data = UserUpdateSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: User = await this.UserService.updateUser(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        console.log(objectId);
        try {
            await this.UserService.deleteUser(objectId);
            res.status(200).json({ message: 'Usuario eliminado' });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const result = await this.UserService.login(username, password);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}