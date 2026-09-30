import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SocialMedia } from '../../social-media/entities/social-media.entity.js';

@Entity('trends')
export class Trend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  name: string;

  @Column()
  socialMediaId: number;

  @ManyToOne(() => SocialMedia)
  socialMedia: SocialMedia;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}