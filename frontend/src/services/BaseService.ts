// external imports
import axios from 'axios';

// internal imports
import { useAuthStore } from '@/stores/AuthStore';

export class BaseService {
  private static readonly API_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

  protected static async httpGet<T>(path: string): Promise<T> {
    const { data } = await axios.get<T>(`${BaseService.API_URL}${path}`, BaseService.getConfig());

    return data;
  }

  protected static async httpPost<T>(path: string, body: object): Promise<T> {
    const { data } = await axios.post<T>(
      `${BaseService.API_URL}${path}`,
      body,
      BaseService.getConfig(),
    );

    return data;
  }

  protected static async httpPatch<T>(path: string, body: object): Promise<T> {
    const { data } = await axios.patch<T>(
      `${BaseService.API_URL}${path}`,
      body,
      BaseService.getConfig(),
    );

    return data;
  }

  protected static async httpDelete(path: string): Promise<void> {
    await axios.delete(`${BaseService.API_URL}${path}`, BaseService.getConfig());
  }

  private static getConfig() {
    const token = useAuthStore().token;

    return token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : {};
  }
}
