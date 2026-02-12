import { useUserStore } from "../store/user.store";
import { toast } from "sonner";
import type {
  AcceptFriendRequest,
  Friends,
  GetAllRequests,
  GetFriendsResponse,
} from "../types/user.type";
import { axiosInstance } from "../utils/axios";
import { handleApiError } from "../utils/handleApiError";

export const getAllFriends = async ()=> {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to load chat list");
    return null;
  }

  try {
    const response = await axiosInstance.get("/api/v1/user/friends")

    return response.data.friends;
  } catch (error: unknown) {
    const normalizedMessage = handleApiError(error);

    const message = normalizedMessage.message || "Failed to load chat list"

    toast.error(message);
    return null;
  }
};

export const getAllFriendRequests = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/user/all-requests");

    return response.data.requests;
  } catch (error: unknown) {
    const normalizedMessage = handleApiError(error);
    const message = normalizedMessage.message || "Failed to fetch friend requests";

    toast.error(message);
    return null;
  }
};

export const acceptRequest = async (requestId: string) => {
  const { email, username } = useUserStore.getState();

  if (!email || !username) {
    console.warn("Unauthenticated user tried to get chat list");
    toast("Failed to accept the request");
    return null;
  }

  try {
    const response = await axiosInstance.get(`/api/v1/user/accept-request/${requestId}`)

    // @ts-ignore
    return response.message;
  } catch (error: unknown) {
    
    const normalizedMessage = handleApiError(error);
    const message = normalizedMessage.message || "Failed to Accept request";

    toast.error(message);
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
    const response = await axiosInstance.get(`/api/v1/users/accept-request/${requestId}`)

    // @ts-ignore
    return response.message;
  } catch (error: unknown) {
    const normalizedMessage = handleApiError(error);
    const message = normalizedMessage.message || "Failed to reject the request";

    toast.error(message);
    return null;
  }
};

export const getAllFriendSuggestions = async() => {
  try {
    // TODO: For now we're displaying all the users available in the db, but in future we'll use some algorithm to display the suggestions
    // so we'll change this route in the future
    const response = await axiosInstance.get("/api/v1/user/suggestions");
    return response.data;
  } catch (error) {
    const normalizedMessage = handleApiError(error);
    const message = normalizedMessage.message || "Failed to fetch suggestions";

    toast.error(message);
    return null;
  }
}

export const sendFriendRequest = async (username: string) => {
  try {
    const response = await axiosInstance.post(`/api/v1/user/add-friend`, {username});
    // @ts-ignore
    toast.success(response.message || "Friend request send successfully");
    return {success: true}
  } catch (error: unknown) {
    let normalizedMessage = handleApiError(error);

    let message = normalizedMessage.message || "Failed to send request";
    toast.error(message);
    return {success: false};
  }
}

export const getAllChats = async (username: string) => {
  //
}