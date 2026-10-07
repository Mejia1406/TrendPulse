// Sara Hurtado
// internal imports
import api from '@/services/apiClient';

import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';

export class TrendService {
  static async getAll(): Promise<TrendInterface[]> {
    const { data } = await api.get<TrendInterface[]>('/trends');

    return data;
  }

  static async getById(id: number): Promise<TrendInterface | null> {
    const { data } = await api.get<TrendInterface | null>(`/trends/${id}`);

    return data;
  }

  static async getTopByViews(limit = 5) {
    const { data } = await api.get('/trends/top-by-views', {
      params: { limit },
    });

    return data;
  }

  static async getStatsBySocialMedia(): Promise<TrendStatsBySocialMediaDTO[]> {
    const { data } = await api.get<TrendStatsBySocialMediaDTO[]>(
      '/trends/stats-by-social-media',
    );

    return data;
  }

  static getFiltered(
    trends: TrendInterface[],
    socialMedias: SocialMediaInterface[],
    filters: { socialMedia?: string },
  ): TrendInterface[] {
    return trends.filter((trend) => {
      if (!filters.socialMedia || filters.socialMedia === 'Todas') {
        return true;
      }

      const socialMedia = socialMedias.find(
        (socialMedia) => socialMedia.id === trend.socialMediaId,
      );

      return socialMedia?.name === filters.socialMedia;
    });
  }
}
