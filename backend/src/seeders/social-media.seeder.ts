import { SocialMediaService } from '../social-media/social-media.service.js';

export async function seedSocialMedia(
  socialMediaService: SocialMediaService,
) {
  await socialMediaService.create({
    name: 'Twitter',
    logo: 'https://cdn.simpleicons.org/x',
    color: '#00BAFF',
  });

  await socialMediaService.create({
    name: 'Instagram',
    logo: 'https://cdn.simpleicons.org/instagram',
    color: '#E1306C',
  });

  await socialMediaService.create({
    name: 'TikTok',
    logo: 'https://cdn.simpleicons.org/tiktok',
    color: '#00F2FE',
  });

  await socialMediaService.create({
    name: 'YouTube',
    logo: 'https://cdn.simpleicons.org/youtube',
    color: '#FF0000',
  });
}