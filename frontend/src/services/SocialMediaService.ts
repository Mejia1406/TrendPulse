// Samuel Moncada

// internal imports
import { BaseService } from '@/services/BaseService';

import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { UpdateSocialMediaDTO } from '@/dtos/UpdateSocialMediaDTO';

export class SocialMediaService extends BaseService {
  static async getAll(): Promise<SocialMediaInterface[]> {
    return await this.httpGet<SocialMediaInterface[]>('/social-media');
  }

  static async getById(id: number): Promise<SocialMediaInterface | null> {
    return await this.httpGet<SocialMediaInterface | null>(`/social-media/${id}`);
  }

  static async create(socialMedia: CreateSocialMediaDTO): Promise<SocialMediaInterface> {
    return await this.httpPost<SocialMediaInterface>('/social-media', socialMedia);
  }

  static async update(
    id: number,
    updatedSocialMedia: UpdateSocialMediaDTO,
  ): Promise<SocialMediaInterface | null> {
    return await this.httpPatch<SocialMediaInterface | null>(
      `/social-media/${id}`,
      updatedSocialMedia,
    );
  }

  static async delete(id: number): Promise<void> {
    await this.httpDelete(`/social-media/${id}`);
  }
}
