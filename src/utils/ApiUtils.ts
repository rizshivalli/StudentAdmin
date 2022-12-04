import axios, {AxiosError, AxiosResponse} from 'axios';

const BASE_URL = 'https://strapi-production-d8ee.up.railway.app/api/';

const commonConfig = {
  timeout: 60 * 1000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export const API_INSTANCE = (token?: string) => {
  const apiInstance = axios.create({
    ...commonConfig,
    baseURL: BASE_URL,
  });

  apiInstance.interceptors.request.use(
    config => {
      if (token) {
        config.headers.token = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      const {data} = response || {};
      const {api_error, error} = data || {};
      if (api_error || error) {
        return Promise.reject(new Error(api_error || error));
      }
      return response;
    },
    (error: AxiosError) => {
      const {response, request} = error || {};
      return Promise.reject(response || request);
    },
  );
  return apiInstance;
};
