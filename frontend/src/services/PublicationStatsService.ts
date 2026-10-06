// Sara Hurtado
// internal imports
import api from '@/services/apiClient';

import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export class PublicationStatsService {
  static async getAll(): Promise<PublicationStatsInterface[]> {
    const { data } = await api.get<PublicationStatsInterface[]>('/publication-stats');

    return data;
  }

  static async getByTrendId(trendId: number): Promise<PublicationStatsInterface[]> {
    const { data } = await api.get<PublicationStatsInterface[]>(
      `/publication-stats/trend/${trendId}`,
    );

    return data;
  }

  static async getLatestByTrendId(trendId: number): Promise<PublicationStatsInterface | null> {
    const { data } = await api.get<PublicationStatsInterface | null>(
      `/publication-stats/trend/${trendId}/latest`,
    );

    return data;
  }
}
