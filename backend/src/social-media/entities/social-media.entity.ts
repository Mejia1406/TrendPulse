import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('social_media')
export class SocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
