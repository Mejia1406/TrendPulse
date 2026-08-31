// Sara Hurtado
// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import { PublicationStatsService } from '@/services/PublicationStatsService';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import { SocialMediaService } from '@/services/SocialMediaService';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';
import { useTrendStore } from '@/stores/TrendStore';

export class TrendService {
  static getAll(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static getPublicationStats(trend: TrendInterface): PublicationStatsInterface[] {
    return PublicationStatsService.getByTrendId(trend.id);
  }

  static getById(id: string): TrendInterface | undefined {
    return useTrendStore().trends.find((trend) => trend.id === id);
  }

  static getSocialMedia(trend: TrendInterface): SocialMediaInterface | undefined {
    return SocialMediaService.getById(trend.socialMediaId);
  }

  static getFiltered(filters: { socialMedia?: string }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      if (!filters.socialMedia || filters.socialMedia === 'Todas') {
        return true;
      }

      const socialMedia = TrendService.getSocialMedia(trend);
      return socialMedia?.name === filters.socialMedia;
    });
  }
  

  static getTopTrendsByViews(trends: TrendInterface[], limit = 5): TrendInterface[] {
    return [...trends]
      .sort(
        (firstTrend, secondTrend) =>
          PublicationStatsService.getLatestViews(secondTrend.id) - PublicationStatsService.getLatestViews(firstTrend.id),
      )
      .slice(0, limit);
  }

  static getTrendStatsBySocialMedia(trends: TrendInterface[]): TrendStatsBySocialMediaDTO[] {
    const statsBySocialMedia = new Map<string, TrendStatsBySocialMediaDTO>();

    trends.forEach((trend) => {
      const socialMedia = TrendService.getSocialMedia(trend);

      if (!socialMedia) {
        return;
      }

      const latestStats = PublicationStatsService.getLatest(trend.id);
      const viewsCount = latestStats?.viewsCount ?? 0;
      const likesCount = latestStats?.likesCount ?? 0;
      const commentsCount = latestStats?.commentsCount ?? 0;
      const sharesCount = latestStats?.sharesCount ?? 0;
      const currentStats = statsBySocialMedia.get(socialMedia.id);

      if (currentStats) {
        statsBySocialMedia.set(socialMedia.id, {
          ...currentStats,

          viewsCount: currentStats.viewsCount + viewsCount,
          likesCount: currentStats.likesCount + likesCount,
          commentsCount: currentStats.commentsCount + commentsCount,
          sharesCount: currentStats.sharesCount + sharesCount,
        });

        return;
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
    });

    return Array.from(statsBySocialMedia.values());
  }
}
