// Sara Hurtado
import { useTrendStore } from '@/stores/TrendStore';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';

export class TrendService {
  static getTrends(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static getTrendById(id: string,): TrendInterface | undefined {
  return useTrendStore().trends.find((trend) => trend.id === id, );
}

  static filterTrends(filters: { socialMedia?: string }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      return (
        !filters.socialMedia ||
        filters.socialMedia === 'Todas' ||
        trend.socialMedia.name === filters.socialMedia
      );
    });
  }

  static getLatestPublicationStats(trend: TrendInterface): PublicationStatsInterface | undefined {
    if (trend.publicationStats.length === 0) {
      return undefined;
    }

    return trend.publicationStats[trend.publicationStats.length - 1];
  }

  static getLatestViews(trend: TrendInterface): number {
    return TrendService.getLatestPublicationStats(trend)?.viewsCount ?? 0;
  }

  static getLatestLikes(trend: TrendInterface): number {
    return TrendService.getLatestPublicationStats(trend)?.likesCount ?? 0;
  }

  static getTopTrendsByViews(trends: TrendInterface[], limit = 5): TrendInterface[] {
    return [...trends]
      .sort((a, b) => TrendService.getLatestViews(b) - TrendService.getLatestViews(a))
      .slice(0, limit);
  }

  static getTrendStatsBySocialMedia(trends: TrendInterface[]): TrendStatsBySocialMediaDTO[] {
    const summaries = new Map<string, TrendStatsBySocialMediaDTO>();

    trends.forEach((trend) => {
      const socialMedia = trend.socialMedia;
      const latestStats = TrendService.getLatestPublicationStats(trend);
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
