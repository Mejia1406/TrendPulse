// Samuel Moncada 

// internal imports
import type { CreateSocialMediaDTO } from '@/dtos/CreateSocialMediaDTO';
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';
import { useSocialMediaStore } from '@/stores/SocialMediaStore';

export class SocialMediaService {
  static getAll(): SocialMediaInterface[] {
    return useSocialMediaStore().socialMedia;
  }

  static getById(id: string): SocialMediaInterface | undefined {
    return useSocialMediaStore().socialMedia.find((socialMedia) => socialMedia.id === id);
  }

  static create(SocialMedia: CreateSocialMediaDTO): void {
    const store = useSocialMediaStore();
    const nextId =
      store.socialMedia.length > 0
        ? (
            Math.max(
              ...store.socialMedia.map((existingSocialMedia) => parseInt(existingSocialMedia.id)),
              0,
            ) + 1
          ).toString()
        : '1';
    store.socialMedia.push({
      id: nextId,
      ...SocialMedia,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  static update(id: string, updatedSocialMedia: CreateSocialMediaDTO): void {
    const store = useSocialMediaStore();
    const index = store.socialMedia.findIndex((sm) => sm.id === id);
    if (index === -1) {
      return;
    }
    const existingSocialMedia = store.socialMedia[index];
    if (!existingSocialMedia) {
      return;
    }

    store.socialMedia[index] = {
      ...existingSocialMedia,
      ...updatedSocialMedia,
      updatedAt: new Date().toISOString(),
    };
  }

  static delete(id: string): void {
    const store = useSocialMediaStore();
    const index = store.socialMedia.findIndex((sm) => sm.id === id);
    if (index === -1) {
      return;
    }

    store.socialMedia.splice(index, 1);
  }
}
