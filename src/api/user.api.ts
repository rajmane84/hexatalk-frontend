import axios from "axios";
import { useUserStore } from "../store/user.store";
import { toast } from "sonner";
import type {
  AcceptFriendRequest,
  Friends,
  GetAllRequests,
  GetFriendsResponse,
} from "../types/user.type";

export const getAllFriends = async (): Promise<Friends[] | null> => {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to load chat list");
    return null;
  }

  try {
    const response = await axios.get<GetFriendsResponse>(
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

export const getAllFriendRequests = async () => {
  try {
    const response = await axios.get<GetAllRequests>(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/users/all-requests`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      },
    );

    return response.data.requests;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error occurred:", error.response?.data.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Unexpected error occurred");
    }

    toast.error("Failed to fetch friend requests");
  }
};

export const acceptRequest = async (requestId: string) => {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to accept the request");
    return null;
  }

  const token = localStorage.getItem('token');
  console.log(token);

  try {
    const response = await axios.post<AcceptFriendRequest>(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/users/accept-request/${requestId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      },
    );

    return response.data.message;
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

    toast.error("Failed to Accept request");
    return null;
  }
};

export const declineRequest = async (requestId: string) => {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to reject the request");
    return null;
  }

  try {
    const response = await axios.post<AcceptFriendRequest>(
      `${import.meta.env.VITE_HTTP_BACKEND_URL}/api/v1/users/accept-request/${requestId}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        withCredentials: true,
      },
    );

    return response.data.message;
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

    toast.error("Failed to reject the request");
    return null;
  }
};
