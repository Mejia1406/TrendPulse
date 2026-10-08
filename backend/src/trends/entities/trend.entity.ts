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

import { PublicationStats } from '../../publication-stats/entities/publication-stats.entity.js';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => SocialMedia, (socialMedia) => socialMedia.trends)
  @JoinColumn({ name: 'socialMediaId' })
  socialMedia: SocialMedia;

  @OneToMany(
    () => PublicationStats,
    (publicationStats) => publicationStats.trend,
  )
  publicationStats: PublicationStats[];
}
