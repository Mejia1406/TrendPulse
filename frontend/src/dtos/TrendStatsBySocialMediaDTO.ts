// Samuel Moncada, Sara Hurtado

import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { PublicationStatsInterface } from '@/interfaces/PublicationStatsInterface';

export type TrendStatsBySocialMediaDTO =
  Pick<SocialMediaInterface, 'id' | 'name' | 'color'> &
  Pick<PublicationStatsInterface, 'viewsCount' | 'likesCount' | 'commentsCount' | 'sharesCount'>;