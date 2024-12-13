import { InjectionToken } from '@angular/core';

export interface ApiConfig {
  baseUrl: string;
  endpoints: {
    customers: string;
  };
  timeoutMs: number;
  retryAttempts: number;
}

export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: 'https://jsonplaceholder.typicode.com',
  endpoints: {
    customers: '/users'
  },
  timeoutMs: 10000,
  retryAttempts: 3
};

export const API_CONFIG = new InjectionToken<ApiConfig>('api.config'); 