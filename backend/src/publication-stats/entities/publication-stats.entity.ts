import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Trend)
  trend: Trend;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  captureAt: Date;
}
