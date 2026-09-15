// Sara Hurtado

// internal imports
import { PublicationStatsService } from '@/services/PublicationStatsService';
import { SocialMediaService } from '@/services/SocialMediaService';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';
import { useTrendStore } from '@/stores/TrendStore';

export class TrendService {
  static getAll(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static getById(id: string): TrendInterface | undefined {
    return useTrendStore().trends.find((trend) => trend.id === id);
  }

  static getFiltered(filters: { socialMedia?: string }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      if (!filters.socialMedia || filters.socialMedia === 'Todas') {
        return true;
      }

      const socialMedia = SocialMediaService.getById(trend.socialMediaId);
      
      return socialMedia?.name === filters.socialMedia;
    });
  }

  static getTopTrendsByViews(trends: TrendInterface[], limit = 5): TrendInterface[] {
    return [...trends]
      .sort(
        (firstTrend, secondTrend) =>
          PublicationStatsService.getLatestViews(secondTrend.id) -
          PublicationStatsService.getLatestViews(firstTrend.id),
      )
      .slice(0, limit);
  }

  static getTrendStatsBySocialMedia(trends: TrendInterface[]): TrendStatsBySocialMediaDTO[] {
    const statsBySocialMedia = new Map<string, TrendStatsBySocialMediaDTO>();

    trends.forEach((trend) => {
      const socialMedia = SocialMediaService.getById(trend.socialMediaId);

      if (!socialMedia) {
        return;
      }

      const latestPublicationStats = PublicationStatsService.getLatestByTrendId(trend.id);
      const viewsCount = latestPublicationStats?.viewsCount ?? 0;
      const likesCount = latestPublicationStats?.likesCount ?? 0;
      const commentsCount = latestPublicationStats?.commentsCount ?? 0;
      const sharesCount = latestPublicationStats?.sharesCount ?? 0;
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
