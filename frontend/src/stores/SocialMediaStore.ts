// Samuel Moncada Mejía
// external imports
import { defineStore } from 'pinia';
import { ref } from 'vue';

// internal imports
import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

export const useSocialMediaStore = defineStore('socialMedia', () => {
    const socialMedia = ref<SocialMediaInterface[]>([]);

    return { socialMedia };

});