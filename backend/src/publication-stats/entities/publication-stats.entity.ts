import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Trend } from '../../trends/entities/trend.entity.js';

@Entity('publication_stats')
export class PublicationStats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  likesCount: number;

  @Column()
  commentsCount: number;

  @Column()
  sharesCount: number;

  @Column()
  viewsCount: number;

  @Column()
  url: string;

  @Column()
  trendId: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  captureAt: Date;

  @ManyToOne(() => Trend, (trend) => trend.publicationStats)
  @JoinColumn({ name: 'trendId' })
  trend: Trend;
}
