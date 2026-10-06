// Samuel Moncada Mejía
// external imports
import { createPinia } from 'pinia';
import { watch } from 'vue';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    const savedState = localStorage.getItem('piniaState');

    if (savedState) {
      pinia.state.value = JSON.parse(savedState);
    } else {
      pinia.state.value = {
        user: {
          users: [],
        },
        auth: {
          token: null,
          currentUser: null,
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
