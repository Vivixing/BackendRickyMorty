import { Entity, ObjectIdColumn, Column, ObjectId } from "typeorm";

@Entity({ name: "User" })
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;
}
