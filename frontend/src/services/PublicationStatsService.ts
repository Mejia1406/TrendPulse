// Sara Hurtado

// internal imports
import { BaseService } from '@/services/BaseService';

import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export class PublicationStatsService extends BaseService {
  static async getAll(): Promise<PublicationStatsInterface[]> {
    return await this.httpGet<PublicationStatsInterface[]>('/publication-stats');
  }

  static async getByTrendId(trendId: number): Promise<PublicationStatsInterface[]> {
    return await this.httpGet<PublicationStatsInterface[]>(`/publication-stats/trend/${trendId}`);
  }

  static async getLatestByTrendId(trendId: number): Promise<PublicationStatsInterface | null> {
    return await this.httpGet<PublicationStatsInterface | null>(
      `/publication-stats/trend/${trendId}/latest`,
    );
  }
}
