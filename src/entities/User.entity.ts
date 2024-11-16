import { Entity, ObjectIdColumn, Column, ObjectId, OneToMany } from "typeorm";
import { Favorite } from "./Favorite.entity";
import { Obtained } from "./Obtained.entity";
import { Auction } from "./Auction.entity";

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

  @OneToMany(() => Favorite, (favorite) => favorite.user)
    favorites: Favorite[];
  
  @OneToMany(() => Obtained, (obtained) => obtained.user)
    obtained: Obtained[];

  @OneToMany(() => Auction, (auction) => auction.auctionCreator)
    auctionsCreated: Auction[];

  @OneToMany(() => Auction, (auction) => auction.acquirer)
    participatedAuctions: Auction[];
}
