import { useTrendStore } from '@/stores/TrendStore';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';

export class TrendService {
  static getTrends(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static filterTrends(filters: {
    socialMedia?: string;
  }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      return (
        !filters.socialMedia ||
        filters.socialMedia === 'Todas' ||
        trend.socialMedia.name === filters.socialMedia
      );
    });
  }
   static getLatestViews(
    trend: TrendInterface,
  ): number {
    if (trend.publicationStats.length === 0) {
      return 0;
    }
    return (
      trend.publicationStats[
        trend.publicationStats.length - 1
      ]?.viewsCount ?? 0
    );
  }

  static getLatestLikes(
    trend: TrendInterface,
  ): number {
    if (trend.publicationStats.length === 0) {
      return 0;
    }
    return (
      trend.publicationStats[
        trend.publicationStats.length - 1
      ]?.likesCount ?? 0
    );
  }

  static getTopTrendsByViews(
    trends: TrendInterface[],
    limit = 5,
  ): TrendInterface[] {
    return [...trends]
      .sort(
        (a, b) =>
          TrendService.getLatestViews(b) -
          TrendService.getLatestViews(a),
      )
      .slice(0, limit);
  }

static getTrendStatsBySocialMedia(
  trends: TrendInterface[],
): TrendStatsBySocialMediaDTO[] {
  const summaries = new Map<
    string,
    TrendStatsBySocialMediaDTO
  >();

  trends.forEach((trend) => {
    const socialMedia = trend.socialMedia;

    const currentSummary = summaries.get(
      socialMedia.id,
    );

    if (currentSummary) {
      currentSummary.viewsCount +=
        TrendService.getLatestViews(trend);

      currentSummary.likesCount +=
        TrendService.getLatestLikes(trend);

      return;
    }

    summaries.set(socialMedia.id, {
      id: socialMedia.id,
      name: socialMedia.name,
      viewsCount:
        TrendService.getLatestViews(trend),
      likesCount:
        TrendService.getLatestLikes(trend),
    });
  });

  return Array.from(summaries.values());
}

}