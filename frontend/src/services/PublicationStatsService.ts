import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

import { usePublicationStatsStore } from '@/stores/PublicationStatsStore';

export class PublicationStatsService {
  static getByTrendId(trendId: string): PublicationStatsInterface[] {
    return usePublicationStatsStore().publicationStats.filter(
      (publicationStats) => publicationStats.trendId === trendId,
    );
  }
}
