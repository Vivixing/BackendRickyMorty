import { Request, Response } from "express";
import { Obtained } from "../entities/Obtained.entity";
import { ObtainedService } from "../services/Obtained.service";
import { UserService } from "../services/User.service";
import { ObjectId } from "mongodb";
import { ObtainedCreationSchema, ObtainedUpdateSchema } from "../schemas/Obtained.schema";

export class ObtainedController {
    private obtainedService: ObtainedService = new ObtainedService();
    private userService: UserService = new UserService();

    public getAll = async (req: Request, res: Response) => {
        try {
            const obtained: Obtained[] = await this.obtainedService.findAll();
            return res.status(200).json({
                obtained,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public findById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        try {
            const obtained = await this.obtainedService.findById(objectId);
            return res.status(200).json({
                obtained,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByUserAndCharacterId = async (req: Request, res: Response) => {
        const { user, characterId } = req.params;
        const objectId = new ObjectId(user);
        try {
            const owner = await this.userService.findByIdUser(objectId);
            const obtained: Obtained = await this.obtainedService.findByCharacterIdAndUser(Number(characterId), owner);
            return res.status(200).json({
                obtained,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public getByUser = async (req: Request, res: Response) => {
        const { user } = req.params;
        var objectId = new ObjectId(user);
        try {
            const owner = await this.userService.findByIdUser(objectId);
            const obtained: Obtained[] = await this.obtainedService.findByUser(owner);
            return res.status(200).json({
                obtained,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public findByUserAndMethod = async (req: Request, res: Response) => {
        const { user, method } = req.params;
        var objectId = new ObjectId(user);
        try {
            const owner = await this.userService.findByIdUser(objectId);
            const obtained: Obtained[] = await this.obtainedService.findByUserAndMethod(owner, method);
            return res.status(200).json({
                obtained,
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    public saveObtained = async (req: Request, res: Response) => {
        const body = req.body;
        const data = ObtainedCreationSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Obtained = await this.obtainedService.saveObtained(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public deleteObtained = async (req: Request, res: Response) => {
        const { id } = req.params;
        const objectId = new ObjectId(id);
        try {
            const result = await this.obtainedService.deleteObtained(objectId);
            return res.status(200).json({message: 'Obtained deleted'});
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    public updateObtained = async (req: Request, res: Response) => {
        const body = req.body;
        const data = ObtainedUpdateSchema.validate(body)
        if (data.error) {
            return res.status(400).json(data.error.details[0].message);
        }
        try {
            const result: Obtained = await this.obtainedService.updateObtained(body);
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}