import { Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250 })
  address: string;

  @Column({ type: "varchar", length: 15 })
  phone: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
