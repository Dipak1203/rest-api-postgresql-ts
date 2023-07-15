import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  token: string;
}
