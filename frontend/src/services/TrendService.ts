import { useTrendStore } from '@/stores/TrendStore';
import type { TrendInterface } from '@/interfaces/TrendInterface';

export class TrendService {
  static getTrends(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static filterTrends(filters: {
    socialMedia?: string;
  }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      return (
        !filters.socialMedia ||
        filters.socialMedia === 'Todas' ||
        trend.socialMedia.name === filters.socialMedia
      );
    });
  }
}