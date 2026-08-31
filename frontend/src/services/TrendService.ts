// Sara Hurtado

import { useTrendStore } from '@/stores/TrendStore';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';

import { SocialMediaService } from '@/services/SocialMediaService';
import { PublicationStatsService } from '@/services/PublicationStatsService';

export class TrendService {
  static getTrends(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static getPublicationStats(trend: TrendInterface): PublicationStatsInterface[] {
    return PublicationStatsService.getByTrendId(trend.id);
  }

  static getTrendById(id: string): TrendInterface | undefined {
    return useTrendStore().trends.find((trend) => trend.id === id);
  }

  static getSocialMedia(trend: TrendInterface): SocialMediaInterface | undefined {
    return SocialMediaService.getById(trend.socialMediaId);
  }

  static filterTrends(filters: { socialMedia?: string }): TrendInterface[] {
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
    const summaries = new Map<string, TrendStatsBySocialMediaDTO>();

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

      const currentSummary = summaries.get(socialMedia.id);

      if (currentSummary) {
        summaries.set(socialMedia.id, {
          ...currentSummary,

          viewsCount: currentSummary.viewsCount + viewsCount,

          likesCount: currentSummary.likesCount + likesCount,

          commentsCount: currentSummary.commentsCount + commentsCount,

          sharesCount: currentSummary.sharesCount + sharesCount,
        });

        return;
      }

      summaries.set(socialMedia.id, {
        id: socialMedia.id,
        name: socialMedia.name,
        color: socialMedia.color,
        viewsCount,
        likesCount,
        commentsCount,
        sharesCount,
      });
    });

    return Array.from(summaries.values());
  }
}
