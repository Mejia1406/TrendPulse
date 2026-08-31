// Samuel Moncada Mejía
import { createPinia } from 'pinia';
import { watch } from 'vue';
import { socialMediaSeeder } from '@/seeders/SocialMediaSeeder.js';
import { userSeeder } from '@/seeders/UserSeeder.js';
import { trendSeeder } from '@/seeders/TrendSeeder.js';
import { publicationStatsSeeder } from '@/seeders/PublicationStatsSeeder.js';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {

      pinia.state.value = {
        socialMedia: {
          socialMedia: socialMediaSeeder,
        },
        user: {
          users: userSeeder,
        },
        auth: {
          currentUser: null,
        },
        trend: {
          trends: trendSeeder,
        },
        publicationStats: {
          publicationStats: publicationStatsSeeder,
        },
      };

      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    watch(
      pinia.state,

      (state) => {
        localStorage.setItem('piniaState', JSON.stringify(state));
      },

      { deep: true },
    );
    return pinia;
  }
}
