import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PublicationStats } from './entities/publication-stats.entity.js';
import { CreatePublicationStatsDto } from './dto/create-publication-stats.dto.js';

@Injectable()
export class PublicationStatsService {
  constructor(
    @InjectRepository(PublicationStats)
    private publicationStatsRepository: Repository<PublicationStats>,
  ) {}

  findAll(): Promise<PublicationStats[]> {
    return this.publicationStatsRepository.find();
  }

  findByTrendId(trendId: number): Promise<PublicationStats[]> {
    return this.publicationStatsRepository.find({
      where: { trendId },
      order: {
        captureAt: 'ASC',
      },
    });
  }

  findLatestByTrendId(trendId: number): Promise<PublicationStats | null> {
    return this.publicationStatsRepository.findOne({
      where: { trendId },
      order: {
        captureAt: 'DESC',
      },
    });
  }

  create(
    createPublicationStatsDto: CreatePublicationStatsDto,
  ): Promise<PublicationStats> {
    const publicationStats = this.publicationStatsRepository.create(
      createPublicationStatsDto,
    );

    return this.publicationStatsRepository.save(publicationStats);
  }
}
