import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 250 })
  name: string

  @Column({ type: 'varchar', length: 250 })
  price: string

  @Column({ type: 'varchar', length: 250 })
  description: string

  @Column({ type: 'varchar' })
  brand: string

  @Column({ type: 'varchar', length: 250 })
  category: string

  @Column({ type: 'varchar', length: 250 })
  image_url: string

  @CreateDateColumn({
    name: 'created_at',
  })
  createAt: Date

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updateAt: Date
}
