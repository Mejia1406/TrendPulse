import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trend } from './entities/trend.entity.js';
import { TrendsController } from './trends.controller.js';
import { TrendsService } from './trends.service.js';
import { PublicationStats } from '../publication-stats/entities/publication-stats.entity.js';
import { SocialMedia } from '../social-media/entities/social-media.entity.js';
@Module({
  imports: [TypeOrmModule.forFeature([
    Trend,
    PublicationStats,
    SocialMedia
  ])],
  controllers: [TrendsController],
  providers: [TrendsService],
  exports: [TrendsService],
})
export class TrendsModule { }
