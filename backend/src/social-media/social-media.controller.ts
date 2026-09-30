import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

import { SocialMediaService } from './social-media.service.js';
import { SocialMedia } from './entities/social-media.entity.js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto.js';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto.js';

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  @Get()
  findAll(): Promise<SocialMedia[]> {
    return this.socialMediaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<SocialMedia | null> {
    return this.socialMediaService.findOne(Number(id));
  }

  @Post()
  create(
    @Body() createSocialMediaDto: CreateSocialMediaDto,
  ): Promise<SocialMedia> {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMedia | null> {
    return this.socialMediaService.update(Number(id), updateSocialMediaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.socialMediaService.delete(Number(id));
  }
}
