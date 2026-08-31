// Samuel Moncada, Sara Hurtado
// internal imports
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

export type TrendStatsBySocialMediaDTO =
  Pick<SocialMediaInterface, 'id' | 'name' | 'color'> &
  Pick<PublicationStatsInterface, 'viewsCount' | 'likesCount' | 'commentsCount' | 'sharesCount'>;