import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setToken: async (token) => {
    await SecureStore.setItemAsync('token', token);
    set({ token });
  },
  setUser: (user) => set({ user }),
  logout: async () => {
    await SecureStore.deleteItemAsync('token');
    set({ token: null, user: null });
  },
  loadToken: async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      if (token) set({ token });
    } catch (error) {
      console.error('Erro ao carregar token:', error);
    }
  },
}));
