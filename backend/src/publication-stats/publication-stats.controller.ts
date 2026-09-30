import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { PublicationStatsService } from './publication-stats.service.js';
import { PublicationStats } from './entities/publication-stats.entity.js';
import { CreatePublicationStatsDto } from './dto/create-publication-stats.dto.js';

@Controller('publication-stats')
export class PublicationStatsController {
  constructor(
    private readonly publicationStatsService: PublicationStatsService,
  ) {}

  @Get()
  findAll(): Promise<PublicationStats[]> {
    return this.publicationStatsService.findAll();
  }

  @Get('trend/:trendId')
  findByTrendId(@Param('trendId') trendId: string): Promise<PublicationStats[]> {
    return this.publicationStatsService.findByTrendId(Number(trendId));
  }

  @Get('trend/:trendId/latest')
  findLatestByTrendId(
    @Param('trendId') trendId: string,
  ): Promise<PublicationStats | null> {
    return this.publicationStatsService.findLatestByTrendId(Number(trendId));
  }

  @Post()
  create(
    @Body()
    createPublicationStatsDto: CreatePublicationStatsDto,
  ): Promise<PublicationStats> {
    return this.publicationStatsService.create(createPublicationStatsDto);
  }
}
