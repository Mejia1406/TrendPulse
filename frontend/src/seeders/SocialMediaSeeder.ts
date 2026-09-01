// Samuel Moncada Mejía
// internal imports
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

export const socialMediaSeeder: SocialMediaInterface[] = [
  {
    id: '1',
    name: 'Twitter',
    logo: 'https://cdn.simpleicons.org/x',
    color: '#00BAFF',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Instagram',
    logo: 'https://cdn.simpleicons.org/instagram',
    color: '#E1306C',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'TikTok',
    logo: 'logo-tiktok',
    color: '#00F2FE',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'YouTube',
    logo: 'logo-youtube',
    color: '#FF0000',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
