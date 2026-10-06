// Sara Hurtado

// external imports
import axios from 'axios';

// internal imports
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { TrendStatsBySocialMediaDTO } from '@/dtos/TrendStatsBySocialMediaDTO';

export class TrendService {
  private static readonly API_URL = 'http://localhost:3000/api/trends';

  static async getAll(): Promise<TrendInterface[]> {
    const { data } = await axios.get<TrendInterface[]>(this.API_URL);

    return data;
  }

  static async getById(id: number): Promise<TrendInterface | null> {
    const { data } = await axios.get<TrendInterface | null>(`${this.API_URL}/${id}`);

    return data;
  }

  static async getTopByViews(limit = 5) {
    const { data } = await axios.get(
      `${this.API_URL}/top-by-views`,
      {
        params: { limit },
      },
    );

    return data;
  }

  static async getStatsBySocialMedia(): Promise<TrendStatsBySocialMediaDTO[]> {
    const { data } = await axios.get<TrendStatsBySocialMediaDTO[]>(
      `${this.API_URL}/stats-by-social-media`,
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