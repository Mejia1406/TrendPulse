// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source.js';

// internal imports
import { AuthModule } from './auth/auth.module.js';
import { PublicationStatsModule } from './publication-stats/publication-stats.module.js';
import { SocialMediaModule } from './social-media/social-media.module.js';
import { TrendsModule } from './trends/trends.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      autoLoadEntities: true,
      migrationsRun: true,
    }),
    AuthModule,
    UsersModule,
    SocialMediaModule,
    TrendsModule,
    PublicationStatsModule,
  ],
})
export class AppModule {}
