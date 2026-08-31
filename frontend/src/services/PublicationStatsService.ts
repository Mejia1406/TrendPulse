// Sara Hurtado
// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { TrendInterface } from '@/interfaces/TrendInterface';
import { usePublicationStatsStore } from '@/stores/PublicationStatsStore';
import { TrendService } from './TrendService';


export class PublicationStatsService {
  static getByTrendId(trendId: string): PublicationStatsInterface[] {
    return usePublicationStatsStore().publicationStats.filter(
      (publicationStats) => publicationStats.trendId === trendId,
    );
  }
  static getLatest(trend: TrendInterface): PublicationStatsInterface | undefined {
    const publicationStats = TrendService.getPublicationStats(trend);
  
      if (publicationStats.length === 0) {
        return undefined;
      }
  
      return [...publicationStats].sort(
        (firstStats, secondStats) =>
          new Date(secondStats.captureAt).getTime() - new Date(firstStats.captureAt).getTime(),
      )[0];
    }
  
  static getLatestViews(trend: TrendInterface): number {
    return PublicationStatsService.getLatest(trend)?.viewsCount ?? 0;
    }
  
  static getLatestLikes(trend: TrendInterface): number {
    return PublicationStatsService.getLatest(trend)?.likesCount ?? 0;
    }
}
