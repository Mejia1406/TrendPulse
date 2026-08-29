import { useTrendStore } from '@/stores/TrendStore';
import type { TrendInterface } from '@/interfaces/TrendInterface';

export class TrendService {
  static getTrends(): TrendInterface[] {
    return useTrendStore().trends;
  }

  static filterTrends(filters: {
    socialMedia?: string;
    date?: string;
  }): TrendInterface[] {
    const store = useTrendStore();

    return store.trends.filter((trend) => {
      const socialMediaMatch =
        !filters.socialMedia ||
        filters.socialMedia === 'Todas' ||
        trend.socialMedia === filters.socialMedia;

      const dateMatch =
        !filters.date ||
        filters.date === 'Todas' ||
        trend.date === filters.date;

      return socialMediaMatch && dateMatch;
    });
  }
}