import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

export enum Method {
    CAPTURED = "captured",
    EXCHANGED = "exchanged"
}

@Entity({ name: "Obtained" })
export class Obtained {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false })
    userId: string;

    @Column({ nullable: false, unique: true })
    characterId: number;

    @Column({ nullable: false })
    date: Date;

    @Column({ nullable: true })
    location: string;

    @Column({ type: "enum", enum: Method, nullable: false })
    method: Method;
}