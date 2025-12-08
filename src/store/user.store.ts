// It is the place where we'll store the state and any function that updates the state

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

type UserStore = {
  email: string | null;
  username: string | null;
  _hasHydrated: boolean;
  userLogout: () => void;
  setUser: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
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

      setUser: async (email, password) => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/login`,
            { email, password },
            { withCredentials: true, timeout: 10_000 },
          );

          const { user, token } = response.data;
          console.log("Token received: ", token);

          set({
            email: user.email,
            username: user.username,
          });

          if (token) {
            localStorage.setItem("token", token);
          }

          return { success: true };
        } catch (error: unknown) {
          let message: string;
          if (axios.isAxiosError(error)) {
            console.log("Axios error occurred:", error.response?.data.message);
            message = error.response?.data.message;
          } else if (error instanceof Error) {
            console.log(error.message);
            message = error.message;
          } else {
            console.log("Unexpected error occurred");
            message = "Unexpected error occurred";
          }

          return { success: false, error: message };
        }
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
