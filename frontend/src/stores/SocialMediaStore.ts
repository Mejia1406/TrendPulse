import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { SocialMediaInterface } from '@/interfaces/SocialMediaInterface';

export const useSocialMediaStore = defineStore('socialMedia', () => {
    const socialMedia = ref<SocialMediaInterface[]>([]);

    return { socialMedia };

});