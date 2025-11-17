/* eslint-disable @typescript-eslint/no-explicit-any */
// It is the place where we'll store the state and any function that updates the state

import { create } from "zustand";
import axios from "axios";

type UserStore = {
  email: string | null;
  username: string | null;
  userLogout: () => void;
  setUser: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  
  asyncFn: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  email: null,
  username: null,
  userLogout: () => {
    set({ email: null, username: null });
  },
  setUser: async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/sign-in`,
        { email, password },
        { withCredentials: true, timeout: 10_000 },
      );

      set({ email: response.data.email, username: response.data.username });

      return { success: true };
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error occured: ", error.message);
      } else {
        console.log("Something went wrong: ", error.message as string);
      }

      return { success: false, error: error.message as string };
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
}));
