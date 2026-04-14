import { client } from '@/shared/api/client.gen.ts';
import type { InternalAxiosRequestConfig } from 'axios';

client.setConfig({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8000',
});

client.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  console.log('Interceptor request', config);
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
