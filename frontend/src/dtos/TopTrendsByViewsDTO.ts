// Sara Hurtado
// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { TrendInterface } from '@/interfaces/TrendInterface';

export type TopTrendsByViewsDTO =
  Pick<TrendInterface, 'id' | 'name'> & {
    socialMediaName: SocialMediaInterface['name'];
    latestViews: PublicationStatsInterface['viewsCount'];
  };