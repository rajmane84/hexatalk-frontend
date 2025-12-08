import axios from "axios";
import { redirect } from "react-router-dom";
import { useUserStore } from "../store/user.store";
import { toast } from "sonner";

interface ISignup {
  email: string;
  password: string;
  username: string;
}

export const handleUserSignup = async ({
  username,
  email,
  password,
}: ISignup): Promise<unknown | null> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/sign-up`,
      { email, password, username },
      { withCredentials: true, timeout: 10_000 },
    );

    return response.data;
  } catch (error: unknown) {
    // TODO: Make the errors prettier
    console.log("some error occured", error);
    return null;
  }
};

export const handleUserLogout = async (): Promise<void> => {
  const { email, username, userLogout } = useUserStore.getState();

  if (email === null || username === null) {
    console.warn("No active user found to logout.");
    toast.error("Logout Failed");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/logout`,
      { headers: { Authorization: `Bearer ${token}` }, withCredentials: true },
    );

    console.log("Logout response: ", response);
    userLogout();
    redirect("/sign-in");
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error occurred:", error.response?.data.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error occurred");
    }

    toast.error("User Logout Failed");
  }
};
