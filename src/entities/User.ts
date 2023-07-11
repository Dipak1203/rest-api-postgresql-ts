import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Profile } from "./Profile";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  addId() {
    this.id = uuidv4();
  }

  @Column({ nullable: true })
  profileId: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn({ name: "profileId" })
  profile: Profile;
}
