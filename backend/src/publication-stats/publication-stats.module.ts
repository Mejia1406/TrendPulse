import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PublicationStats } from './entities/publication-stats.entity.js';
import { PublicationStatsController } from './publication-stats.controller.js';
import { PublicationStatsService } from './publication-stats.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PublicationStats])],
  controllers: [PublicationStatsController],
  providers: [PublicationStatsService],
  exports: [PublicationStatsService],
})
export class PublicationStatsModule {}
