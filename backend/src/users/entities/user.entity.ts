import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({
    unique: true,
    length: 150,
  })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'user',
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
