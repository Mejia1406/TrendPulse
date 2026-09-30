// Sara Hurtado

// external imports
import axios from 'axios';

// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export class PublicationStatsService {
  private static readonly API_URL = 'http://localhost:3000/api/publication-stats';

  static async getAll(): Promise<PublicationStatsInterface[]> {
    const { data } = await axios.get<PublicationStatsInterface[]>(this.API_URL);

    return data;
  }

  static async getByTrendId(trendId: number): Promise<PublicationStatsInterface[]> {
    const { data } = await axios.get<PublicationStatsInterface[]>(
      `${this.API_URL}/trend/${trendId}`,
    );

    return data;
  }

  static async getLatestByTrendId(trendId: number): Promise<PublicationStatsInterface | null> {
    const { data } = await axios.get<PublicationStatsInterface | null>(
      `${this.API_URL}/trend/${trendId}/latest`,
    );

    return data;
  }
}
