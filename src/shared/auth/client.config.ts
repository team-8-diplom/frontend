import { client } from '@/shared/api/client.gen.ts';
import type { InternalAxiosRequestConfig } from 'axios';
import { tokenStore } from '@/shared/auth/tokenStore.ts';

client.setConfig({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000',
});

client.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStore.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      tokenStore.clearToken();
    }
  }
);
