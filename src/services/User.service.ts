import { User } from "../entities/User.entity";
import { ObjectId } from "mongodb";
import { UserRepository } from "../repositories/User.repository";

export class UserService {

    private UserRepository: UserRepository = new UserRepository();

    findAll() {
        return this.UserRepository.getAll()
    }

    findByUsername(username: string) {
        return this.UserRepository.findByUsername(username)
    }

    async findByIdUser(idUser: ObjectId) {
        const userExistente = await this.UserRepository.findByIdUser(idUser)
        console.log(userExistente);
        if (!userExistente) {
            throw new Error("Ningun usuario corresponde a ese ID")
        }
        return userExistente;
    }

    async saveUser(user: User) {
        try {
            user.username = user.username.replace(/\s+/g, ' ')
            await this.validations(user);
            return this.UserRepository.save(user);
        } catch (error) {
            throw error;
        }
    }

    async validations(user: User) {
        const nombreExistente = await this.UserRepository.findByUsername(user.username)
        if (nombreExistente) {
            throw new Error("Ya existe un usuario con ese nombre")
        }
        const regex = /^[a-zA-Z0-9\sÁÉÍÓÚáéíóú]+$/;
        if (!regex.test(user.username)) {
            throw new Error("El username no puede contener números ni carácteres especiales")
        }
        return true;
    }

    async updateUser(user: User) {
        try {
            user.username = user.username.replace(/\s+/g, ' ')
            const userExistente = await this.UserRepository.findByIdUser(user._id);
            if (!userExistente) {
                throw new Error("Ningun usuario corresponde a ese ID");
            }
            await this.validations(user);
            userExistente.username = user.username;
            userExistente.password = user.password;
            userExistente.email = user.email;
            return this.UserRepository.save(userExistente);
        } catch (error) {
            throw error;
        }
    }
    async deleteUser(idUser: ObjectId) {
        const userExistente = await this.UserRepository.findByIdUser(idUser)
        console.log(userExistente);
        if (!userExistente) {
            throw new Error("Ningun usuario corresponde a ese ID")
        }
        return this.UserRepository.delete(idUser)
    }
}