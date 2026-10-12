// Sara Hurtado, Samuel Moncada
// external imports
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { Relation } from 'typeorm';

import type { PublicationStats } from '../../publication-stats/entities/publication-stats.entity.js';
import type { SocialMedia } from '../../social-media/entities/social-media.entity.js';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne('SocialMedia', (socialMedia: SocialMedia) => socialMedia.trends)
  @JoinColumn({ name: 'socialMediaId' })
  socialMedia: Relation<SocialMedia>;
  @OneToMany(
    'PublicationStats',
    (publicationStats: PublicationStats) => publicationStats.trend,
  )
  publicationStats: Relation<PublicationStats>[];
}
