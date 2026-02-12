import { toast } from "sonner";
import { axiosInstance } from "../utils/axios";
import { handleApiError } from "../utils/handleApiError";

export const fetchChatDetails = async(chatId: string) => {
  try {
    const response = await axiosInstance.get(`/api/v1/chat/${chatId}`);

    return {success: true, data: response.data};
  } catch (error) {
    const normalizedError = handleApiError(error);
    const message = normalizedError.message || "Error fetching chat details";
    toast.error(message);
    return {success: false, error: normalizedError};
  }
}