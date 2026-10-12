import { createPinia } from 'pinia';

export default class PiniaConfig {
  public static init() {
    const pinia = createPinia();

    return pinia;
  }
}