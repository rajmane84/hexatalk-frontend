/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

interface ISignup {
  email: string;
  password: string;
  username: string;
}

export const handleUserSignup = async ({
  username,
  email,
  password,
}: ISignup): Promise<any | null> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/auth/sign-up`,
      { email, password, username },
      { withCredentials: true, timeout: 10_000 },
    );

    return response.data;
  } catch (error: any) {
    // TODO: Make the errors prettier
    console.log("some error occured", error);
    return null;
  }
};

export const handleUserLogout = async () => {
  //
};
