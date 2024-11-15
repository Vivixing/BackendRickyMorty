import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity({ name: "Favorite" })
export class Favorite {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column({ nullable: false, unique: true })
    userId: string;

    @Column({ nullable: false })
    characterId: number;
    }