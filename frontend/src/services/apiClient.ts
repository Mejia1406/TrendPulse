// Athina Cappelletti, Samuel Moncada, Sara Hurtado
// external imports
import axios from 'axios';

// internal imports
import router from '@/router';
import { useAuthStore } from '@/stores/AuthStore';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const token = authStore.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      void router.push({ name: 'login' });
    }

    return Promise.reject(error);
  },
);

export default api;
