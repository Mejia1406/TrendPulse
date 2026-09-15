// Sara Hurtado

// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import { usePublicationStatsStore } from '@/stores/PublicationStatsStore';

export class PublicationStatsService {
  static getByTrendId(trendId: string): PublicationStatsInterface[] {
    return usePublicationStatsStore().publicationStats.filter(
      (publicationStats) => publicationStats.trendId === trendId,
    );
  }
  
  static getLatestByTrendId(trendId: string): PublicationStatsInterface | undefined {
    const publicationStats = PublicationStatsService.getByTrendId(trendId);

    if (publicationStats.length === 0) {
      return undefined;
    }

    return [...publicationStats].sort(
      (firstStats, secondStats) =>
        new Date(secondStats.captureAt).getTime() -
        new Date(firstStats.captureAt).getTime(),
    )[0];
  }

  static getLatest(trendId: string): PublicationStatsInterface | undefined {
    return PublicationStatsService.getLatestByTrendId(trendId);
  }

  static getLatestViews(trendId: string): number {
    return PublicationStatsService.getLatestByTrendId(trendId)?.viewsCount ?? 0;
  }

  static getLatestLikes(trendId: string): number {
    return PublicationStatsService.getLatestByTrendId(trendId)?.likesCount ?? 0;
  }
}