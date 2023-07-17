import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 250 })
  name: string;

  @Column({ type: "varchar", length: 250 })
  price: string;

  @Column({ type: "varchar", length: 250 })
  description: string;

  @Column({type:"varchar"})
   brand:string

   @Column({type:"varchar", length:250})
   category:string
   
   @Column({type:"varchar",length:250})
   image_url :string

}
