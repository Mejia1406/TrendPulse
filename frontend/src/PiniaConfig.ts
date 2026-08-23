import { createPinia } from 'pinia';
import { watch } from 'vue';
import { socialMediaSeeder } from '@/stores/SocialMediaSeeder.js';

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
