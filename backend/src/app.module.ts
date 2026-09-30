import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module.js';
import { SocialMediaModule } from './social-media/social-media.module.js';
import { TrendsModule } from './trends/trends.module.js';
import { PublicationStatsModule } from './publication-stats/publication-stats.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    SocialMediaModule,
    TrendsModule,
    PublicationStatsModule,
  ],
})
export class AppModule {}