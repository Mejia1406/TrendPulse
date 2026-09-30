import { TrendsService } from '../trends/trends.service.js';

export async function seedTrends(
  trendsService: TrendsService,
) {
  await trendsService.create({
    category: 'Tecnología',
    name: '#IA',
    socialMediaId: 1,
  });

  await trendsService.create({
    category: 'Deportes',
    name: '#Mundial',
    socialMediaId: 2,
  });

  await trendsService.create({
    category: 'Música',
    name: '#K-Pop',
    socialMediaId: 3,
  });

  await trendsService.create({
    category: 'Política',
    name: '#Elecciones',
    socialMediaId: 1,
  });

  await trendsService.create({
    category: 'Gastronomía',
    name: '#RecetasVeganas',
    socialMediaId: 2,
  });

  await trendsService.create({
    category: 'Videojuegos',
    name: '#GamingLive',
    socialMediaId: 4,
  });

  await trendsService.create({
    category: 'Entretenimiento',
    name: '#DanceChallenge',
    socialMediaId: 3,
  });

  await trendsService.create({
    category: 'Tecnología',
    name: '#TechConf',
    socialMediaId: 4,
  });
}