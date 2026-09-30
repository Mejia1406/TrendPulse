import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '../app.module.js';
import { SocialMediaService } from '../social-media/social-media.service.js';
import { TrendsService } from '../trends/trends.service.js';
import { PublicationStatsService } from '../publication-stats/publication-stats.service.js';

import { seedSocialMedia } from './social-media.seeder.js';
import { seedTrends } from './trends.seeder.js';
import { seedPublicationStats } from './publication-stats.seeder.js';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  const socialMediaService = app.get(SocialMediaService);
  const trendsService = app.get(TrendsService);
  const publicationStatsService =
    app.get(PublicationStatsService);

  console.log('Limpiando base de datos...');

  await dataSource.query('DELETE FROM publication_stats');
  await dataSource.query('DELETE FROM trends');
  await dataSource.query('DELETE FROM social_media');

  await dataSource.query(`
    DELETE FROM sqlite_sequence
    WHERE name IN (
      'publication_stats',
      'trends',
      'social_media'
    )
  `);

  console.log('Creando redes sociales...');
  await seedSocialMedia(socialMediaService);

  console.log('Creando tendencias...');
  await seedTrends(trendsService);

  console.log('Creando estadísticas...');
  await seedPublicationStats(publicationStatsService);

  console.log('Seed completado correctamente.');
  console.log('Redes sociales: 4');
  console.log('Tendencias: 8');
  console.log('Estadísticas: 40');

  await app.close();
}

seed().catch((error) => {
  console.error('Error ejecutando seed:', error);
  process.exit(1);
});