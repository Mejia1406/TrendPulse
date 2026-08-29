// Athina Cappelletti

import type { PublicationStatsInterface } from "./PublicationStatsInterface";
import type { SocialMediaInterface } from "./SocialMediaInterface";

export interface TrendInterface {
  id: string;
  category: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  socialMedia: SocialMediaInterface;
  publicationStats: PublicationStatsInterface[];
}