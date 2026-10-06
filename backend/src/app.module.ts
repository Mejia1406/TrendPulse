import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module.js';
import { SocialMediaModule } from './social-media/social-media.module.js';
import { TrendsModule } from './trends/trends.module.js';
import { PublicationStatsModule } from './publication-stats/publication-stats.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: process.env.SQLITE_PATH ?? 'database.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    SocialMediaModule,
    TrendsModule,
    PublicationStatsModule,
  ],
})
export class AppModule {}
