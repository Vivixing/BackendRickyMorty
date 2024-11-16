import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "Favorite" })
export class Favorite {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false })
    characterId: number;

    @ManyToOne(() => User, (user) => user.favorites, { nullable: false })
    user: User;

    }