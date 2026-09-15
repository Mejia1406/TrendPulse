import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

import { AuthService } from '@/services/AuthService';
import { UserService } from '@/services/UserService';
import { SocialMediaService } from '@/services/SocialMediaService';
import { TrendService } from '@/services/TrendService';
import { PublicationStatsService } from '@/services/PublicationStatsService';

import { useAuthStore } from '@/stores/AuthStore';
import { useUserStore } from '@/stores/UserStore';
import { useSocialMediaStore } from '@/stores/SocialMediaStore';
import { useTrendStore } from '@/stores/TrendStore';
import { usePublicationStatsStore } from '@/stores/PublicationStatsStore';

import { userSeeder } from '@/seeders/UserSeeder';
import { socialMediaSeeder } from '@/seeders/SocialMediaSeeder';
import { trendSeeder } from '@/seeders/TrendSeeder';
import { publicationStatsSeeder } from '@/seeders/PublicationStatsSeeder';

beforeEach(() => {
  setActivePinia(createPinia());

  useUserStore().users = structuredClone(userSeeder);
  useSocialMediaStore().socialMedia = structuredClone(socialMediaSeeder);
  useTrendStore().trends = structuredClone(trendSeeder);
  usePublicationStatsStore().publicationStats = structuredClone(publicationStatsSeeder);
});

describe('AuthService', () => {
  it('permite iniciar sesión con credenciales válidas', () => {
    const user = AuthService.login({
      email: 'smoncadam@eafit.edu.co',
      password: '123456',
    });

    expect(user).not.toBeNull();
    expect(useAuthStore().currentUser?.role).toBe('admin');
  });

  it('rechaza credenciales inválidas', () => {
    const user = AuthService.login({
      email: 'incorrecto@eafit.edu.co',
      password: 'incorrecta',
    });

    expect(user).toBeNull();
    expect(useAuthStore().currentUser).toBeNull();
  });

  it('permite cerrar sesión', () => {
    AuthService.login({
      email: 'smoncadam@eafit.edu.co',
      password: '123456',
    });

    AuthService.logout();

    expect(useAuthStore().currentUser).toBeNull();
  });
});

describe('UserService', () => {
  it('consulta todos los usuarios', () => {
    expect(UserService.getAll()).toHaveLength(3);
  });

  it('crea un usuario', () => {
    UserService.create({
      name: 'Usuario de prueba',
      email: 'prueba@eafit.edu.co',
      password: '123456',
      role: 'user',
    });

    expect(UserService.getAll()).toHaveLength(4);
  });

  it('actualiza un usuario', () => {
    UserService.update('1', {
      name: 'Nombre actualizado',
      email: 'actualizado@eafit.edu.co',
      password: '654321',
      role: 'admin',
    });

    expect(UserService.getAll()[0]?.name).toBe('Nombre actualizado');
  });

  it('elimina un usuario', () => {
    UserService.delete('3');

    expect(UserService.getAll()).toHaveLength(2);
  });

  it('no modifica usuarios cuando se actualiza un ID inexistente', () => {
    const initialUsers = UserService.getAll().length;

    UserService.update('999', {
      name: 'No existe',
      email: 'noexiste@test.com',
      password: '123456',
      role: 'user',
    });

    expect(UserService.getAll()).toHaveLength(initialUsers);
  });

  it('no modifica usuarios cuando se elimina un ID inexistente', () => {
    const initialUsers = UserService.getAll().length;

    UserService.delete('999');

    expect(UserService.getAll()).toHaveLength(initialUsers);
  });
});

describe('SocialMediaService', () => {
  it('consulta y busca redes sociales', () => {
    const socialMedia = SocialMediaService.getAll();

    expect(socialMedia.length).toBeGreaterThan(0);
    expect(SocialMediaService.getById(socialMedia[0]!.id)).toEqual(socialMedia[0]);
  });

  it('devuelve undefined cuando la red social no existe', () => {
    expect(SocialMediaService.getById('999')).toBeUndefined();
  });

  it('crea, actualiza y elimina una red social', () => {
    SocialMediaService.create({
      name: 'LinkedIn',
      logo: 'in',
      color: '#000000',
    });

    const created = SocialMediaService.getAll().at(-1)!;

    SocialMediaService.update(created.id, {
      name: 'LinkedIn Updated',
      logo: 'in',
      color: '#123456',
    });

    expect(SocialMediaService.getById(created.id)?.name).toBe('LinkedIn Updated');

    SocialMediaService.delete(created.id);

    expect(SocialMediaService.getById(created.id)).toBeUndefined();
  });

  it('no modifica redes sociales cuando se actualiza un ID inexistente', () => {
    const initialSocialMedia = SocialMediaService.getAll().length;

    SocialMediaService.update('999', {
      name: 'No existe',
      logo: 'none',
      color: '#000000',
    });

    expect(SocialMediaService.getAll()).toHaveLength(initialSocialMedia);
  });

  it('no modifica redes sociales cuando se elimina un ID inexistente', () => {
    const initialSocialMedia = SocialMediaService.getAll().length;

    SocialMediaService.delete('999');

    expect(SocialMediaService.getAll()).toHaveLength(initialSocialMedia);
  });
});

describe('PublicationStatsService', () => {
  it('consulta las estadísticas de una tendencia', () => {
    const trend = trendSeeder[0]!;

    const stats = PublicationStatsService.getByTrendId(trend.id);

    expect(stats.length).toBeGreaterThan(0);
    expect(PublicationStatsService.getLatestByTrendId(trend.id)).toBeDefined();
    expect(PublicationStatsService.getLatestViews(trend.id)).toBeGreaterThanOrEqual(0);
    expect(PublicationStatsService.getLatestLikes(trend.id)).toBeGreaterThanOrEqual(0);
  });

  it('devuelve undefined cuando no hay estadísticas para una tendencia', () => {
    expect(PublicationStatsService.getLatestByTrendId('999')).toBeUndefined();
    expect(PublicationStatsService.getLatestViews('999')).toBe(0);
    expect(PublicationStatsService.getLatestLikes('999')).toBe(0);
  });

  it('devuelve un arreglo vacío para una tendencia sin estadísticas', () => {
    expect(PublicationStatsService.getByTrendId('999')).toEqual([]);
  });
});

describe('TrendService', () => {
  it('consulta y busca tendencias', () => {
    const trends = TrendService.getAll();

    expect(trends.length).toBeGreaterThan(0);
    expect(TrendService.getById(trends[0]!.id)).toEqual(trends[0]);
  });

  it('devuelve undefined cuando la tendencia no existe', () => {
    expect(TrendService.getById('999')).toBeUndefined();
  });

  it('devuelve una lista vacía para una red social inexistente', () => {
  const filtered = TrendService.getFiltered({
    socialMedia: 'LinkedIn',
  });

  expect(filtered).toEqual([]);
});

  it('filtra tendencias por red social', () => {
    const socialMedia = socialMediaSeeder[0]!;

    const filtered = TrendService.getFiltered({
      socialMedia: socialMedia.name,
    });

    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((trend) => trend.socialMediaId === socialMedia.id)).toBe(true);
  });

  it('devuelve todas las tendencias cuando se selecciona Todas', () => {
    expect(TrendService.getFiltered({ socialMedia: 'Todas' })).toHaveLength(
      TrendService.getAll().length,
    );
  });

  it('devuelve todas las tendencias cuando no se especifica un filtro', () => {
    expect(TrendService.getFiltered({})).toHaveLength(TrendService.getAll().length);
  });

  it('obtiene las tendencias más vistas', () => {
    const topTrends = TrendService.getTopTrendsByViews(TrendService.getAll(), 3);

    expect(topTrends).toHaveLength(3);
  });

  it('respeta el límite de tendencias solicitado', () => {
    const topTrends = TrendService.getTopTrendsByViews(TrendService.getAll(), 2);

    expect(topTrends).toHaveLength(2);
  });

  it('agrupa estadísticas por red social', () => {
    const stats = TrendService.getTrendStatsBySocialMedia(TrendService.getAll());

    expect(stats.length).toBeGreaterThan(0);
    expect(stats[0]).toHaveProperty('viewsCount');
    expect(stats[0]).toHaveProperty('likesCount');
    expect(stats[0]).toHaveProperty('commentsCount');
    expect(stats[0]).toHaveProperty('sharesCount');
  });
});