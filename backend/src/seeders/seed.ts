import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';

import { AppModule } from '../app.module.js';
import { SocialMediaService } from '../social-media/social-media.service.js';
import { TrendsService } from '../trends/trends.service.js';
import { PublicationStatsService } from '../publication-stats/publication-stats.service.js';
import { UsersService } from '../users/users.service.js';

import { seedSocialMedia } from './social-media.seeder.js';
import { seedTrends } from './trends.seeder.js';
import { seedPublicationStats } from './publication-stats.seeder.js';
import { seedUsers } from './users.seeder.js';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  const socialMediaService = app.get(SocialMediaService);
  const trendsService = app.get(TrendsService);
  const publicationStatsService =
    app.get(PublicationStatsService);
  const usersService = app.get(UsersService);

  console.log('Limpiando base de datos...');

  await dataSource.query('DELETE FROM publication_stats');
  await dataSource.query('DELETE FROM trends');
  await dataSource.query('DELETE FROM social_media');
  await dataSource.query('DELETE FROM users');

  await dataSource.query(`
    DELETE FROM sqlite_sequence
    WHERE name IN (
      'publication_stats',
      'trends',
      'social_media',
      'users'
    )
  `);

  console.log('Creando usuarios...');
  await seedUsers(usersService);

  console.log('Creando redes sociales...');
  await seedSocialMedia(socialMediaService);

  console.log('Creando tendencias...');
  await seedTrends(trendsService);

  console.log('Creando estadísticas...');
  await seedPublicationStats(publicationStatsService);

  console.log('Seed completado correctamente.');
  console.log('Usuarios: 3 (1 admin, 2 users)');
  console.log('Redes sociales: 4');
  console.log('Tendencias: 8');
  console.log('Estadísticas: 40');
  console.log('');
  console.log('Cuentas demo:');
  console.log('  Admin:    smoncadam@eafit.edu.co / 123456');
  console.log('  Usuario:  shurtadom3@eafit.edu.co / 123456');
  console.log('  Usuario:  aacappellg@eafit.edu.co / 123456');

  await app.close();
}

seed().catch((error) => {
  console.error('Error ejecutando seed:', error);
  process.exit(1);
});
