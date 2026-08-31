// Sara Hurtado
// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import { usePublicationStatsStore } from '@/stores/PublicationStatsStore';


export class PublicationStatsService {
  static getByTrendId(trendId: string): PublicationStatsInterface[] {
    return usePublicationStatsStore().publicationStats.filter(
      (publicationStats) => publicationStats.trendId === trendId,
    );
  }
    static getPublicationStats(trend: TrendInterface): PublicationStatsInterface[] {
    return PublicationStatsService.getByTrendId(trend.id);
  }
    static getLatestPublicationStats(trend: TrendInterface): PublicationStatsInterface | undefined {
      const publicationStats = PublicationStatsService.getPublicationStats(trend);
  
      if (publicationStats.length === 0) {
        return undefined;
      }
  
      return [...publicationStats].sort(
        (firstStats, secondStats) =>
          new Date(secondStats.captureAt).getTime() - new Date(firstStats.captureAt).getTime(),
      )[0];
    }
  
    static getLatestViews(trend: TrendInterface): number {
      return PublicationStatsService.getLatestPublicationStats(trend)?.viewsCount ?? 0;
    }
  
    static getLatestLikes(trend: TrendInterface): number {
      return PublicationStatsService.getLatestPublicationStats(trend)?.likesCount ?? 0;
    }
}
