// Sara Hurtado

// internal imports
import { BaseService } from '@/services/BaseService';

import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';
import type { TopTrendsByViewsDTO } from '@/dtos/TopTrendsByViewsDTO';

export class TrendService extends BaseService {
  static async getAll(): Promise<TrendInterface[]> {
    return await this.httpGet<TrendInterface[]>('/trends');
  }

  static async getById(id: number): Promise<TrendInterface | null> {
    return await this.httpGet<TrendInterface | null>(`/trends/${id}`);
  }

  static async getTopByViews(limit = 5): Promise<TopTrendsByViewsDTO[]> {
    return await this.httpGet<TopTrendsByViewsDTO[]>(
      `/trends/top-by-views?limit=${limit}`,
    );
  }

  static async getStatsBySocialMedia(): Promise<TrendStatsBySocialMediaDTO[]> {
    return await this.httpGet<TrendStatsBySocialMediaDTO[]>('/trends/stats-by-social-media');
  }
}
