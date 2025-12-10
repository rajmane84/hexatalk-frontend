import axios from "axios";
import { toast } from "sonner";

export const fetchMessages = async (friendId: string) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/messages/${friendId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      },
    );

    return response.data;
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
