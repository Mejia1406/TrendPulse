// Samuel Moncada
// internal imports
import api from '@/services/apiClient';

import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { UpdateSocialMediaDTO } from '@/dtos/UpdateSocialMediaDTO';

export class SocialMediaService {
  static async getAll(): Promise<SocialMediaInterface[]> {
    const { data } = await api.get<SocialMediaInterface[]>('/social-media');

    return data;
  }

  static async getById(id: number): Promise<SocialMediaInterface | null> {
    const { data } = await api.get<SocialMediaInterface | null>(`/social-media/${id}`);

    return data;
  }

  static async create(socialMedia: CreateSocialMediaDTO): Promise<SocialMediaInterface> {
    const { data } = await api.post<SocialMediaInterface>('/social-media', socialMedia);

    return data;
  }

  static async update(
    id: number,
    updatedSocialMedia: UpdateSocialMediaDTO,
  ): Promise<SocialMediaInterface | null> {
    const { data } = await api.patch<SocialMediaInterface | null>(
      `/social-media/${id}`,
      updatedSocialMedia,
    );

    return data;
  }

  static async delete(id: number): Promise<void> {
    await api.delete(`/social-media/${id}`);
  }
}
