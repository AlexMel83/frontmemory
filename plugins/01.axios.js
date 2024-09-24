import axios from 'axios';
import { useAuthStore } from '~/stores/auth.store';
import apiModule from '../api/index.ts';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  let baseURL;
  if (process.client) {
    if (window.location.hostname === 'memory.pp.ua') {
      baseURL = 'https://api.' + window.location.hostname;
    } else {
      baseURL = config.public.apiBase || 'http://localhost:4040';
    }
  } else {
    baseURL = config.public.apiBase || 'http://localhost:4040';
  }

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: '',
    },
    withCredentials: true,
  });

  const api = apiModule(axiosInstance);

  const initialDataToken = () => {
    axiosInstance.defaults.headers.Authorization = `Bearer ${authStore?.userData?.tokens?.accessToken}`;
  };

  const refreshToken = async () => {
    if (!authStore.userData.tokens.refreshToken) {
      console.error('No refresh token available');
      return authStore.logOut();
    }
    try {
      const response = await api.auth.refresh(
        authStore?.userData?.tokens?.refreshToken,
      );
      if (!response.data.accessToken) {
        throw new Error('Failed to get new access token');
      }
      authStore.saveUserData({
        ...authStore?.userData?.user,
        tokens: {
          ...authStore?.userData?.tokens,
          accessToken: response.data.accessToken,
          expAcToken: response.data.expAcToken,
        },
      });
      axiosInstance.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;
    } catch (error) {
      console.error('Error refreshing token:', error);
      authStore.logOut();
      if (axios.isCancel(error)) {
        throw error;
      }
    }
  };

  axiosInstance.interceptors.request.use(async (config) => {
    initialDataToken();
    if (authStore?.userData?.tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${authStore?.userData?.tokens?.accessToken}`;
    } else {
      config.headers.Authorization = '';
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401 || error.response?.status === 403) {
        await refreshToken();
        initialDataToken();
        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${authStore?.userData?.tokens?.accessToken}`;
        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    },
  );

  nuxtApp.provide('api', api);
});
