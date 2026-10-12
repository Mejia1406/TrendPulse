// Samuel Moncada
// external imports
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import type { Relation } from 'typeorm';

// internal imports
import type { Trend } from '../../trends/entities/trend.entity.js';

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
  @OneToMany('Trend', (trend: Trend) => trend.socialMedia)
  trends: Relation<Trend>[];
}
