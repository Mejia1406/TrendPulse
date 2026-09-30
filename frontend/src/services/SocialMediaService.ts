// Samuel Moncada

// external imports
import axios from 'axios';

// internal imports
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import type { UpdateSocialMediaDTO } from '@/dtos/UpdateSocialMediaDTO';

export class SocialMediaService {
  private static readonly API_URL = 'http://localhost:3000/api/social-media';

  static async getAll(): Promise<SocialMediaInterface[]> {
    const { data } = await axios.get<SocialMediaInterface[]>(this.API_URL);

    return data;
  }

  static async getById(id: number): Promise<SocialMediaInterface | null> {
    const { data } = await axios.get<SocialMediaInterface | null>(`${this.API_URL}/${id}`);

    return data;
  }

  static async create(socialMedia: CreateSocialMediaDTO): Promise<SocialMediaInterface> {
    const { data } = await axios.post<SocialMediaInterface>(this.API_URL, socialMedia);

    return data;
  }

  static async update(id: number, updatedSocialMedia: UpdateSocialMediaDTO,): Promise<SocialMediaInterface | null> {
    const { data } = await axios.patch<SocialMediaInterface | null>(`${this.API_URL}/${id}`, updatedSocialMedia,);

    return data;
  }

  static async delete(id: number): Promise<void> {
    await axios.delete(`${this.API_URL}/${id}`);
  }
}
