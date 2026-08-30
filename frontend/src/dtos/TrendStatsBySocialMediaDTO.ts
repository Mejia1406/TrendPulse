import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export type TrendStatsBySocialMediaDTO =
  Pick<SocialMediaInterface, 'id' | 'name'> &
  Pick<PublicationStatsInterface, 'viewsCount' | 'likesCount'>;