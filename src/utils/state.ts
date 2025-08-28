import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TokenState {
  tokenAuth: string;
  tokenTime: string;
  setToken: (newToken: string, time: number) => void;
}

export const useTokenStore = create<TokenState>()(
  persist(
    (set) => ({
      tokenAuth: "",
      tokenTime: "",
      setToken: (newToken, time) =>
        set({
          tokenAuth: newToken,
          tokenTime: new Date(Date.now() + time * 1000).toISOString(),
        }),
    }),
    {
      name: "auth-token", // nombre de la clave en localStorage
      partialize: (state) => ({
        tokenAuth: state.tokenAuth,
        tokenTime: state.tokenTime,
      }),
    }
  )
);
