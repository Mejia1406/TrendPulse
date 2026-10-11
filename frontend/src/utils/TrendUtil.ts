// Samuel Moncada
// internal imports
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { TrendInterface } from '@/interfaces/TrendInterface';

export class TrendUtil {
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
