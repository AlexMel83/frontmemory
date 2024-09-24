import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

interface User {
  id: number;
  email: string;
  facabook_id: string;
  google_id: string;
  name: string;
  surname: string;
  phone: string;
  picture: string;
  role: string;
  social_login: boolean;
  isactivated: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expAcToken: string;
    expRfToken: string;
  };
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userData: null as AuthResponse | null,
    isMenuOpen: false,
    isLoading: false,
    isAuthed: false,
    menuOpen: false,
  }),

  actions: {
    saveUserData(data: AuthResponse) {
      this.userData = data;
      this.isAuthed = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('userData', JSON.stringify(this.userData));
      }
    },

    loadUserData() {
      if (typeof window !== 'undefined') {
        const data = localStorage.getItem('userData');
        if (data) {
          this.userData = JSON.parse(data);
          this.isAuthed = true;
          return this.userData;
        }
      }
      return null;
    },

    async logOut() {
      const { $api } = useNuxtApp();
      try {
        await $api.auth.logout();
        this.$reset(); // очищення Pinia-стану
        if (typeof window !== 'undefined') {
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error during logOut:', error);
      }
    },

    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
});

export const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
