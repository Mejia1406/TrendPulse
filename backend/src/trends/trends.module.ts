// Samuel Moncada, Sara Hurtado
// external imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal imports
import { PublicationStatsModule } from '../publication-stats/publication-stats.module.js';
import { SocialMediaModule } from '../social-media/social-media.module.js';
import { Trend } from './entities/trend.entity.js';
import { TrendsController } from './trends.controller.js';
import { TrendsService } from './trends.service.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trend]),
    PublicationStatsModule,
    SocialMediaModule,
  ],
  controllers: [TrendsController],
  providers: [TrendsService],
  exports: [TrendsService],
})
export class TrendsModule {}