// Samuel Moncada Mejía
// internal imports
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

export type CreateSocialMediaDTO = Omit<SocialMediaInterface, 'id' | 'createdAt' | 'updatedAt'>;
