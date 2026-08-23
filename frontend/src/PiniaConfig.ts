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
      // initialize the state with the seeders

      pinia.state.value = {
        socialMedia: {
          socialMedia: socialMediaSeeder,
        },
      };

      // save the initial state to localStorage

      localStorage.setItem('piniaState', JSON.stringify(pinia.state.value));
    }

    // watch for changes and save to localStorage

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
