// Samuel Moncada
// external imports
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// internal imports
import { SocialMedia } from './entities/social-media.entity.js';
import { SocialMediaController } from './social-media.controller.js';
import { SocialMediaService } from './social-media.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([SocialMedia])],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
  exports: [SocialMediaService],
})
export class SocialMediaModule {}
