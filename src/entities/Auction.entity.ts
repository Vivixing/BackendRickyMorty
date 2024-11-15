import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity({ name: "Auction" })
export class Auction {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false })
    character1Id: number;

    @Column({ nullable: false })
    character2Id: number;

    @Column({ nullable: false })
    completed: boolean;

    @Column({ nullable: false })
    startDate: Date;

    @Column({ nullable: false })
    endDate: Date;
}