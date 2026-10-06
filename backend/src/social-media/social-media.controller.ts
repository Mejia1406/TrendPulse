import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SocialMediaService } from './social-media.service.js';
import { SocialMedia } from './entities/social-media.entity.js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto.js';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('social-media')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @Roles('admin')
  create(
    @Body() createSocialMediaDto: CreateSocialMediaDto,
  ): Promise<SocialMedia> {
    return this.socialMediaService.create(createSocialMediaDto);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateSocialMediaDto: UpdateSocialMediaDto,
  ): Promise<SocialMedia | null> {
    return this.socialMediaService.update(Number(id), updateSocialMediaDto);
  }

  @Delete(':id')
  @Roles('admin')
  delete(@Param('id') id: string): Promise<void> {
    return this.socialMediaService.delete(Number(id));
  }
}
