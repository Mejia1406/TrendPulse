import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SocialMedia } from './entities/social-media.entity.js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto.js';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto.js';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectRepository(SocialMedia)
    private socialMediaRepository: Repository<SocialMedia>,
  ) {}

  findAll(): Promise<SocialMedia[]> {
    return this.socialMediaRepository.find();
  }

  findOne(id: number): Promise<SocialMedia | null> {
    return this.socialMediaRepository.findOneBy({ id });
  }

  create(createSocialMediaDto: CreateSocialMediaDto): Promise<SocialMedia> {
    const socialMedia = this.socialMediaRepository.create(createSocialMediaDto);

    return this.socialMediaRepository.save(socialMedia);
  }

  async update(
    id: number,
    updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMedia | null> {
    const socialMedia = await this.socialMediaRepository.findOneBy({ id });

    if (!socialMedia) {
      return null;
    }

    this.socialMediaRepository.merge(socialMedia, updateSocialMediaDto);

    return this.socialMediaRepository.save(socialMedia);
  }

  async delete(id: number): Promise<void> {
    await this.socialMediaRepository.delete(id);
  }
}
