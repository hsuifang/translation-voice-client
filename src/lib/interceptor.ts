import { type AxiosError, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';

export interface ConsoleError {
  status: number;
  data: unknown;
}

// requestInterceptor
export const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // add token
  return config;
};

// successInterceptor
export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// errorInterceptor

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    // TODO: redirect to login page
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};
