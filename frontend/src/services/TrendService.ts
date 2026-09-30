// Sara Hurtado

// external imports
import axios from 'axios';

// internal imports
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
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

  static getTopTrendsByViews(
    trends: TrendInterface[],
    publicationStats: PublicationStatsInterface[],
    limit = 5,
  ): TrendInterface[] {
    
    return [...trends]
      .sort((firstTrend, secondTrend) => {
        const firstStats = TrendService.getLatestStats(firstTrend.id, publicationStats);
        const secondStats = TrendService.getLatestStats(secondTrend.id, publicationStats);

        return (secondStats?.viewsCount ?? 0) - (firstStats?.viewsCount ?? 0);
      })
      .slice(0, limit);
  }

  static getTrendStatsBySocialMedia(
    trends: TrendInterface[],
    socialMedias: SocialMediaInterface[],
    publicationStats: PublicationStatsInterface[],
  ): TrendStatsBySocialMediaDTO[] {
    const statsBySocialMedia = new Map<number, TrendStatsBySocialMediaDTO>();

    trends.forEach((trend) => {
      const socialMedia = socialMedias.find(
        (socialMedia) => socialMedia.id === trend.socialMediaId,
      );

      if (!socialMedia) {
        return;
      }

      const latestPublicationStats = TrendService.getLatestStats(trend.id, publicationStats);
      const viewsCount = latestPublicationStats?.viewsCount ?? 0;
      const likesCount = latestPublicationStats?.likesCount ?? 0;
      const commentsCount = latestPublicationStats?.commentsCount ?? 0;
      const sharesCount = latestPublicationStats?.sharesCount ?? 0;
      const currentStats = statsBySocialMedia.get(socialMedia.id);

      if (currentStats) {
        statsBySocialMedia.set(socialMedia.id, {
          ...currentStats,
          viewsCount: currentStats.viewsCount + viewsCount,
          likesCount: currentStats.likesCount + likesCount,
          commentsCount: currentStats.commentsCount + commentsCount,
          sharesCount: currentStats.sharesCount + sharesCount,
        });

        return;
      }

      statsBySocialMedia.set(socialMedia.id, {
        id: socialMedia.id,
        name: socialMedia.name,
        color: socialMedia.color,
        viewsCount,
        likesCount,
        commentsCount,
        sharesCount,
      });
    });

    return Array.from(statsBySocialMedia.values());
  }

  private static getLatestStats(
    trendId: number,
    publicationStats: PublicationStatsInterface[],
  ): PublicationStatsInterface | undefined {
    const stats = publicationStats.filter((publicationStat) => publicationStat.trendId === trendId);

    return [...stats].sort(
      (firstStats, secondStats) =>
        new Date(secondStats.captureAt).getTime() - new Date(firstStats.captureAt).getTime(),
    )[0];
  }
}
