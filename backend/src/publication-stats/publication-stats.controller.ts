// Samuel Moncada
// external imports
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

// internal imports
import { CreatePublicationStatsDto } from './dto/create-publication-stats.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { PublicationStatsService } from './publication-stats.service.js';
import { PublicationStats } from './entities/publication-stats.entity.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';

@Controller('publication-stats')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('admin')
  create(
    @Body()
    createPublicationStatsDto: CreatePublicationStatsDto,
  ): Promise<PublicationStats> {
    return this.publicationStatsService.create(createPublicationStatsDto);
  }
}
