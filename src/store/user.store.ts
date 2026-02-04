// It is the place where we'll store the state and any function that updates the state

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UserStore = {
  email: string | null;
  username: string | null;
  _hasHydrated: boolean;
  userLogout: () => void;
  setUser: (email: string, username: string) => void;
  asyncFn: () => Promise<void>;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      email: null,
      username: null,
      _hasHydrated: false,

      userLogout: () => {
        localStorage.removeItem("token");
        set({ email: null, username: null });
      },

      setUser: async (email, username) => {
        set({
          email,
          username,
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
