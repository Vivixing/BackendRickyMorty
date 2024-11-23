import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";


@Entity({ name: "Obtained" })
export class Obtained {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false })
    characterId: number;

    @CreateDateColumn()
    date: Date;

    @Column({ nullable: true })
    location: { lat: 0, long: 0 };

    @Column({ nullable: false })
    method: string;

    @ManyToOne(() => User, (user) => user.obtained, { nullable: false })
    user: User;
}