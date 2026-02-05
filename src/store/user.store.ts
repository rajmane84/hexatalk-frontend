// It is the place where we'll store the state and any function that updates the state

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  email: string | null;
  username: string | null;
  avatarUrl: string;
  _hasHydrated: boolean;
  userLogout: () => void;
  setUser: (email: string, username: string, avatarUrl: string) => void;
  asyncFn: () => Promise<void>;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: null,
      username: null,
      avatarUrl: '',
      _hasHydrated: false,

      userLogout: () => {
        localStorage.removeItem("token");
        set({ email: null, username: null, avatarUrl: '' });
      },

      setUser: async (email, username, avatarUrl) => {
        set({
          email,
          username,
          avatarUrl
        });
      },

      asyncFn: async () => {
        await new Promise((resolve) =>
          setTimeout(() => {
            console.log("promise resolved");
            resolve(true);
          }, 5000),
        );
      },
    }),

    {
      name: "user-store",
      // hydration callback
      onRehydrateStorage: () => (state) => {
        if (state) state._hasHydrated = true;
      },
    },
  ),
);
