import axios from "axios";
import { useUserStore } from "../store/user.store";
import { toast } from "sonner";

export interface Friends {
  _id: string | unknown;
  username: string;
  email: string;
  unreadCount: number;
}

export interface FriendsResponse {
  friends: Friends[];
}

export const getAllFriends = async (): Promise<Friends[] | null> => {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to load chat list");
    return null;
  }

  try {
    const response = await axios.get<FriendsResponse>(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/users/friends`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      },
    );

    return response.data.friends;
  } catch (error: unknown) {
    let message;

    if (axios.isAxiosError(error)) {
      message = error.response?.data.message;
      console.log(message);
    } else if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error occurred");
    }

    toast.error("Failed to load chat list");
    return null;
  }
};
