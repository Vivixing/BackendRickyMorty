import { Entity, ObjectIdColumn, Column, ObjectId, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({ name: "Auction" })
export class Auction {
    @ObjectIdColumn()
    _id: ObjectId;

    @ManyToOne(() => User, (user) => user.auctionsCreated, { nullable: false })
    auctionCreator: User;

    @ManyToOne(() => User, (user) => user.participatedAuctions, { nullable: true })
    acquirer: User;

    @Column({ nullable: false })
    character1Id: number;

    @Column({ nullable: false })
    character2Id: number;

    @Column({ nullable: false })
    completed: boolean;

    @CreateDateColumn()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;
}