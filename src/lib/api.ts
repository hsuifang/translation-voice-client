import axios, { type AxiosRequestConfig, type AxiosInstance } from 'axios';
import { requestInterceptor, successInterceptor, errorInterceptor } from './interceptor';

const reqConfig: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 30000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const api: AxiosInstance = axios.create(reqConfig);
api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export default api;
