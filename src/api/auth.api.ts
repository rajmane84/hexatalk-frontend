import axios from "axios";
import { redirect } from "react-router-dom";
import { useUserStore } from "../store/user.store";
import { toast } from "sonner";
import { axiosInstance } from "../utils/axios";
import {
  handleApiError,
  type NormalizedApiError,
} from "../utils/handleApiError";

interface ISignup {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

interface ISignin {
  email: string;
  password: string;
}

export const handleUserSignup = async ({
  username,
  email,
  password,
  fullname,
}: ISignup) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/sign-up", {
      email,
      password,
      username,
      fullname,
    });

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const normalizedError = handleApiError(error);
    return { success: false, error: normalizedError };
  }
};

export const handleUserSignin = async ({ email, password }: ISignin) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", {
      email,
      password,
    });

    return { success: true, data: response.data };
  } catch (error: unknown) {
    const normalizedError = handleApiError(error);
    return { success: false, error: normalizedError };
  }
};

export const handleUserLogout = async () => {
  const { email, username, userLogout } = useUserStore.getState();

  if (email === null || username === null) {
    console.warn("No active user found to logout.");
    toast.error("Logout Failed");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    await axiosInstance.get("/api/v1/auth/logout", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    localStorage.removeItem("token");
    userLogout();
    redirect("/sign-in");

    return;
  } catch (error: unknown) {
    const normalizedError = handleApiError(error);
    console.error(normalizedError);
    toast.error("User Logout Failed");
    return;
  }
};
