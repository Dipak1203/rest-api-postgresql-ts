import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Admin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250 })
  name: string;

  @Column({ type: "varchar", length: 250 })
  email: string;

  @Column({ type: "varchar", length: 250 })
  password: string;

  @Column({type:"varchar",default:"admin"})
  role :string

}
