import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import { Client } from '../session';

interface AuthState {
    data: {
        client: Client
    };
    setData: (data: AuthState['data'] | ((prev: AuthState['data']) => AuthState['data'])) => void;
    clearData: () => void;
}

const authStore: StateCreator<AuthState> = (set) => ({
    data: {} as AuthState['data'],
    setData: (data) => {
        set((state) => ({
            data: typeof data === 'function' ? data(state.data) : { ...state.data, ...data }
        }))
    },
    clearData: () => set(() => ({ data: {} as AuthState['data'] })),
});

const DATA_IN_STORAGE_KEYS = ['data'];

export const LOCAL_STORAGE_AUTH_KEY = 'auth-storage';

export const useAuthStore = create<AuthState>(
    persist(authStore, {
        name: LOCAL_STORAGE_AUTH_KEY,
        storage: createJSONStorage(() => sessionStorage),
        partialize: (state) => Object.fromEntries(Object.entries(state).filter(([key]) => DATA_IN_STORAGE_KEYS.includes(key)))
    }) as any
);
