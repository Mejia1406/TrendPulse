// Sara Hurtado
import type { TrendInterface } from '@/interfaces/TrendInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export type TopTrendsByViewsDTO =
  Pick<TrendInterface, 'id' | 'name'> & {
    socialMediaName: SocialMediaInterface['name'];
    latestViews: PublicationStatsInterface['viewsCount'];
  };