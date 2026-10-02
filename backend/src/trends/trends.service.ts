// Samuel Moncada, Sara Hurtado
// external imports
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// internal imports
import { Trend } from './entities/trend.entity.js';
import { CreateTrendDto } from './dto/create-trend.dto.js';
import { UpdateTrendDto } from './dto/update-trend.dto.js';
import { PublicationStats } from '../publication-stats/entities/publication-stats.entity.js';
import { SocialMedia } from '../social-media/entities/social-media.entity.js';

@Injectable()
export class TrendsService {
  constructor(
    @InjectRepository(Trend)
    private trendsRepository: Repository<Trend>,

    @InjectRepository(PublicationStats)
    private publicationStatsRepository: Repository<PublicationStats>,

    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>,
  ) { }

  findAll(): Promise<Trend[]> {
    return this.trendsRepository.find();
  }

  findOne(id: number): Promise<Trend | null> {
    return this.trendsRepository.findOneBy({ id });
  }

  async findTopByViews(limit = 5) {
    const trends = await this.trendsRepository.find();

    const trendsWithViews = await Promise.all(
      trends.map(async (trend) => {
        const latestStats =
          await this.publicationStatsRepository.findOne({
            where: {
              trendId: trend.id,
            },
            order: {
              captureAt: 'DESC',
            },
          });

        const socialMedia =
          await this.socialMediaRepository.findOneBy({
            id: trend.socialMediaId,
          });

        return {
          id: trend.id,
          name: trend.name,
          category: trend.category,
          socialMediaId: trend.socialMediaId,
          socialMediaName: socialMedia?.name ?? 'Sin red social',
          latestViews: latestStats?.viewsCount ?? 0,
        };
      }),
    );

    return trendsWithViews
      .sort(
        (firstTrend, secondTrend) =>
          secondTrend.latestViews - firstTrend.latestViews,
      )
      .slice(0, limit);
  }

  async findStatsBySocialMedia() {
    const trends = await this.trendsRepository.find();

    const statsBySocialMedia = new Map<
      number,
      {
        id: number;
        name: string;
        color: string;
        viewsCount: number;
        likesCount: number;
        commentsCount: number;
        sharesCount: number;
      }
    >();

    for (const trend of trends) {
      const latestStats =
        await this.publicationStatsRepository.findOne({
          where: {
            trendId: trend.id,
          },
          order: {
            captureAt: 'DESC',
          },
        });

      const socialMedia =
        await this.socialMediaRepository.findOneBy({
          id: trend.socialMediaId,
        });

      if (!socialMedia) {
        continue;
      }

      const currentStats =
        statsBySocialMedia.get(socialMedia.id);

      const viewsCount = latestStats?.viewsCount ?? 0;
      const likesCount = latestStats?.likesCount ?? 0;
      const commentsCount = latestStats?.commentsCount ?? 0;
      const sharesCount = latestStats?.sharesCount ?? 0;

      if (currentStats) {
        statsBySocialMedia.set(socialMedia.id, {
          ...currentStats,
          viewsCount:
            currentStats.viewsCount + viewsCount,
          likesCount:
            currentStats.likesCount + likesCount,
          commentsCount:
            currentStats.commentsCount + commentsCount,
          sharesCount:
            currentStats.sharesCount + sharesCount,
        });

        continue;
      }

      statsBySocialMedia.set(socialMedia.id, {
        id: socialMedia.id,
        name: socialMedia.name,
        color: socialMedia.color,
        viewsCount,
        likesCount,
        commentsCount,
        sharesCount,
      });
    }

    return Array.from(statsBySocialMedia.values());
  }

  create(createTrendDto: CreateTrendDto): Promise<Trend> {
    const trend = this.trendsRepository.create(createTrendDto);

    return this.trendsRepository.save(trend);
  }

  async update(
    id: number,
    updateTrendDto: UpdateTrendDto,
  ): Promise<Trend | null> {
    const trend = await this.trendsRepository.findOneBy({ id });

    if (!trend) {
      return null;
    }

    this.trendsRepository.merge(trend, updateTrendDto);

    return this.trendsRepository.save(trend);
  }

  async delete(id: number): Promise<void> {
    await this.trendsRepository.delete(id);
  }
}
