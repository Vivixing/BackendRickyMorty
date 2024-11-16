import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne } from "typeorm";
import { User } from "./User.entity";

export enum Method {
    CAPTURED = "captured",
    EXCHANGED = "exchanged"
}

@Entity({ name: "Obtained" })
export class Obtained {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false, unique: true })
    characterId: number;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: true })
    location: string;

    @Column({ type: "enum", enum: Method, nullable: false })
    method: Method;

    @ManyToOne(() => User, (user) => user.obtained, { nullable: false })
    user: User;
}