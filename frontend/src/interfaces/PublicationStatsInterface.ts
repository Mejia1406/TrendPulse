// Samuel Moncada Mejía

import type { TrendInterface } from '@/interfaces/TrendInterface';

export interface PublicationStatsInterface {
  id: string;
  trendId: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  url: string;
  createdAt: string;
  captureAt: string;
}
